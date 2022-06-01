//require('dotenv')
const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Account = mongoose.model("Account");
var bcrypt = require("bcryptjs");

//const FoodFacility = mongoose.model("FoodFacility");
//const Certification = mongoose.model("Certification");
const excelToJson = require("convert-excel-to-json");
const ObjectId = require("mongodb").ObjectId;
let refreshTokens = [];
const saltRound = 10;
// const posts = [
//           {
//                     username: "Kyle",
//                     title: "Post 1",
//           },
//           {
//                     username: "Jim",
//                     title: "Post 2",
//           },
// ];
function dateToPassword(date) {
          date = date.split("-");
          date = date.join("");
          return date;
}

function randomAvatarColor() {
          let n = (Math.random() * 0xfffff * 1000000).toString(16);
          return "#" + n.slice(0, 6);
}

function getCurrentDateTimeString() {
          let currentdate = new Date();
          return (
                    currentdate.getDate() +
                    "/" +
                    (currentdate.getMonth() + 1) +
                    "/" +
                    currentdate.getFullYear() +
                    "-" +
                    currentdate.getHours() +
                    ":" +
                    currentdate.getMinutes() +
                    ":" +
                    currentdate.getSeconds()
          );
}

function sortDate(noti1, noti2) {
          const aDate = noti1.createdTime.split("-")[0].split("/");
          const bDate = noti2.createdTime.split("-")[0].split("/");
          const aTime = noti1.createdTime.split("-")[1].split(":");
          const bTime = noti2.createdTime.split("-")[1].split(":");
          const aDateTime = new Date(...aDate, ...aTime);
          const bDateTime = new Date(...bDate, ...bTime);

          return bDateTime - aDateTime;
}
router.get("/posts", authenticateToken, (req, res) => {
          try {
                    res.status(200).send({ message: "Success author" });
          } catch (error) {
                    res.status(401).send({ error: error });
          }
});
router.delete("/logout", (req, res) => {
          refreshTokens = refreshTokens.filter(
                    (token) => token !== req.body.token
          );
          res.status(204);
});
router.post("/token", (req, res) => {
          const refreshToken = req.body.token;
          console.log("refresh token la");
          console.log(refreshToken);
          if (refreshToken == null) return res.sendStatus(401);
          if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
        //   const token = jwt.sign(
        //             { username: data.username },
        //             process.env.REFRESH_TOKEN_SECRET,
        //             { expiresIn: "900h" }
        //   );
          jwt.verify(
                    refreshToken,
                    process.env.REFRESH_TOKEN_SECRET,
                    (err, user) => {
                              if (err) {
                                        refreshTokens = refreshTokens.filter(
                                                  (token) =>
                                                            token !==
                                                            refreshToken
                                        );
                                        // Filter when refreshToken is not valid anymore
                                        return res.status(403).json({
                                                  message: "token not longer valid",
                                        });
                              }
                              const accessToken = generateAccessToken({
                                        name: user.name,
                              });
                              res.json({ accessToken: accessToken });
                    }
          );
});
router.post("/login", (req, res) => {
          // const username = req.body.username;
          // const user = { name: username };
          // const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
          // res.json({ accessToken: accessToken });
          //console.log(req.body);
          //   const username = req.body.username;
             const user = { name: username };
          //   const accessToken = generateAccessToken(user);
          //https://viblo.asia/p/refresh-token-la-gi-cach-hoat-dong-co-khac-gi-so-voi-token-khong-E375zQB2lGW
          const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET,{ expiresIn: "900h" });
          refreshTokens.push(refreshToken);
          //   console.log(refreshTokens);

          //   res.json({ accessToken: accessToken, refreshToken: refreshToken });
          const { username, password } = req.body;
          Account.findOne({ username }).then(async (data) => {
                    console.log(data);
          });
          Account.findOne({ username })
                    .then(async (data) => {
                              if (!data) {
                                        return res.status(401).send({
                                                  message: "User doesn't exist",
                                        });
                              }

                              const isPasswordCorrect = await bcrypt.compare(
                                        password,
                                        data.password
                              );

                              if (!isPasswordCorrect) {
                                        return res.status(401).send({
                                                  message: "Invalid username or password!",
                                        });
                              }

                              const token = jwt.sign(
                                        { username: data.username },
                                        process.env.ACCESS_TOKEN_SECRET,
                                        { expiresIn: "15s" }
                              );

                              res.status(200).send({
                                        username: username,
                                        id: data._id,
                                        authorityLevel: data.authorityLevel,
                                        token: token,
                              });
                    })
                    .catch((err) => {
                              res.status(500).send({
                                        message:
                                                  "Something went wrong when login" +
                                                  err,
                              });
                    });
});
// Tạo 1 tài khoản mới
//router.post("/login", (req, res) =>
router.post("/create/", (req, res) => {
          if (
                    !req.body.username ||
                    !req.body.password ||
                    !req.body.firstName ||
                    !req.body.surName ||
                    !req.body.email
          ) {
                    res.status(400).send({
                              message: "Necessary information can not be empty",
                    });
                    return;
          } else {
                    // Account.findOne({ username: req.body.username }).then(
                    //           async (data) => {
                    //                     console.log(data);
                    //           }
                    // );

                    Account.findOne({ username: req.body.username })
                              .then(async (data) => {
                                        if (!data) {
                                                  const account = new Account({
                                                            username: req.body
                                                                      .username,
                                                            password: bcrypt.hashSync(
                                                                      req.body
                                                                                .password,
                                                                      saltRound
                                                            ),
                                                            firstName: req.body
                                                                      .firstName,
                                                            surName: req.body
                                                                      .surName,
                                                            email: req.body
                                                                      .email,
                                                            messageOn:
                                                                      req.body
                                                                                .messageOn !=
                                                                      null
                                                                                ? req
                                                                                            .body
                                                                                            .messageOn
                                                                                : true,
                                                            avatarColor:
                                                                      req.body
                                                                                .avatarColor !=
                                                                      null
                                                                                ? req
                                                                                            .body
                                                                                            .avatarColor
                                                                                : randomAvatarColor(),
                                                            notification:
                                                                      req.body
                                                                                .notification !=
                                                                      null
                                                                                ? req
                                                                                            .body
                                                                                            .notification
                                                                                : [],
                                                            authorityLevel:
                                                                      req.body
                                                                                .authorityLevel !=
                                                                      null
                                                                                ? req
                                                                                            .body
                                                                                            .authorityLevel
                                                                                : "",
                                                  });

                                                  account.save(account)
                                                            .then((data) => {
                                                                      res.send(
                                                                                data
                                                                      );
                                                            })
                                                            .catch((err) => {
                                                                      res.status(
                                                                                500
                                                                      ).send({
                                                                                message:
                                                                                          err.message ||
                                                                                          "Error when create Account",
                                                                      });
                                                            });
                                        } else {
                                                  res.status(400).send({
                                                            message: "User name is not available",
                                                  });
                                        }
                              })
                              .catch((err) => {
                                        res.status(500).send({
                                                  message:
                                                            "Error when create account" +
                                                            err,
                                        });
                              });
          }
});

// Xóa 1 tài khoản
router.delete("/delete/:id", (req, res) => {
          const id = req.params.id;

          Account.findByIdAndRemove(id, { useFindAndModify: false })
                    .then((data) => {
                              if (!data) {
                                        res.status(404).send({
                                                  message: `Cannot find Account with id=${id}`,
                                        });
                              } else {
                                        res.send({
                                                  message: "Account was deleted successfully!",
                                        });
                              }
                    })
                    .catch((err) => {
                              res.status(401).send({
                                        message:
                                                  "Could not delete Account with id=" +
                                                  id,
                              });
                    });
});

// Đổi mật khẩu hoặc cập nhật thông tin tùy request
router.post("/update/:id", (req, res) => {
          if (
                    req.body.constructor === Object &&
                    Object.keys(req.body).length === 0
          ) {
                    return res.status(400).send({
                              message: "Data to update can not be empty!",
                    });
          }

          const id = req.params.id;
          const password = req.body.password;
          //Add hash password property
          if (password) {
                    req.body.password = bcrypt.hashSync(
                              req.body.password,
                              saltRound
                    );
          }

          Account.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
                    .then((data) => {
                              if (!data) {
                                        res.status(404).send({
                                                  message: `Cannot find id=${id} or something went wrong!`,
                                        });
                              } else {
                                        res.send({
                                                  message: "Information is updated!",
                                        });
                              }
                    })
                    .catch((err) => {
                              res.status(401).send({
                                        message: "Error when update information!",
                              });
                    });
});

// Lấy dữ liệu 1 model
router.get("/get/:id", (req, res) => {
          if (!req.params.id) {
                    return res
                              .status(400)
                              .send({ message: "Username be filled in" });
          }

          Account.findById(req.params.id)
                    .then((data) => {
                              if (!data) {
                                        res.status(404).send({
                                                  message: `There is no account with id: ${req.params.id}`,
                                        });
                              } else {
                                        res.status(200).send(data);
                              }
                    })
                    .catch((err) => {
                              res.status(500).send({
                                        message: "Error when get data",
                              });
                    });
});

function createAccountFromStudent(student) {
          Account.findOne({ username: student.studentID })
                    .then((data) => {
                              if (!data) {
                                        const account = new Account({
                                                  username: student.studentID,
                                                  password: bcrypt.hashSync(
                                                            dateToPassword(
                                                                      student.birthday
                                                            ),
                                                            saltRound
                                                  ),
                                                  firstName: student.firstName,
                                                  surName: student.surName,
                                                  email: student.email,
                                                  messageOn: true,
                                                  avatarColor: randomAvatarColor(),
                                                  notification: [],
                                                  authorityLevel: "",
                                        });

                                        account.save(account)
                                                  .then((data) => {
                                                            //console.log(data);
                                                  })
                                                  .catch((err) => {
                                                            console.log(
                                                                      "Error when create data"
                                                            );
                                                  });
                              } else {
                                        console.log(
                                                  "Account for this student is exist"
                                        );
                              }
                    })
                    .catch((err) => {
                              console.log(
                                        "Error when create account from student"
                              );
                    });
}

// Tạo thông báo cho 1 tài khoản.=
router.post("/createNotification/:id", (req, res) => {
          if (
                    !req.body.title ||
                    !req.body.message ||
                    req.body.title == "" ||
                    req.body.message == ""
          ) {
                    return res.status(400).send({
                              message: "Notification can not be empty!",
                    });
          }

          const accountId = req.params.id;
          const tempNotification = {
                    read: false,
                    title: req.body.title,
                    message: req.body.message,
                    createdTime: getCurrentDateTimeString(),
          };

          Account.findOneAndUpdate(
                    { _id: accountId },
                    { $push: { notification: tempNotification } },
                    { useFindAndModify: false }
          )
                    .then((data) => {
                              res.status(200).send(
                                        "Created a new notification!"
                              );
                    })
                    .catch((err) => {
                              res.status(401).send(
                                        "Error when create new notification"
                              );
                    });
});

// Xóa 1 thông báo của 1 tài khoản.
router.delete("/deleteNotification/", (req, res) => {
          const accountId = req.body.accountId;
          const notificationId = req.body.notificationId;

          Account.findOneAndUpdate(
                    { _id: accountId },
                    { $pull: { notification: { _id: notificationId } } },
                    { safe: true, multi: false }
          )
                    .then((data) => {
                              res.status(200).send({
                                        message: "Deleted notification",
                              });
                    })
                    .catch((error) => {
                              res.status(500).send({
                                        message: `Error when delete comment ${error}`,
                              });
                    });
});

// Lấy danh sách tất cả các object model tài khoản.
router.get("/getAll/", (req, res) => {
          Account.find()
                    .then((data) => {
                              if (!data) {
                                        res.status(404).send({
                                                  message: "There is no account in database!",
                                        });
                              } else {
                                        res.status(200).send(data);
                              }
                    })
                    .catch((err) => {
                              res.status(500).send({
                                        message: "Error when get data",
                              });
                    });
});

router.get("/getByUsername/:username", (req, res) => {
          const username = req.params.username;

          if (!username || username == "") {
                    res.status(400).send({
                              message: "Username must be filled in!",
                    });
          }

          Account.findOne({ username: username })
                    .then((data) => {
                              if (!data) {
                                        res.status(404).send({
                                                  message: `There is no account with username: ${req.params.username}`,
                                        });
                              } else {
                                        res.status(200).send(data);
                              }
                    })
                    .catch((err) => {
                              res.status(500).send({
                                        message: "Error when get data",
                              });
                    });
});
// Xóa tât cả các tài khoản.
router.delete("/delete/", (req, res) => {
          Account.deleteMany({})
                    .then((data) => {
                              res.send({
                                        message: `${data.deletedCount} All Accoumt info were deleted successfully!`,
                              });
                    })
                    .catch((err) => {
                              res.status(500).send({
                                        message:
                                                  err.message ||
                                                  "Some error occurred while removing all Accoumt.",
                              });
                    });
});

// Xóa tât cả các tài khoản.
router.delete("/deleteStudent/", (req, res) => {
          Account.deleteMany({ authorityLevel: ["", "NONE"] })
                    .then((data) => {
                              res.send({
                                        message: `${data.deletedCount} All student account info were deleted successfully!`,
                              });
                    })
                    .catch((err) => {
                              res.status(500).send({
                                        message:
                                                  err.message ||
                                                  "Some error occurred while removing all student account.",
                              });
                    });
});

// lấy thông báo của 1 tài khoản từ id.
router.get("/getNotification/:id", (req, res) => {
          if (!req.params.id) {
                    return res
                              .status(400)
                              .send({ message: "Username be filled in" });
          }

          Account.findById(req.params.id)
                    .sort({ notification: -1 })
                    .then((data) => {
                              if (!data) {
                                        res.status(404).send({
                                                  message: `There is no account with id: ${req.params.id}`,
                                        });
                              } else {
                                        let dataRes =
                                                  data.notification.sort(
                                                            sortDate
                                                  );
                                        res.status(200).send(dataRes);
                              }
                    })
                    .catch((err) => {
                              res.status(500).send({
                                        message: "Error when get data",
                              });
                    });
});

function authenticateToken(req, res, next) {
          const authHeader = req.headers["authorization"];
          const token = authHeader && authHeader.split(" ")[1];
          if (token == null) return res.sendStatus(401);

          jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                    console.log(err);
                    if (err) return res.sendStatus(403);
                    req.user = user;
                    next();
          });
}
function generateAccessToken(user) {
          return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: "3000000s",
          });
}

module.exports = router;
