import requests
from urllib.parse import quote
from datetime import datetime

def run_home_depot_api_search(term, zip_code=None):
    try:
        url = f"https://api.online.homedepot.com/sponsoredbanner/v1?schema=search_sponsored&appid=desktop&keyword={quote(term)}&storeid=6209"

        headers = {
            "User-Agent": "Mozilla/5.0",
            "Accept": "application/json",
            "Referer": "https://www.homedepot.com/",
            "Origin": "https://www.homedepot.com"
        }

        response = requests.get(url, headers=headers)
        response.raise_for_status()

        data = response.json()

        results = []
        for item in data.get("products", []):
            results.append({
                "vendor": "HomeDepot",
                "product_name": item.get("title", "N/A"),
                "price": item.get("price", "N/A"),
                "unit": "each",
                "url": item.get("productURL", "https://www.homedepot.com/"),
                "timestamp": datetime.now().isoformat()
            })

        return results

    except Exception as e:
        print(f"[HomeDepot API] Error fetching data: {e}")
        return []
