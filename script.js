// Fetch data from the MealDB API
fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
  .then(response => response.json())
  .then(data => {
    // Display the list of meals on the main view
    const mealList = document.getElementById('mealList');
    data.meals.forEach(meal => {
      const mealElement = document.createElement('div');
      mealElement.classList.add('meal');
      mealElement.textContent = meal.strMeal;
      mealElement.addEventListener('click', () => showMealDetails(meal.idMeal));
      mealList.appendChild(mealElement);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Show detailed view of the selected meal
function showMealDetails(mealId) {
  // Fetch meal details from the API
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(response => response.json())
    .then(data => {
      const mealDetails = document.getElementById('mealDetails');
      mealDetails.innerHTML = '';

      const meal = data.meals[0];

      const mealTitle = document.createElement('h2');
      mealTitle.textContent = meal.strMeal;
      mealDetails.appendChild(mealTitle);

      const mealCategory = document.createElement('p');
      mealCategory.textContent = `Category: ${meal.strCategory}`;
      mealDetails.appendChild(mealCategory);

      const mealInstructions = document.createElement('p');
      mealInstructions.textContent = meal.strInstructions;
      mealDetails.appendChild(mealInstructions);

      // Show the detailed view
      mealDetails.style.display = 'block';
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
