// script.js
 

 // Function to show a notification
 function showNotification(message, type = 'success') {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.className = `notification ${type}`; // Use type for different styles (success, error, etc.)
  notification.style.display = 'block';
 

  // Hide after 3 seconds
  setTimeout(() => {
  notification.style.display = 'none';
  }, 3000);
 }
 

 // Dark Mode Toggle
 const darkModeToggle = document.getElementById('darkModeToggle');
 darkModeToggle.addEventListener('click', () => {
  const theme = document.documentElement.getAttribute('data-theme');
  if (theme === 'dark') {
  document.documentElement.removeAttribute('data-theme');
  darkModeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
  } else {
  document.documentElement.setAttribute('data-theme', 'dark');
  darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
  }
 });
 

 // Form Validation and Calculation
 const macroForm = document.getElementById('macroForm');
 const resultsSection = document.getElementById('results');
 const resultsContent = document.getElementById('resultsContent');
 const clearButton = document.getElementById('clearButton');
 

 macroForm.addEventListener('submit', function (event) {
  event.preventDefault();
 

  if (macroForm.checkValidity()) {
  const age = parseFloat(macroForm.age.value);
  const weight = parseFloat(macroForm.weight.value);
  const height = parseFloat(macroForm.height.value);
  const gender = macroForm.gender.value;
  const activityLevel = parseFloat(macroForm.activityLevel.value);
  const goal = macroForm.goal.value;
 

  // Calculate BMR (Basal Metabolic Rate)
  let bmr;
  if (gender === 'male') {
  bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
  bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }
 

  // Calculate TDEE (Total Daily Energy Expenditure)
  const tdee = bmr * activityLevel;
 

  // Adjust TDEE based on goal
  let calorieIntake;
  if (goal === 'lose') {
  calorieIntake = tdee * 0.85; // 15% deficit
  } else if (goal === 'gain') {
  calorieIntake = tdee * 1.15; // 15% surplus
  } else {
  calorieIntake = tdee; // Maintenance
  }
 

  // Macronutrient Distribution (example: 40% carbs, 30% protein, 30% fat)
  const carbs = (calorieIntake * 0.4) / 4;
  const protein = (calorieIntake * 0.3) / 4;
  const fat = (calorieIntake * 0.3) / 9;
 

  // Display Results
  let resultsHTML = `
  
  <p><strong>Carbohydrates:</strong> ${carbs.toFixed(2)} g</p>
  <p><strong>Protein:</strong> ${protein.toFixed(2)} g</p>
  <p><strong>Fat:</strong> ${fat.toFixed(2)} g</p>
  `;
 

  resultsContent.innerHTML = resultsHTML;
  resultsSection.style.display = 'block';
  showNotification('Calculation successful!', 'success');
  } else {
  showNotification('Please fill in all required fields.', 'error');
  }
 });
 

 // Clear button functionality
 clearButton.addEventListener('click', function () {
  macroForm.reset();
  resultsSection.style.display = 'none';
 });
 

 // Recipe Suggestion
 const recipeContent = document.getElementById('recipeContent');
 const refreshRecipeButton = document.getElementById('refreshRecipe');
 

 async function fetchRecipeData() {
  recipeContent.innerHTML = '<p>Loading recipe...</p>';
  const apiUrl = 'https://dummyjson.com/recipes';
 

  try {
  const response = await fetch(apiUrl);
  if (response.ok) {
  const data = await response.json();
  displayRecipe(data);
  } else {
  // Fallback to AllOrigins proxy if the direct API call fails
  const proxyUrl = `https://api.allorigins.win/raw?url=${apiUrl}`;
  const proxyResponse = await fetch(proxyUrl);
  if (proxyResponse.ok) {
  const proxyData = await proxyResponse.json();
  displayRecipe(proxyData);
  } else {
  recipeContent.innerHTML = '<p>Error fetching recipe.</p>';
  showNotification('Error fetching recipe!', 'error');
  }
  }
  } catch (error) {
  // Fallback to AllOrigins proxy if the direct API call fails
  const proxyUrl = `https://api.allorigins.win/raw?url=${apiUrl}`;
  const proxyResponse = await fetch(proxyUrl);
  if (proxyResponse.ok) {
  const proxyData = await proxyResponse.json();
  displayRecipe(proxyData);
  } else {
  recipeContent.innerHTML = '<p>Error fetching recipe.</p>';
  showNotification('Error fetching recipe!', 'error');
  }
  }
 }
 

 function displayRecipe(data) {
  if (data && data.recipes && data.recipes.length > 0) {
  const suffledData = data.recipes.sort(() => Math.random() - 0.5);
  const recipe = suffledData[0];
 

  let ingredientsList = '<ul>';
  recipe.ingredients.forEach(ingredient => {
  ingredientsList += `<li>${ingredient}</li>`;
  });
  ingredientsList += '</ul>';
 

  let instructionsList = '<ol>';
  recipe.instructions.forEach(instruction => {
  instructionsList += `<li>${instruction}</li>`;
  });
  instructionsList += '</ol>';
 

  recipeContent.innerHTML = `
  <h3>${recipe.name}</h3>
  <p><strong>Cuisine:</strong> ${recipe.cuisine}</p>
  <p><strong>Ingredients:</strong></p>
  ${ingredientsList}
  <p><strong>Instructions:</strong></p>
  ${instructionsList}
  <p><strong>Calories per Serving:</strong> ${recipe.caloriesPerServing}</p>
  `;
  } else {
  recipeContent.innerHTML = '<p>No recipes found.</p>';
  }
 }
 

 refreshRecipeButton.addEventListener('click', fetchRecipeData);
 

 // Initial recipe fetch
 fetchRecipeData();
 

 // Form Validation (Prevent Invalid Submission)
 macroForm.addEventListener('submit', function (event) {
  if (!macroForm.checkValidity()) {
  event.preventDefault();
  event.stopPropagation();
  }
  macroForm.classList.add('was-validated');
 });