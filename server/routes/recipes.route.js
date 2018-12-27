const express = require('express');
const asyncHandler = require('express-async-handler');
const recipeCtrl = require('../controllers/recipe.controller');

const router = express.Router();
module.exports = router;


router.route('/')
    .post(asyncHandler(insert));


async function insert(req, res) {
    let recipe = await recipeCtrl.insert(req.body);
    res.json(recipe);
}
