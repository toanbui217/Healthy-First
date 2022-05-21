//https://accgroup.vn/10-tieu-chi-ve-sinh-an-toan-thuc-pham/
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var addressSchema = new mongoose.Schema({
          street: {
                    type: String,
                    lowercase: true,
                    // validate: {
                    //     validator: v=>
                    // }
          },
          town: {
                    type: String,
                    lowercase: true,
                    // validate: {
                    //     validator: v=>
                    // }
          },
          district: {
                    type: String,
                    lowercase: true,
                    minlength: 5,
                    maxlength: 30,
          },
          city: {
                    type: String,
                    lowercase: true,
                    minlength: 5,
                    maxlength: 30,
          },
});
var checkconditionSchema = new mongoose.Schema({
          decision_date: Date,
          conduct_date: Date,
          end_date: Date,
          announcement_date: Date,
          foodfacility_number: {
                    type: Schema.Types.ObjectId,
                    ref: "FoodFacility",
          },
});
var certificationSchema = new mongoose.Schema({
          _id: Schema.Types.ObjectId,
          certification_number: {
                    type: String,
          },
          MFG: {
                    // ngay co chung chi khong the thay doi va co hieu luc luc no duoc tao ra
                    type: Date,
                    default: () => Date.now(),
                    immutable: true,
          },
          expiration_date: {
                    type: Date,
          },
          withdrawal_date: {
                    type: Date,
          },
          status: {
            type: Date,
  },
});
//fullname address phone_number business_type certification
var foodfacilitySchema = new mongoose.Schema(
          {
                    fullname: {
                              type: String,
                              required: "This field is required.",
                              lowercase: true,
                    },
                    address: addressSchema,
                    phone_number: {
                              type: String,
                              minlength: 5,
                              maxlength: 15,
                              lowercase: true,
                    },
                    business_type: {
                              //sản xuất thực phẩm và/hoặc dịch vụ ăn uống
                              type: [String],
                              lowercase: true,
                              // lieu 5 30 cua tung string hay cua ca
                              minlength: 5,
                              maxlength: 30,
                    },
                    environment: {
                              type: String,
                              lowercase: true,
                    },
                    appliances: {
                              type: String,
                              lowercase: true,
                    },
                    water_source: {
                              type: String,
                              lowercase: true,
                    },
                    ingredients: {
                              type: String,
                              lowercase: true,
                    },
                    food_preservation: {
                              type: String,
                              lowercase: true,
                    },
                    waste_treatment: {
                              type: String,
                              lowercase: true,
                    },
                    owners: {
                              type: String,
                              lowercase: true,
                    },
                    processing: {
                              type: String,
                              lowercase: true,
                    },
                    business_paper: {
                              type: String,
                              lowercase: true,
                    },
                    certification: {
                              type: Schema.Types.ObjectId,
                              ref: "Certification",
                    },
          },
          { timestamps: true }
);
//certification: mongoose.Schema.Types.ObjectID
mongoose.model("FoodFacility", foodfacilitySchema);
mongoose.model("Certification", certificationSchema);
