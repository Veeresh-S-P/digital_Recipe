// My Favorites script
async function loadFavorites() {
    const token = getToken();
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    try {
        const res = await fetch(`${BACKEND_URL}/api/recipes/favorites`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const favorites = await res.json();
        displayFavorites(favorites);
    } catch (err) {
        showToast('Error loading favorites', 'error');
    }
}

function displayFavorites(recipes) {
    const list = document.getElementById('favoritesList');
    const emptyState = document.getElementById('emptyState');
    list.innerHTML = '';
    if (!recipes || recipes.length === 0) {
        emptyState.style.display = 'block';
        return;
    }
    emptyState.style.display = 'none';
    recipes.forEach(r => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.id = `fav-${r._id}`;
        card.innerHTML = `
            <img src="${r.image || 'https://via.placeholder.com/400x200?text=Recipe+Image'}" alt="${r.title}" />
            <div class="recipe-card-content">
                <div class="recipe-card-header">
                    <h3>${r.title}</h3>
                    <button class="btn-fav" onclick="handleFavorite('${r._id}', this)">❤️</button>
                </div>
                <p><strong>Category:</strong> ${r.category} • <strong>Difficulty:</strong> ${r.difficulty || 'Easy'}</p>
                <p><strong>Prep:</strong> ${r.prepTime || 0} mins • <strong>Cook:</strong> ${r.cookTime || 0} mins</p>
            </div>
        `;
        list.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', loadFavorites);
