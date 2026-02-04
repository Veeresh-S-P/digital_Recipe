let allRecipes = [];

async function fetchPublicRecipes() {
    try {
        const res = await fetch(`${BACKEND_URL}/api/recipes`);
        const recipes = await res.json();
        allRecipes = recipes;
        displayRecipes(recipes);
    } catch (error) {
        showToast('Error loading recipes', 'error');
    }
}

function displayRecipes(recipes) {
    const recipeList = document.getElementById('recipeList');
    const emptyState = document.getElementById('emptyState');
    
    recipeList.innerHTML = "";

    if (recipes.length === 0) {
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';

    recipes.forEach((r) => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        recipeCard.innerHTML = `
            <img src="${r.image || 'https://via.placeholder.com/400x200?text=Recipe+Image'}" alt="${r.title}" />
            <div class="recipe-card-content">
                <h3>${r.title}</h3>
                <p><strong>Category:</strong> ${r.category}</p>
                <p><strong>By:</strong> ${r.user?.name || 'Anonymous'}</p>
                <span class="badge">👤 ${r.user?.name || 'User'}</span>
            </div>
        `;
        recipeList.appendChild(recipeCard);
    });
}

// Search and Filter
if (document.getElementById('searchInput')) {
    document.getElementById('searchInput').addEventListener('input', (e) => {
        filterRecipes();
    });
}

if (document.getElementById('categoryFilter')) {
    document.getElementById('categoryFilter').addEventListener('change', (e) => {
        filterRecipes();
    });
}

function filterRecipes() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const category = document.getElementById('categoryFilter')?.value || '';

    let filtered = allRecipes.filter(r => {
        const matchesSearch = r.title.toLowerCase().includes(searchTerm);
        const matchesCategory = !category || r.category === category;
        return matchesSearch && matchesCategory;
    });

    displayRecipes(filtered);
}

fetchPublicRecipes();
