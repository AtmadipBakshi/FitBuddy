# backend/proxy.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

HF_API_TOKEN = os.getenv("HF_API_TOKEN")
HF_MODEL = os.getenv("HF_MODEL", "microsoft/DialoGPT-small")

@app.route("/api/chatbot", methods=["POST"])
def chat_proxy():
    user_input = request.json.get("message", "")
    headers = {
        "Authorization": f"Bearer {HF_API_TOKEN}",
        "Content-Type": "application/json"
    }

    # Custom prompt to steer the model's context
    prompt = f"You are FitBuddy, a helpful fitness chatbot.\nUser: {user_input}\nFitBuddy:"

    payload = {"inputs": prompt}

    try:
        response = requests.post(
            f"https://api-inference.huggingface.co/models/{HF_MODEL}",
            headers=headers,
            json=payload
        )
        generated = response.json()
        raw_reply = generated[0]["generated_text"] if isinstance(generated, list) else "Sorry, no response."

        # Remove the prompt part and keep just the response
        reply_lines = raw_reply.split("FitBuddy:")
        cleaned_reply = reply_lines[-1].strip() if len(reply_lines) > 1 else raw_reply.strip()

        return jsonify({"reply": cleaned_reply})
    except Exception as e:
        return jsonify({"reply": f"Error: {str(e)}"})

if __name__ == "__main__":
    app.run(port=5001, debug=True)
