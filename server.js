const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const app = express();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to menumaker application." });
});
var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const db = require("./models");
db.sequelize.sync();

// //first time only
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

require("./routes/recipe.routes")(app);
require("./routes/menu.routes")(app);
require("./routes/user.routes")(app);
require('./routes/auth.routes')(app);

app.listen(PORT, function(){
    console.log(`App running on:${PORT}`);
});
