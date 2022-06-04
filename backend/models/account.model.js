const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//specialist //manager
const ROLE = {
          ROOT: "BOSS",
          ADMIN: "MANAGER",
          BASIC: "SPECIALIST",
};
var accountSchema = mongoose.Schema(
          {
                    username: String,
                    password: String,
                    firstName: String,
                    surName: String,
                    email: String,
                    avatarColor: String,
                    role: {
                              type: String,
                              uppercase: true,
                    },
                    district: {
                              type: String,
                              lowercase: true,
                    },
                    notification: [
                              {
                                        read: Boolean,
                                        title: String,
                                        message: String,
                                        createdTime: String,
                              },
                    ],
          },
          { timestamps: true }
);
mongoose.model("Account", accountSchema);
module.exports = {
          ROLE: ROLE,
};
