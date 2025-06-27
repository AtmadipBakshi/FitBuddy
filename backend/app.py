from flask import Flask, request, jsonify
import requests
import os
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app)

# Load API keys from .env
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
NUTRITIONIX_APP_ID = os.getenv("NUTRITIONIX_APP_ID")
NUTRITIONIX_API_KEY = os.getenv("NUTRITIONIX_API_KEY")

# -------------------------
# Gemini Chatbot Endpoint
# -------------------------
@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get("message", "")

    gemini_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"

    payload = {
        "contents": [
            {
                "parts": [
                    {
                        "text": (
                            "You are FitBuddy, a friendly fitness chatbot who gives concise, supportive, and clear "
                            "health, diet, and workout advice. Always stay on topic and avoid chit-chat."
                        )
                    },
                    {"text": user_input}
                ]
            }
        ]
    }

    headers = {
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(gemini_url, headers=headers, json=payload)
        data = response.json()
        full_reply = data["candidates"][0]["content"]["parts"][0]["text"]
        reply = full_reply.strip().split("\n\n")[0].split("\n")[0]
    except Exception:
        reply = "Sorry, I couldn't understand that."

    return jsonify({"response": reply})


# ----------------------------------
# Nutritionix Smart Nutrition Route
# ----------------------------------
@app.route("/analyze-meal", methods=["POST"])
def analyze_meal():
    data = request.get_json()
    query = data.get("query", "")

    url = "https://trackapi.nutritionix.com/v2/natural/nutrients"
    headers = {
        "x-app-id": NUTRITIONIX_APP_ID,
        "x-app-key": NUTRITIONIX_API_KEY,
        "Content-Type": "application/json"
    }
    payload = { "query": query }

    try:
        response = requests.post(url, headers=headers, json=payload)
        response_data = response.json()

        # Print raw response for debugging
        print("🔍 Nutritionix Response:", response_data)

        food = response_data["foods"][0]
        return jsonify({
            "name": food["food_name"].title(),
            "calories": food["nf_calories"],
            "protein": food["nf_protein"],
            "carbs": food["nf_total_carbohydrate"],
            "fat": food["nf_total_fat"]
        })

    except Exception as e:
        return jsonify({"error": "⚠️ Failed to analyze the meal.", "details": str(e)}), 500


# ---------------------
# Run the Flask server
# ---------------------
if __name__ == '__main__':
    app.run(debug=True, port=5000)
