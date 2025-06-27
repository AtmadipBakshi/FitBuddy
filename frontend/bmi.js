document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("bmi-form");
  const heightInput = document.getElementById("height");
  const weightInput = document.getElementById("weight");
  const bmiResult = document.getElementById("bmi-result");
  const maleImage = document.getElementById("male");
  const femaleImage = document.getElementById("female");
  const continueBtn = document.getElementById("bmi-continue");

  let selectedGender = null;

  // Gender image selection
  maleImage.addEventListener("click", () => {
    selectedGender = "male";
    maleImage.classList.add("selected");
    femaleImage.classList.remove("selected");
  });

  femaleImage.addEventListener("click", () => {
    selectedGender = "female";
    femaleImage.classList.add("selected");
    maleImage.classList.remove("selected");
  });

  // Form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);

    if (!selectedGender) {
      bmiResult.textContent = "Please select your gender.";
      bmiResult.style.color = "red";
      return;
    }

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
      bmiResult.textContent = "Please enter valid height and weight.";
      bmiResult.style.color = "red";
      return;
    }

    const bmi = weight / ((height / 100) ** 2);
    let category = "";

    if (bmi < 18.5) {
      category = "Underweight";
    } else if (bmi < 25) {
      category = "Healthy";
    } else {
      category = "Overweight/Obese";
    }

    bmiResult.textContent = `Your BMI is ${bmi.toFixed(1)} (${category})`;
    bmiResult.style.color = "#facc15";
    bmiResult.style.fontWeight = "bold";

    // Save to localStorage
    localStorage.setItem("userGender", selectedGender);
    localStorage.setItem("userHeight", height);
    localStorage.setItem("userWeight", weight);
    localStorage.setItem("userBMI", bmi.toFixed(1));
    localStorage.setItem("bmiCategory", category);

    // Show continue button
    continueBtn.style.display = "block";
  });

  // On click of Continue → Go to options
  continueBtn.addEventListener("click", function () {
    window.location.href = "options.html";
  });
});
let selectedGender = null;
let dark = true;

document.getElementById("male").onclick = function () {
  selectedGender = "Male";
  this.classList.add("selected");
  document.getElementById("female").classList.remove("selected");
};
document.getElementById("female").onclick = function () {
  selectedGender = "Female";
  this.classList.add("selected");
  document.getElementById("male").classList.remove("selected");
};

const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");
const bmiResult = document.getElementById("bmi-result");
const continueBtn = document.getElementById("bmi-continue");
const spinner = document.querySelector(".spinner");
const btnText = document.querySelector(".btn-text");

heightInput.addEventListener("input", handleBMI);
weightInput.addEventListener("input", handleBMI);

function handleBMI() {
  const height = parseFloat(heightInput.value);
  const weight = parseFloat(weightInput.value);

  if (!selectedGender || isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    bmiResult.textContent = "";
    continueBtn.style.display = "none";
    return;
  }

  const heightInM = height / 100;
  const bmi = (weight / (heightInM * heightInM)).toFixed(1);

  let category = "";
  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 24.9) category = "Healthy";
  else category = "Overweight";

  bmiResult.textContent = `Your BMI is ${bmi} (${category})`;
  continueBtn.style.display = "inline-block";

  localStorage.setItem("bmi", bmi);
  localStorage.setItem("bmiCategory", category);
  localStorage.setItem("gender", selectedGender);
  localStorage.setItem("height", height);
  localStorage.setItem("weight", weight);
}

// 🚀 Button transition with delay
continueBtn.onclick = () => {
  btnText.style.display = "none";
  spinner.style.display = "inline-block";

  setTimeout(() => {
    window.location.href = "chat-options.html";
  }, 1500);
};

// 🌗 Toggle dark/light mode
function toggleMode() {
  document.body.classList.toggle("light-mode");
  const btn = document.querySelector(".toggle-mode");
  dark = !dark;
  btn.innerText = dark ? "🌙" : "☀️";
}
