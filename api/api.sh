#!/bin/bash

cd /home/pi/sensors/api || exit
. ./venv/bin/activate
export FLASK_APP=main
flask run --host=0.0.0.0
