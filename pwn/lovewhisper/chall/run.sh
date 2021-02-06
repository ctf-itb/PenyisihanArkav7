#!/bin/sh
socat -T30 tcp-l:10099,reuseaddr,fork exec:"timeout -s 9 30 ./lovewhisper",pty,raw,echo=0
