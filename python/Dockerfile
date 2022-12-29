FROM python:3.7-slim-buster
LABEL authors="github.com/m4ri01"
RUN apt-get update && apt-get install libpq-dev gcc -y
RUN pip install --upgrade pip
RUN pip install paho-mqtt pymongo