#!/usr/bin/python3
from Crypto.Util.number import *
from secret import flag
import base64
import random

class Unbuffered(object):
   def __init__(self, stream):
       self.stream = stream
   def write(self, data):
       self.stream.write(data)
       self.stream.flush()
   def writelines(self, datas):
       self.stream.writelines(datas)
       self.stream.flush()
   def __getattr__(self, attr):
       return getattr(self.stream, attr)

sys.stdout = Unbuffered(sys.stdout)

def menu():
    print("""
Choose a menu:
1. Create token
2. Redeem token
3. Get flag
4. Exit
    """)

class NoThink:
    p = getPrime(512)
    q = getPrime(512)
    e = 0x10001
    d = inverse(e, (p-1)*(q-1))
    N = p*q

    def decrypt(self, c):
        c = bytes_to_long(c)
        return pow(c, self.d, self.N)
    
    def encrypt(self, m):
        m = bytes_to_long(m)
        return pow(m, self.e, self.N)

    def sanity_check(self, m, c):
        if self.encrypt(long_to_bytes(m)) != bytes_to_long(base64.b64decode(c)):
            print(":/")
            exit()
        return (self.N*3 + m) % 4

nt = NoThink()
redeem_number = getPrime(1024)
redeem_acc = 0

assert(bytes_to_long(flag) < nt.N)

print("Encrypted flag: {}".format(base64.b64encode(long_to_bytes(nt.encrypt(flag))).decode("utf-8")))

try:
    while True:
        menu()
        x = int(input("Input your choice: "))
        if x == 1:
            m = input("Input your message: ")
            print("Redeem Token: {}".format(base64.b64encode(long_to_bytes(nt.encrypt(base64.b64decode(m.encode("utf-8"))))).decode("utf-8")))
        elif x == 2:
            c = input("Input your redeem token: ")
            m = nt.decrypt(base64.b64decode(c))
            m_c = m % 4
            sc = nt.sanity_check(m, c)
            redeem_acc += m_c*4+sc
        elif x == 3:
            if redeem_acc >= redeem_number:
                print("Your flag: {}".format(flag))
                redeem_acc -= redeem_number
            else:
                print("You need {} more point(s)".format(redeem_number-redeem_acc))
        else:
            print("Goodbye...")
            exit()
except:
    print("Error has occured.")