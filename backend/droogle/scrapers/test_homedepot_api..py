import requests

url = "https://apionline.homedepot.com/sponsoredbanner/v1?schema=search_sponsored&appid=desktop&show=banner&browserid=05331424677057170970432901770263315202&customerType=b2c&bannerType=standard&appName=general-merchandise&storeid=6329&keyword=toilet&matchProducts=307908571,204074796,308702440,327379639,100676582,202634188,307908573,334479383,323484855,320422533,330819708,326452155,322194703,317676800,329008699,326722566,312838678,301379290,326671990,312442216,329008710,313789704,320020341,320572352,327529133,312442226,303338365,314689625,332126649,332126615,333664100,327618318,204850322"

headers = {
    "User-Agent": "Mozilla/5.0",
    "Accept": "application/json",
    "Referer": "https://www.homedepot.com/",
    "Accept-Encoding": "gzip, deflate, br"
}

response = requests.get(url, headers=headers)

if response.status_code == 200:
    try:
        data = response.json()
        print("✅ API response parsed!")
        print(data)  # or parse specific product info
    except Exception as e:
        print("Error parsing JSON:", e)
        print("Raw content:", response.text[:500])  # only the first 500 chars
else:
    print("Failed to fetch:", response.status_code)
