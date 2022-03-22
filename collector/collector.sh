#!/bin/bash

cd /home/pi/sensors/collector || exit
. ./venv/bin/activate
python3 ./main.py
