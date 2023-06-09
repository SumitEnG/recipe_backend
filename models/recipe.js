const Joi = require("joi");
const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  recipeName: {
    type: String,
    required: true,
  },
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
  ratings: {
    type: Number,
    default: null,
  },
  authorName: String,
  date: {
    type: Date,
    default: Date.now,
  },
  imgUrl: {
    type: String,
  },
});

const Recipe = new mongoose.model("Recipe", recipeSchema);

const validateRecipe = (recipe) => {
  const schema = Joi.object({
    recipeName: Joi.string().required(),
    description: Joi.string().required(),
    ingredients: Joi.array().items(Joi.string()).required(),
    makingProcess: Joi.array().items(Joi.string()).required(),
    ratings: Joi.number(),
    authorName: Joi.string(),
    imgUrl: Joi.string(),
  });

  return schema.validate(recipe);
};

module.exports.Recipe = Recipe;
module.exports.validateRecipe = validateRecipe;
