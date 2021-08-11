import math

class Vector:
	def __init__(self, x, y):
		self.x = x
		self.y = y

	def mag(self):
		return math.sqrt(math.pow(self.x, 2) + math.pow(self.y, 2))

	def heading(self):
		if(self.x == 0):
			if(self.y == 0):
				return -1
			if(self.y > 0):
				return 90
			if(self.y < 0):
				return 270
		else:
			deg = math.degrees(math.atan(self.y / self.x))
			if(self.x > 0 and self.y >= 0): # I Quad
				return deg
			if(self.x < 0 and self.y >= 0): # II Quad
				return deg + 180
			if(self.x < 0 and self.y < 0): # III Quad
				return deg + 180
			if(self.x > 0 and self.y < 0): # IV Quad
				return deg + 360

	def normalize(self):
		mag = self.mag()
		self.x /= mag
		self.y /= mag
		return

	def setMag(self, value):
		if(self.x == 0):
			self.y = (1 if self.y >= 0 else -1) * abs(value)
		else:
			xp = value / math.sqrt(1 + math.pow(self.y / self.x, 2))
			yp = (self.y / self.x) * xp
			self.x = (1 if self.x >= 0 else -1) * abs(xp)
			self.y = (1 if self.y >= 0 else -1) * abs(yp)
		return

	def setHeading(self, value):
		mag = self.mag()
		value = math.radians(value)
		if(value >= 0 and value < 90): # I Quad
			self.x = mag * math.cos(value)
			self.y = mag * math.sin(value)
			return
		if(value >= 90 and value < 180): # II Quad
			value = 180 - value
			self.x = -mag * math.cos(value)
			self.y = mag * math.sin(value)
			return
		if(value >= 180 and value < 270): # III Quad
			value -= 180
			self.x = -mag * math.cos(value)
			self.y = -mag * math.sin(value)
			return
		if(value >= 270 and value < 360): # II Quad
			value = 360 - value
			self.x = mag * math.cos(value)
			self.y = -mag * math.sin(value)
			return

	def __add__(self, value):
		if(isinstance(value, Vector)):
			return Vector(self.x + value.x, self.y + value.y)
		else:
			return Vector(self.x + value, self.y + value)

	def __sub__(self, value):
		if(isinstance(value, Vector)):
			return Vector(self.x - value.x, self.y - value.y)
		else:
			return Vector(self.x - value, self.y - value)

	def __mul__(self, value):
		return Vector(self.x * value, self.y * value)

	def __truediv__(self, value):
		if(value != 0):
			return Vector(self.x / value, self.y / value)
		else:
			return None

	def copy(self):
		return Vector(self.x, self.y)

	def __repr__(self):
		return "Vector(" + str(round(self.x, 4)) + ", " + str(round(self.y, 4)) + ")"

	def __str__(self):
		return "[" + str(self.x) + ", " + str(self.y) + "]"