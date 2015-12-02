from bokeh.resources import CDN
from bokeh.embed import autoload_static
from bokeh.plotting import figure, gridplot, output_file, show

x = list(range(11))
y0 = x
y1 = [10-xx for xx in x]
y2 = [abs(xx-5) for xx in x]

# create a new plot
s1 = figure(width=250, plot_height=250, title=None, toolbar_location=None)
s1.circle(x, y0, size=6, color="navy", alpha=0.5)

# create a new plot and share both ranges
s2 = figure(width=250, height=250, x_range=s1.x_range, y_range=s1.y_range, title=None, toolbar_location=None)
s2.triangle(x, y1, size=6, color="firebrick", alpha=0.5)

# create a new plot and share only one range
s3 = figure(width=250, height=250, x_range=s1.x_range, title=None, toolbar_location=None)
s3.square(x, y2, size=6, color="olive", alpha=0.5)

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
