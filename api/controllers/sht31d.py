from flask import Blueprint
import db

sht31d = Blueprint('sht31d', __name__)


@sht31d.route('/')
def get():
    return db.get_sht31d_json()


@sht31d.route('/<count>')
def get_count(count):
    return db.get_sht31d_json(count=count)


@sht31d.route('/<offset>/<count>')
def get_offset_count(offset, count):
    return db.get_sht31d_json(count=count, offset=offset)


@sht31d.route('/interval/<start>/<end>')
def get_interval(start, end):
    return db.get_sht31d_interval(start=start, end=end)
