from PIL import Image
import numpy as np
import matplotlib.pyplot as plt


def loadImg(path):
    img = Image.open(path)
    nimg = np.array(img)
    return nimg

def cropImg(img, lf, tp, wi, he):
    return img[tp: tp + he, lf: lf + wi, :]

def pltImg(img):
    plt.imshow(img)
    plt.show()

def convImg(img):
    col = {
            '.': np.array([  0,   0,   0]), # black (background)
            'r': np.array([255,   0,   0]), # red
            'o': np.array([222,  71,   0]), # orange
            'g': np.array([  0, 255,   0]), # green
            's': np.array([  0, 151, 151]), # sea-green
            'b': np.array([  0, 104, 222]), # blue
            '^': np.array([  0,   0, 222]), # dark blue
            'c': np.array([  0, 255, 222]), # cyan
            'p': np.array([255,   0, 222]), # pink
            'v': np.array([151,   0, 222]), # violet
            'y': np.array([255, 255,   0]), # yellow
            'd': np.array([255, 184,   0]), # gold
            'w': np.array([222, 222, 222]), # white
            '@': np.array([184, 184, 222]), # gray
            }
    fstr = ""
    for i in range(cimg.shape[0]):
        for j in range(cimg.shape[1]):
            for key, val in col.items():
                if(np.array_equal(img[i][j], val)):
                    fstr += key
                    break
        fstr += "\n"
    with open("conv_txt.txt", 'w') as f:
        f.write(fstr)

img = loadImg('gal_sprites.png')
cimg = cropImg(img, 11, 314, 168, 26)
pltImg(cimg)
convImg(cimg)
