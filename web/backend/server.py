import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import cv2
import base64
from segmentation_models import metrics as sm_metrics
from segmentation_models.losses import bce_jaccard_loss
from segmentation_models import get_preprocessing



def iou_score(y_true, y_pred):
    intersection = tf.reduce_sum(y_true * y_pred)
    union = tf.reduce_sum(y_true) + tf.reduce_sum(y_pred) - intersection
    return intersection / union


custom_objects = {
    'iou_score': iou_score,
    'f1-score': sm_metrics.FScore(),
    'FixedDropout': tf.keras.layers.Dropout,
    'binary_crossentropy_plus_jaccard_loss': bce_jaccard_loss  
}


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

current_dir = os.path.dirname(os.path.realpath(__file__))
app.config['UPLOAD_FOLDER'] = os.path.join(current_dir, "uploads")

classification_model_path = os.path.join(current_dir, "model", "effB3 CNN DR.h5")
classification_model = load_model(classification_model_path)

print("Classification model loaded successfully.")

segmentation_model_path = os.path.join(current_dir, "model", "best_seg_model.h5")
segmentation_model = load_model(segmentation_model_path, custom_objects=custom_objects)

print("Segmentation model loaded successfully.")

segmentation_model_path2 = os.path.join(current_dir, "model", "effB0_SE_SEG.h5")
segmentation_model2 = load_model(segmentation_model_path2, custom_objects=custom_objects)

print("Segmentation model 2 loaded successfully.")

RESULT_CATEGORIES = ["Healthy", "Mild", "Moderate", "Proliferative DR", "Severe"]

BACKBONE = 'efficientnetb0'
preprocess_input = get_preprocessing(BACKBONE)

@app.route("/")
def home():
    return jsonify({"message": "Hello from backend"})

@app.route("/evaluate", methods=['POST'])
def evaluate():
    if request.method == 'POST':
        file = request.files['image']
        img_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(img_path)
        file.close()

    
        img_cls = image.load_img(img_path, target_size=(224, 224))
        x_cls = image.img_to_array(img_cls)
        x_cls = np.expand_dims(x_cls, axis=0)

        prediction = classification_model.predict(x_cls)
        predicted_class = np.argmax(prediction, axis=1)[0]
        predicted_class_str = RESULT_CATEGORIES[predicted_class]

        
        img_seg = image.load_img(img_path, target_size=(512, 512))
        x_seg = image.img_to_array(img_seg)
        x_seg = np.expand_dims(x_seg, axis=0)
        x_seg = preprocess_input(x_seg)

        
        segmentation_prediction = segmentation_model.predict(x_seg)

        segmentation_prediction2 = segmentation_model2.predict(x_seg)

        
        binary_mask = (segmentation_prediction[0, :, :, 0] > 0.5).astype(np.uint8) * 255
        
        binary_mask2 = (segmentation_prediction2[0, :, :, 0] > 0.5).astype(np.uint8) * 255

        
        kernel = np.ones((5, 5), np.uint8)
        binary_mask = cv2.morphologyEx(binary_mask, cv2.MORPH_CLOSE, kernel)
        binary_mask = cv2.morphologyEx(binary_mask, cv2.MORPH_OPEN, kernel)
        
        
        kernel = np.ones((5, 5), np.uint8)
        binary_mask2 = cv2.morphologyEx(binary_mask2, cv2.MORPH_CLOSE, kernel)
        binary_mask2 = cv2.morphologyEx(binary_mask2, cv2.MORPH_OPEN, kernel)

        
        original_img = cv2.imread(img_path)

        
        resized_binary_mask = cv2.resize(binary_mask, (original_img.shape[1], original_img.shape[0]))
        
        
        resized_binary_mask2 = cv2.resize(binary_mask2, (original_img.shape[1], original_img.shape[0]))

        
        contours, _ = cv2.findContours(resized_binary_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        
        contours2, _ = cv2.findContours(resized_binary_mask2, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        
        contour_img1 = original_img.copy()
        cv2.drawContours(contour_img1, contours, -1, (0, 255, 0), 30)  

        
        contour_img2 = original_img.copy()
        cv2.drawContours(contour_img2, contours2, -1, (0, 255, 0), 30)  

        
        _, contour_img_encoded1 = cv2.imencode('.jpg', contour_img1)
        contour_img_base64_1 = base64.b64encode(contour_img_encoded1).decode()

        _, contour_img_encoded2 = cv2.imencode('.jpg', contour_img2)
        contour_img_base64_2 = base64.b64encode(contour_img_encoded2).decode()

        
        os.remove(img_path)

        return jsonify({
            "result": predicted_class_str,
            "contour_image_1": contour_img_base64_1,  
            "contour_image_2": contour_img_base64_2  
        })

if __name__ == '__main__':
    app.run(debug=True)
