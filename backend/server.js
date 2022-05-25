require("dotenv").config();
require("./models/db");
///const jwt = require("jsonwebtoken");
const express = require("express");
const path = require("path");
//const exphbs=require('express-handlebars');
const exphbs = require("express-handlebars");
const bodyparser = require("body-parser");
const foodfacilityController = require("./controller/foodfacilityController");
const accountController = require("./controller/accountController");
var app = express();
//app.use(express.static('./filestatuc'))
app.use(
          bodyparser.urlencoded({
                    extended: true,
          })
);
app.use(bodyparser.json());
// app.set("views", path.join(__dirname, "/views/"));
// app.engine(
//           "php",
//           exphbs.engine({
//                     extname: "php",
//                     defaultLayout: "",
//                     layoutsDir: __dirname + "/views/layouts/",
//           })
// );
// app.set("view engine", "php");
app.listen(3000, () => {
          console.log("Express server started at port :3000");
});
app.use("/foodfacility", foodfacilityController);
app.use("/account", accountController);


app.all("*", (req, res) => {
          res.status(404).send("<h1>resouces not found</h1>");
});
