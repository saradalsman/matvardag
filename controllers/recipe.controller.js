const db = require("../models");
const Recipe = db.recipes;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;


// Create and Save a new recipe for a user
exports.create = (req, res) => {
    // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create recipe
  const recipe = {
    name: req.body.name,
    description: req.body.description,
    instructions: req.body.instructions,
    ingredients: req.body.ingredients,
    tags: req.body.tags,
    user_id: req.params.user,
  };

  // Save recipe in the database
  Recipe.create(recipe)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the recipe."
      });
    });
};

// Retrieve all recipes for a user from the database
exports.findAll = (req, res) => {
  const user = req.params.user;
  Recipe.findAll({
      where: {
          user_id: user
      },
      order: [
          ['name', 'ASC']
      ]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving recipes."
      });
    });
};

// Find a random recipe for a user
exports.findRandom = (req, res) => {
    const user = req.params.user;
    const id = req.params.id;
    Recipe.findOne({
        where: {
          user_id : user,
          id: {
            [Op.ne]: id
          }
        },
        order: sequelize.random(),
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving random recipe"
      });
    });
};

// Find a single recipe for a user with an id
exports.findOne = (req, res) => {
    const user = req.params.user;
    const id = req.params.id;
    Recipe.findOne({
        where: {
          user_id : user,
          id : id
        }
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving recipe with id=" + id
      });
    });
};

// Update a recipe for a user by the id in the request
exports.update = (req, res) => {
    const user = req.params.user;
    const id = req.params.id;
  Recipe.update(req.body, {
    where: { 
      user_id: user,
      id: id,
    }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Recipe was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update recipe with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating recipe with id=" + id
      });
    });
};

// Delete a recipe for a user with the specified id in the request
exports.delete = (req, res) => {
    const user = req.params.user;
    const id = req.params.id;
  Recipe.destroy({
    where: { 
      user_id: user,
      id: id,
    }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Recipe was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete recipe with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete recipe with id=" + id
      });
    });
};

// Delete all recipes for a user from the database.
exports.deleteAll = (req, res) => {
  const user = req.params.user;
    Recipe.destroy({
        where: { 
          user_id : user
        },
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} recipes were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all recipes."
          });
        });
};

// Find all ingredients in recipes NOT USED
exports.findAllIngredients = (req, res) => {
  const user = req.params.user;

    Recipe.findAll({
      attributes: ['ingredients'],
      where: { 
        user_id : user
      },
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving recipes."
      });
    });
};