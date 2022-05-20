const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const FoodFacility = mongoose.model("FoodFacility");
const Certification = mongoose.model("Certification");
const excelToJson = require("convert-excel-to-json");

router.post("/", (req, res) => {
          //fullname address phone_number business_type certification
          //return res.status(400).send(req.body);
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
                    _id: new mongoose.Types.ObjectId(),
                    certification_number: req.body.certification,
          });
          certi.save();
          const foodfacility = new FoodFacility({
                    fullname: req.body.fullname,
                    address: {
                              street: req.body.address,
                    },
                    phone_number: req.body.phone_number,
                    business_type: req.body.business_type,
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
function createMultipleFoodFacilityFromArray(foodFacilityList) {
          const forLoop = async () => {
                    for (let food of foodfacilityList) {
                              var certi = new Certification({
                                        _id: new mongoose.Types.ObjectId(),
                                        certification_number:
                                                  food.certification_number,
                              });
                              certi.save();
                              var foodfacility = new FoodFacility({
                                        fullname: food.fullname,
                                        address: {
                                                  street: food.address,
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
                                        certification: certi._id,
                              });
                              foodfacility.save(foodfacility).catch((err) => {
                                        return false;
                              });
                    }
          };
          forLoop().catch((err) => {
                    return false;
          });
          return true;
}
////
router.post("/insertmultiphe", (req, res) => {
          var foodfacilityList = req.body.foodfacilityList;
          const forLoop = async (_) => {
                    // for (var index = 0; index < studentList.length; index++) {
                    //    var stu = studentList[index];
                    for await (let food of studentList) {
                              var certi = new Certification({
                                        _id: new mongoose.Types.ObjectId(),
                                        certification_number:
                                                  food.certification_number,
                              });
                              certi.save();
                              var foodfacility = new FoodFacility({
                                        fullname: food.fullname,
                                        address: {
                                                  street: food.address,
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
                                        certification: certi._id,
                              });
                              // accounts.createAccountFromStudent(student);
                              foodfacility.save(foodfacility).catch((err) => {
                                        res.status(500).send({
                                                  message:
                                                            err.message +
                                                            ", Error when createfoodfacilityData.",
                                        });
                              });
                    }
          };
          forLoop();
          res.send({
                    message:
                              "successfully added " +
                              studentList.length +
                              " students",
          });
});
//cap moi giay chung nhan cho co sow
router.put("createnew/:id", (req, res) => {
          //   FoodFacility.findById(req.params.id, (err, doc) => {
          //             if (!err) {
          //                       res.render("foodfacility/addOrEdit", {
          //                                 viewTitle: "Update FoodFacility",
          //                                 foodfacility: doc.toJSON(),
          //                       });
          //             }
          //   }).lean;
          // const studentID = req.params.studentID;
          FoodFacility.findById(req.params.id)
                    .then((data) => {
                              if (!data)
                                        res.status(404).send({
                                                  message: "Not found foodfacility with id ",
                                        });
                              else {
                                        var certi = new Certification({
                                                  _id: new mongoose.Types.ObjectId(),
                                                  certification_number:
                                                            food.certification_number,
                                        });
                                        certi.save();
                                        data.certification = certi._id;
                                        res.status(200).send(data);
                              }
                    })
                    .catch((err) => {
                              res.status(500).send({
                                        message: "Error retrieving student with id=",
                              });
                    });
});
//gia han giay chung nhan
router.put("/extenddate", (req, res) => {
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
          // res.status(200).send(req.body);
          Certification.findOne({ certification_number: certificationID })
                    .then((data) => {
                              if (!data)
                                        res.status(404).send({
                                                  message:
                                                            "Not found student with id " +
                                                            certificationID,
                                        });
                              else {
                                        var oneYearFromNow = new Date();
                                        oneYearFromNow.setFullYear(
                                                  oneYearFromNow.getFullYear() +
                                                            1
                                        );
                                        data.expiration_date = oneYearFromNow;
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
router.put("/recallcertification", (req, res) => {
          const certificationID = req.body.certificationID;
          //Certification.findByIdAndRemove(certificationID, (err, doc));
          Certification.findOne({
                    certification_number: certificationID,
          }).remove();
          res.status(200).send({ message: "done remove " + certificationID });
});
//Thống kê số lượng giấy chứng nhận cấp theo thời gian là loại hình cơ sở (sản xuất thực phẩm hay dịch vụ ăn uống).
router.put("/recallcertification", (req, res) => {
          // loai hinh nao co chu thuc pham // an uong
          var certificationID = req.body.business_type;
          //Certification.findByIdAndRemove(certificationID, (err, doc));
          res.status(200).send({ certificationID });
});

//       if (!req.body.school || !req.body.academyMethod || !req.body.levelOfAcademy || !req.body.schoolYearGroup
//         || !req.body.baseClass || !req.body.major || !req.body.startedYear
//       ) {
//         res.status(400).send({ message: "Some school info is empty" });
//         return;
//       }
//       var year = req.body.startedYear;
//       Student
//         .countDocuments({ startedYear: year })
//         .then(docCount => {
//           var id = (String)(year) + (String)(docCount).padStart(4, "0");
//           const student = new Student({
//             studentID: id,
//             firstName: req.body.firstName,
//             surName: req.body.surName,
//             birthday: req.body.birthday,
//             gender: req.body.gender,
//             national: req.body.national,
//             ethnic: req.body.ethnic,//King
//             religion: req.body.religion,//Dao phat
//             bornAddress: req.body.bornAddress,
//             homeAddress: req.body.homeAddress,
//             citizenCardId: req.body.citizenCardId, //chung minh thu
//             currentAddress: req.body.currentAddress,
//             phoneNumber: req.body.phoneNumber,
//             email: req.body.email,
//             fatherPhoneNumber: req.body.fatherPhoneNumber,
//             motherPhoneNumber: req.body.motherPhoneNumber,
//             school: req.body.school,// UET
//             academyMethod: req.body.academyMethod, //chinh quy...a
//             levelOfAcademy: req.body.levelOfAcademy, //University, Doctorate
//             schoolYearGroup: req.body.schoolYearGroup, //K64,.. ??
//             baseClass: req.body.baseClass, //CA-CLC4
//             major: req.body.major,//Khoa hoc may tinh
//             startedYear: req.body.startedYear,
//             GPA: "",
//             managedBy: "",
//             note: ""
//           });
//           student
//             .save(student)
//             .then(data => {
//               res.send(data);
//             })
//             .catch(err => {
//               res.status(500).send({
//                 message: err.message + ", Error when create studentData."
//               });
//             });
//         })
//         .catch(err => {
//           res.status(500).send({
//             message: err.message
//           })
//         });
//})
// router.get("/", (req, res) => {
//           res.render("foodfacility/addOrEdit", {
//                     viewTitle: "Insert FoodFacility",
//           });
// });

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
                              certification_number: req.body.certification,
                    });
                    certi.save();
                    const foodfacility = await FoodFacility.create({
                              fullname: req.body.fullname,
                              address: {
                                        street: "so 9",
                              },
                              phone_number: req.body.certification,
                              business_type: ["an uong", "kinh doanh"],
                              certification: certi._id,
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

//           //                foodfacility.certification = certi._id; // gián giá trị _id cho cerification
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
// function updateRecord(req, res) {
//           FoodFacility.findOneAndUpdate(
//                     { _id: req.body._id },
//                     req.body,
//                     { new: true },
//                     (err, doc) => {
//                               if (!err) {
//                                         //console.log(req.body._id);
//                                         res.redirect("foodfacility/list");
//                               } else {
//                                         if (err.name == "ValidationError") {
//                                                   handleValidationError(
//                                                             err,
//                                                             req.body
//                                                   );
//                                                   res.render(
//                                                             "foodfacility/addOrEdit",
//                                                             {
//                                                                       viewTitle: "Update FoodFacility",
//                                                                       foodfacility: req.body,
//                                                             }
//                                                   );
//                                         } else
//                                                   console.log(
//                                                             "Error during record update : " +
//                                                                       err
//                                                   );
//                               }
//                     }
//           );
// }
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
// function deletecer(req, res) {
//           FoodFacility.findByIdAndRemove(req.body._id, (err, doc));
//    => {
//             if (!err) {
//                       res.redirect("/foodfacility/list");
//             } else {
//                       console.log(
//                                 "Error in foodfacility delete :" + err
//                       );
//             }
//   });
//}
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
          // certification: certi._id,
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
