const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Account = mongoose.model("Account");
const FoodFacility = mongoose.model("FoodFacility");
var bcrypt = require("bcryptjs");
const { ROLE } = require("../models/account.model");

function canViewFoodFacility(req, foodfacility) {
  return (
    req.role == ROLE.ADMIN ||
    req.district.includes(foodfacility[0].address.district)
  );
}

function canDeleteFoodFacility(req, foodfacility) {
  return req.district.includes(foodfacility[0].address.district);
}
module.exports = {
  canViewFoodFacility,

  canDeleteFoodFacility,
};
