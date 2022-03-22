import json
from flask import Flask
from controllers.pm25 import pm25
from controllers.sht31d import sht31d
from controllers.sgp30 import sgp30
import db
from flask_cors import CORS


def _sql_url():
    try:
        with open('credentials.json') as f:
            creds = json.load(f)
            return 'postgresql://{}:{}@172.18.0.2/sensor_db'.format(
                creds['user'], creds['password'])
    except FileNotFoundError:
        print("Credentials not found")
        raise


app = Flask(__name__)
CORS(app, origins=["*"], supports_credentials=True, resources={
    r"/pm25/*": {"origins": "*"},
    r"/sgp30/*": {"origins": "*"},
    r"/sht31d/*": {"origins": "*"}
})
app.config['SQLALCHEMY_DATABASE_URI'] = _sql_url()

app.register_blueprint(pm25, url_prefix='/pm25')
app.register_blueprint(sht31d, url_prefix='/sht31d')
app.register_blueprint(sgp30, url_prefix='/sgp30')
db.init_db(app)
