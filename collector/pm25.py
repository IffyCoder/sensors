import multiprocessing as mp
from db import Database
import time
import board
import busio
from adafruit_pm25.i2c import PM25_I2C


def _collect():
    reset_pin = None
    i2c = busio.I2C(board.SCL, board.SDA, frequency=100000)
    sensor = PM25_I2C(i2c, reset_pin)

    sample_interval = 60  # seconds

    d = Database()

    while True:
        time.sleep(sample_interval)

        try:
            aqdata = sensor.read()
            # print(aqdata)
        except RuntimeError:
            print("Unable to read from sensor, retrying...")
            continue

        d.insert_pm25(aqdata)


def start():
    p = mp.Process(target=_collect, args=())
    p.daemon = True
    p.start()
    return p
