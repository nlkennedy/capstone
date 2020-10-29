import cv2
import numpy as np
import os
import time

def remove_background(frame):
    fgmask = bgModel.apply(frame, learningRate=0)
    kernel = np.ones((3, 3), np.uint8)
    fgmask = cv2.erode(fgmask, kernel, iterations=1)
    res = cv2.bitwise_and(frame, frame, mask=fgmask)
    return res

# Run once to create the directory structure
if not os.path.exists("data"):
    os.makedirs("data")
    os.makedirs("data/stroke")
    os.makedirs("data/let")
    os.makedirs("data/none")
    

# training mode 
mode = 'train'
directory = 'data/'

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
    

    # Getting count of existing images
    count = {'stroke': len(os.listdir(directory+"stroke")),
             'let': len(os.listdir(directory+"let")),
             'none': len(os.listdir(directory+"none")),
            }
    
    # Printing the count in each set to the screen
    cv2.putText(frame, "MODE : "+mode, (10, 50), cv2.FONT_HERSHEY_PLAIN, 1, (255,0,0), 1)
    cv2.putText(frame, "IMAGE COUNT", (10, 100), cv2.FONT_HERSHEY_PLAIN, 1, (255,0,0), 1)
    cv2.putText(frame, "STROKE : "+str(count['stroke']), (10, 120), cv2.FONT_HERSHEY_PLAIN, 1, (255,0,0), 1)
    cv2.putText(frame, "LET : "+str(count['let']), (10, 140), cv2.FONT_HERSHEY_PLAIN, 1, (255,0,0), 1)
    cv2.putText(frame, "NONE : "+str(count['none']), (10, 160), cv2.FONT_HERSHEY_PLAIN, 1, (255,0,0), 1)
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
    elif interrupt & 0xFF == ord('q'): # esc key
        break
    elif interrupt & 0xFF == ord('s'):
        cv2.imwrite(directory+'stroke/'+str(count['stroke'])+'.jpg', thresh)
    elif interrupt & 0xFF == ord('l'):
        cv2.imwrite(directory+'let/'+str(count['let'])+'.jpg', thresh)
    elif interrupt & 0xFF == ord('n'):
        cv2.imwrite(directory+'none/'+str(count['none'])+'.jpg', thresh)
    
camera.release()
cv2.destroyAllWindows()