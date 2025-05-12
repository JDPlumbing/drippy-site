"""
base_scraper.py
----------------
Defines a base class for all Droogle vendor scrapers.
Each scraper must implement the `search(term)` method.
"""

from abc import ABC, abstractmethod

class BaseScraper(ABC):
    @abstractmethod
    def search(self, term):
        """
        Search for a part or product by term and return a dict with keys:
        - vendor
        - product_name
        - price
        - unit
        - url
        - timestamp
        """
        pass
