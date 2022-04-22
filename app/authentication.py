import functools
import os
import sys
#
from flask import *
from flask.cli import *
from werkzeug.security import *
#
from .models import *
from .database import *
from .descriptions import *
from .logger_base import *

bp = Blueprint('authentication',__name__, url_prefix='/')

@bp.route('/crear_cuenta', methods=['GET','POST'])
@bp.route('/registrarse', methods=['GET','POST'])
@bp.route('/register', methods=['GET','POST'])
@bp.route('/sign-in', methods=['GET','POST'])
def register():
    errors_flag = False
    errors = []
    if request.method == 'POST':
        fullname        = request.form['fullname']
        username        = request.form['user']
        password        = request.form['pass']
        email           = request.form['email']
        birth           = request.form['birth']
        genre           = request.form['genre']
        __type          = request.form['register_category']
        condition_terms = True if request.form.get('condition_terms') == 'on' else False
        privacity_terms = True if request.form.get('privacity_terms') == 'on' else False
        status          = 1
        #
        if __type == 'Otro' : __type = '1010'
        if __type == 'Alumno' : __type = '2010'
        if __type == 'Profesor' : __type = '2020'
        if __type == 'Profesional Colaborador' : __type = '3030'
        #
        __user_exists = UserDAO.select_by_username(username=username)
        #
        if not username:
            errors.append('Es obligatorio un nombre de usuario.')
        if __user_exists is not None:
            errors.append(f'Usuario {username} se encuentra registrado.')
        if not password:
            errors.append('Es obligatorio una contraseña.')
        if not fullname:
            errors.append('Es obligatorio el nombre completo.')
        if not email:
            errors.append('Es obligatorio un correo.')
        if not genre:
            errors.append('Selecciona tu Género.')
        if not __type:
            errors.append('Elige la categoría de tu cuenta.')
        if (condition_terms == False) or (privacity_terms == False):
            errors.append('Debes aceptar los términos y condiciones de uso y privacidad')
        if errors == []:
            UserDAO.insert(
                User(
                    id         = ...,
                    username   = username,
                    password   = generate_password_hash(password),
                    birth      = birth,
                    email      = email,
                    fullname   = fullname,
                    genre      = genre,
                    type       = int(__type),
                    status     = status,
                    created_at = ...
                )
            )
            return redirect(url_for('authentication.login'))
        errors_flag = True
        flash(errors)
    return render_template('authentication/register.html', 
        web_description=web_description,
        errors_flag=errors_flag,
    )

@bp.route('/inicio_de_sesion', methods=['GET','POST'])
@bp.route('/inicio_sesion', methods=['GET','POST'])
@bp.route('/login', methods=['GET','POST'])
def login():
    errors_flag = False
    error = []
    if request.method == 'POST':
        username = request.form['user']
        password = request.form['pass']
        #
        user = UserDAO.select_by_username(username=username)
        #
        if (user is None) or (not check_password_hash(pwhash=user['user_password'], password=password)):
            error = 'Usuario y/o contraseña incorrectos.'
        #
        if error == []:
            session.clear()
            session['user_id'] = user['user_id']
            return redirect(url_for('views.index'))
        #
        errors_flag = True
        flash(error,"error")
    return render_template('authentication/login.html',
        web_description=web_description,
        errors_flag=errors_flag,
    )

@bp.route('/cerrar_sesion')
@bp.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('views.index'))

@bp.before_app_request
def load_logged_in_user():
    user_id = session.get("user_id")
    #
    if user_id is None:
        g.user = None
    else:
        g.user = UserDAO.select_by_id(user_id)

def login_required(view):
    @functools.wraps(view)
    #
    def wrapped_view(**kwargs):
        if g.user is None:
            return redirect(url_for('authentication.login'))
        return view(**kwargs)
    return wrapped_view