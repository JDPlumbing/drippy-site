"""
ace.py
-------
Scraper module for Ace Hardware. Inherits from BaseScraper.
"""

from playwright.sync_api import sync_playwright
from datetime import datetime
from urllib.parse import quote
from scrapers.base_scraper import BaseScraper

class AceScraper(BaseScraper):
    def search(self, term):
        results = []

        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            search_url = f"https://www.acehardware.com/search?query={quote(term)}"
            page.goto(search_url)
            page.wait_for_timeout(5000)

            try:
                item = page.query_selector('div.product')
                if not item:
                    raise ValueError("No product tile found.")

                title_el = item.query_selector('h3.product-title')
                price_el = item.query_selector('span[itemprop="price"]')

                if not title_el or not price_el:
                    raise ValueError("Missing title or price.")

                title = title_el.inner_text().strip()
                price_text = price_el.inner_text().replace("$", "").strip()
                price = float(price_text.replace(",", ""))
                link_el = item.query_selector('a[href]')
                link = link_el.get_attribute('href') if link_el else "N/A"

                results.append({
                    "vendor": "Ace",
                    "product_name": title,
                    "price": price,
                    "unit": "each",
                    "url": f"https://www.acehardware.com{link}",
                    "timestamp": datetime.now().isoformat()
                })

            except Exception as e:
                print(f"[Ace] Error while scraping: {e}")

            browser.close()

        return results
