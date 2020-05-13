module.exports = (sequelize, Sequelize) => {
    const User = require("./user.model.js")(sequelize, Sequelize);
    const Recipe = sequelize.define("recipe", {
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        instructions: {
            type: Sequelize.ARRAY(Sequelize.TEXT)
        },
        ingredients: {
            type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.STRING))
        },
        tags: {
            type: Sequelize.ARRAY(Sequelize.STRING)
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            }
        },
    });
  
    return Recipe;
  };