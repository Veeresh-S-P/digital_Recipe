const recipeId = getEditRecipeId();

// Load recipe data
async function loadRecipeData() {
    const token = getToken();
    if (!recipeId || !token) {
        showToast('Error: Invalid recipe ID or not authenticated', 'error');
        window.location.href = 'myRecipes.html';
        return;
    }

    try {
        const res = await fetch(`${BACKEND_URL}/api/recipes/my`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const recipes = await res.json();
        const recipe = recipes.find(r => r._id === recipeId);

        if (!recipe) {
            showToast('Error: Recipe not found', 'error');
            window.location.href = 'myRecipes.html';
            return;
        }

        document.getElementById('title').value = recipe.title;
        document.getElementById('category').value = recipe.category;
        document.getElementById('ingredients').value = recipe.ingredients.join(', ');
        document.getElementById('steps').value = recipe.steps.join(', ');
        document.getElementById('image').value = recipe.image || '';
        document.getElementById('isPublic').value = recipe.isPublic;
    } catch (error) {
        showToast('Error loading recipe', 'error');
    }
}

if (document.getElementById('editRecipeForm')) {
    document.getElementById('editRecipeForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const token = getToken();
        if (!token) {
            showToast('Please login first', 'error');
            window.location.href = 'login.html';
            return;
        }

        const title = document.getElementById('title').value.trim();
        const ingredients = document.getElementById('ingredients').value.split(',').map(i => i.trim()).filter(i => i);
        const steps = document.getElementById('steps').value.split(',').map(s => s.trim()).filter(s => s);
        const category = document.getElementById('category').value;
        const image = document.getElementById('image').value.trim();
        const isPublic = document.getElementById('isPublic').value === 'true';

        if (!title || ingredients.length === 0 || steps.length === 0 || !category) {
            showToast('Please fill in all required fields', 'error');
            return;
        }

        try {
            const res = await fetch(`${BACKEND_URL}/api/recipes/${recipeId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title, ingredients, steps, category, image, isPublic })
            });

            const data = await res.json();
            if (data._id) {
                showToast('Recipe updated successfully!', 'success');
                setTimeout(() => {
                    window.location.href = 'myRecipes.html';
                }, 1500);
            } else {
                showToast(data.message || 'Failed to update recipe', 'error');
            }
        } catch (error) {
            showToast('Error updating recipe. Please try again.', 'error');
        }
    });
    // Load recipe when page loads
    loadRecipeData();
}
