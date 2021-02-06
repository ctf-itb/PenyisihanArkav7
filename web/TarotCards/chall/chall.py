from flask import Flask, render_template_string, render_template
import re
app = Flask(__name__)

blacklisted = r"{{|}}|echo|socat|touch|chr|nc|hex|tcp|cat|ls|sh|config|self|\+|\^|\*"
storage = ["The Tower", "The Fool", "Wheel of Fortune", "Hanged Man"]

@app.route('/')
def home():
	return render_template("home.html", storage=storage)

@app.route('/<tarot>')
def load_tarot(tarot):
	if tarot in storage:
		data = open("tarots/"+tarot).read().replace("\r","").split("\n")
		return render_template("info_layout.html", tarot={
			"title": data[0],
			"upright": data[1].split(", "),
			"reversed": data[2].split(", "),
			"desc": data[3],
		})
	request = None
	if len(tarot) > 2**18:
		return "Not supported"
	while re.findall(blacklisted, tarot):
		tarot = re.sub(blacklisted, "", tarot)
	return render_template_string(render_template("main.html") % tarot)

if __name__ == "__main__":
    app.run(host='0.0.0.0')
