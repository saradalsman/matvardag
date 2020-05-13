const db = require("../models");
const User = db.users;

checkDuplicate = (req, res, next) => {
    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }
      next();
    });
};

const verifySignUp = {
    checkDuplicate: checkDuplicate,
  };
  
  module.exports = verifySignUp;