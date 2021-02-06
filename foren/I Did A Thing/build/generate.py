import struct
import zlib

# https://pyokagan.name/blog/2019-10-14-png/

def read_chunk(f):
    chunk_length, chunk_type = struct.unpack('>I4s', f.read(8))
    chunk_data = f.read(chunk_length)
    checksum = zlib.crc32(chunk_data, zlib.crc32(struct.pack('>4s', chunk_type)))
    chunk_crc, = struct.unpack('>I', f.read(4))
    if chunk_crc != checksum:
        raise Exception('chunk checksum failed {} != {}'.format(chunk_crc,
            checksum))
    return chunk_type, chunk_data

def make_chunk(chunk_type, chunk_data):
    if len(chunk_type) != 4:
        raise Exception('bad chunk type')
    header = struct.pack('>I4s', len(chunk_data), chunk_type)
    checksum = zlib.crc32(chunk_data, zlib.crc32(struct.pack('>4s', chunk_type)))
    crc = struct.pack('>I', checksum)
    return header + chunk_data + crc


f = open('flag-original.png', 'rb')

PngSignature = b'\x89PNG\r\n\x1a\n'
if f.read(len(PngSignature)) != PngSignature:
    raise Exception('Invalid PNG Signature')

chunks = []
while True:
    chunk_type, chunk_data = read_chunk(f)
    chunks.append((chunk_type, chunk_data))
    if chunk_type == b'IEND':
        break

f.close()

_, IHDR_data = chunks[0] # IHDR is always first chunk
width, height, bitd, colort, compm, filterm, interlacem = struct.unpack('>IIBBBBB', IHDR_data)

print(width, height, bitd, colort, compm, filterm, interlacem)

zlib_data = b''.join(chunk_data for chunk_type, chunk_data in chunks if chunk_type == b'IDAT')

PNG = b''
PNG += PngSignature

for chunk_type, chunk_data in chunks:
    if chunk_type not in [b'IDAT', b'IEND']:
        PNG += make_chunk(chunk_type, chunk_data)

i = 0
while i<len(zlib_data):
    PNG += make_chunk(b'IDAT', zlib_data[i:i+2])
    i+=2

PNG += make_chunk(b'IEND', b'')

f = open('flag.png', 'wb')
f.write(PNG)
f.close()
