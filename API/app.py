from flask import Flask, request
from flask_cors import CORS, cross_origin

from keras.preprocessing.image import load_img
from keras.preprocessing.image import img_to_array
from keras.applications.vgg16 import preprocess_input
from keras.applications.vgg16 import decode_predictions
from keras.applications.vgg16 import VGG16

from PIL import Image
import json

model = VGG16()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/batik/identify', methods=['GET'])
@cross_origin()
def batikIdentify():
    # -- uploaded file setup
    # file = request.files['fileInput']
    # file_path = "./upload/" + file.filename
    # file.save(file_path)

    image = load_img("./upload/dog_license.jpg", target_size=(224, 224))
    image = img_to_array(image)
    image = image.reshape((1, image.shape[0], image.shape[1], image.shape[2]))
    image = preprocess_input(image)

    yhat = model.predict(image)
    label = decode_predictions(yhat)
    # label = label[0][0]

    label = json.dumps(str(label))

    return label

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