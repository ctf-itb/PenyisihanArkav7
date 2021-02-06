FROM golang:1.15.0-alpine

RUN apk update && apk add gcc g++ git make socat

RUN adduser -D -u 1001 -s /bin/bash arkavidia

RUN mkdir /home/arkavidia/chall

COPY . /home/arkavidia/chall

WORKDIR /home/arkavidia/chall
RUN go build -o main
RUN chown -R root:root /home/arkavidia/chall
RUN chmod -R 555 /home/arkavidia/chall
USER arkavidia
WORKDIR /home/arkavidia/chall

CMD ["./run.sh"]