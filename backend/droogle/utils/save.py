"""
save.py
--------
Utility for saving scraped pricing data to a CSV file.
"""

import csv
from pathlib import Path

def save_to_csv(results, filename="data/price_results.csv"):
    Path("data").mkdir(exist_ok=True)
    keys = results[0].keys()
    with open(filename, mode="a", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=keys)
        if f.tell() == 0:
            writer.writeheader()
        for row in results:
            writer.writerow(row)
