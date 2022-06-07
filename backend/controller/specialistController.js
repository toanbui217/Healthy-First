const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Account = mongoose.model("Account");
const CheckFacility = mongoose.model("CheckFacility");
const FoodFacility = mongoose.model("FoodFacility");
const Certification = mongoose.model("Certification");
const FoodSampling = mongoose.model("FoodSampling");
const rewrite = require("express-urlrewrite");
const ObjectId = require("mongodb").ObjectId;
const auth = require("../middleware/auth");
const { authRole } = require("../middleware/basicAuth");
const { ROLE } = require("../models/account.model");

// tra ve danh sach chuyen vien
router.post("/", (req, res) => {
  let query = {};

  if (req.role == ROLE.BASIC) {
    query["_id"] = req.body.id;
  }

  query["role"] = "SPECIALIST";

  Account.find(query)
    .then((data) => {
      data = JSON.parse(JSON.stringify(data));
      data = data.map((item, index) => {
        return { ...item, id: index + 1 };
      });
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});
module.exports = router;
