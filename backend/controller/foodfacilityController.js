const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const FoodFacility = mongoose.model("FoodFacility");
const Certification = mongoose.model("Certification");
const excelToJson = require("convert-excel-to-json");
const ObjectId = require("mongodb").ObjectId;
//them 1 co so
router.post("/", (req, res) => {
          //fullname address phone_number business_type certification
          //return res.status(400).send(req.body);
          var oneYearFromNow = new Date();
          oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
          if (
                    !req.body.fullname ||
                    !req.body.address ||
                    !req.body.phone_number ||
                    !req.body.business_type ||
                    !req.body.certification_number
          ) {
                    res.status(400).send({
                              message: "Some basic info is empty",
                    });
                    return;
          }

          const certi = new Certification({
                    _id: ObjectId(),
                    //req.body.certification_number
                    certification_number: req.body.certification,

                    expiration_date: oneYearFromNow,
                    status: "cap moi",
          });
          certi.save();
          console.log(certi._id);
          const foodfacility = new FoodFacility({
                    fullname: req.body.fullname,
                    address: {
                              street: req.body.street,
                              town: req.body.town,
                              district: req.body.district,
                              city: req.body.city,
                    },
                    phone_number: req.body.phone_number,
                    business_type: req.body.business_type,
                    environment: req.body.environment,
                    appliances: req.body.appliances,
                    water_source: req.body.water_source,
                    ingredients: req.body.ingredients,
                    food_preservation: req.body.food_preservation,
                    waste_treatment: req.body.waste_treatment,
                    owners: req.body.owners,
                    processing: req.body.processing,
                    business_paper: req.body.business_paper,
                    certification_number: req.body.certification,
                    certification: certi._id,
          });
          // foodfacility.save();
          //foodfacility.save();
          foodfacility
                    .save(foodfacility)
                    .then((data) => {
                              res.send(data);
                    })
                    .catch((err) => {
                              res.status(500).send({
                                        message:
                                                  err.message +
                                                  ", Error when create foodfacilityData.",
                              });
                    });
});
// lay danh sach co so
router.get("/list", (req, res) => {
          FoodFacility.find((err, docs) => {
                    if (!err) {
                              //       res.render("foodfacility/list", {

                              //                 list: docs.map((doc) => doc.toJSON()),
                              //       });
                              list: docs.map((doc) => doc.toJSON());
                              res.status(200).send(
                                        docs.map((doc) => doc.toJSON())
                              );

                              //  res.json(docs.map((doc) => doc.toJSON()));
                    } else {
                              console.log(
                                        "Error in retrieving foodfacility list :" +
                                                  err
                              );
                    }
          });
});

//get ;ist limit 5
//FoodFacility.findOne({ fullname: "cua hang oc" })
//                .populate("certification")
//                .exec(function (err, foodfacility) {
//                          if (err) return console.log(
//                               "Error during record insertion : " + err
//                     );
//                          console.log(foodfacility);
//      });

// Thống kê số lượng giấy chứng nhận cấp theo thời gian là loại hình cơ sở (sản xuất thực phẩm hay dịch vụ ăn uống).
//629594da827fed9e0b8f2cd1  629594da827fed9e0b8f2cd1
// Thống kê số lượng giấy chứng nhận cấp theo thời gian là loại hình cơ sở (sản xuất thực phẩm hay dịch vụ ăn uống).
router.get("/listbusiness", (req, res) => {
          //   FoodFacility.findOne({})
          //             .populate("certification")
          //             .exec(function (err, story) {
          //                       if (err) return handleError(err);
          //                       console.log(story);
          //             });
          //neu muon
          FoodFacility.find()
                    .populate("certification", "MFG")
                    .sort("MFG")
                    // .exec(function (err, story) {
                    //           if (err) return handleError(err);
                    //           console.log(story);
                    // });
                    .then((data) => {
                              res.send(data);
                    })
                    .catch((err) => {
                              res.send(err);
                    });
          //neu muon theo san xuat hay dich vu thi them find nay
          //   FoodFacility.find({ business_type: { $in: "kinh doanh" } })
          //             .populate("certification").sort("MFG")
          //             .then((data) => {
          //                       res.send(data);
          //             })
          //             .catch((err) => {
          //                       res.send(err);
          //             });
});
// lay n ban ghi bat dau tu trang
router.get("/listlimit", (req, res) => {
          var page_number = req.body.page_number;
          FoodFacility.find((err, docs) => {
                    if (!err) {
                              //       res.render("foodfacility/list", {

                              //                 list: docs.map((doc) => doc.toJSON()),
                              //       });
                              list: docs.map((doc) => doc.toJSON());
                              res.status(200).send(
                                        docs.map((doc) => doc.toJSON())
                              );

                              //  res.json(docs.map((doc) => doc.toJSON()));
                    } else {
                              console.log(
                                        "Error in retrieving foodfacility list :" +
                                                  err
                              );
                    }
          })
                    .limit(10)
                    .skip(page_number * 10);
});

// Lọc danh sách các cơ sở đủ điều kiện an toàn thực phẩm (có giấy chứng nhận đang còn hiệu lực.
router.get("/listfoodcertification", (req, res) => {
          var queryDate = Date.now();
          //  var queryDate='21/05/2022';
          //       var condition = {
          //             'modelname': 'lumia',
          //             'Status':'Active',
          //             'Categories.mainmodels.fromdate': {$gte: queryDate },
          //             'Categories.mainmodels.todate': {$lte: queryDate }
          //      };

          //   var condition = Certification.find({
          //             MFG: { $gte: queryDate },
          //             expiration_date: { $lte: queryDate },status:'thu hoi'
          //   });
          console.log(queryDate);
          FoodFacility.find({})
                    .populate({
                              path: "certification",
                              match: {
                                        MFG: { $lte: queryDate },
                                        expiration_date: { $gte: queryDate },
                                        status: { $ne: "thu hoi" },
                              },
                              options: { limit: 10 },
                    })

                    .then((data) => {
                              res.send(data);
                    })
                    .catch((err) => {
                              res.send(err);
                    });
});
// Lọc danh sách các cơ sở  không đủ điều kiện an toàn thực phẩm
// n
router.get("/listfoodnotcertification", (req, res) => {
          var queryDate = Date.now();
          //  var queryDate='21/05/2022';
          //       var condition = {
          //             'modelname': 'lumia',
          //             'Status':'Active',
          //             'Categories.mainmodels.fromdate': {$gte: queryDate },
          //             'Categories.mainmodels.todate': {$lte: queryDate }
          //      };

        //   var condition1 = Certification.find({
        //             $or: [
        //                       { MFG: { $gte: queryDate } },
        //                      // { expiration_date: { $lte: queryDate } },
        //                     //  { status: { $eq: "thu hoi" } },
        //             ],
        //   });

          //console.log(queryDate);
        // vả  conditon
          FoodFacility.find()
                    .populate({
                              path: "certification",
                              match: {
                                      $or: [
                                                  { MFG: { $gte: queryDate } },
                                                  {
                                                            expiration_date: {
                                                                      $lte: queryDate,
                                                            },
                                                  },
                                                  {
                                                            status: {
                                                                      $eq: "thu hoi",
                                                            },
                                                  },
                                       ],
                              },
                    })

                    .then((data) => {
                        // for (let food of data.body) {
                        //         if(food.certification=="null"){
                        //                 console.log(food);
                        //         }
                        // }
                        // console.log(data.body[1]);
                              res.send(data);
                    })
                    .catch((err) => {
                              res.send(err);
                    });
});
// lọc chi tiết hơn danh sách cơ sở chưa được cấp, đã hết hạn, bị thu hồi giấy chứng nhận.
router.post("/listnotcertificationcheck", (req, res) => {
          // var queryDate = Date.now();
          //  var queryDate='21/05/2022';
          //       var condition = {
          //             'modelname': 'lumia',
          //             'Status':'Active',
          //             'Categories.mainmodels.fromdate': {$gte: queryDate },
          //             'Categories.mainmodels.todate': {$lte: queryDate }
          //      };
          //var status=req.body.status;
          var condition = Certification.find({ status: req.body.status });

          console.log(req.body.status);
          FoodFacility.find(req.body)
                    .populate({
                              path: "certification",
                              match: { status: req.body.status },
                    })
                    .exec()
                    .then((data) => {
                              res.send(data);
                    })
                    .catch((err) => {
                              res.send(err);
                    });
});

function createMultipleFoodFacilityFromArray(foodFacilityList) {
          const forLoop = async () => {
                    for (let food of foodFacilityList) {
                              var certi = new Certification({
                                        _id: new mongoose.Types.ObjectId(),
                                        certification_number:
                                                  food.certification,
                              });
                              certi.save();
                              var foodfacility = new FoodFacility({
                                        fullname: food.fullname,
                                        address: {
                                                  street: food.street,
                                                  town: food.town,
                                                  distric: food.district,
                                                  city: food.city,
                                        },
                                        phone_number: food.certification,
                                        business_type: food.business_type,
                                        environment: food.environment,
                                        appliances: food.appliances,
                                        water_source: food.water_source,
                                        ingredients: food.ingredients,
                                        food_preservation:
                                                  food.food_preservation,
                                        waste_treatment: food.waste_treatment,
                                        owners: food.owners,
                                        processing: food.processing,
                                        certification_number:
                                                  food.certification,
                                        certification: certi._id,
                              });

                              foodfacility.save(foodfacility).catch((err) => {
                                        return false;
                              });
                              //console.log(foodfacility);
                    }
          };
          forLoop();
          return true;
}
////tao moi n co so
router.post("/insertmultiple", (req, res) => {
          var foodfacilityList = req.body;

          // for (var index = 0; index < studentList.length; index++) {
          //    var food = foodfacilityList[index];
          for (let food of foodfacilityList) {
                    const certi = new Certification({
                              _id: new mongoose.Types.ObjectId(),
                              certification_number: food.certification,
                              //MFG: new Date(food.MFG),
                              // expiration_date: new Date(food.expiration_date),
                              status: food.status,
                    });
                    certi.save(function (err) {
                              var foodfacility = new FoodFacility({
                                        fullname: food.fullname,
                                        address: {
                                                  street: food.street,
                                                  town: food.town,
                                                  distric: food.district,
                                                  city: food.city,
                                        },
                                        phone_number: food.phone_number,
                                        business_type: food.business_type,
                                        environment: food.environment,
                                        appliances: food.appliances,
                                        water_source: food.water_source,
                                        ingredients: food.ingredients,
                                        food_preservation:
                                                  food.food_preservation,
                                        waste_treatment: food.waste_treatment,
                                        owners: food.owners,
                                        processing: food.processing,
                                        certification_number:
                                                  food.certification,
                                        certification: certi._id,
                              });
                              // accounts.createAccountFromStudent(student);
                              foodfacility.save(foodfacility);
                    });
          }

          // forLoop();
          res.send({
                    message:
                              "successfully added " +
                              foodfacilityList.length +
                              " students",
          });
          //  if (createMultipleFoodFacilityFromArray(foodFacilityList)) {
          //            res.status(200).send("Finished");
          //  } else {
          //            res.status(500).send({
          //                      message: "Maybe some data is duplicate",
          //            });
          //  }
          ///createMultipleFoodFacilityFromArray(foodFacilityList);
});
//tao moi n giay phep
////update n co so
router.post("/insertmultiplecer", (req, res) => {
          var certificationList = req.body;

          // for (var index = 0; index < studentList.length; index++) {
          //    var food = foodfacilityList[index];
          for (let cer of certificationList) {
                    //     Certification.findOneAndDelete(
                    //               {
                    //                         certification_number:
                    //                                   cer.certification_number,
                    //               },
                    //               function (err, docs) {
                    //                         if (err) {
                    //                                   console.log(err);
                    //                         } else {
                    //                                   //console.log("Deleted User : ", docs);
                    //                         }
                    //               }
                    //     );
                    //     var certi = new Certification({
                    //               _id: new mongoose.Types.ObjectId(),
                    //               certification_number: cer.certification_number,
                    //               MFG: new Date(cer.MFG),
                    //               expiration_date: new Date(cer.expiration_date),
                    //               status: cer.status,
                    //     });
                    //     certi.save();

                    //     FoodFacility.findOneAndUpdate(
                    //               {
                    //                         certification_number:
                    //                                   cer.certification_number,
                    //               },
                    //               { certification: certi._id }
                    //     );
                    //FoodFacility.findOne({ "certificat": studentID })
                    Certification.findOneAndUpdate(
                              {
                                        certification_number:
                                                  cer.certification_number,
                              },
                              {
                                        $set: {
                                                  MFG: new Date(cer.MFG),
                                                  expiration_date: new Date(
                                                            cer.expiration_date
                                                  ),
                                                  status: cer.status,
                                        },
                              },
                              function (err, res) {
                                        console.log(err);
                              }
                    );
          }
          res.send({
                    message:
                              "successfully added " +
                              certificationList.length +
                              " certiications",
          });
});
// cap moi , thu hoi , ra han
//cap moi giay chung nhan cho co sow //dung req.body hoawc req.params
router.put("/createnew/:id", (req, res) => {
          //   FoodFacility.findById(req.params.id, (err, doc) => {
          //             if (!err) {
          //                       res.render("foodfacility/addOrEdit", {
          //                                 viewTitle: "Update FoodFacility",
          //                                 foodfacility: doc.toJSON(),
          //                       });
          //             }
          //   }).lean;
          // const studentID = req.params.studentID;
          var certi = new Certification({
                    _id: new mongoose.Types.ObjectId(),
                    MFG: req.body.MFG,
                    certification_number: req.body.certification_number,
                    expiration_date: req.body.expiration_date,
                    status: "cap moi",
          });
          certi.save();
          //console.log(req.params.id);
          const id = ObjectId(req.params.id);
          // FoodFacility.findOneAndUpdate(
          //           { _id: id },
          //           { certification: req.body.certification }
          // ).then((data) => {
          //           if (!data)
          //                     res.status(404).send({
          //                               message: "Not found student with id ",
          //                     });
          //           else {
          //                     res.status(200).send(data);
          //           }
          // });
          FoodFacility.findOneAndUpdate(
                    { certification_number: req.body.certification_number },
                    { certification: certi._id }
          );
});
//gia han giay chung nhan
router.put("/extenddate/:id", (req, res) => {
          //   FoodFacility.findById(req.params.id, (err, doc) => {
          //             if (!err) {
          //                       res.render("foodfacility/addOrEdit", {
          //                                 viewTitle: "Update FoodFacility",
          //                                 foodfacility: doc.toJSON(),
          //                       });
          //             }
          //   }).lean;
          // const studentID = req.params.studentID;
          const certificationID = req.body.certificationID;
          var oneYearFromNow = new Date();
          oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
          // req.body.status="gia han";
          // res.status(200).send(req.body);
          Certification.findOneAndUpdate(
                    { certification_number: certificationID },
                    {
                              $set: {
                                        expiration_date: oneYearFromNow,
                                        status: "gia han",
                              },
                    }
          )
                    .then((data) => {
                              if (!data)
                                        res.status(404).send({
                                                  message:
                                                            "Not found student with id " +
                                                            certificationID,
                                        });
                              else {
                                        res.status(200).send(data);
                              }
                    })
                    .catch((err) => {
                              res.status(500).send({
                                        message:
                                                  "Error retrieving student with id=" +
                                                  certificationID,
                              });
                    });
});
//thu hoi giay chugn nhan
router.put("/recallcertification/:id", (req, res) => {
          const certificationID = req.body.certificationID;
          //Certification.findByIdAndRemove(certificationID, (err, doc));
          Certification.findOneAndUpdate(
                    {
                              certification_number: certificationID,
                    },
                    { status: "thu hoi" }
          ).then((data) => {
                    res.status(200).send(data);
          });
          //  res.status(200).send({ message: "done remove " + certificationID });
});

// router.post("/", (req, res) => {
//           console.log(req);
//           if (req.body._id == "") insertRecord(req, res);
//           else updateRecord(req, res);
//           //else recallCertification(req, res);
// });

async function insertRecord(req, res) {
          try {
                    const certi = new Certification({
                              _id: new mongoose.Types.ObjectId(),
                              certification_number: cer.certification_number,
                              MFG: new Date(cer.MFG),
                              expiration_date: new Date(cer.expiration_date),
                              status: cer.status,
                    });
                    certi.save();
                    const foodfacility = await FoodFacility.create({
                              fullname: req.body.fullname,
                              address: {
                                        street: "so 9",
                              },
                              phone_number: req.body.certification,
                              business_type: ["an uong", "kinh doanh"],
                              certification: req.body.certification,
                    });

                    await foodfacility.save((err, doc) => {
                              if (!err) res.redirect("foodfacility/list");
                              else {
                                        if (err.name == "ValidationError") {
                                                  handleValidationError(
                                                            err,
                                                            req.body
                                                  );
                                                  res.render(
                                                            "foodfacility/addOrEdit",
                                                            {
                                                                      viewTitle: "Insert FoodFacility",
                                                                      foodfacility: req.body,
                                                            }
                                                  );
                                        } else
                                                  console.log(
                                                            "Error during record insertion : " +
                                                                      err
                                                  );
                              }
                    });

                    //console.log(foodfacility);
                    //console.log(certi);
          } catch (e) {
                    console.log(e.message);
          }
}

//           //      var foodfacility = new FoodFacility();
//           //      foodfacility.fullname = req.body.fullname;
//           //      foodfacility.address = req.body.address;
//           //      //foodfacility.town = req.body.town;
//           //     // foodfacility.district = req.body.district;
//           //      foodfacility.phone_number = req.body.phone_number;
//           //      foodfacility.business_type = req.body.business_type;
//           //      // foodfacility.certification = "626f9cdf9126d433be199c9f";
//           //      // console.log( foodfacility.certification);
//           //      const certi = new Certification({
//           //                _id: new mongoose.Types.ObjectId(),
//           //                certification_number: req.body.certification,
//           //      });

//           //      certi.save(function (err) {
//           //                if (err)
//           //                          return console.log(
//           //                                    "Error during record insertion : " + err
//           //                          );

//           //                foodfacility.certification = req.body.certification; // gián giá trị _id cho cerification
//           //      });
//           //      FoodFacility.findOne({ fullname: "cua hang oc" })
//           //                .populate("certification")
//           //                .exec(function (err, foodfacility) {
//           //                          if (err) return console.log(
//           //                               "Error during record insertion : " + err
//           //                     );
//           //                          console.log(foodfacility);
//           //      });
// }
// // function recallCertification(req, res) {
// //         //   var certification1 = new Certification({
// //         //             _id: new mongoose.Types.ObjectId(),
// //         //   });
// //         //   certification1.save();
// //         //   // can luu hay khong ??
// //         //   //FoodFacility.certification = certification1._id;
// //         //   //FoodFacility.save();
// //         //   //console.log(FoodFacility);
// //         const fooodfacility1 = FoodFacility.findById("627553caaf40e98667100a21")
// //                                           ;
// //         console.log(fooodfacility1 );

// // }
function updateRecord(req, res) {
          FoodFacility.findOneAndUpdate(
                    { _id: req.body._id },
                    req.body,
                    { new: true },
                    (err, doc) => {
                              if (!err) {
                                        //console.log(req.body._id);
                                        res.redirect("foodfacility/list");
                              } else {
                                        if (err.name == "ValidationError") {
                                                  handleValidationError(
                                                            err,
                                                            req.body
                                                  );
                                                  res.render(
                                                            "foodfacility/addOrEdit",
                                                            {
                                                                      viewTitle: "Update FoodFacility",
                                                                      foodfacility: req.body,
                                                            }
                                                  );
                                        } else
                                                  console.log(
                                                            "Error during record update : " +
                                                                      err
                                                  );
                              }
                    }
          );
}
// router.get("/list", (req, res) => {
//           FoodFacility.find((err, docs) => {
//                     if (!err) {
//                               res.render("foodfacility/list", {
//                                         list: docs.map((doc) => doc.toJSON()),
//                               });

//                               //  res.json(docs.map((doc) => doc.toJSON()));
//                     } else {
//                               console.log(
//                                         "Error in retrieving foodfacility list :" +
//                                                   err
//                               );
//                     }
//           });
// });

// function handleValidationError(err, body) {
//           for (field in err.errors) {
//                     console.log(err);
//                     switch (err.errors[field].path) {
//                               case "fullname":
//                                         body["fullnameError"] =
//                                                   err.errors[field].message;
//                                         break;
//                               default:
//                                         break;
//                     }
//           }
// }

// router.get("/:id", (req, res) => {
//           FoodFacility.findById(req.params.id, (err, doc) => {
//                     if (!err) {
//                               res.render("foodfacility/addOrEdit", {
//                                         viewTitle: "Update FoodFacility",
//                                         foodfacility: doc.toJSON(),
//                               });
//                     }
//           }).lean;
// });
//xoa ban ghi theo id
router.delete("/delete/:id", (req, res) => {
          FoodFacility.findByIdAndRemove(req.body._id)
                    .then((data) => {
                              res.send({
                                        message: `${data.deletedCount} foodfacility info were deleted successfully!`,
                              });
                    })
                    .catch((err) => {
                              res.status(500).send({
                                        message:
                                                  err.message ||
                                                  "Some error occurred while removing all foodfacility.",
                              });
                    });
});
//xoa tat ca ban ghi co so
router.delete("/deleteall", (req, res) => {
          // FoodFacility.deleteMany();
          FoodFacility.deleteMany({})
                    .then((data) => {
                              res.send({
                                        message: `${data.deletedCount} All foodfacility info were deleted successfully!`,
                              });
                    })
                    .catch((err) => {
                              res.status(500).send({
                                        message:
                                                  err.message ||
                                                  "Some error occurred while removing all foodfacility.",
                              });
                    });
});
//xoa tat ca ban ghi giay phep
router.delete("/deleteallcer", (req, res) => {
          Certification.deleteMany({})
                    .then((data) => {
                              res.send({
                                        message: `${data.deletedCount} All certification info were deleted successfully!`,
                              });
                    })
                    .catch((err) => {
                              res.status(500).send({
                                        message:
                                                  err.message ||
                                                  "Some error occurred while removing all certification.",
                              });
                    });
});
router.post("/insertall", (req, res) => {
          // fullname: food.fullname,
          // address: {
          //           street:food.address,
          // },
          // phone_number: food.certification,
          // business_type: food.business_type,
          // environment:food.environment,
          // appliances :food.appliances,
          // water_source:food.water_source,
          // ingredients:food.ingredients,
          // food_preservation:food.food_preservation,
          // waste_treatment:food.waste_treatment,
          // owners:food.owners,
          // processing:food.processing,
          // certification: req.body.certification,
          try {
                    let result = excelToJson({
                              sourceFile: "./Data/danh_sach_co_so.xlsx",
                              header: {
                                        rows: 1,
                              },
                              columnToKey: {
                                        A: "fullname",
                                        B: "address",
                                        C: "phone_number",
                                        D: "business_type",
                                        E: "environment",
                                        F: "appliances",
                                        G: "water_source",
                                        H: "ingredients",
                                        I: "food_preservation",
                                        J: "waste_treatment",
                                        K: "owners",
                                        L: "processing",
                                        M: "certification_number",
                              },
                    });
                    //console.log(result);
                    if (createMultipleFoodFacilityFromArray(result.Sheet1)) {
                              res.status(200).send("Finished");
                    } else {
                              res.status(500).send({
                                        message: "Maybe some data is duplicate",
                              });
                    }
          } catch (error) {
                    console.error(error);
                    res.status(500).send({ message: error });
          }
});

module.exports = router;
