from flask import Flask, request, jsonify
from flask_cors import CORS
from droogle.scrapers.home_depot import run_home_depot_api_search

app = Flask(__name__)
CORS(app)

@app.route("/search", methods=["GET"])
def search():
    query = request.args.get("q", "")
    zip_code = request.args.get("zip", "")

    if not query:
        return jsonify({"error": "Missing search term"}), 400

    try:
        results = run_home_depot_api_search(query)  # 🧠 changed from the Playwright version
        return jsonify(results)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
