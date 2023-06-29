const express = require("express");
const { validateRecipe, Recipe } = require("../models/favRecipe");
const recipeRoutes = express.Router();
const _ = require("lodash");
const auth = require("../midlewares/auth");
const { User } = require("../models/user");

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

  const user = await User.find({ _id: req.body.userId });
  console.log("user", user);

  const recipe = new Recipe({
    recipeName: req.body.recipeName,
    description: req.body.description,
    ingredients: req.body.ingredients,
    makingProcess: req.body.makingProcess,
    ratings: req.body.ratings,
    authorName: req.body.authorName,
    imgUrl: req.body.imgUrl,
    userId: req.body.userId,
  });

  recipe.populate("userId", "_id name mail");

  await recipe.save();
  res.send(recipe);
});

recipeRoutes.get("/:id", auth, async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    res.status(404).send("not found");
    return;
  }

  res.send(recipe);
});

module.exports = recipeRoutes;
