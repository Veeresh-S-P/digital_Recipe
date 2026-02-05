const Recipe = require('../models/Recipe');


const createRecipe = async (req, res) => {
    const { title, ingredients, steps, category, image, isPublic, prepTime, cookTime, difficulty } = req.body;

    const recipe = new Recipe({
        user: req.user._id,
        title,
        ingredients,
        steps,
        category,
        image,
        isPublic,
        prepTime: prepTime || 0,
        cookTime: cookTime || 0,
        difficulty: difficulty || 'Easy'
    });

    const created = await recipe.save();
    res.status(201).json(created);
};


const getPublicRecipes = async (req, res) => {
    try {
        const category = req.query.category;
        const difficulty = req.query.difficulty;
        const minPrep = parseInt(req.query.minPrep || '0', 10);
        const maxPrep = parseInt(req.query.maxPrep || '0', 10);
        let query = { isPublic: true };
        if (category) query.category = category;
        if (difficulty) query.difficulty = difficulty;
        if (minPrep) query.prepTime = { $gte: minPrep };
        if (maxPrep) query.prepTime = query.prepTime ? { ...query.prepTime, $lte: maxPrep } : { $lte: maxPrep };

        let query_builder = Recipe.find(query).populate('user', 'name');
        
        // Only apply sort if sort parameter is not empty
        const sort = req.query.sort || '';
        if (sort) {
            query_builder = query_builder.sort(sort);
        }
        
        const recipes = await query_builder.exec();
        res.json(recipes);
    } catch (error) {
        console.error('Error in getPublicRecipes:', error);
        res.status(500).json({ message: 'Error fetching recipes', error: error.message });
    }
};

// @desc    Get my recipes
// @route   GET /api/recipes/my
// @access  Private
const getMyRecipes = async (req, res) => {
    const recipes = await Recipe.find({ user: req.user._id });
    res.json(recipes);
};

// @desc    Update recipe
// @route   PUT /api/recipes/:id
// @access  Private
const updateRecipe = async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
    }

    if (recipe.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized' });
    }

    // ensure only allowed fields are updated
    const allowed = ['title','ingredients','steps','category','image','isPublic','prepTime','cookTime','difficulty'];
    const updates = {};
    allowed.forEach(k => { if (req.body[k] !== undefined) updates[k] = req.body[k]; });
    const updated = await Recipe.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(updated);
};

// @desc    Toggle favorite for a recipe for current user
// @route   POST /api/recipes/:id/favorite
// @access  Private
const toggleFavorite = async (req, res) => {
    const user = req.user;
    const recipeId = req.params.id;

    const already = user.favorites && user.favorites.find(f => f.toString() === recipeId);
    if (already) {
        // remove
        user.favorites = user.favorites.filter(f => f.toString() !== recipeId);
        await user.save();
        return res.json({ message: 'removed' });
    }

    user.favorites = user.favorites || [];
    user.favorites.push(recipeId);
    await user.save();
    res.json({ message: 'added' });
};

// @desc    Get favorite recipes for current user
// @route   GET /api/recipes/favorites
// @access  Private
const getFavorites = async (req, res) => {
    const user = await req.user.populate('favorites');
    res.json(user.favorites || []);
};

// @desc    Delete recipe
// @route   DELETE /api/recipes/:id
// @access  Private
const deleteRecipe = async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
    }

    if (recipe.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized' });
    }

    await recipe.deleteOne();
    res.json({ message: 'Recipe deleted successfully' });
};

module.exports = {
    createRecipe,
    getPublicRecipes,
    getMyRecipes,
    updateRecipe,
    deleteRecipe,
    toggleFavorite,
    getFavorites,
};
