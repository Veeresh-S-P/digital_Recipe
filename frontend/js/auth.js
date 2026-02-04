// Login
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const res = await fetch(`${BACKEND_URL}/api/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (data.token) {
                setToken(data.token);
                showToast('Login successful! Redirecting...', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                showToast(data.message || 'Login failed. Please try again.', 'error');
            }
        } catch (error) {
            showToast('Connection error. Please try again.', 'error');
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

        if (password.length < 6) {
            showToast('Password must be at least 6 characters', 'error');
            return;
        }

        try {
            const res = await fetch(`${BACKEND_URL}/api/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();
            if (data.token) {
                setToken(data.token);
                showToast('Registration successful! Redirecting...', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                showToast(data.message || 'Registration failed. Please try again.', 'error');
            }
        } catch (error) {
            showToast('Connection error. Please try again.', 'error');
        }
    });
}

// Logout
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        clearToken();
        showToast('Logged out successfully!', 'success');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
    }
}
