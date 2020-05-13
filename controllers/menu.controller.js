const db = require("../models");
const Menu = db.menus;
const Recipe = db.recipes;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

// Create and Save a new menu for a user
exports.create = (req, res) => {
    // first retrieve random recipes from recipes table
    const user = req.params.user;
    const day = req.body.startDay;
    const limit = req.body.days;
    Recipe.findAll({
        where: {
            user_id: user
        },
        order: sequelize.random(),
        limit: limit
    })
    .then(data => {
        // then create menu with recipes
        const recipes = [];
        for (let i = 0; i < data.length; i++) {
            recipes.push(data[i].id)
        }
        const menu = {
          day: day,
          recipes: recipes,
          user_id: user,
        };
      
        // Save menu in the database
        Menu.create(menu)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the menu."
            });
          });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving recipes."
        });
      })

};

// Retrieve all menus for a user from the database
exports.findAll = (req, res) => {
  const user = req.params.user;
  Menu.findAll({
      where: {
          user_id: user
      }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving menus."
      });
    });
};

// Find last menu for a user 
exports.findLast = (req, res) => {
  const user = req.params.user;
    Menu.findAll({
        where: {
            user_id : user
        },
        order: [
          ['id', 'DESC']
        ],
        limit: 1
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving menu with id=" + id
      });
    });
};

// Update a menu for a user by the id in the request
exports.update = (req, res) => {
  const user = req.params.user;
  const id = req.params.id;
  Menu.update(req.body, {
    where: { 
        id : id,
        user_id : user
    }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Menu was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update menu with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating menu with id=" + id
      });
    });
};

// Delete a menu for a user with the specified id in the request
exports.delete = (req, res) => {
  const user = req.params.user;
  const id = req.params.id;
  Menu.destroy({
    where: { 
        id : id,
        user_id : user
    }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Menu was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete menu with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete menu with id=" + id
      });
    });
};

// Delete all menus for a user from the database
exports.deleteAll = (req, res) => {
  const user = req.params.user;
    Menu.destroy({
        where: { 
          user_id : user
        },
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} menus were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all menus."
          });
        });
};

// // Find all menu with condition
// exports.findAllPublished = (req, res) => {
//     Menu.findAll({ where: { published: true } })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving menus."
//       });
//     });
// };