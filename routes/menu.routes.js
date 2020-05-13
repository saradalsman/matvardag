const { authJwt } = require("../middlewares");
const menus = require("../controllers/menu.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a new menu for a user
  app.post(
    "/api/menus/:user",
    [authJwt.verifyToken],
    menus.create 
  )

 // Retrieve all menus for a user
  app.get(
    "/api/menus/:user",
    [authJwt.verifyToken],
    menus.findAll
  );

// Retrieve last created menu for a user
    app.get(
        "/api/menus/:user/single",
        [authJwt.verifyToken],
        menus.findLast
    );

// Update a menu for a user with id
app.put(
    "/api/menus/:user/:id",
    [authJwt.verifyToken],
    menus.update
);
    
// Delete a menu for a user with id
app.delete(
    "/api/menus/:user/:id",
    [authJwt.verifyToken],
    menus.delete
);

// Delete all menus for a user
app.delete(
    "/api/menus/:user",
    [authJwt.verifyToken],
    menus.deleteAll
  );
};