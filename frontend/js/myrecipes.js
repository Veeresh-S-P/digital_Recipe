
let allMyRecipes = [];

async function fetchMyRecipes() {
    const token = getToken();

    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    try {
        const res = await fetch(`${BACKEND_URL}/api/recipes/my`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const recipes = await res.json();
        allMyRecipes = recipes;
        displayMyRecipes(recipes);
    } catch (error) {
        showToast('Error loading recipes', 'error');
    }
}

function displayMyRecipes(recipes) {
    const myRecipeList = document.getElementById('myRecipeList');
    const emptyState = document.getElementById('emptyState');
    
    myRecipeList.innerHTML = "";

    if (recipes.length === 0) {
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';

    recipes.forEach((r) => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        recipeCard.id = `recipe-${r._id}`;
        recipeCard.innerHTML = `
            <img src="${r.image || 'https://via.placeholder.com/400x200?text=Recipe+Image'}" alt="${r.title}" />
            <div class="recipe-card-content">
                <h3>${r.title}</h3>
                <p><strong>Category:</strong> ${r.category}</p>
                <p style="font-size: 12px; color: #999;">
                    <strong>Status:</strong> ${r.isPublic ? '🌐 Public' : '🔒 Private'}
                </p>
                <div class="recipe-card-actions">
                    <button class="btn-secondary" onclick="editRecipe('${r._id}')">✏️ Edit</button>
                    <button class="btn-danger" onclick="deleteRecipe('${r._id}')">🗑️ Delete</button>
                </div>
            </div>
        `;
        myRecipeList.appendChild(recipeCard);
    });
}

// Search functionality
if (document.getElementById('searchInput')) {
    document.getElementById('searchInput').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = allMyRecipes.filter(r => 
            r.title.toLowerCase().includes(searchTerm)
        );
        displayMyRecipes(filtered);
    });
}

// DELETE Recipe
async function deleteRecipe(id) {
    if (!confirm('Are you sure you want to delete this recipe? This action cannot be undone.')) return;

    const token = getToken();
    if (!token) {
        showToast('Please login first', 'error');
        window.location.href = 'login.html';
        return;
    }

    try {
        const res = await fetch(`${BACKEND_URL}/api/recipes/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await res.json();
        if (data.message === 'Recipe deleted successfully') {
            showToast('Recipe deleted successfully!', 'success');
            const el = document.getElementById(`recipe-${id}`);
            if (el) el.remove();
            allMyRecipes = allMyRecipes.filter(r => r._id !== id);

            // Show empty state if no recipes left
            if (allMyRecipes.length === 0) {
                document.getElementById('emptyState').style.display = 'block';
            }
        } else {
            showToast(data.message || 'Failed to delete recipe', 'error');
        }
    } catch (error) {
        showToast('Error deleting recipe. Please try again.', 'error');
    }
}

// EDIT Recipe
function editRecipe(id) {
    setEditRecipeId(id);
    window.location.href = 'editRecipe.html';
}

fetchMyRecipes();
