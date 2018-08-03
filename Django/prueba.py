# -*- coding: utf-8 -*-
"""
Created on Thu Aug  2 21:22:25 2018

@author: Alejandro
"""

import numpy as np
import matplotlib.pyplot as plt
from matplotlib import pylab
from pylab import *
import PIL, PIL.Image as Image, io, base64

x = np.arange(10)
y = x
fig = plt.figure()
plt.plot(x, y)
canvas = fig.canvas
buf, size = canvas.print_to_buffer()
image = Image.frombuffer('RGBA', size, buf, 'raw', 'RGBA', 0, 1)
buffer=io.BytesIO()
image.save(buffer,'PNG')
graphic = buffer.getvalue()
graphic = base64.b64encode(graphic)
buffer.close()
print(image)