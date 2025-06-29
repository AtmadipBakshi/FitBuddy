from flask import Flask, request, jsonify
import requests
import os
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables from .env (for local testing)
load_dotenv()

app = Flask(__name__)
CORS(app)

# Secure API keys
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


# -----------------------------
# Nutritionix Smart Nutrition
# -----------------------------
@app.route("/nutrition", methods=["POST"])
def get_nutrition():
    data = request.get_json()
    query = data.get("query", "")

    url = "https://trackapi.nutritionix.com/v2/natural/nutrients"
    headers = {
        "x-app-id": NUTRITIONIX_APP_ID,
        "x-app-key": NUTRITIONIX_API_KEY,
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(url, headers=headers, json={"query": query})
        response_data = response.json()

        foods = response_data.get("foods", [])
        if not foods:
            return jsonify({"error": "No food data found."}), 404

        food = foods[0]
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
# Run Locally
# ---------------------
if __name__ == '__main__':
    app.run(debug=True, port=5000)
