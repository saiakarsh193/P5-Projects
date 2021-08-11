import json
import math
from vector import Vector

def dumpJSON(path, val):
    with open(path, "w") as f:
        json.dump(val, f)
    f.close()

def loadJSON(path):
    val = ""
    with open(path, "r") as f:
        val = json.load(f)
    f.close()
    return val

def update(system, dT = 0.05):
	G = 0.5
	nsystem = []
	for body1 in system:
		sf = Vector(0, 0)
		for body2 in system:
			r = body2[1] - body1[1]
			if(r.mag() > 0):
				sf += r * (body2[0] / math.pow(r.mag(), 3))
		sa = sf * G
		temp = [body1[0], body1[1].copy(), body1[2].copy()]
		temp[2] += sa * dT
		temp[1] += temp[2] * dT
		nsystem.append(temp)
	return nsystem

def toSystem(data):
	return [[data[i][0], Vector(data[i][1], data[i][2]), Vector(data[i][3], data[i][4])] for i in range(len(data))]

def toData(system):
	return [[system[i][0], round(system[i][1].x, 3), round(system[i][1].y, 3), round(system[i][2].x, 3), round(system[i][2].y, 3)] for i in range(len(system))]

data = loadJSON("config.json")
system = toSystem(data["system"])
output = []
output.append(toData(system))
for i in range(data["iterations"] - 1):
	system = update(system)
	output.append(toData(system))
dumpJSON("simdata.json", output)