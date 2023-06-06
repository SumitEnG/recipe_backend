const Joi = require("joi");
const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  makingProcess: {
    type: [String],
    required: true,
  },
  ratings: Number,
  authorName: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Recipe = new mongoose.model("Recipe", recipeSchema);

const validateRecipe = (recipe) => {
  const schema = Joi.object({
    description: Joi.string().required(),
    ingredients: Joi.array().items(Joi.string()).required(),
    makingProcess: Joi.array().items(Joi.string()).required(),
    ratings: Joi.number(),
    authorName: Joi.string(),
    date: Joi.string(),
  });

  return schema.validate(recipe);
};

module.exports.Recipe = Recipe;
module.exports.validateRecipe = validateRecipe;