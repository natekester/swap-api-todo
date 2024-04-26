from flask import Flask
import os

app = Flask(__name__)

@app.route("/api/hello-world")
def hello_world():
    return "<p>Hello, World!</p>"

if __name__ == '__main__':
    print("AHHHHHH")
    print(os.environ)
    port = os.environ["API_PORT"]

    print("2AHHHHHH")
    app.run(host="0.0.0.0", port=port, debug=True)