from Crypto.PublicKey import RSA, DSA, ECC
from numpy import lcm

key = RSA.generate(1024)

RSA.construct(key, consistency_check=True)

key.p * key.q == key.n

key.p * key.u == 1 % key.q



