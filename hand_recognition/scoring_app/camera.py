import cv2,os,urllib.request
import numpy as np
from django.conf import settings
from keras.models import load_model
import operator
import sys
from keras.preprocessing.image import ImageDataGenerator
from skimage.transform import resize
import time
import requests
#include <opencv2/core/cvstd.hpp>

loaded_model = load_model(os.path.join(settings.BASE_DIR, 'scoring_app/model.h5'))
print("Loaded model from disk")

class VideoCamera(object):
    def __init__(self):
        self.video = cv2.VideoCapture(0)

    def __del__(self):
        self.video.release()

    def get_frame(self, counter, check, bgModel):
        print('starting get frame')

        prediction = ''
        prediction_actual = ''

        def remove_background(frame):
            fgmask = bgModel.apply(frame, learningRate = 0)
            kernel = np.ones((3, 3), np.uint8)
            fgmask = cv2.erode(fgmask, kernel, iterations = 1)
            res = cv2.bitwise_and(frame, frame, mask = fgmask)
            return res

        # Category dictionary
        signals = {0: 'let', 1: 'nolet', 2: 'none', 3: 'stroke'}
        signals_translated = {
            '': '', 
            'let': 'Let',
            'nolet': 'No Let', 
            'none': 'None',
            'stroke': 'Stroke',
        }

        isBgCaptured = 0
        ret, frame = self.video.read()

        # smoothing filter
        frame = cv2.bilateralFilter(frame, 5, 50, 100)
        # flip frame horizontally
        frame = cv2.flip(frame, 1)
        cv2.rectangle(frame, (int(0.5 * frame.shape[1]), 0),
                      (frame.shape[1], int(0.8 * frame.shape[0])), (255, 0, 0), 2)
        cv2.putText(frame, f"Prediction: {signals_translated[prediction]}", (10, 160), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,0,0), 1)    
        cv2.putText(frame, f"Actual: {prediction}", (10, 120), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,0,0), 1)
        
        if not(check):
            print('taking background image once?')
            bgModel = cv2.createBackgroundSubtractorMOG2(0, 50) 
            print(type(bgModel))
            check = True

        proper_prediction = False
        isBgCaptured = 1
        
        if isBgCaptured == 1:
            print("Background is captured")
            img = remove_background(frame)
            img = img[0:int(0.8 * frame.shape[0]),
                  int(0.5 * frame.shape[1]):frame.shape[1]]
            print(img.shape)
            # do the processing after capturing the image
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            blur = cv2.GaussianBlur(gray, (41, 41), 0)
            ret, thresh = cv2.threshold(blur,60,255,cv2.THRESH_BINARY+cv2.THRESH_OTSU)
            image = resize(thresh, (64, 64))
            image = image.reshape(1, 64, 64, 1)

            # generate prediction using trained model
            result = loaded_model.predict(image)
            print(result)

            prediction = {}
            for idx, signal in signals.items():
                prediction[signal] = result[0][idx]
                if prediction[signal] >= 0.96:
                    print(prediction[signal])
                    proper_prediction = True

            # Sorting based on top prediction
            prediction = sorted(prediction.items(), key = operator.itemgetter(1), reverse = True)
            if prediction[0][0] != 'none' and proper_prediction == True:
                print('prediction not none.')
                prediction = prediction[0][0]
                counter[prediction] = counter[prediction] + 1
                proper_prediction = True
            else:
                proper_prediction = False
            print(prediction)

            # We are using Motion JPEG, but OpenCV defaults to capture raw images,
            # so we must encode it into JPEG in order to correctly display the
            # video stream.
            if (proper_prediction == True):
                print('Good result!')
                cv2.putText(frame, f"Prediction: {signals_translated[prediction]}", (10, 160), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,0,0), 1)    
                cv2.putText(frame, f"Actual: {prediction}", (10, 120), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,0,0), 1) 
                cv2.putText(frame, prediction[0][0], (30, 120), cv2.FONT_HERSHEY_PLAIN, 1, (255,0,0), 1)
                ret, jpeg = cv2.imencode('.jpg', frame)
                print('COUNTER ')
                print(counter)
                for i in counter.values():
                    if i >= 15:
                        return -1, counter, check, bgModel
                ret, jpeg = cv2.imencode('.jpg', frame)
                return jpeg.tobytes(), counter, check, bgModel
            else:
                print('Bad result!')
                ret, jpeg = cv2.imencode('.jpg', frame)
                return jpeg.tobytes(), counter, check, bgModel
                    
        ret, jpeg = cv2.imencode('.jpg', frame)
        return jpeg.tobytes(), counter, check, bgModel