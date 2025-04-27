
//const backendURL = 'https://recipe-backenddeploy.onrender.com';

document.getElementById('recipeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const ingredients = document.getElementById('ingredients').value.split(',');
    const steps = document.getElementById('steps').value.split(',');
    const category = document.getElementById('category').value;
    const image = document.getElementById('image').value;
    const isPublic = document.getElementById('isPublic').value === 'true';

    const token = localStorage.getItem('token');

    const res = await fetch(`${backendURL}/api/recipes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, ingredients, steps, category, image, isPublic })
    });

    const data = await res.json();
    if (data._id) {
        alert('Recipe created successfully!');
        window.location.href = 'myRecipes.html';
    } else {
        alert(data.message);
    }
});
