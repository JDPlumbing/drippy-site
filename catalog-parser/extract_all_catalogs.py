
import fitz  # PyMuPDF
import os
import json

# Setup paths
source_dir = "."
public_dir = "../public"
data_dir = os.path.join(public_dir, "data")
image_root = os.path.join(public_dir, "kohler_images")

# Ensure output directories exist
os.makedirs(data_dir, exist_ok=True)
os.makedirs(image_root, exist_ok=True)

pdf_files = [f for f in os.listdir(source_dir) if f.endswith(".pdf")]

for pdf_name in pdf_files:
    base_name = os.path.splitext(pdf_name)[0].replace(' ', '_')
    doc = fitz.open(os.path.join(source_dir, pdf_name))
    product_data = []

    output_dir = os.path.join(image_root, base_name)
    os.makedirs(output_dir, exist_ok=True)

    for page_num in range(min(10, len(doc))):  # first 10 pages for demo
        page = doc[page_num]
        text_blocks = page.get_text("blocks")
        images = page.get_images(full=True)

        for img_index, img in enumerate(images):
            xref = img[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]
            image_filename = f"{base_name}_p{page_num+1}_img{img_index+1}.{image_ext}"
            image_path = os.path.join(output_dir, image_filename)

            with open(image_path, "wb") as f:
                f.write(image_bytes)

            nearby_texts = [b[4] for b in text_blocks if b[1] < 500]
            combined_text = " ".join(nearby_texts).strip()

            product_data.append({
                "page": page_num + 1,
                "image": f"kohler_images/{base_name}/{image_filename}",
                "text_excerpt": combined_text[:300] + ("..." if len(combined_text) > 300 else "")
            })

    json_path = os.path.join(data_dir, f"{base_name}_product_preview.json")
    with open(json_path, "w") as f:
        json.dump(product_data, f, indent=2)

    print(f"✅ Processed {pdf_name} → {len(product_data)} entries")
