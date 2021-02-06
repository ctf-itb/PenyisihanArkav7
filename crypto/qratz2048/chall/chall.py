#!/usr/bin/python3
from Crypto.Util.number import *
from secret import flag
import os

bits = 2048
mask = 2**bits - 1

pad_block = lambda x: b"\x00"*(256-len(x))+x

gen_blocks = lambda x, n=1: b"".join([
	pad_block(long_to_bytes((x >> i*2048) & mask)) for i in range(n-1, -1, -1)
])

stre = lambda x: str(x)+"\n"

pad = lambda m, i: m + "".join([chr(j) for j in range(i - (len(m) % i))]).encode("utf-8")

lsb = lambda n, i: (n >> i) & 1

m1, m2 = pad(flag[:-20], 15), bytes_to_long(flag[-20:])

ms = [bytes_to_long(m1[i: i+15]) for i in range(0, len(m1), 15)]

if os.path.exists("priv.key"):
	data = open("priv.key", "r").readlines()
	q = int(data[0].split(" = ")[1])
	r = int(data[1].split(" = ")[1])
	a = int(data[2].split(" = ")[1])
	t = int(data[3].split(" = ")[1])
	z = int(data[4].split(" = ")[1])
else:
	q, r, a, t = [getPrime(bits) for _ in range(4)]
	z = getPrime(40)

	assert(q % 4 != 3)
	assert(a % 4 != 3)
	assert(lsb(q, 4))

	with open("priv.key", "w") as f:
		f.write("q = "+stre(q))
		f.write("r = "+stre(r))
		f.write("a = "+stre(a))
		f.write("t = "+stre(t))
		f.write("z = "+stre(z))

for i in range(len(ms)):
	ms[i] = pow(ms[i], 2**5)

	assert(ms[i] < q*a)
	assert(ms[i]**2 > q*a)

	ms[i] = pow(ms[i], 2, q*a)

f = open("flag.enc", "wb")

f.write(gen_blocks(len(ms)))

for i in ms[1:]:
	f.write(gen_blocks(i, 2))

m1 = ms[0]

f.write(gen_blocks(q*r*a*t, 4))
f.write(gen_blocks(q*a % m2, 1))
f.write(gen_blocks(z, 1))
f.write(gen_blocks(pow(m1, z, q*a), 2))
f.write(gen_blocks(m2.bit_length(), 1))
f.write(gen_blocks(pow(m1, z, q*r*a*t), 4))
f.write(gen_blocks(q % m2, 1))
f.write(gen_blocks(q*a - getPrime(bits*2), 2))
f.write(gen_blocks(pow(m1, z, r*t), 2))
f.write(gen_blocks(getPrime(bits*2-1) - r*t, 2))
f.write(gen_blocks(a % m2, 1))
f.write(gen_blocks((q**2-a) // m2, 2))

f.close()