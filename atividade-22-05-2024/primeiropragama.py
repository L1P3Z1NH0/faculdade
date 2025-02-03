import cv2
from matplotlib import pyplot as plt

IMAGE_PATH = 'idosos-felizes.png'

DISPLAY_WINDOW = "result"

img = cv2.imread(IMAGE_PATH)

cv2.imshow(DISPLAY_WINDOW, img)

while True:
    k = cv2.waitKey(1) & 0xFF
    if k == 27:
        break