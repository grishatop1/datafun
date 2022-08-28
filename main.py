from flask import Flask
from flask import render_template, url_for

app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template("index.html")

@app.route('/help')
def help_page():
    return render_template("help.html")

if __name__ == "__main__":
    app.run("0.0.0.0", debug=True)