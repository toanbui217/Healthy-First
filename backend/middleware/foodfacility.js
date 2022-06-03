const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Account = mongoose.model("Account");
var bcrypt = require("bcryptjs");
const { ROLE } = require("../models/account.model");

function canViewFoodFacility(account) {
          return (
                    account.role == ROLE.ADMIN ||
                    req.district === account.district
          );
}
module.exports = {
          canViewFoodFacility,
};
