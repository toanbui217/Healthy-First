//require('dotenv')
const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Account = mongoose.model("Account");
var bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const { authRole } = require("../middleware/basicAuth");
const FoodFacility = mongoose.model("FoodFacility");
const { ROLE } = require("../models/account.model");
let refreshTokens = [];
const saltRound = 10;
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

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).send({ message: "logout" });
  res.end();
});

router.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  console.log("refresh token la");
  console.log(refreshToken);
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      // Filter when refreshToken is not valid anymore
      return res.status(403).json({
        message: "token not longer valid",
      });
    }
    const accessToken = generateAccessToken({
      name: user.name,
    });
    res.json({ accessToken: accessToken });
  });
});

// Tạo 1 tài khoản mới
router.post("/create/", authRole(ROLE.ADMIN), (req, res) => {
  if (
    !req.body.username ||
    !req.body.password ||
    !req.body.name ||
    !req.body.email ||
    !req.body.role ||
    !req.body.district
  ) {
    res.status(400).send({
      message: "Necessary information can not be empty",
    });
    return;
  } else {
    Account.findOne({ username: req.body.username })
      .then(async (data) => {
        if (!data) {
          const account = new Account({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, saltRound),
            name: req.body.name,
            district: req.body.district,

            email: req.body.email,
            messageOn: req.body.messageOn != null ? req.body.messageOn : true,
            avatarColor:
              req.body.avatarColor != null
                ? req.body.avatarColor
                : randomAvatarColor(),
            notification:
              req.body.notification != null ? req.body.notification : [],
            role: req.body.role != null ? req.body.role : "",
          });

          account
            .save(account)
            .then((data) => {
              res.send(data);
            })
            .catch((err) => {
              res.status(500).send({
                message: err.message || "Error when create Account",
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
          message: "Error when create account" + err,
        });
      });
  }
});

// Xóa 1 tài khoản
router.delete("/delete/:id", authRole(ROLE.ADMIN), (req, res) => {
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
        message: "Could not delete Account with id=" + id,
      });
    });
});
//authRole(ROLE.ADMIN),
// Đổi mật khẩu hoặc cập nhật thông tin tùy request
router.post("/update/:id",  (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;
  const password = req.body.password;
  //Add hash password property
  if (password) {
    req.body.password = bcrypt.hashSync(req.body.password, saltRound);
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
    return res.status(400).send({ message: "Username be filled in" });
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

// Lấy danh sách tất cả các object model tài khoản.
router.get("/getAll/", authRole(ROLE.ADMIN), (req, res) => {
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


// Xóa tât cả các tài khoản trừ mamnager va ADMIN.
router.delete("/delete_specialist/", authRole(ROLE.ADMIN), (req, res) => {
  Account.deleteMany({ role: ["", "SPECIALIST"] })
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

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "3000000s",
  });
}

module.exports = router;
