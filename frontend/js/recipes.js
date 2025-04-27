//const backendURL = 'https://recipe-backenddeploy.onrender.com';

async function fetchPublicRecipes() {
    const res = await fetch(`${backendURL}/api/recipes`);
    const recipes = await res.json();

    const recipeList = document.getElementById('recipeList');
    recipeList.innerHTML = "";

    recipes.forEach((r) => {
        recipeList.innerHTML += `
            <div class="recipe-card">
                <h3>${r.title}</h3>
                <p><strong>Category:</strong> ${r.category}</p>
                <img src="${r.image}" alt="Recipe Image" />
            </div>
        `;
    });
}

fetchPublicRecipes();
