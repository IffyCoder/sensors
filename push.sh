#!/bin/bash

HOST="pi@192.168.1.15"

ssh $HOST "mkdir -p sensors/collector"
scp docker-compose.yml $HOST:sensors/
scp collector/*.py $HOST:sensors/collector
scp collector/*.txt $HOST:sensors/collector
scp build.sh $HOST:sensors
scp collector/collector.sh $HOST:sensors/collector
scp collector/collector.service $HOST:sensors/collector 
#scp collector/Dockerfile $HOST:sensors/collector
scp collector/credentials.json $HOST:sensors/collector
#ssh $HOST "cd sensors && docker-compose up --build -d"


ssh $HOST "mkdir -p sensors/api/controllers"

scp api/*.py $HOST:sensors/api
scp api/controllers/*.py $HOST:sensors/api/controllers
scp api/*.txt $HOST:sensors/api
scp api/api.sh $HOST:sensors/api
scp api/api.service $HOST:sensors/api
scp collector/credentials.json $HOST:sensors/api


ssh $HOST "cd sensors && ./build.sh"


ssh $HOST "sudo systemctl stop api.service"
ssh $HOST "sudo ln -fs /home/pi/sensors/api/api.service /etc/systemd/system/api.service"
ssh $HOST "sudo systemctl enable api.service"
ssh $HOST "sudo systemctl start api.service"


ssh $HOST "sudo systemctl stop collector.service"
ssh $HOST "sudo ln -fs /home/pi/sensors/collector/collector.service /etc/systemd/system/collector.service"
ssh $HOST "sudo systemctl enable collector.service"
ssh $HOST "sudo systemctl start collector.service"
