window.addEventListener("DOMContentLoaded", init);

function init() {
	let recipes = getRecipesFromStorage();
	addRecipesToDocument(recipes);
	initFormHandler();
}

function getRecipesFromStorage() {
	// A9. Parse recipes from localStorage, return empty array if nothing found
	return JSON.parse(localStorage.getItem('recipes')) || [];
}

function addRecipesToDocument(recipes) {
	// A10. Get reference to <main>
	const main = document.querySelector('main');

	// A11. Loop, create, populate, and append each recipe card
	recipes.forEach(recipe => {
		const card = document.createElement('recipe-card');
		card.data = recipe;
		main.append(card);
	});
}

function saveRecipesToStorage(recipes) {
	// B1. Save recipes array to localStorage as a string
	localStorage.setItem('recipes', JSON.stringify(recipes));
}

function initFormHandler() {
	// B2. Get reference to <form>
	const form = document.querySelector('form');

	// B3. Add submit event listener
	form.addEventListener('submit', (e) => {
		e.preventDefault();

		// B4. Create FormData object
		const formData = new FormData(form);

		// B5. Build recipe object from form data
		const recipeObject = {};
		formData.forEach((value, key) => {
			recipeObject[key] = value;
		});

		// B6. Create new <recipe-card>
		const card = document.createElement('recipe-card');

		// B7. Add data to card
		card.data = recipeObject;

		// B8. Append to <main>
		const main = document.querySelector('main');
		main.append(card);

		// B9. Save updated recipes to localStorage
		const recipes = getRecipesFromStorage();
		recipes.push(recipeObject);
		saveRecipesToStorage(recipes);
	});

	// B10. Get reference to clear button
	const clearBtn = document.querySelector('button[type="button"]');

	// B11. Add click listener to clear button
	clearBtn.addEventListener('click', () => {
		// B12. Clear localStorage
		localStorage.clear();

		// B13. Clear <main>
		document.querySelector('main').innerHTML = '';
	});
}
