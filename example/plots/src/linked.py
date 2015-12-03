import numpy as np
from bokeh.resources import CDN
from bokeh.embed import autoload_static
from bokeh.plotting import *

# prepare some data
N = 100
x = np.linspace(0, 4*np.pi, N)
y0 = np.sin(x)
y1 = np.cos(x)
y2 = np.sin(x) + np.cos(x)

# create a new plot
s1 = figure(width=250, plot_height=250, title=None)
s1.circle(x, y0, size=10, color="navy", alpha=0.5)
s1.toolbar_location = None;

# NEW: create a new plot and share both ranges
s2 = figure(width=250, height=250, x_range=s1.x_range, y_range=s1.y_range, title=None)
s2.triangle(x, y1, size=10, color="firebrick", alpha=0.5)
s2.toolbar_location = None;

# NEW: create a new plot and share only one range
s3 = figure(width=250, height=250, x_range=s1.x_range, title=None)
s3.square(x, y2, size=10, color="olive", alpha=0.5)
s3.toolbar_location = None;

web_s1_path = "./plots/linked-1.js"
web_s2_path = "./plots/linked-2.js"
web_s3_path = "./plots/linked-3.js"
local_s1_path = "../linked-1.js"
local_s2_path = "../linked-2.js"
local_s3_path = "../linked-3.js"

js, tag = autoload_static(s1, CDN, web_s1_path)
script = open(local_s1_path, "w")
script.write(js)
script.close()
print tag
js, tag = autoload_static(s2, CDN, web_s2_path)
script = open(local_s2_path, "w")
script.write(js)
script.close()
print tag
js, tag = autoload_static(s3, CDN, web_s3_path)
script = open(local_s3_path, "w")
script.write(js)
script.close()
print tag
