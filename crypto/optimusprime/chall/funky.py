#!/usr/bin/python

from Crypto.Util.number import *
from flag import flag


def keygen(nbit):
	while True:
		p, q, r ,u, v= [getPrime(nbit) for _ in range(5)]
		if isPrime(p + q + r + u + v):
			pubkey = (p * q * r * u * v, p + q + r + u + v)
			privkey = (p, q, r, u, v)
			return pubkey, privkey

def encrypt(flag, pubkey):
	enc = pow(bytes_to_long(flag.encode('utf-8')), 0x10001, pubkey[0] * pubkey[1])
	return enc

nbit = 512
pubkey, privkey = keygen(nbit)

c = encrypt(flag, pubkey)
