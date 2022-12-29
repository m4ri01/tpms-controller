FROM ubuntu:18.04
LABEL authors="github.com/m4ri01"
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y git libtool libusb-1.0-0-dev librtlsdr-dev rtl-sdr build-essential cmake pkg-config mosquitto-clients 
RUN git clone https://github.com/merbanan/rtl_433.git /rtl433
WORKDIR /rtl433
RUN mkdir build
WORKDIR /rtl433/build
RUN cmake .. && make && make install