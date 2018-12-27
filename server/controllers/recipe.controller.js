const Joi = require("joi");
const Recipe = require("../models/recipes.model");

const recipeSchema = Joi.object({
    recipeName: Joi.string().required(),
    recipeIngredients: Joi.string().required(),
    recipeTime: Joi.string().required(),
    recipeRating: Joi.string().required(),
    sourceRecipeUrl: Joi.string().required(),
    hostedLargeUrl: Joi.string().required()
})

module.exports = {
    insert
};

async function insert(recipe) {
    recipe = await Joi.validate(recipe, recipeSchema, { abortEarly: false });
    return await new Recipe(recipe).save();
};
