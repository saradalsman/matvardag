module.exports = (sequelize, Sequelize) => {
    const User = require("./user.model.js")(sequelize, Sequelize);
    const Menu = sequelize.define("menu", {
        day: {
            type: Sequelize.STRING
        },
        recipes: {
            type: Sequelize.ARRAY(Sequelize.INTEGER)
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
  
    return Menu;
  };