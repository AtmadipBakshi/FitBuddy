document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("chat-form");
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  function appendMessage(text, sender) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
    msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function showTyping() {
    const typingDiv = document.createElement("div");
    typingDiv.classList.add("typing");
    typingDiv.id = "typing";
    typingDiv.innerText = "FitBuddy is typing...";
    chatBox.appendChild(typingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function removeTyping() {
    const typing = document.getElementById("typing");
    if (typing) typing.remove();
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const userMessage = input.value.trim();
    if (!userMessage) return;

    appendMessage(userMessage, "user");
    input.value = "";

    showTyping();

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await res.json();
      removeTyping();
      appendMessage(data.reply || "⚠️ Couldn't understand that.", "bot");
    } catch (err) {
      removeTyping();
      appendMessage("❌ Error reaching FitBuddy's brain.", "bot");
    }
  });
});
