const backendURL = 'https://recipe-backenddeploy.onrender.com';

// Login
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const res = await fetch(`${backendURL}/api/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (data.token) {
            localStorage.setItem('token', data.token);
            alert('Login successful!');
            window.location.href = 'index.html';
        } else {
            alert(data.message);
        }
    });
}

// Register
if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
      

        const res = await fetch(`${backendURL}/api/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();
        if (data.token) {
            localStorage.setItem('token', data.token);
            alert('Registration successful!');
            window.location.href = 'login.html';
        } else {
            alert(data.message);
        }
    });
}

// Logout
function logout() {
    localStorage.removeItem('token');
    alert('Logged out successfully!');
    window.location.href = 'login.html';
}
