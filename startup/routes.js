module.exports = function (app) {
  const recipeRoute = require("../routes/recipe");
  const userRoutes = require("../routes/user");
  const errors = require("../midlewares/error");
  const authRoute = require("../routes/auth");
  const favRoute = require("../routes/fav");

  app.use("/api/recipes", recipeRoute);
  app.use("/api/user", userRoutes);
  app.use("/api/user", authRoute);
  app.use("/api/favRecipe", favRoute);
  app.use(errors);
};
