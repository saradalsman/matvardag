//     app.use('/api/recipes', router);

const { authJwt } = require("../middlewares");
const recipes = require("../controllers/recipe.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a new recipe for a user
  app.post(
    "/api/recipes/:user",
    [authJwt.verifyToken],
    recipes.create 
  )

 // Retrieve all recipes for a user
  app.get(
    "/api/recipes/:user",
    [authJwt.verifyToken],
    recipes.findAll
  );

  // Retrieve a random recipe for a user not matching id
   app.get(
       "/api/recipes/:user/random/:id",
       [authJwt.verifyToken],
       recipes.findRandom
   );

   // Retrieve a single recipe for a user with id
    app.get(
        "/api/recipes/:user/:id",
        [authJwt.verifyToken],
        recipes.findOne
    );

// Update a recipe for a user with id
app.put(
    "/api/recipes/:user/:id",
    [authJwt.verifyToken],
    recipes.update
);
    
// Delete a recipe for a user with id
app.delete(
    "/api/recipes/:user/:id",
    [authJwt.verifyToken],
    recipes.delete
);

// Delete all recipes for a user
app.delete(
    "/api/recipes:user",
    [authJwt.verifyToken],
    recipes.deleteAll
  );
};