const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//specialist //manager
const authorityLevel = [
          "",//chuyen vien
          "SPECIALIST", //chuyenvien
          "MANAGER" //Quan ly
          
]; 

var accountSchema = mongoose.Schema(
          {
                    username: String,
                    password: String,
                    firstName: String,
                    surName: String,
                    email: String,
                    published: Boolean,
                    messageOn: Boolean,
                    avatarColor: String,
                    authorityLevel: String,
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
