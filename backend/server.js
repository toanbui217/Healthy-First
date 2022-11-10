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
const inspectionController = require("./controller/inspectionController");
const specialistController = require("./controller/specialistController");
const rewrite = require("express-urlrewrite");
const auth = require("./middleware/auth");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
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

app.use(cookieParser());
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

      const expires = 30; // tính theo giây
      const token = jwt.sign(
        { username: data.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: expires + "s" }
      );
      res.cookie("username",data.username, {
        expires: new Date(Date.now() + 1000 * expires),
        httpOnly: true,
      });
      res.cookie("token", token, {
        expires: new Date(Date.now() + 1000 * expires),
        httpOnly: true,
      });
      res.cookie("role", data.role, {
        expires: new Date(Date.now() + 1000 * expires),
        httpOnly: true,
      });
      res.cookie("district", data.district, {
        expires: new Date(Date.now() + 1000 * expires),
        httpOnly: true,
      });

      res.status(200).send({
        avatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG5s-pnpsa-iT5R9xesoXWpOfFwNhRFIzQxQ&usqp=CAU",
        username: username,
        id: data._id,
        role: data.role,
        // district: data.district,
      });
    })
    .catch((err) => {
      res.status(403).send({
        message: "Nosql injection when login : " + err,
      });
    });
});

//app.use(auth.auth);

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
app.use("/inspection", inspectionController);
app.use("/specialist", specialistController);


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
