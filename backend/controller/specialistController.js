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
router.post("/inspection/plan",authRole(ROLE.ADMIN), (req, res) => {
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
  // FoodFacility.find({})
  //   .populate({
  //     path: "account",
  //     match: {
  //       ROLE: "SPECIALIST",
  //       specialist_id: req.body.specialist_id,
  //       district: FoodFacility.district,
  //     },
  //   })
  //   .then((data) => {
  //     res.send(data);
  //   })
  //   .catch((err) => {
  //     res.send(err);
  //   });
  CheckFacility.find({
    "specialist": req.body.id
  }).then(data=>{
    console.log(data);
    res.status(200).send(data);
  })
  // Account.findById(req.body.id).then(data=>{
    
  //   query = { "address.district": { $in: data.district } };
  //   //console.log(data);
  //   FoodFacility.find(query).then(data=>{
  //     // console.log(data);
  //     CheckFacility.find({
  //       "facility_id": {$in: data.map(d=>d._id)}
  //     }).then(data=>{
  //       console.log(data)
  //     })
  //   })
  // })
});
//tao 1 checke facility
router.post("/inspection/insert", (req, res) =>{
  const checkfacility=new CheckFacility({
     start_date:req.body.start_date,
     food_sample:req.body.food_sample
    //  {
    //      id:req.body.food_sample.id,
    //      name:req.body.food_sample.name,
    //      unit:req.body.food_sample.unit,
    //      start_date:req.body.food_sample.start_date,
    //      end_date: req.body.food_sample.end_date,
    //      result:req.body.result,
    //  }
     ,
     decision:req.body.decision,
     confirm:req.body.confirm,
     facility_id:req.body.facility_id,
     specialist:req.body.specialist,

  })
  checkfacility.save();
});
  // start_date: Date,
  // food_sample: [
  //   {
  //     id: String,
  //     name: String,
  //     unit: String,
  //     start_date: Date,
  //     end_date: Date,
  //     result: Boolean,
  //   },
  // ],
  // decision: [String],

  // confirm: Boolean,

  // facility_id: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "FoodFacility",
  //   },
  // ],
  // specialist: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Account",
  // },




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
