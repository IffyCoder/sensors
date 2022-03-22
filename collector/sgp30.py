import multiprocessing as mp
import os.path as path
import json

import pandas as pd

from db import Database
import time
import board
import busio
import adafruit_sgp30


def _read_baseline():
    if path.exists('baseline.json'):
        with open('baseline.json') as f:
            return json.load(f)
    return [0x8973, 0x8AAE]


def _update_baseline(eco2, tvoc):
    with open('baseline.json', 'w') as f:
        json.dump([eco2, tvoc], f)


def _collect():
    sample_interval = 1  # seconds
    d = Database()

    baseline = _read_baseline()

    i2c = busio.I2C(board.SCL, board.SDA, frequency=100000)
    sensor = adafruit_sgp30.Adafruit_SGP30(i2c)

    sensor.iaq_init()
    sensor.set_iaq_baseline(baseline[0], baseline[1])

    samples = {'eco2': [], 'tvoc': []}
    sample_count = 0
    count = 0
    while True:
        samples['eco2'].append(sensor.eCO2)
        samples['tvoc'].append(sensor.TVOC)

        if sample_count < 60:
            sample_count += 1

        if count % 60 == 0 and sample_count == 60:
            d.insert_sgp30(pd.DataFrame(samples['eco2']).describe(), pd.DataFrame(samples['tvoc']).describe())

        if sample_count == 60:
            samples['eco2'].pop(0)
            samples['tvoc'].pop(0)

        time.sleep(sample_interval)
        count += 1
        if count >= 3600:
            count = 0
            _update_baseline(sensor.baseline_eCO2, sensor.baseline_TVOC)


def start():
    p = mp.Process(target=_collect, args=())
    p.daemon = True
    p.start()
    return p
