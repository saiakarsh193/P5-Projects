import random

def shuffle(val):
	temp = [0] * len(val)
	vis = [0] * len(val)
	for i in range(len(val)):
		ch = int(random.random() * len(val))
		while(vis[ch] == 1):
			ch = (ch + 1) % len(val)
		vis[ch] = 1
		temp[i] = val[ch]
	return temp

print(shuffle([i for i in range(26)]))