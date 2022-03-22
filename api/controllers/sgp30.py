from flask import Blueprint
import db

sgp30 = Blueprint('sgp30', __name__)


@sgp30.route('/')
def get():
    return db.get_sgp30_json()


@sgp30.route('/<count>')
def get_count(count):
    return db.get_sgp30_json(count=count)


@sgp30.route('/<offset>/<count>')
def get_offset_count(offset, count):
    return db.get_sgp30_json(count=count, offset=offset)
