
import fitz  # PyMuPDF
import os
import json

# Setup paths
pdf_path = "13824_LineBook_English_KB.pdf"  # Must be in this same folder
public_dir = "../public"
output_dir = os.path.join(public_dir, "kohler_images")
json_path = os.path.join(public_dir, "data", "kohler_product_preview.json")

# Ensure output directories exist
os.makedirs(output_dir, exist_ok=True)
os.makedirs(os.path.dirname(json_path), exist_ok=True)

# Open the PDF
doc = fitz.open(pdf_path)
product_data = []

# Process first 10 pages
for page_num in range(min(10, len(doc))):
    page = doc[page_num]
    text_blocks = page.get_text("blocks")
    images = page.get_images(full=True)

    for img_index, img in enumerate(images):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        image_filename = f"kohler_p{page_num+1}_img{img_index+1}.{image_ext}"
        image_path = os.path.join(output_dir, image_filename)

        with open(image_path, "wb") as f:
            f.write(image_bytes)

        nearby_texts = [b[4] for b in text_blocks if b[1] < 500]
        combined_text = " ".join(nearby_texts).strip()

        product_data.append({
            "page": page_num + 1,
            "image": image_filename,
            "text_excerpt": combined_text[:300] + ("..." if len(combined_text) > 300 else "")
        })

# Write the structured product preview
with open(json_path, "w") as f:
    json.dump(product_data, f, indent=2)

print(f"✅ Done. Extracted {len(product_data)} entries from {pdf_path}")
print(f"🖼️ Images saved to: {output_dir}")
print(f"📄 JSON data saved to: {json_path}")
