import multiprocessing as mp
from db import Database
import time
import board
import busio
import adafruit_sht31d


def _collect():
    i2c = busio.I2C(board.SCL, board.SDA)
    sensor = adafruit_sht31d.SHT31D(i2c)

    sample_interval = 60  # seconds

    d = Database()

    loop_count = 0

    while True:
        d.insert_sht31d(sensor.temperature, sensor.relative_humidity)

        loop_count += 1

        if loop_count == 10:
            loop_count = 0
            sensor.heater = True
            time.sleep(1)
            sensor.heater = False
            time.sleep(sample_interval - 1)
        else:
            time.sleep(sample_interval)


def start():
    p = mp.Process(target=_collect, args=())
    p.daemon = True
    p.start()
    return p
