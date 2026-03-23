from rembg import remove
from PIL import Image

input_path = 'assets/constantine_solar.png' # or wherever the input comes from, but realistically it's an output script
output_path = 'assets/constantine_solar_nobg.png'

print("Removing background...")
inp = Image.open(input_path)
out = remove(inp)
out.save(output_path)
print("Background removed successfully!")
