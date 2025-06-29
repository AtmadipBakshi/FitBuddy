document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("nutrition-form");
  const resultBox = document.getElementById("nutrition-result");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const input = document.getElementById("food-input").value.trim();

    if (input === "") {
      resultBox.innerHTML = "<p>Please enter a food item.</p>";
      return;
    }

    resultBox.innerHTML = "<p>Loading...</p>";

    try {
      const response = await fetch("https://fitbuddy-backend-lvl5.onrender.com/nutrition", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input })
      });

      const data = await response.json();

      if (data.error) {
        resultBox.innerHTML = `<p>${data.error}</p>`;
      } else {
        resultBox.innerHTML = `
          <div class="food-item">
            <h3>${data.name}</h3>
            <p><strong>Calories:</strong> ${data.calories}</p>
            <p><strong>Protein:</strong> ${data.protein} g</p>
            <p><strong>Carbs:</strong> ${data.carbs} g</p>
            <p><strong>Fat:</strong> ${data.fat} g</p>
          </div>
        `;
      }

    } catch (err) {
      resultBox.innerHTML = "<p>Error fetching nutrition info. Try again later.</p>";
    }
  });
});
