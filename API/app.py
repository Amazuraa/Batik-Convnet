from flask import Flask, request

app = Flask(__name__)

@app.route('/batik/identify', methods=['POST'])
def batikIdentify():
    return "Success"

@app.route('/batik/list', methods=['GET'])
def batikList():
    return "Success"

@app.route('/batik/canny', methods=['POST'])
def batikCanny():
    return "Success"

@app.route('/batik/sobel', methods=['POST'])
def batikSobel():
    return "Success"


if __name__ == "__main__":
    app.run(port=3030, debug=True)