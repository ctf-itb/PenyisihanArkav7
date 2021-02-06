import os
import random

f = open('flag.png', 'rb')
data = bytearray(f.read())
f.close()

k = 0.1

for i in range(0x123, len(data)):
    if random.random() < k:
        data[i] ^= ord(os.urandom(1))

f = open('flag-enc.png', 'wb')
f.write(data)
f.close()