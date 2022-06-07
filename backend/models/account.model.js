const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ROLE = {
  ROOT: "BOSS",
  ADMIN: "MANAGER",
  BASIC: "SPECIALIST",
};
var accountSchema = mongoose.Schema({
  username: String,
  password: String,
  name: String,
  email: String,
  avatarColor: String,
  facility_id: [],
  role: {
    type: String,
    uppercase: true,
  },
  district: {
    // tung noi ma nhan vien quan ly
    type: [String],
    lowercase: true,
  },
});
mongoose.model("Account", accountSchema);
module.exports = {
  ROLE: ROLE,
};
