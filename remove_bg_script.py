from rembg import remove
from PIL import Image

input_path = '/Users/agnes.beaumatin1/.gemini/antigravity/brain/9ab236e3-4637-465e-8749-e4d55b9b4a83/constantine_solar_v3_1774023147295.png'
output_path = '/Users/agnes.beaumatin1/Desktop/Projets/solaire/assets/constantine_solar.png'

print("Removing background...")
inp = Image.open(input_path)
out = remove(inp)
out.save(output_path)
print("Background removed successfully!")
