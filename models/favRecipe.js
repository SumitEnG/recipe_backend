const Joi = require("joi");
const mongoose = require("mongoose");
Joi.objectId = require("joi-objectid")(Joi);

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
  authorName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  imgUrl: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
    authorName: Joi.string().required(),
    imgUrl: Joi.string(),
    userId: Joi.objectId(),
  });

  return schema.validate(recipe);
};

module.exports.Recipe = Recipe;
module.exports.validateRecipe = validateRecipe;
