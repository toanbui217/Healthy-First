const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Account = mongoose.model("Account");
const CheckFacility = mongoose.model("CheckFacility");
const FoodFacility = mongoose.model("FoodFacility");
const Certification = mongoose.model("Certification");
const FoodSampling = mongoose.model("FoodSampling");
const ObjectId = require("mongodb").ObjectId;
const auth = require("../middleware/auth");
router.get("/one/", auth.auth, (req, res) => {
  try {
    res.status(200).send({ message: "Success author" });
  } catch (error) {
    res.status(401).send({ error: error });
  }
});

// ke hoach thanh tra
router.post("/inspection/plan", (req, res) => {
  var duration = req.body.duration;
  var today = new Date();

  today = today.setMonth(today.getMonth() - 6);
  var futureDay = new Date(today + duration * 3600 * 1000 * 24);
  //var newDate = new Date(date.setMonth(date.getMonth()-6));
  today = new Date(today);
  console.log(today);
  console.log(futureDay);

  FoodFacility.find()
    .populate({
      path: "certification",
      match: {
        MFG: { $gte: today, $lte: futureDay },
        //MFG: { $lte: futureDay },
      },
    })

    .then((data) => {
      var result = data.filter(function (obj) {
        return obj.certification !== null; // Or whatever value you want to use
      });
      //console.log(result);
      //console.log(data[0].certification);
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// tra ve danh sach cac co so chuyen vien phu trach
router.post("/inspection/facility", (req, res) => {
  FoodFacility.find({})
    .populate({
      path: "account",
      match: {
        ROLE: "SPECIALIST",
        specialist_id: req.body.specialist_id,
        district: FoodFacility.district,
      },
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

// update db cua co so trong qua trinh thanh tra
router.post("/inspection/update", (req, res) => {
  var checkfacilitylist = req.body;
  for (let check of checkfacilitylist) {
    CheckFacility.findOneandUpdate(
      {
        id: check.id,
      },
      {
        $set: {
          start_date: check.start_date,
          end_date: check.end_date,
          food_sample: [
            {
              id: check.food_sample.id,
              name: check.food_sample.name,
              unit: check.food_sample.unit,
              start_date: check.food_sample.start_date,
              end_date: check.food_sample.end_date,
            },
          ],
          decision: check.decision,
          confirm: check.confirm,
          facility_number: check.facility_number,
          specialist: check.specialist,
        },
      }
    );
  }

  res.send({
    message: "update successfully",
  });
});

// delete co so trong db CheckFacility
router.delete("/inspection/delete", (req, res) => {
  CheckFacility.findByIdAndRemove(req.body.id)
    .then((data) => {
      res.send({
        message: `${data.deletedCount} foodfacility info were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all foodfacility.",
      });
    });
});

// tra ve danh sach chuyen vien
router.post("/specialist", (req, res) => {
  Account.find({})
    .populate({
      path: "account",
      match: {
        ROLE: "SPECIALIST",
      },
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});
module.exports = router;
