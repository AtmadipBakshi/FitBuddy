document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("nutrition-form");
  const resultBox = document.getElementById("resultText");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const input = document.getElementById("food-input").value.trim();

    if (input === "") return;

    resultBox.innerText = "Loading...";

    try {
      const response = await fetch("https://fitbuddy-backend-lvl5.onrender.com/analyze-meal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input })
      });

      if (!response.ok) throw new Error("API error");

      const data = await response.json();

      resultBox.innerHTML = `
        <strong>${data.name}</strong><br>
        Calories: ${data.calories} kcal<br>
        Protein: ${data.protein} g<br>
        Fat: ${data.fat} g<br>
        Carbs: ${data.carbs} g
      `;

    } catch (err) {
      resultBox.innerText = "Error fetching nutrition info. Try again later.";
    }
  });
});
