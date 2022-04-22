import os
from flask import *
from .logger_base import log

def create_app():
    app = Flask(__name__)
    app.config.from_mapping( 
        SECRET_KEY        = 'RIEJ030619HNECSNA9',
        DATABASE          = os.environ.get("FLASK_DATABASE"),
        DATABASE_HOST     = os.environ.get("FLASK_DATABASE_HOST"),
        DATABASE_USER     = os.environ.get("FLASK_DATABASE_USER"),
        DATABASE_PASSWORD = os.environ.get("FLASK_DATABASE_PASSWORD")
    )
    #
    from . import database
    database.init_app(app)
    #
    from . import authentication
    app.register_blueprint(authentication.bp)
    #
    from . import views
    app.register_blueprint(views.bp)
    #
    return app