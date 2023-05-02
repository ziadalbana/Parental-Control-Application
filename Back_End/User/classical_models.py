import pickle

m1Path = "./models/m1.pkl"
m2Path = "./models/m2.pkl"


def loadM1():
    with open(m1Path, 'rb') as file:
        m1 = pickle.load(file)
        return m1


def loadM2():
    with open(m2Path, 'rb') as file:
        m2 = pickle.load(file)
        return m2

