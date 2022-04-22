import os
import sys
#
from flask import *
from flask.cli import *
from .authentication import login_required
from .descriptions import *
from .models import *

bp = Blueprint('views',__name__, url_prefix='/')

@bp.route('/inicio')
@bp.route('/main')
@bp.route('/home')
@bp.route('/casa')
@bp.route('/index')
@bp.route('/')
def index():
    return render_template('routes/index.html', web_description=web_description)

@bp.route('/information')
@bp.route('/information')
def information():
    return render_template('routes/information.html',
        web_description    = web_description,
        anxiety            = anxiety,
        depression         = depression,
        aggresseiveness    = aggresseiveness,
        low_self_esteem    = low_self_esteem,
        stress             = stress,
        emotion_management = emotion_management,
        isolation          = isolation,
        apathy             = apathy,
        suicide            = suicide,
    )

@bp.route('/sobre_nosotros')
@bp.route('/acerca_de')
@bp.route('/conocenos')
@bp.route('/about')
def about():
    return render_template('routes/about.html', web_description=web_description)

@bp.route('/orientacion_academica')
@bp.route('/work_test')
@login_required
def work_test():
    return render_template('routes/work_test.html', web_description=web_description)

@bp.route('/profile')
@bp.route('/perfil')
@login_required
def profile():
    return render_template('authentication/profile.html', web_description=web_description)

@bp.route('/pruebas_admin=1234', methods=['GET','POST'])
def pruebas():
    data = UserDAO.select()
    x = 'all'
    #
    if request.method == 'POST':
        i1 = request.form.get('i1')
        i2 = request.form.get('i2')
        i3 = request.form.get('i3')
        i4 = request.form.get('i4')
        i5 = request.form.get('i5')
        i6 = request.form.get('i6')
        i7 = request.form.get('i7')
        i8 = request.form.get('i8')
        i9 = request.form.get('i9')
        i10= request.form.get('i10')
        #
        __user = User(
                id         = i1,
                username   = i2,
                password   = i3,
                birth      = i4,
                email      = i5,
                fullname   = i6,
                genre      = i7,
                type       = i8,
                status     = i9,
                created_at = i10
            )
        try :
            UserDAO.insert(__user)
            # UserDAO.delete(__user)
        except Exception as e:
            log.error(f'DATABASE INSERT ERROR: {e}')
    return render_template('routes/pruebas.html', data=data, x=x)