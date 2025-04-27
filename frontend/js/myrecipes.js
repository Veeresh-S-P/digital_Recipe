
//const backendURL = 'https://recipe-backenddeploy.onrender.com';
async function fetchMyRecipes() {
    const token = localStorage.getItem('token');

    const res = await fetch(`${backendURL}/api/recipes/my`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    const recipes = await res.json();
    const myRecipeList = document.getElementById('myRecipeList');
    myRecipeList.innerHTML = "";

    recipes.forEach((r) => {
        myRecipeList.innerHTML += `
            <div class="recipe-card" id="recipe-${r._id}">
                <h3>${r.title}</h3>
                <p><strong>Category:</strong> ${r.category}</p>
                <img src="${r.image}" alt="Recipe Image" />
                <br/>
                <button onclick="editRecipe('${r._id}')">Edit</button>
                <button onclick="deleteRecipe('${r._id}')">Delete</button>
            </div>
        `;
    });
}

// DELETE Recipe
async function deleteRecipe(id) {
    const token = localStorage.getItem('token');
    if (confirm('Are you sure you want to delete this recipe?')) {
        const res = await fetch(`${backendURL}/api/recipes/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await res.json();
        if (data.message === 'Recipe deleted successfully') {
            alert('Recipe deleted!');
            document.getElementById(`recipe-${id}`).remove();
        } else {
            alert(data.message);
        }
    }
}

// EDIT Recipe
function editRecipe(id) {
    localStorage.setItem('editRecipeId', id);
    window.location.href = 'editRecipe.html';
}

fetchMyRecipes();
