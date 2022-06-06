const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Account = mongoose.model("Account");
const FoodFacility = mongoose.model("FoodFacility");
var bcrypt = require("bcryptjs");
const { ROLE } = require("../models/account.model");

function canViewFoodFacility(req, foodfacility) {
  ////console.log("ket qua");
  ////console.log(req.district);
  ////console.log(foodfacility[0].address.district)

  return (
    req.role == ROLE.ADMIN ||
    req.district.includes(foodfacility[0].address.district)
  );
}
// function scopedFoodFacilitys(req, foodfacility) {
//           if (req.role === ROLE.ADMIN) return projects;
//           return FoodFacility.filter(
//                     (foodfacility) =>
//                               req.district === foodfacility[0].address.district
//           );
// }
function canDeleteFoodFacility(req, foodfacility) {
  return req.district.includes(foodfacility[0].address.district);
}
module.exports = {
  canViewFoodFacility,

  canDeleteFoodFacility,
};
