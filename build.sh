#!/bin/bash


for dir in collector api; do
	pushd $dir

	if [ ! -d venv ]; then
		python3 -m venv ./venv
	fi

	. ./venv/bin/activate && pip install -r requirements.txt && deactivate
	popd
done


