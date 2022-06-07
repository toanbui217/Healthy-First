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

router.get("/one/", auth.auth, (req, res) => {
  try {
    res.status(200).send({ message: "Success author" });
  } catch (error) {
    res.status(401).send({ error: error });
  }
});

// ke hoach thanh tra
router.post("/plan", authRole(ROLE.ADMIN), (req, res) => {
  var duration = req.body.duration; // 'duration' đơn vị ngày

  FoodFacility.find({})
    .populate({
      path: "certification",
    })
    .then((data) => {
      var start_date = new Date();
      var end_date = new Date(
        new Date().getTime() + duration * 3600 * 1000 * 24
      );

      var facilities = [];

      data.map((fac) => {
        fac = JSON.parse(JSON.stringify(fac));
        for (var i = 1; i <= 6; i++) {
          var mfg = new Date(fac.certification.MFG);
          var exp = new Date(fac.certification.expiration_date);
          var inspection_date = new Date(mfg.setMonth(mfg.getMonth() + i * 6));
          mfg = new Date(fac.certification.MFG);

          if (i == 6) {
            if (inspection_date > exp) {
              inspection_date = exp;
            }
          }

          if (exp < start_date) {
            inspection_date = new Date();
          }

          if (
            (inspection_date >= start_date && inspection_date <= end_date) ||
            exp < start_date
          ) {
            facilities.push({ ...fac, inspection_date: inspection_date });
            break;
          }
        }
      });

      res.status(200).send(facilities);
    });
});

// tra ve thong tin danh sach cac co so chuyen vien phu trach
router.post("/info", (req, res) => {
  FoodFacility.find({ _id: { $in: req.body.facilities } })
    .populate({ path: "certification" })
    .then((data_info) => {
      CheckFacility.find({ "facility.id": { $in: req.body.facilities } }).then(
        (data_inspection) => {
          data_info = JSON.parse(JSON.stringify(data_info));
          data_info = data_info.map((dinfo) => {
            return {
              ...dinfo,
              inspection_date: data_inspection.find(
                (dins) => dins.facility.id == dinfo._id
              ).start_date,
            };
          });

          res.status(200).send(data_info);
        }
      );
    });
});

// tra ve danh sach cac co so chuyen vien phu trach
router.post("/facility", (req, res) => {
  CheckFacility.find(
    req.body.id != undefined
      ? {
          specialist: req.body.id,
        }
      : {}
  ).then((data) => {
    data = data.filter((d) => d.decision.length == 0);
    res.status(200).send(data);
  });
});

//tao 1 check facility
router.post("/insert", (req, res) => {
  const checkfacility = new CheckFacility({
    start_date: req.body.start_date,
    food_sample: req.body.food_sample,
    decision: req.body.decision,
    confirm: req.body.confirm,
    facility: req.body.facility,
    specialist: req.body.specialist,
  });

  checkfacility.save();

  res.status(200).send({
    message: "CheckFacility were inserted successfully!",
  });
});

// update ban ghi trong CheckFacility
router.post("/update", (req, res) => {
  CheckFacility.findOneAndUpdate(
    {
      id: req.body.id,
    },
    {
      start_date: req.body.start_date,
      food_sample: req.body.food_sample,
      decision: req.body.decision,
      confirm: req.body.confirm,
      facility: req.body.facility,
      specialist: req.body.specialist,
    }
  )
    .then((data) => {
      res.status(200).send({
        message: "CheckFacility info were updated successfully!",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating CheckFacility.",
      });
    });
});

// delete co so trong db CheckFacility
router.delete("/delete", (req, res) => {
  CheckFacility.findByIdAndRemove(req.body.id)
    .then((data) => {
      res.status(200).send({
        message: "CheckFacility info were delete successfully!",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while delete CheckFacility.",
      });
    });
});
router.use(
  rewrite("/tai-khoan/*", "/inspection/$1"),
  function (req, res, next) {
    var old_url = req.url;
    next();
  }
);

module.exports = router;
