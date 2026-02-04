
// ============================================
// CREATE RECIPE HANDLER
// ============================================
document.getElementById('recipeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
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

    const token = getToken();
    if (!token) {
        showToast('Please login first', 'error');
        window.location.href = 'login.html';
        return;
    }

    try {
        const res = await fetch(`${BACKEND_URL}/api/recipes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title, ingredients, steps, category, image, isPublic })
        });

        const data = await res.json();
        if (data._id) {
            showToast('Recipe created successfully!', 'success');
            setTimeout(() => {
                window.location.href = 'myRecipes.html';
            }, 1500);
        } else {
            showToast(data.message || 'Failed to create recipe', 'error');
        }
    } catch (error) {
        showToast('Error creating recipe. Please try again.', 'error');    }
});