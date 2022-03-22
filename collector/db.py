import json
import time
from sqlalchemy import create_engine, MetaData, Table, Column, Integer, Float
from sqlalchemy.orm import declarative_base, sessionmaker
import pandas as pd


def _read_credentials():
    try:
        with open('credentials.json') as f:
            return json.load(f)
    except FileNotFoundError:
        print("Credentials not found")
        raise


def _create_engine():
    creds = _read_credentials()
    return create_engine('postgresql://{}:{}@172.18.0.2/sensor_db'.format(
        creds['user'], creds['password']))


Base = declarative_base()


class SHT31DSample(Base):
    __tablename__ = 'sht31d'

    Id = Column('id', Integer, primary_key=True)
    Time = Column('timestamp', Float, default=time.time)
    Temperature = Column('temperature', Float)
    RelativeHumidity = Column('relative_humidity', Float)


class SGP30Sample(Base):
    __tablename__ = 'sgp30'

    Id = Column('id', Integer, primary_key=True)
    Time = Column('timestamp', Float, default=time.time)
    MeanCO2 = Column('CO2_mean', Float)
    StdCO2 = Column('CO2_std', Float)
    MinCO2 = Column('CO2_min', Float)
    MaxCO2 = Column('CO2_max', Float)
    P25CO2 = Column('CO2_p25', Float)
    P50CO2 = Column('CO2_p50', Float)
    P75CO2 = Column('CO2_p75', Float)
    MeanTVOC = Column('TVOC_mean', Float)
    StdTVOC = Column('TVOC_std', Float)
    MinTVOC = Column('TVOC_min', Float)
    MaxTVOC = Column('TVOC_max', Float)
    P25TVOC = Column('TVOC_p25', Float)
    P50TVOC = Column('TVOC_p50', Float)
    P75TVOC = Column('TVOC_p75', Float)


class PM25Sample(Base):
    __tablename__ = 'pm25'

    Id = Column('id', Integer, primary_key=True)
    Time = Column('timestamp', Float, default=time.time)
    Pm10Standard = Column('pm10_standard', Float)
    Pm25Standard = Column('pm25_standard', Float)
    Pm100Standard = Column('pm100_standard', Float)
    Pm10Env = Column('pm10_env', Float)
    Pm25Env = Column('pm25_env', Float)
    Pm100Env = Column('pm100_env', Float)
    Particles03um = Column('particles_03um', Float)
    Particles05um = Column('particles_05um', Float)
    Particles10um = Column('particles_10um', Float)
    Particles25um = Column('particles_25um', Float)
    Particles50um = Column('particles_50um', Float)
    Particles100um = Column('particles_100um', Float)


class Database:
    def __init__(self):
        self._engine = _create_engine()
        self._factory = sessionmaker(bind=self._engine)
        self._session = self._factory()

    def insert_sht31d(self, temperature, humidity):
        val = SHT31DSample(Temperature=temperature, RelativeHumidity=humidity)
        self._session.add(val)
        self._session.commit()

    def insert_sgp30(self, eco2: pd.DataFrame, tvoc: pd.DataFrame):
        val = SGP30Sample(
            MeanCO2=eco2[0]['mean'],
            StdCO2=eco2[0]['std'],
            MinCO2=eco2[0]['min'],
            MaxCO2=eco2[0]['max'],
            P25CO2=eco2[0]['25%'],
            P50CO2=eco2[0]['50%'],
            P75CO2=eco2[0]['75%'],
            MeanTVOC=tvoc[0]['mean'],
            StdTVOC=tvoc[0]['std'],
            MinTVOC=tvoc[0]['min'],
            MaxTVOC=tvoc[0]['max'],
            P25TVOC=tvoc[0]['25%'],
            P50TVOC=tvoc[0]['50%'],
            P75TVOC=tvoc[0]['75%'],
        )
        self._session.add(val)
        self._session.commit()

    def insert_pm25(self, air_quality):
        val = PM25Sample(
            Pm10Standard=air_quality['pm10 standard'],
            Pm25Standard=air_quality['pm25 standard'],
            Pm100Standard=air_quality['pm100 standard'],
            Pm10Env=air_quality['pm10 env'],
            Pm25Env=air_quality['pm25 env'],
            Pm100Env=air_quality['pm100 env'],
            Particles03um=air_quality['particles 03um'],
            Particles05um=air_quality['particles 05um'],
            Particles10um=air_quality['particles 10um'],
            Particles25um=air_quality['particles 25um'],
            Particles50um=air_quality['particles 50um'],
            Particles100um=air_quality['particles 100um']
        )
        self._session.add(val)
        self._session.commit()

    def create_schema(self):
        print("Creating tables")
        metadata_obj = MetaData()

        sht31d = Table('sht31d', metadata_obj,
                       Column('id', Integer, primary_key=True),
                       Column('timestamp', Float, default=time.time),
                       Column('temperature', Float),
                       Column('relative_humidity', Float)
                       )

        sgp30 = Table('sgp30', metadata_obj,
                      Column('id', Integer, primary_key=True),
                      Column('timestamp', Float, default=time.time),
                      Column('CO2_mean', Float),
                      Column('CO2_std', Float),
                      Column('CO2_min', Float),
                      Column('CO2_max', Float),
                      Column('CO2_p25', Float),
                      Column('CO2_p50', Float),
                      Column('CO2_p75', Float),
                      Column('TVOC_mean', Float),
                      Column('TVOC_std', Float),
                      Column('TVOC_min', Float),
                      Column('TVOC_max', Float),
                      Column('TVOC_p25', Float),
                      Column('TVOC_p50', Float),
                      Column('TVOC_p75', Float)
                      )
        pm25 = Table('pm25', metadata_obj,
                     Column('id', Integer, primary_key=True),
                     Column('timestamp', Float, default=time.time),
                     Column('pm10_standard', Float),
                     Column('pm25_standard', Float),
                     Column('pm100_standard', Float),
                     Column('pm10_env', Float),
                     Column('pm25_env', Float),
                     Column('pm100_env', Float),
                     Column('particles_03um', Float),
                     Column('particles_05um', Float),
                     Column('particles_10um', Float),
                     Column('particles_25um', Float),
                     Column('particles_50um', Float),
                     Column('particles_100um', Float)
                     )

        metadata_obj.create_all(self._engine)
