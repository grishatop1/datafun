from flask import Flask
from flask import render_template, url_for, request, jsonify

app = Flask(
    __name__,
    static_url_path="",
    static_folder="static"
)


@app.route('/')
def hello_world():
    return render_template("index.html")

@app.route('/data')
def data():
    return jsonify({
        'ip': request.remote_addr
    })

@app.route('/help')
def help_page():
    return render_template("help.html")


if __name__ == "__main__":
    app.run("0.0.0.0", debug=True)