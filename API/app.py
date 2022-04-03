from flask import Flask, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/batik/identify', methods=['POST'])
def batikIdentify():
    return "Success"

@app.route('/batik/list', methods=['GET'])
@cross_origin()
def batikList():
    return {
        'Test': [
            'A', 'B', 'C'
        ]
    }

@app.route('/batik/canny', methods=['POST'])
def batikCanny():
    return "Success"

@app.route('/batik/sobel', methods=['POST'])
def batikSobel():
    return "Success"


if __name__ == "__main__":
    app.run(port=3030, debug=True)