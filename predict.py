import numpy as np
from keras.models import load_model
# from keras.models import model_from_json
import operator
import cv2
import sys, os
from keras.preprocessing.image import ImageDataGenerator
from skimage.transform import resize
import time

prediction = ''

# Loading the model and loading weights into new model
# json_file = open("model.json", "r")
# model_json = json_file.read()
# json_file.close()
# loaded_model = model_from_json(model_json)
# loaded_model.load_weights("model.h5")
loaded_model = load_model("model_new.h5")
print("Loaded model from disk")

def remove_background(frame):
    fgmask = bgModel.apply(frame, learningRate=0)
    kernel = np.ones((3, 3), np.uint8)
    fgmask = cv2.erode(fgmask, kernel, iterations=1)
    res = cv2.bitwise_and(frame, frame, mask=fgmask)
    return res

# Category dictionary
categories = {0: 'Let', 1: 'Stroke', 2: 'None'}

camera = cv2.VideoCapture(0)
camera.set(10,200)
isBgCaptured = 0

while camera.isOpened():
    ret, frame = camera.read()
    # smoothing filter
    frame = cv2.bilateralFilter(frame, 5, 50, 100)
    # flip frame horizontally
    frame = cv2.flip(frame, 1)
    cv2.rectangle(frame, (int(0.5 * frame.shape[1]), 0),
                  (frame.shape[1], int(0.8 * frame.shape[0])), (255, 0, 0), 2)
    cv2.putText(frame, f"Prediction: {prediction}", (10, 120), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,0,0), 1)    
    cv2.imshow('Original', frame)

    if isBgCaptured == 1:
        img = remove_background(frame)
        img = img[0:int(0.8 * frame.shape[0]),
              int(0.5 * frame.shape[1]):frame.shape[1]]
        
        # do the processing after capturing the image
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        blur = cv2.GaussianBlur(gray,(41,41),0)
        ret, thresh = cv2.threshold(blur,60,255,cv2.THRESH_BINARY+cv2.THRESH_OTSU)
        cv2.imshow("ROI", thresh)
        # print(thresh.shape)
        # print(type(thresh))
        image = resize(thresh, (64, 64))
        # print(image.shape)
        image = image.reshape(1, 64, 64, 1)
        # print(image.shape)

        # generate prediction using trained model
        result = loaded_model.predict(image)
        # print(result)
        prediction = {
            'Let': result[0][0], 
            'Stroke': result[0][1],
            'None': result[0][2]
        }
        # Sorting based on top prediction
        prediction = sorted(prediction.items(), key=operator.itemgetter(1), reverse=True)
        print(prediction)
        prediction = prediction[0][0]
        # Displaying the predictions
        # cv2.putText(frame, prediction[0][0], (10, 120), cv2.FONT_HERSHEY_PLAIN, 1, (255,0,0), 1)    
        cv2.imshow("Original", frame)  

    interrupt = cv2.waitKey(10)
    if interrupt & 0xFF == ord('b'):
        bgModel = cv2.createBackgroundSubtractorMOG2(0, 50)
        isBgCaptured = 1
        # print('Captured Background!')
    elif interrupt & 0xFF == ord('s'):
        isBgCaptured = 0
        # print('Stopping prediction capturing')
    elif interrupt & 0xFF == ord('q'): # esc key
        break



camera.release()
cv2.destroyAllWindows()