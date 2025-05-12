"""
lowes.py
--------
Scraper module for Lowe's. Inherits from BaseScraper.
"""

from playwright.sync_api import sync_playwright
from datetime import datetime
from urllib.parse import quote
from scrapers.base_scraper import BaseScraper

class LowesScraper(BaseScraper):
    def search(self, term):
        results = []

        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page(user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36")
            page.set_viewport_size({"width": 1200, "height": 800})
            search_url = f"https://www.lowes.com/search?searchTerm={quote(term)}"
            page.goto(search_url)
            page.wait_for_timeout(5000)

            try:
                item = page.query_selector('div[data-testid="product-pod"]')
                if not item:
                    raise ValueError("No product pod found.")

                title_el = item.query_selector('h2 span')
                price_el = item.query_selector('span[class*="price"]')

                if not title_el or not price_el:
                    raise ValueError("Missing title or price.")

                title = title_el.inner_text().strip()
                price_text = price_el.inner_text().replace("$", "").strip()
                price = float(price_text.replace(",", ""))
                link_el = item.query_selector('a[href]')
                link = link_el.get_attribute('href') if link_el else "N/A"

                results.append({
                    "vendor": "Lowes",
                    "product_name": title,
                    "price": price,
                    "unit": "each",
                    "url": f"https://www.lowes.com{link}",
                    "timestamp": datetime.now().isoformat()
                })

            except Exception as e:
                print(f"[Lowes] Error while scraping: {e}")

            browser.close()

        return results
