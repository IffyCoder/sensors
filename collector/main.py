#!/usr/bin/env python3

import db
import time
import atexit
import sht31d
import sgp30
import pm25


collectors = []


@atexit.register
def exit_handler():
    for collector in collectors:
        collector.terminate()
        collector.join()


def main():
    db.Database().create_schema()

    print("Starting collector")
    collectors.append(sht31d.start())
    collectors.append(sgp30.start())
    collectors.append(pm25.start())

    while True:
        time.sleep(1)


if __name__ == '__main__':
    main()
