import random
LETTERS = 'abcdefghijklmnopqrstuvwxyz_{}'


def getRandomkey():
    rand = list(LETTERS)
    random.shuffle(rand)
    return ''.join(rand)


if __name__ == "__main__":
    print(getRandomkey())
