# FitBuddy — Your Smart Fitness Companion

FitBuddy is a full-stack fitness assistant that combines AI, modern web development, and clean UI/UX to offer users a seamless way to manage their health, workouts, and nutrition.

## Features

- AI-powered chatbot using Gemini API and Hugging Face (Zephyr-7B) for health and workout conversations
- Smart nutrition analysis using the Nutritionix API
- BMI calculator with visual feedback
- Non-chat sections for curated workout tips, diet plans, and motivation
- Secure login and signup using Firebase Authentication
- Fully responsive design with glowing UI elements, smooth animations, and intuitive UX

## Tech Stack

**Frontend**
- HTML, CSS, JavaScript
- Firebase Authentication
- Hosted on Netlify

**Backend**
- Python Flask
- Gemini API (Google Generative AI)
- Hugging Face Zephyr-7B Model
- Nutritionix API
- Hosted on Render

## Live Demo

https://magical-sunshine-008d31.netlify.app

## Project Structure

fitness-bot/
│
├── frontend/
│ ├── index.html
│ ├── login.html
│ ├── signup.html
│ ├── bmi.html
│ ├── chat-options.html
│ ├── chatbot.html
│ ├── nutrition.html
│ ├── workout.html
│ ├── motivation.html
│ └── style.css
│
├── backend/
│ ├── app.py
│ ├── requirements.txt
│ └── .env (excluded from version control)
│
└── README.md

bash
Copy
Edit

## How to Run Locally

1. **Clone the repository**
```bash
git clone https://github.com/AtmadipBakshi/FitBuddy.git
cd FitBuddy
Set up backend

bash
Copy
Edit
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
Create a .env file in the backend directory with the following:

ini
Copy
Edit
GEMINI_API_KEY=your_gemini_api_key
NUTRITIONIX_APP_ID=your_nutritionix_app_id
NUTRITIONIX_API_KEY=your_nutritionix_api_key
Run the Flask server

bash
Copy
Edit
python app.py
Serve the frontend
Open frontend/index.html in your browser, or use a live server extension in VS Code.

Notes
Make sure API keys are valid and not committed to the repository.

Some endpoints (Gemini/Nutritionix) may require paid tiers or quotas.

Keep the backend running while testing features like chatbot and nutrition analysis.



