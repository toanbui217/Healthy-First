const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const FoodFacility = mongoose.model("FoodFacility");
router.get("/", (req, res) => {
          res.render("foodfacility/addOrEdit", {
                    viewTitle: "Insert FoodFacility",
          });
});
router.post("/", (req, res) => {
          if (req.body._id == "") insertRecord(req, res);
          else updateRecord(req, res);
});

function insertRecord(req, res) {
          var foodfacility = new FoodFacility();
          foodfacility.fullname = req.body.fullname;
          foodfacility.address = req.body.address;
          foodfacility.town = req.body.town;
          foodfacility.district = req.body.district;
          foodfacility.phone_number = req.body.phone_number;
          foodfacility.business_type = req.body.business_type;
          foodfacility.certification_number = req.body.certification_number;

          foodfacility.save((err, doc) => {
                    if (!err) res.redirect("foodfacility/list");
                    else {
                              if (err.name == "ValidationError") {
                                        handleValidationError(err, req.body);
                                        res.render("foodfacility/addOrEdit", {
                                                  viewTitle: "Insert FoodFacility",
                                                  foodfacility: req.body,
                                        });
                              } else
                                        console.log(
                                                  "Error during record insertion : " +
                                                            err
                                        );
                    }
          });
}
function updateRecord(req, res) {
    FoodFacility .findOneAndUpdate(
                    { _id: req.body._id },
                    req.body,
                    { new: true },
                    (err, doc) => {
                              if (!err) {
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
                                                                      employee: req.body,
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
router.get("/list", (req, res) => {
          FoodFacility.find((err, docs) => {
                    if (!err) {
                              res.render("foodfacility/list", {
                                        list: docs.map((doc) => doc.toJSON()),
                              });
                    } else {
                              console.log(
                                        "Error in retrieving foodfacility list :" +
                                                  err
                              );
                    }
          });
});
function handleValidationError(err, body) {
          for (field in err.errors) {
                    switch (err.errors[field].path) {
                              case "fullname":
                                        body["fullnameError"] =
                                                  err.errors[field].message;
                                        break;
                              default:
                                        break;
                    }
          }
}

router.get("/:id", (req, res) => {
          FoodFacility.findById(req.params.id, (err, doc) => {
                    if (!err) {
                              res.render("foodfacility/addOrEdit", {
                                        viewTitle: "Update FoodFacility",
                                        foodfacility: doc.toJSON(),
                              });
                    }
          }).lean;
});
router.get("/delete/:id", (req, res) => {
          FoodFacility.findByIdAndRemove(req.params.id, (err, doc) => {
                    if (!err) {
                              res.redirect("/foodfacility/list");
                    } else {
                              console.log(
                                        "Error in foodfacility delete :" + err
                              );
                    }
          });
});
module.exports = router;
