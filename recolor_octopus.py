import cv2
import numpy as np

img_path = 'assets/constantine_solar.png'
img = cv2.imread(img_path, cv2.IMREAD_UNCHANGED)

if img is None:
    print("Cannot read image")
    exit(1)

# BGR to HSV
bgr = img[:, :, :3]
alpha = img[:, :, 3] if img.shape[2] == 4 else None
hsv = cv2.cvtColor(bgr, cv2.COLOR_BGR2HSV)

# target hex #FF49D6 -> R:255, G:73, B:214
# H ~ 156 in CV2
target_h = 157

# Create mask for pink/red colors to select the octopus
h = hsv[:, :, 0]
s = hsv[:, :, 1]

# Pink/red is typically > 130 or < 20 in OpenCV Hue (0-179)
mask = ((h > 135) | (h < 20)) & (s > 25)

# Set the hue to the exact target hue
hsv[mask, 0] = target_h

# Increase saturation slightly to match the vibrant #FF49D6
# We scale saturation but cap it at 255
new_s = hsv[:, :, 1].astype(float)
new_s[mask] = np.clip(new_s[mask] * 1.3, 0, 255)
hsv[:, :, 1] = new_s.astype(np.uint8)

# Convert back to BGR
bgr_new = cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)

if alpha is not None:
    result = np.dstack((bgr_new, alpha))
else:
    result = bgr_new

cv2.imwrite(img_path, result)
print("Octopus recolored to #FF49D6 successfully!")
