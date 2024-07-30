from flask import Flask, jsonify

import os

app = Flask(__name__)

@app.route("/api/hello-world")
def hello_world() :
    return jsonify("Hello, World!")

if __name__ == '__main__':
    print(os.environ)
    port = os.environ["API_PORT"]
    app.run(host="0.0.0.0", port=port, debug=True)