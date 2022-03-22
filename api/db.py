import json
import time
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import and_

_db = SQLAlchemy()


class SHT31D(_db.Model):
    __tablename__ = 'sht31d'
    Id = _db.Column('id', _db.Integer, primary_key=True)
    Time = _db.Column('timestamp', _db.Float, default=time.time)
    Temperature = _db.Column('temperature', _db.Float)
    RelativeHumidity = _db.Column('relative_humidity', _db.Float)


class SGP30(_db.Model):
    __tablename__ = 'sgp30'
    Id = _db.Column('id', _db.Integer, primary_key=True)
    Time = _db.Column('timestamp', _db.Float, default=time.time)
    MeanCO2 = _db.Column('CO2_mean', _db.Float)
    StdCO2 = _db.Column('CO2_std', _db.Float)
    MinCO2 = _db.Column('CO2_min', _db.Float)
    MaxCO2 = _db.Column('CO2_max', _db.Float)
    P25CO2 = _db.Column('CO2_p25', _db.Float)
    P50CO2 = _db.Column('CO2_p50', _db.Float)
    P75CO2 = _db.Column('CO2_p75', _db.Float)
    MeanTVOC = _db.Column('TVOC_mean', _db.Float)
    StdTVOC = _db.Column('TVOC_std', _db.Float)
    MinTVOC = _db.Column('TVOC_min', _db.Float)
    MaxTVOC = _db.Column('TVOC_max', _db.Float)
    P25TVOC = _db.Column('TVOC_p25', _db.Float)
    P50TVOC = _db.Column('TVOC_p50', _db.Float)
    P75TVOC = _db.Column('TVOC_p75', _db.Float)


class PM25(_db.Model):
    __tablename__ = 'pm25'
    Id = _db.Column('id', _db.Integer, primary_key=True)
    Time = _db.Column('timestamp', _db.Float, default=time.time)
    Pm10Standard = _db.Column('pm10_standard', _db.Float)
    Pm25Standard = _db.Column('pm25_standard', _db.Float)
    Pm100Standard = _db.Column('pm100_standard', _db.Float)
    Pm10Env = _db.Column('pm10_env', _db.Float)
    Pm25Env = _db.Column('pm25_env', _db.Float)
    Pm100Env = _db.Column('pm100_env', _db.Float)
    Particles03um = _db.Column('particles_03um', _db.Float)
    Particles05um = _db.Column('particles_05um', _db.Float)
    Particles10um = _db.Column('particles_10um', _db.Float)
    Particles25um = _db.Column('particles_25um', _db.Float)
    Particles50um = _db.Column('particles_50um', _db.Float)
    Particles100um = _db.Column('particles_100um', _db.Float)


def init_db(app):
    _db.init_app(app)


def get_pm25_json(count=5, offset=0):
    result = PM25.query.order_by(PM25.Time.desc()).offset(offset).limit(count)
    res = []
    for r in result:
        res.append(
            {
                'id': r.Id,
                'timestamp': r.Time,
                'pm10_standard': r.Pm10Standard,
                'pm25_standard': r.Pm25Standard,
                'pm100_standard': r.Pm100Standard,
                'pm10_env': r.Pm10Env,
                'pm25_env': r.Pm25Env,
                'pm100_env': r.Pm100Env,
                'particles_03um': r.Particles03um,
                'particles_05um': r.Particles05um,
                'particles_10um': r.Particles10um,
                'particles_25um': r.Particles25um,
                'particles_50um': r.Particles50um,
                'particles_100um': r.Particles100um,
            }
        )
    res.reverse()
    return json.dumps(res)


def get_sht31d_json(count=5, offset=0):
    result = SHT31D.query.order_by(SHT31D.Time.desc()).offset(offset).limit(count)
    res = []
    for r in result:
        res.append(
            {
                'id': r.Id,
                'timestamp': r.Time,
                'temperature': r.Temperature,
                'relative_humidity': r.RelativeHumidity,
            }
        )
    res.reverse()
    return json.dumps(res)


def get_sht31d_interval(start, end):
    result = SHT31D.query.filter(and_(SHT31D.Time >= start, SHT31D.Time <= end)).order_by(SHT31D.Time.desc())
    res = []
    for r in result:
        res.append(
            {
                'id': r.Id,
                'timestamp': r.Time,
                'temperature': r.Temperature,
                'relative_humidity': r.RelativeHumidity,
            }
        )
    res.reverse()
    return json.dumps(res)


def get_sgp30_json(count=5, offset=0):
    result = SGP30.query.order_by(SGP30.Time.desc()).offset(offset).limit(count)
    res = []
    for r in result:
        res.append(
            {
                'id': r.Id,
                'timestamp': r.Time,
                'co2_mean': r.MeanCO2,
                'co2_std': r.StdCO2,
                'co2_min': r.MinCO2,
                'co2_max': r.MaxCO2,
                'co2_25p': r.P25CO2,
                'co2_50p': r.P50CO2,
                'co2_75p': r.P75CO2,
                'tvoc_mean': r.MeanTVOC,
                'tvoc_std': r.StdTVOC,
                'tvoc_min': r.MinTVOC,
                'tvoc_max': r.MaxTVOC,
                'tvoc_25p': r.P25TVOC,
                'tvoc_50p': r.P50TVOC,
                'tvoc_75p': r.P75TVOC
            }
        )
    res.reverse()
    return json.dumps(res)
