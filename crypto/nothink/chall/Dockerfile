FROM python:3.7-alpine

RUN apk update && apk add socat gcc g++ make libffi-dev openssl-dev python3-dev
RUN pip3 install pycryptodome

RUN adduser -D -u 1001 -s /bin/bash arkavidia

RUN mkdir /home/arkavidia/chall

COPY . /home/arkavidia/chall

RUN chown -R root:root /home/arkavidia/chall
RUN chmod -R 555 /home/arkavidia/chall
USER arkavidia
WORKDIR /home/arkavidia/chall

CMD ["./run.sh"]