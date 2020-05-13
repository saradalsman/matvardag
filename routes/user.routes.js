const { authJwt } = require("../middlewares");
const users = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Retrieve all users
  app.get(
    "/api/users",
    [authJwt.verifyToken],
    users.findAll
  );

// Retrieve user with id
    app.get(
        "/api/users/:id",
        [authJwt.verifyToken],
        users.findOne
    );

// Update a user with id
app.put(
    "/api/users/:id",
    [authJwt.verifyToken],
    users.update
);
    
// Delete a user with id
app.delete(
    "/api/users/:id",
    [authJwt.verifyToken],
    users.delete
);

// Delete all users
app.delete(
    "/api/users",
    [authJwt.verifyToken],
    users.deleteAll
  );
};
