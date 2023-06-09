const express = require("express");
const { validateRecipe, FavRecipe } = require("../models/favRecipe");
const favRacipeRoutes = express.Router();
const _ = require("lodash");
const auth = require("../midlewares/auth");
const { User } = require("../models/user");

favRacipeRoutes.get("/", async (req, res) => {
  const recipe = await FavRecipe.find();
  res.send(recipe);
});

favRacipeRoutes.post("/", auth, async (req, res) => {
  const result = validateRecipe(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const user = await User.find({ _id: req.body.userId });
  console.log("user", user);

  const recipe = new FavRecipe({
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

favRacipeRoutes.get("/:id", auth, async (req, res) => {
  const recipe = await FavRecipe.findById(req.params.id);

  if (!recipe) {
    res.status(404).send("not found");
    return;
  }

  res.send(recipe);
});

favRacipeRoutes.delete("/:id", async (req, res) => {
  const recipe = await FavRecipe.findByIdAndDelete(req.params.id);
  res.send(recipe);
});

module.exports = favRacipeRoutes;
