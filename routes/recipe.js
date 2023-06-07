const express = require("express");
const { validateRecipe, Recipe } = require("../models/recipe");
const recipeRoutes = express.Router();
const _ = require("lodash");

recipeRoutes.get("/", async (req, res) => {
  const recipe = await Recipe.find();
  res.send(recipe);
});

recipeRoutes.post("/", async (req, res) => {
  const result = validateRecipe(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const recipe = new Recipe(
    _.pick(req.body, [
      "recipeName",
      "description",
      "ingredients",
      "makingProcess",
      "ratings",
      "authorName",
    ])
  );

  await recipe.save();
  res.send(recipe);
});

module.exports = recipeRoutes;
