########################################################################
#
#
#
FROM python:3.10.2-slim as compiler

RUN apt update
RUN apt install -y build-essential
RUN apt install -y libpq-dev

WORKDIR /app

RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

COPY requirements.txt /app/requirements.txt
RUN . /opt/venv/bin/activate && pip install -r requirements.txt

########################################################################
#
#
#
FROM python:3.10.2-slim as runner

RUN apt update
RUN apt install -y postgresql-client

WORKDIR /app/
COPY --from=compiler /opt/venv /opt/venv

# Enable venv
ENV PATH="/opt/venv/bin:$PATH"

COPY *.py /app/
COPY credentials.json /app/
#ENV FLASK_APP=main
#CMD . /opt/venv/bin/activate && exec flask run --host=0.0.0.0
CMD . /opt/venv/bin/activate && python3 /app/main.py