let allRecipes = [];
let favoriteSet = new Set();

async function fetchPublicRecipes() {
    try {
        const res = await fetch(`${BACKEND_URL}/api/recipes`);
        const recipes = await res.json();
        allRecipes = recipes;
        // if logged in, fetch favorites to mark hearts
        const token = getToken();
        if (token) {
            try {
                const favs = await apiGet('/api/recipes/favorites', token);
                // Ensure favs is an array (handle error responses)
                const favArray = Array.isArray(favs) ? favs : [];
                favoriteSet = new Set(favArray.map(f => f._id));
            } catch (err) {
                console.warn('Could not load favorites', err);
            }
        }
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
        const isFav = favoriteSet.has(r._id);
        const favSymbol = isFav ? '❤️' : '♡';
        recipeCard.innerHTML = `
            <img src="${r.image || 'https://via.placeholder.com/400x200?text=Recipe+Image'}" alt="${r.title}" />
            <div class="recipe-card-content">
                <div class="recipe-card-header">
                    <h3>${r.title}</h3>
                    <button class="btn-fav" onclick="handleFavorite('${r._id}', this)">${favSymbol}</button>
                </div>
                <p><strong>Category:</strong> ${r.category} • <strong>Difficulty:</strong> ${r.difficulty || 'Easy'}</p>
                <p><strong>Prep:</strong> ${r.prepTime || 0} mins • <strong>Cook:</strong> ${r.cookTime || 0} mins</p>
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

// Favorite handler
async function handleFavorite(id, btn) {
    try {
        const res = await toggleFavorite(id);
        if (res.message === 'added') {
            btn.textContent = '❤️';
            favoriteSet.add(id);
            showToast('Added to favorites', 'success');
        } else {
            btn.textContent = '♡';
            favoriteSet.delete(id);
            showToast('Removed from favorites', 'info');
            // if we're on the favorites page, remove the card from the list
            try {
                const favList = document.getElementById('favoritesList');
                if (favList) {
                    const card = btn.closest('.recipe-card');
                    if (card) card.remove();
                }
            } catch (e) {
                // ignore
            }
        }
    } catch (err) {
        showToast('Could not toggle favorite', 'error');
    }
}
