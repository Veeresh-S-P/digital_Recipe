# 🍳 DIGI Recipe Book

A modern, full-featured recipe sharing and management application built with Node.js, Express, MongoDB, and Vanilla JavaScript.

## ✨ Features

### Authentication & User Management
- ✅ User registration and login with JWT authentication
- ✅ Secure password hashing with bcrypt
- ✅ Token-based authentication (Bearer tokens)
- ✅ Session persistence in localStorage

### Recipe Management
- ✅ Create, read, update, and delete recipes
- ✅ Add multiple ingredients and step-by-step instructions
- ✅ Rich metadata: prep time, cook time, difficulty level
- ✅ Public and private recipe visibility
- ✅ User ownership and authorization

### Favorites & Bookmarks
- ✅ Save recipes as favorites with heart button
- ✅ Dedicated "My Favorites" page
- ✅ Favorite status synced across all pages
- ✅ Remove recipes from favorites anytime
- ✅ Persistent favorite storage (database)

### Search & Filter
- ✅ Search recipes by title
- ✅ Filter by category (Breakfast, Lunch, Dinner, Snacks, Dessert, Beverage)
- ✅ Sort by difficulty and preparation time
- ✅ Real-time search results

### Dark Mode
- ✅ Light and dark theme support
- ✅ One-click theme toggle (🌙 / ☀️)
- ✅ Professional color schemes for both modes
- ✅ Persistent theme preference
- ✅ Smooth transitions between themes
- ✅ Optimized image filters for dark mode

### UI/UX Features
- ✅ Toast notifications (success, error, info)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Professional card-based layout
- ✅ Smooth animations and hover effects
- ✅ Empty state indicators
- ✅ Loading states
- ✅ Professional image handling with filters
- ✅ Clickable logo for home navigation

## 🛠️ Tech Stack

### Frontend
- **HTML5** — Semantic markup
- **CSS3** — Responsive design with CSS variables for theming
- **Vanilla JavaScript** — No frameworks, pure DOM manipulation
- **localStorage** — Client-side storage for auth tokens and preferences

### Backend
- **Node.js** — JavaScript runtime
- **Express.js** — Web framework
- **MongoDB** — NoSQL database
- **Mongoose** — MongoDB ODM
- **bcrypt** — Password hashing
- **jsonwebtoken (JWT)** — Authentication
- **CORS** — Cross-origin resource sharing
- **dotenv** — Environment configuration

## 📋 Project Structure

```
digital_Recipe/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection setup
│   ├── controllers/
│   │   ├── authController.js  # Auth logic (login, register)
│   │   └── recipeController.js # Recipe CRUD & favorites
│   ├── middleware/
│   │   ├── authMiddleware.js  # JWT verification
│   │   └── errorHandler.js    # Error handling
│   ├── models/
│   │   ├── User.js            # User schema with favorites
│   │   └── Recipe.js          # Recipe schema
│   ├── routes/
│   │   ├── authRoutes.js      # /api/users endpoints
│   │   └── recipeRoutes.js    # /api/recipes endpoints
│   ├── server.js              # Express app setup
│   └── package.json           # Dependencies
├── frontend/
│   ├── index.html             # Home - public recipes
│   ├── login.html             # User login
│   ├── register.html          # User registration
│   ├── addRecipe.html         # Create recipe form
│   ├── editRecipe.html        # Edit recipe form
│   ├── myRecipes.html         # User's own recipes
│   ├── myFavorites.html       # Bookmarked recipes
│   ├── css/
│   │   └── style.css          # Global styles with dark mode support
│   └── js/
│       ├── shared.js          # Shared utilities & API helpers
│       ├── auth.js            # Auth logic (login, register, logout)
│       ├── recipes.js         # Public recipes page
│       ├── createRecipe.js    # Recipe creation logic
│       ├── editRecipe.js      # Recipe editing logic
│       ├── myrecipes.js       # User's recipes page
│       └── myfavorites.js     # Favorites page
└── README.md                  # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud via MongoDB Atlas)
- Modern web browser

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file** in backend directory:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5009
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5009`

### Frontend Setup

1. **Open frontend pages in browser:**
   - Use Live Server VS Code extension
   - Or open directly in browser: `file:///path/to/frontend/index.html`
   - Or use any local web server

2. **Backend URL Configuration:**
   - Frontend is configured to use the deployed backend: `https://recipe-backenddeploy.onrender.com`
   - All API calls automatically go to the production server
   - To use local backend, update `BACKEND_URL` in `frontend/js/shared.js` to `http://localhost:5009`

**Live URLs:**
- **Frontend**: [https://benevolent-phoenix-c10ecb.netlify.app](https://benevolent-phoenix-c10ecb.netlify.app)
- **Backend API**: [https://recipe-backenddeploy.onrender.com](https://recipe-backenddeploy.onrender.com)

## 📚 API Endpoints

### Authentication
- `POST /api/users/register` — Create new user account
- `POST /api/users/login` — Login with email and password

### Recipes
- `GET /api/recipes` — Get all public recipes (with query filters)
- `POST /api/recipes` — Create new recipe (authenticated)
- `GET /api/recipes/my` — Get user's recipes (authenticated)
- `GET /api/recipes/:id` — Get recipe details
- `PUT /api/recipes/:id` — Update recipe (authenticated)
- `DELETE /api/recipes/:id` — Delete recipe (authenticated)

### Favorites
- `POST /api/recipes/:id/favorite` — Toggle favorite status (authenticated)
- `GET /api/recipes/favorites` — Get user's favorite recipes (authenticated)

### Query Parameters (GET /api/recipes)
- `category` — Filter by category
- `difficulty` — Filter by difficulty level
- `minPrep` — Minimum prep time (minutes)
- `maxPrep` — Maximum prep time (minutes)
- `sort` — Sort field (e.g., 'prepTime' or '-prepTime')

## 🎨 Theming & Dark Mode

### Light Mode (Default)
- Clean, bright background with gradient
- Dark text for optimal readability
- Purple accent colors (#667eea, #764ba2)

### Dark Mode
- Deep charcoal background (#1a1a1a - #2d2d2d)
- Light gray text (#f0f0f0)
- Enhanced image filters for visibility
- Subtle blue accent colors
- Professional appearance

**Toggle Theme:** Click the 🌙 (moon) button in navbar. It changes to ☀️ (sun) when dark mode is active.

**Theme Preference:** Your choice is saved in localStorage and persists across sessions.

## 🔐 Security Features

- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT-based stateless authentication
- ✅ Protected routes with authMiddleware
- ✅ Input validation
- ✅ CORS enabled for frontend communication
- ✅ Authorization checks on protected endpoints
- ✅ User ownership verification for recipe operations

## 📱 Responsive Design

Fully responsive across all devices:
- 📱 Mobile (320px and up)
- 📱 Tablets (768px and up)
- 💻 Desktops (1024px and up)
- 💻 Large displays (1200px and up)

Media queries adjust:
- Navigation layout (stacked on mobile)
- Grid columns (4 → 3 → 2 → 1)
- Font sizes
- Padding and spacing

## 🎯 Key Features Explained

### Recipe Creation
1. Click "Add Recipe" from navbar
2. Fill in recipe details:
   - Title and image URL
   - Ingredients (comma-separated list)
   - Cooking steps (one per input)
   - Prep time (minutes)
   - Cook time (minutes)
   - Difficulty level (Easy, Medium, Hard)
   - Category selection
   - Public/Private visibility toggle
3. Click "Create Recipe"

### Recipe Editing
1. Go to "My Recipes" page
2. Click "Edit" button on your recipe
3. Modify any recipe details
4. Click "Update Recipe"
5. Changes saved immediately

### Recipe Deletion
1. Go to "My Recipes" page
2. Click "Delete" button on your recipe
3. Confirm deletion when prompted
4. Recipe removed from system

### Favorites System
- Click heart (♡) on any recipe to bookmark
- Heart fills and turns red (❤️) when favorited
- Click again to unfavorite
- Heart status syncs across all pages
- View all bookmarked recipes in "My Favorites" page
- Favorites persist in database (even after logout)

### Search & Filter
- **Real-time search:** Type in search box to find recipes by title
- **Category filter:** Select from dropdown to filter by type
- **Combine both:** Search + Filter together for best results
- Results update instantly as you type or change filters

## 🖼️ Image Handling & Professional Styling

### Light Mode
- Brightness: 100%
- Subtle inset shadow for depth
- Smooth scale animation (1.08x) on hover

### Dark Mode
- Brightness: 92% (slightly darker for dark background)
- Contrast: +8% (more defined)
- Saturation: +5% (richer colors)
- Inset shadow for depth and definition
- Smooth transitions between states

### Animation
- 0.4s cubic-bezier easing for professional feel
- Enhanced shadows on card hover
- Subtle brightness transitions
- Image zooms smoothly on card hover

## 📝 Data Models

### Recipe Model
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  title: String (required),
  ingredients: [String] (required),
  steps: [String] (required),
  category: String (required),
  prepTime: Number (default: 0),
  cookTime: Number (default: 0),
  difficulty: String (default: 'Easy', enum: ['Easy', 'Medium', 'Hard']),
  image: String (optional image URL),
  isPublic: Boolean (default: false),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

### User Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  favorites: [ObjectId] (ref: Recipe, default: []),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## 🐛 Troubleshooting

### Backend won't start
- ✅ Check MongoDB connection string in `.env`
- ✅ Verify `PORT` 5009 is not already in use
- ✅ Run `npm install` to ensure all dependencies
- ✅ Check for syntax errors in controller files

### Frontend shows 500 error
- ✅ Verify backend server is running on port 5009
- ✅ Check browser console (F12) for specific API errors
- ✅ Confirm `BACKEND_URL` in `shared.js` matches server address
- ✅ Check CORS is enabled in `server.js`

### Images not loading
- ✅ Verify image URL is valid and accessible
- ✅ Check browser console for 404 errors
- ✅ In dark mode, images have filters applied (expected behavior)

### Login/Token issues
- ✅ Clear browser localStorage (DevTools → Application → Storage)
- ✅ Log in again to generate new token
- ✅ Verify `JWT_SECRET` matches between `.env` and code

### Favorites not syncing
- ✅ Ensure you're logged in (token in localStorage)
- ✅ Hard refresh browser (Ctrl+Shift+R)
- ✅ Check backend server is running

## 📖 Usage Workflows

### User Registration & Login
```
1. Visit register.html
2. Enter name, email, password
3. Click "Create Account"
4. System creates user account
5. Redirects to login.html
6. Enter email and password
7. Click "Sign In"
8. Token stored in localStorage
9. Redirected to home page
```

### Create & Share Recipe
```
1. Click "Add Recipe" in navbar
2. Fill recipe form with details
3. Toggle "Make Public" for sharing
4. Click "Create Recipe"
5. Recipe appears on home page (if public)
6. View in "My Recipes" (always visible to you)
```

### Discover & Bookmark
```
1. Browse public recipes on home page
2. Search by title or filter by category
3. Click heart (♡) on interesting recipes
4. View all bookmarks in "My Favorites"
5. Remove from favorites anytime
```

## 🎓 Learning Resources

This project demonstrates:
- Full-stack web development (frontend + backend)
- RESTful API design principles
- JWT token-based authentication
- MongoDB data modeling and queries
- Mongoose schema and population
- Responsive CSS with media queries
- Dark mode with CSS variables
- DOM manipulation with vanilla JavaScript
- Form validation and error handling
- CORS and middleware concepts
- Secure password hashing
- Environment configuration

## ✅ Testing Checklist

- [ ] User can register with valid email
- [ ] User can login with correct credentials
- [ ] User cannot login with wrong password
- [ ] User can create public recipe
- [ ] User can create private recipe
- [ ] Recipe appears on home page (if public)
- [ ] User can edit own recipes
- [ ] User cannot edit others' recipes
- [ ] User can delete own recipes
- [ ] Search filters recipes by title
- [ ] Category filter works correctly
- [ ] Favorite button toggles properly
- [ ] Favorites persist after logout/login
- [ ] Dark mode toggle works
- [ ] Theme preference persists
- [ ] Images display correctly in both themes
- [ ] Mobile layout is responsive
- [ ] Toast notifications appear
- [ ] Logout clears token
- [ ] Logo redirects to home

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! To contribute:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your improvements
4. Commit changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

## 👨‍💻 Author

Created as a modern recipe sharing platform with professional features and user experience.

## 📞 Support & Issues

For issues or questions:
1. Check the Troubleshooting section above
2. Review browser console (F12) for error messages
3. Verify all setup steps are complete
4. Check MongoDB connection
5. Open an issue on GitHub

## 🎉 Getting Help

- **Backend errors:** Check server terminal output
- **Frontend errors:** Press F12 → Console tab
- **Database errors:** Verify MongoDB URI and credentials
- **API errors:** Check network tab in DevTools

---

**Enjoy sharing your recipes! Happy cooking! 🍳**

*Last Updated: February 2026*



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
