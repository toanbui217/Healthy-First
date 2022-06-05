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
const rewrite = require("express-urlrewrite");
const auth = require("./middleware/auth");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sanitize = require("mongo-sanitize");
const filter = require("content-filter");
//can hong 2 dong
const mongoose = require("mongoose");
const Account = mongoose.model("Account");
var app = express();

//app.use(express.static('./filestatuc'))
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(bodyparser.json());
app.use(filter());
//viet lai dinh tuyen url
//https://www.npmjs.com/package/express-urlrewrite
//app.use(rewrite(/^\/f(\w+)/, "/foodfacility/$1"));
//midleware
//app.use(setAccount);

// app.get("*", function (req, res, next) {
//           if (req.url === "/" || req.url === "/login") {
//                     return next();
//           } else {
//                     app.use(auth.auth);
//           }
// });
//rewirite chuan, dung , chinh xac
// app.use(rewrite("/dang-nhap/*", "/login/$1"), function (req, res, next) {
//   var old_url = req.url;
//   console.log(req.url);
//   //req.url = "/index";
//   next();
// });

app.post("/login", (req, res) => {
  // const username = req.body.username;
  // const user = { name: username };
  // const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  // res.json({ accessToken: accessToken });
  //console.log(req.body);
  //   const username = req.body.username;
  //   const user = { name: username };
  //   const accessToken = generateAccessToken(user);
  //https://viblo.asia/p/refresh-token-la-gi-cach-hoat-dong-co-khac-gi-so-voi-token-khong-E375zQB2lGW

  // refreshTokens.push(refreshToken);
  //   console.log(refreshTokens);

  //   res.json({ accessToken: accessToken, refreshToken: refreshToken });
  const { username, password } = sanitize(req.body);
  //   const refreshToken = jwt.sign(
  //             username,
  //             process.env.REFRESH_TOKEN_SECRET,
  //             { expiresIn: "900h" }
  //   );
  //   refreshTokens.push(refreshToken);
  //   console.log(refreshTokens);
  Account.findOne({ username })
    .then(async (data) => {
      if (!data) {
        return res.status(401).send({
          message: "User doesn't exist",
        });
      }

      const isPasswordCorrect = await bcrypt.compare(password, data.password);

      if (!isPasswordCorrect) {
        return res.status(401).send({
          message: "Invalid username or password!",
        });
      }

      const token = jwt.sign(
        { username: data.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "900h" }
      );

      res.status(200).send({
        username: username,
        id: data._id,
        role: data.role,
        token: token,
        district: data.district,
      });
    })
    .catch((err) => {
      res.status(403).send({
        message: "Nosql injection when login : " + err,
      });
    });
});
app.use(auth.auth);

app.listen(3000, () => {
  console.log("Express server started at port :3000");
});
//rewirite chuan, dung , chinh xac
app.use(rewrite("/co-so/*", "/foodfacility/$1"), function (req, res, next) {
  var old_url = req.url;
  //console.log(req.url);
  //req.url = "/index";
  next();
});
app.use(rewrite("/tai-khoan/*", "/account/$1"), function (req, res, next) {
  var old_url = req.url;
  //console.log(req.url);
  //req.url = "/index";
  next();
});
app.use("/foodfacility", foodfacilityController);

app.use("/account", accountController);

app.all("*", (req, res) => {
  res.status(404).send("<h1>resouces not found</h1>");
});
// {
//     "fullname": "Địa điểm kinh doanh số 4 - Công ty TNHH thực phẩm Nông trang",
//     "street" : "LK05, C14 Bộ Công An, đường Trung Văn",
//     "town": "Trung Văn",
//     "district": "Nam Từ Liêm",
//     "city": "Hà Nội",
//     "phone_number": "02466711584",
//     "business_type": "sản xuất thực phẩm",
//     "environment": "true",
//     "appliances": "true",
//     "water_source": "true",
//     "ingredients": "true",
//     "food_preservation": "true",
//     "waste_treatment": "true",
//     "owners": "true",
//     "processing": "true",
//     "certification": "189/2020/NNPTNT-HAN"
//   }
