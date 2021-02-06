#!/usr/bin/python3
import math
import os
from Crypto.PublicKey import RSA
from Crypto.Util.number import long_to_bytes as lb, bytes_to_long as bl

from secret import flag
assert len(flag) == 0x007 ** 2


AGENT_CODE = b'\x007'
AGENT_MESSAGE = b'007 is the best!'
ORGANIZATION_CODE = len(AGENT_CODE + AGENT_MESSAGE) - 1

lbk = lambda l, k: l.to_bytes(k, byteorder='big')


def select_mission():
    m = {i + 1: i + 1024 for i in range(8)}
    print('Select mission:')
    [print('{}. Code {}'.format(k, v)) for k, v in m.items()]
    op = int(input('>> '))
    if op in m:
        KEY = RSA.import_key(open(os.path.join('keys', str(1023 + op) + '.pem'), 'rb').read())
        assert KEY.n.bit_length() == m[op]
        KEY.o_o = math.ceil(KEY.n.bit_length() / 8)
        print('Here is your ID for this mission = ({},{},{})'.format(KEY.n, KEY.e, encrypt(bl(flag), KEY)))
        return KEY
    else:
        print('You are definitely not 007!')
        exit(0)


def encrypt(pt, key):
    pt = AGENT_CODE + AGENT_MESSAGE + lb(pt)
    pt = pt + os.urandom(key.o_o - len(pt))
    ct = pow(bl(pt) * 0x007 % key.n, key.e, key.n)
    return ct


def decrypt(ct, key):
    pt = lbk(pow(ct, key.d, key.n), key.o_o)
    if pt[:2] != AGENT_CODE:
        return 'Nope you\'re not 007!'
    if b'!' not in pt[ORGANIZATION_CODE:]:
        return 'Nope you\'re not 007!'
    if flag not in pt[ORGANIZATION_CODE:]:
        return 'Nice try dude...'
    return '007 is that you? What is the secret message then?'


if __name__ == '__main__':
    try:
        KEY = select_mission()
        menu = ('\nYour move:'
                '\n1. Hide secret message'
                '\n2. Reveal secret message'
                '\n3. Exit')
        while True:
            print(menu)
            op = int(input('>> '))
            if op == 1:
                inp = int(input('>> '))
                print(encrypt(inp, KEY))
            elif op == 2:
                inp = int(input('>> '))
                print(decrypt(inp, KEY))
            else:
                print('Bye...')
                exit(0)
    except Exception as e:
        print('Whoops, error happened :(')
