document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("chat-form");
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  // Optional: Dynamic header/subtitle
  const header = document.getElementById("chat-header-title");
  const subtext = document.getElementById("chat-header-subtitle");

  // Optional: Suggestion box
  const quickReplies = document.getElementById("quick-replies");

  const presets = {
    "Workout Tips": {
      message: "Give me some workout tips.",
      title: "🏋️ Workout Assistant",
      subtitle: "Get help with workouts, reps, and plans.",
      suggestions: ["Best chest workout?", "Home workouts?", "Stretch routine"]
    },
    "Nutrition Help": {
      message: "Give me a healthy nutrition suggestion.",
      title: "🥗 Nutrition Guide",
      subtitle: "Eat smart with food insights.",
      suggestions: ["Foods with high protein", "What’s a balanced meal?", "Good post-workout food?"]
    },
    "Mood Check": {
      message: "I’m feeling low. Motivate me.",
      title: "🧘 Mental Boost",
      subtitle: "Let’s lift your spirits.",
      suggestions: ["Motivate me", "Why should I exercise?", "Give me some discipline tips"]
    },
    "Diet Plan": {
      message: "Suggest a diet plan for me.",
      title: "📋 Diet Planner",
      subtitle: "Personalized eating plans.",
      suggestions: ["Low-carb diet plan?", "3-day veg meal plan", "Plan for bulking"]
    }
  };

  const preset = localStorage.getItem("fitbuddy_preset");

  if (preset && presets[preset]) {
    const { message, title, subtitle, suggestions } = presets[preset];

    if (header) header.innerText = title;
    if (subtext) subtext.innerText = subtitle;

    // Optional suggestions area
    if (quickReplies && suggestions) {
      quickReplies.innerHTML = "";
      suggestions.forEach(text => {
        const btn = document.createElement("button");
        btn.innerText = text;
        btn.onclick = () => {
          appendMessage(text, "user");
          sendToBot(text);
        };
        quickReplies.appendChild(btn);
      });
    }

    appendMessage(message, "user");
    sendToBot(message);
    localStorage.removeItem("fitbuddy_preset");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const userMessage = input.value.trim();
    if (!userMessage) return;
    appendMessage(userMessage, "user");
    input.value = "";
    sendToBot(userMessage);
  });

  function appendMessage(text, sender) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
    msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function showTyping() {
    const typing = document.createElement("div");
    typing.id = "typing";
    typing.innerText = "FitBuddy is typing...";
    chatBox.appendChild(typing);
  }

  function removeTyping() {
    const typing = document.getElementById("typing");
    if (typing) typing.remove();
  }

  async function sendToBot(userMessage) {
    showTyping();
    try {
      const res = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage })
      });
      const data = await res.json();
      removeTyping();
      appendMessage(data.response || "⚠️ No reply from bot", "bot");
    } catch (err) {
      removeTyping();
      appendMessage("❌ Server error", "bot");
    }
  }
});
