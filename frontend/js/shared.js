// ============================================
// SHARED UTILITIES - Used by all JS files
// ============================================

// Backend URL constant
const BACKEND_URL = 'https://recipe-backenddeploy.onrender.com';

// ============================================
// TOAST NOTIFICATION SYSTEM
// ============================================

/**
 * Display a toast notification
 * @param {string} message - The notification message
 * @param {string} type - Type: 'success', 'error', or 'info'
 */
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer') || createToastContainer();
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/**
 * Create a toast container if it doesn't exist
 * @returns {HTMLElement} The toast container
 */
function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toastContainer';
    document.body.appendChild(container);
    return container;
}

// ============================================
// AUTHENTICATION UTILITIES
// ============================================

/**
 * Get auth token from localStorage
 * @returns {string|null} The auth token
 */
function getToken() {
    return localStorage.getItem('token');
}

/**
 * Check if user is authenticated
 * @returns {boolean} True if authenticated
 */
function isAuthenticated() {
    return !!getToken();
}

/**
 * Require authentication - redirect if not logged in
 * @returns {string|null} The token if authenticated, null otherwise
 */
function requireAuth() {
    const token = getToken();
    if (!token) {
        showToast('Please login first', 'error');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
        return null;
    }
    return token;
}

// ============================================
// API REQUEST UTILITIES
// ============================================

/**
 * Make a GET request
 * @param {string} endpoint - The API endpoint
 * @param {string} token - Optional auth token
 * @returns {Promise} The response data
 */
async function apiGet(endpoint, token = null) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    try {
        const res = await fetch(`${BACKEND_URL}${endpoint}`, { headers });
        return await res.json();
    } catch (error) {
        console.error('GET request failed:', error);
        throw error;
    }
}

/**
 * Make a POST request
 * @param {string} endpoint - The API endpoint
 * @param {object} data - The request body
 * @param {string} token - Optional auth token
 * @returns {Promise} The response data
 */
async function apiPost(endpoint, data, token = null) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    try {
        const res = await fetch(`${BACKEND_URL}${endpoint}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });
        return await res.json();
    } catch (error) {
        console.error('POST request failed:', error);
        throw error;
    }
}

/**
 * Make a PUT request
 * @param {string} endpoint - The API endpoint
 * @param {object} data - The request body
 * @param {string} token - Optional auth token
 * @returns {Promise} The response data
 */
async function apiPut(endpoint, data, token = null) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    try {
        const res = await fetch(`${BACKEND_URL}${endpoint}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(data)
        });
        return await res.json();
    } catch (error) {
        console.error('PUT request failed:', error);
        throw error;
    }
}

/**
 * Make a DELETE request
 * @param {string} endpoint - The API endpoint
 * @param {string} token - Optional auth token
 * @returns {Promise} The response data
 */
async function apiDelete(endpoint, token = null) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    try {
        const res = await fetch(`${BACKEND_URL}${endpoint}`, {
            method: 'DELETE',
            headers
        });
        return await res.json();
    } catch (error) {
        console.error('DELETE request failed:', error);
        throw error;
    }
}

// ============================================
// FORM VALIDATION UTILITIES
// ============================================

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} Validation result with isValid and message
 */
function validatePassword(password) {
    if (password.length < 6) {
        return { isValid: false, message: 'Password must be at least 6 characters' };
    }
    return { isValid: true, message: 'Password is valid' };
}

/**
 * Sanitize user input
 * @param {string} input - Input to sanitize
 * @returns {string} Sanitized input
 */
function sanitizeInput(input) {
    return input.trim();
}

/**
 * Parse comma-separated list
 * @param {string} text - Comma-separated text
 * @returns {array} Array of trimmed items
 */
function parseList(text) {
    return text.split(',')
        .map(item => item.trim())
        .filter(item => item.length > 0);
}

// ============================================
// STORAGE UTILITIES
// ============================================

/**
 * Save recipe ID to edit
 * @param {string} recipeId - The recipe ID
 */
function setEditRecipeId(recipeId) {
    localStorage.setItem('editRecipeId', recipeId);
}

/**
 * Get recipe ID to edit
 * @returns {string|null} The recipe ID
 */
function getEditRecipeId() {
    return localStorage.getItem('editRecipeId');
}

/**
 * Clear recipe ID from storage
 */
function clearEditRecipeId() {
    localStorage.removeItem('editRecipeId');
}

/**
 * Save auth token
 * @param {string} token
 */
function setToken(token) {
    localStorage.setItem('token', token);
}

/**
 * Clear auth token
 */
function clearToken() {
    localStorage.removeItem('token');
}

// ============================================
// DOM UTILITIES
// ============================================

/**
 * Safely get element by ID
 * @param {string} elementId - Element ID
 * @returns {HTMLElement|null} The element or null
 */
function getElement(elementId) {
    return document.getElementById(elementId);
}

/**
 * Get form input value
 * @param {string} elementId - Input element ID
 * @returns {string} The input value
 */
function getInputValue(elementId) {
    const element = getElement(elementId);
    return element ? element.value : '';
}

/**
 * Set form input value
 * @param {string} elementId - Input element ID
 * @param {string} value - The value to set
 */
function setInputValue(elementId, value) {
    const element = getElement(elementId);
    if (element) {
        element.value = value;
    }
}

/**
 * Show element
 * @param {string} elementId - Element ID
 */
function showElement(elementId) {
    const element = getElement(elementId);
    if (element) {
        element.style.display = 'block';
    }
}

/**
 * Hide element
 * @param {string} elementId - Element ID
 */
function hideElement(elementId) {
    const element = getElement(elementId);
    if (element) {
        element.style.display = 'none';
    }
}

// ============================================
// NAMING CONVENTIONS
// ============================================
// All functions use camelCase (e.g., getUserData)
// All constants use UPPER_SNAKE_CASE (e.g., BACKEND_URL)
// All variables use camelCase (e.g., recipeData)
// All boolean functions start with 'is' (e.g., isValidEmail)
// All getter functions start with 'get' (e.g., getToken)
// All setter functions start with 'set' (e.g., setEditRecipeId)
// All API functions start with 'api' (e.g., apiGet)
// ============================================
