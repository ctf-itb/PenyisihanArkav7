#!/bin/sh
socat -T30 tcp-l:1337,reuseaddr,fork exec:"./main",pty,raw,echo=0
