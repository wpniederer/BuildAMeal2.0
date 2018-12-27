const mongoose = require('mongoose');

//Recipe Schema
const  RecipeSchema = mongoose.Schema({
    recipeName: {
        type: String,
        required: true
    },
    recipeIngredients: {
        type: String,
        required: true
    },
    recipeTime: {
        type: String,
        required: true
    },
    recipeRating: {
        type: String,
        required: true
    },

    sourceRecipeUrl: {
        type: String,
        required: true
    },

    hostedLargeUrl: {
        type: String,
        required: true
    }

});

 module.exports = mongoose.model("Recipe", RecipeSchema);
