module.exports = function (app) {
  const recipeRoute = require("../routes/recipe");
  const errors = require("../midlewares/error");

  app.use("/api/recipes", recipeRoute);
  app.use(errors);
};
