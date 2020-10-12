import numpy as np
from keras.models import model_from_json
import operator
import cv2
import sys, os
from keras.preprocessing.image import ImageDataGenerator


# Loading the model
json_file = open("model.json", "r")
model_json = json_file.read()
json_file.close()
loaded_model = model_from_json(model_json)
# load weights into new model
loaded_model.load_weights("model.h5")
print("Loaded model from disk")

def remove_background(frame):
    fgmask = bgModel.apply(frame, learningRate=0)
    kernel = np.ones((3, 3), np.uint8)
    fgmask = cv2.erode(fgmask, kernel, iterations=1)
    res = cv2.bitwise_and(frame, frame, mask=fgmask)
    return res


# camera = cv2.VideoCapture(0)

# Category dictionary
categories = {0: 'Let', 1: 'Stoke'}
camera = cv2.VideoCapture(0)
camera.set(10,200)
isBgCaptured = 0


while True:
#     _, frame = cap.read()
#     # Simulating mirror image
#     frame = cv2.flip(frame, 1)
    
#     # Got this from collect-data.py
#     # Coordinates of the ROI
#     x1 = int(0.5*frame.shape[1])
#     y1 = 10
#     x2 = frame.shape[1]-10
#     y2 = int(0.5*frame.shape[1])
#     # Drawing the ROI
#     # The increment/decrement by 1 is to compensate for the bounding box
#     cv2.rectangle(frame, (x1-1, y1-1), (x2+1, y2+1), (255,0,0) ,1)
#     # Extracting the ROI
#     roi = frame[y1:y2, x1:x2]
    
#     # Resizing the ROI so it can be fed to the model for prediction
#     roi = cv2.resize(roi, (64, 64)) 
#     roi = cv2.cvtColor(roi, cv2.COLOR_BGR2GRAY)
#     _, test_image = cv2.threshold(roi, 120, 255, cv2.THRESH_BINARY)
#     cv2.imshow("test", test_image)
    
    ret, frame = camera.read()
    # smoothing filter
    frame = cv2.bilateralFilter(frame, 5, 50, 100)
    # flip frame horizontally
    frame = cv2.flip(frame, 1)
    cv2.rectangle(frame, (int(0.5 * frame.shape[1]), 0),
                  (frame.shape[1], int(0.8 * frame.shape[0])), (255, 0, 0), 2)
    

#     # Getting count of existing images
#     count = {'stroke': len(os.listdir(directory+"stroke")),
#              'let': len(os.listdir(directory+"let"))}
    
#     # Printing the count in each set to the screen
#     cv2.putText(frame, "MODE : "+mode, (10, 50), cv2.FONT_HERSHEY_PLAIN, 1, (255,0,0), 1)
#     cv2.putText(frame, "IMAGE COUNT", (10, 100), cv2.FONT_HERSHEY_PLAIN, 1, (255,0,0), 1)
#     cv2.putText(frame, "STROKE : "+str(count['stroke']), (10, 120), cv2.FONT_HERSHEY_PLAIN, 1, (255,0,0), 1)
#     cv2.putText(frame, "LET : "+str(count['let']), (10, 140), cv2.FONT_HERSHEY_PLAIN, 1, (255,0,0), 1)
    cv2.imshow('Original', frame)

    if isBgCaptured == 1:
        img = remove_background(frame)
        img = img[0:int(0.8 * frame.shape[0]),
              int(0.5 * frame.shape[1]):frame.shape[1]]
        
        # do the processing after capturing the image!
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        blur = cv2.GaussianBlur(gray,(41,41),0)
        ret, thresh = cv2.threshold(blur,60,255,cv2.THRESH_BINARY+cv2.THRESH_OTSU)
        cv2.imshow("ROI", thresh)

    interrupt = cv2.waitKey(10)
    if interrupt & 0xFF == ord('b'):
        bgModel = cv2.createBackgroundSubtractorMOG2(0, 50)
        isBgCaptured = 1
        print('Captured Background!')
        
        ##############
    elif interrupt & 0xFF == ord('s'):
        # Batch of 1

        # test_datagen = ImageDataGenerator(
        #     rescale=1./255,
            # shear_range=0.2,
            # zoom_range=0.2,
            # horizontal_flip=True,
            # validation_split=0.2
        # )

        image = cv2.resize(thresh, dsize=(64, 64), interpolation=cv2.INTER_AREA)
        image = np.expand_dims(image, axis=0) # image shape is (1, 12, 12, 3)
        
        # x = test_datagen.flow(thresh)
        # print(x)
        print(image.shape)
        # result = loaded_model.predict(thresh.reshape(1, 64, 64, 1))
        # need to reshape eventually 
        result = loaded_model.predict(image)
        prediction = {'Let': result[0][0], 
                      'Stroke': result[0][1]}
        # Sorting based on top prediction
        prediction = sorted(prediction.items(), key=operator.itemgetter(1), reverse=True)

        # Displaying the predictions
        cv2.putText(frame, prediction[0][0], (10, 120), cv2.FONT_HERSHEY_PLAIN, 1, (0,255,255), 1)    
        cv2.imshow("Frame", frame)
    
#     interrupt = cv2.waitKey(10)
    elif interrupt & 0xFF == ord('q'): # esc key
        break



cap.release()
cv2.destroyAllWindows()