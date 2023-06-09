const express = require("express");
const { validateRecipe, Recipe } = require("../models/recipe");
const recipeRoutes = express.Router();
const _ = require("lodash");
const multer = require("multer");

recipeRoutes.use(express.urlencoded());

const upload = multer({ dest: "uploads/" });

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

recipeRoutes.get("/:id", async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    res.status(404).send("not found");
    return;
  }

  res.send(recipe);
});

recipeRoutes.post("/upload", upload.single("recipeImage"), (req, res) => {
  console.log(req.file);
  console.log(req.body);
});

module.exports = recipeRoutes;
