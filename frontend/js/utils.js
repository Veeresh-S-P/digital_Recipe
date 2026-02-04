// DEPRECATED: utilities moved to shared.js
// Keep this file as a compatibility shim for now.
console.warn('frontend/js/utils.js is deprecated — use frontend/js/shared.js instead');

// Minimal shim functions to avoid runtime errors if any page still imports this file.
function showToast() { console.warn('showToast: use shared.showToast instead'); }
function createToastContainer() { return document.getElementById('toastContainer') || null; }
function checkAuth() { return !!localStorage.getItem('token'); }

