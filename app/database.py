import sys
import click
import mysql.connector as mysql
#
from flask import *
from flask.cli import *
from .logger_base import log
from .schema import instructions

def get_db():
    if 'db' not in g:
        g.db = mysql.connect(
            host     = current_app.config['DATABASE_HOST'],
            user     = current_app.config['DATABASE_USER'],
            password = current_app.config['DATABASE_PASSWORD'],
            database = current_app.config['DATABASE'],
        )
        g.c = g.db.cursor(dictionary=True)
    return g.db, g.c

def close_db(e=None):
    db = g.pop('db',None)
    #
    if db is not None:
        db.close()

def init_db():
    db, c = get_db()
    #
    try:
        for i in instructions:
            c.execute(i)
        db.commit()
        log.info('DATABASE CONNECTION SUCCESS')
    except Exception as e:
        log.critical(f'DATABASE CONNECTION FAILED: {e}')

@click.command('init-db')
@with_appcontext
def init_db_command():
    init_db()
    click.echo('DATABASE INITIALIZED')

def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)