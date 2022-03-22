from flask import Blueprint
import db

pm25 = Blueprint('pm25', __name__)


@pm25.route('/')
def get():
    return db.get_pm25_json()


@pm25.route('/<count>')
def get_count(count):
    return db.get_pm25_json(count=count)


@pm25.route('/<offset>/<count>')
def get_offset_count(offset, count):
    return db.get_pm25_json(count=count, offset=offset)
