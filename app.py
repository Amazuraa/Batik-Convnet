from flask import Flask, render_template, request, send_file, send_from_directory

import cv2 as cv
import numpy as np
import tensorflow as tf
import random

from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.models import load_model

# ----------------- CUSTOM AUGMENTATION -----------------

class RandomInvert(layers.Layer):
    def __init__(self, **kwargs):
      super().__init__(**kwargs)

    def call(self, x):
      p = 0.5
      if  tf.random.uniform([]) < p: x = (255-x)
      else: x
      return x


app = Flask(__name__, static_url_path = "/upload", static_folder = "upload")

# load Machine Learning Model ---------------------------------------------
model_canny = load_model("./models/cnn-batik-canny.h5", custom_objects={'RandomInvert': RandomInvert})
model_sobel = load_model("./models/cnn-batik-sobel.h5", custom_objects={'RandomInvert': RandomInvert})

img_height = 240
img_width = 240

class_names = ['Kawung', 'Megamendung', 'Merak Ngibing', 'Parang']



@app.route('/', methods=['GET'])
def homepage():
     return render_template('index.html')

@app.route('/batik', methods=['GET'])
def batik_list():
     return render_template('batik.html')

@app.route('/upload', methods=['POST'])
def upload():
     # upload file
     file = request.files.get('fileInput')

     gen_name = "img_" + str(random.randrange(1000, 9999))
     split = file.filename.split('.')
     new_name = gen_name + "." + split[1]

     file_path = "./upload/" + new_name
     file.save(file_path)     

     mode = request.form.get('modelInput')

     # Preprocessing image
     if (mode == "canny"):
          # Canny edge detection 
          img = cv.imread(file_path, 0)
          edges = cv.Canny(img, 100, 200)

          cv.imwrite("./upload/canny/" + new_name, edges)

     elif (mode == "sobel"):
          # Sobel edge detection 
          img = cv.imread(file_path, 1)
          src = cv.GaussianBlur(img, (3, 3), 0)
          grays = cv.cvtColor(src, cv.COLOR_BGR2GRAY)

          sobelx = cv.Sobel(grays, cv.CV_64F, dx=1, dy=0, ksize=3) # on X axis
          sobely = cv.Sobel(grays, cv.CV_64F, dx=0, dy=1, ksize=3) # on Y axis

          abs_grad_x = cv.convertScaleAbs(sobelx)
          abs_grad_y = cv.convertScaleAbs(sobely)

          grad = cv.addWeighted(abs_grad_x, 0.5, abs_grad_y, 0.5, 0)

          cv.imwrite("./upload/sobel/" + new_name, grad)

     # prediction
     img = tf.keras.utils.load_img("./upload/" + mode + "/" + new_name, target_size=(img_height, img_width))
     img_array = tf.keras.utils.img_to_array(img)
     img_array = tf.expand_dims(img_array, 0)                    # Create a batch

     if (mode == "canny"):
          predictions = model_canny.predict(img_array)
          display_mode = "Canny Edge"
     elif(mode == "sobel"):
          predictions = model_sobel.predict(img_array)
          display_mode = "Sobel Edge"

     score = tf.nn.softmax(predictions[0])

     return {
          "img" : "./upload/" + new_name,
          "model" : display_mode,
          "class" : class_names[np.argmax(score)],
          "acc" : "{:.2f}".format(100 * np.max(score))
     }


if __name__ == '__main__':
     app.run(port=3000, debug=True)