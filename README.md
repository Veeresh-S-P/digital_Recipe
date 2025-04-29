# DIGI Recipe Book

A full-stack **Digital Recipe Book** web application that allows users to store, categorize, and share their favorite personal or family recipes. Built using **Node.js, Express, MongoDB** (Backend) and **HTML, CSS, JavaScript** (Frontend).

**Live Frontend URL**: [https://benevolent-phoenix-c10ecb.netlify.app/register](https://benevolent-phoenix-c10ecb.netlify.app/register)  
**Live Backend URL**: [https://recipe-backenddeploy.onrender.com](https://recipe-backenddeploy.onrender.com)

---

## Features

- User Registration & Login (JWT Authentication)
- Add personal or family recipes
- Categorize recipes (e.g., Breakfast, Lunch, Snacks, Dessert)
- Upload recipe image via URL
- Share recipes publicly or keep them private
- Edit or Delete your own recipes
- Responsive UI for mobile, tablet, and desktop
- Navbar with easy navigation
- Logout functionality
- Clean Intermediate-Level UI with media queries

---

##  Tech Stack

### Frontend
- HTML5 + CSS3 + JavaScript (Vanilla)
- Responsive Design using Media Queries
- Hosted on Netlify

### Backend
- Node.js + Express.js
- MongoDB Atlas
- Mongoose ODM
- JWT for Authentication
- Express Middleware (CORS, Error Handling)
- Hosted on Render

---


### Backend Setup

bash
git clone https://github.com/your-username/digi-recipe-book.git
cd digi-recipe-book/backend
npm install


##Create a .env file inside the backend:

MONGO_URL=your_mongodb_atlas_url
JWT_SECRET=your_jwt_secret
PORT=5009

## user Routes:

POST /api/users/register — Register a new user.

POST /api/users/login — Login and receive an authentication token.

## Recipe Routes:

GET /api/recipes — Fetch all publicly shared recipes. No authentication required.

GET /api/recipes/my — Get all recipes created by the logged-in user. Requires JWT token.

POST /api/recipes — Add a new recipe (title, category, ingredients, steps, etc.). Requires JWT token.

PUT /api/recipes/:id — Update a specific recipe by ID. Only the owner can update. Requires JWT token.

DELETE /api/recipes/:id — Delete a specific recipe by ID. Only the owner can delete. Requires JWT token.
