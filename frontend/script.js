const welcomePage = document.getElementById("page-welcome");
const userInfoPage = document.getElementById("page-userinfo");
const chatbotPage = document.getElementById("page-chatbot");

function goToDetails() {
  welcomePage.classList.add("hidden");
  userInfoPage.classList.remove("hidden");
}

document.getElementById("user-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const gender = document.getElementById("gender").value;
  const height = document.getElementById("height").value;
  const weight = document.getElementById("weight").value;

  if (!gender || !height || !weight) {
    alert("Please fill in all fields.");
    return;
  }

  // Store in localStorage (or send to backend later)
  localStorage.setItem("userProfile", JSON.stringify({ gender, height, weight }));

  userInfoPage.classList.add("hidden");
  chatbotPage.classList.remove("hidden");
});

// Chatbot Logic (minimal, uses your existing logic)
const chatForm = document.getElementById("chat-form");
const messageInput = document.getElementById("message-input");
const chatBox = document.getElementById("chat-box");
const typingIndicator = document.getElementById("typing-indicator");

function appendMessage(sender, text) {
  const bubble = document.createElement("div");
  bubble.className = `rounded-xl px-4 py-3 max-w-[75%] break-words ${
    sender === "You"
      ? "bg-yellow-400 text-black self-end rounded-br-none"
      : "bg-gray-700 text-white self-start rounded-bl-none"
  }`;
  bubble.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBox.appendChild(bubble);
  chatBox.scrollTop = chatBox.scrollHeight;
}

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userMessage = messageInput.value.trim();
  if (!userMessage) return;

  appendMessage("You", userMessage);
  messageInput.value = "";
  typingIndicator.classList.remove("hidden");

  try {
    const response = await fetch("http://127.0.0.1:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await response.json();
    typingIndicator.classList.add("hidden");
    appendMessage("FitBuddy", data.reply);
  } catch (error) {
    typingIndicator.classList.add("hidden");
    appendMessage("FitBuddy", "⚠️ Failed to reach server.");
  }
});
async function getGeminiResponse(userMessage) {
  try {
    const res = await fetch("http://127.0.0.1:5001/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userMessage }),
    });

    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No reply.";
  } catch (err) {
    return "⚠️ Error talking to Gemini.";
  }
}
document.getElementById("chat-form").addEventListener("submit", async function (e) {
  e.preventDefault();
  const input = document.getElementById("message-input");
  const userMessage = input.value.trim();
  if (!userMessage) return;

  showMessage(userMessage, "user");
  input.value = "";

  // Gemini response
  const botReply = await getGeminiResponse(userMessage);
  showMessage(botReply, "bot");
});
const chatBox = document.getElementById("chat-box");
const form = document.getElementById("chat-form");
const input = document.getElementById("message-input");
const typingIndicator = document.getElementById("typing-indicator");

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const userMsg = input.value.trim();
  if (!userMsg) return;

  appendMessage("user", userMsg);
  input.value = "";
  typingIndicator.classList.remove("hidden");

  try {
    const res = await fetch("http://127.0.0.1:5001/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMsg }),
    });

    const data = await res.json();
    appendMessage("bot", data.reply);
  } catch (err) {
    appendMessage("bot", "⚠️ Error: Couldn't reach the AI.");
  } finally {
    typingIndicator.classList.add("hidden");
  }
});

function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}
