#!/bin/sh
socat tcp-l:10000,reuseaddr,fork exec:"python3 chall.py"
