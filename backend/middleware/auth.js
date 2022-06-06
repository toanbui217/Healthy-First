const jwt = require("jsonwebtoken");
const sanitize = require("mongo-sanitize");
//const config = require('../config/config');
//acess token , refresh token
exports.auth = async (req, res, next) => {
  req.body = sanitize(req.body);
  console.log(req.body);
  try {
    // console.log("lol");
    //console.log(req.headers.authorization);

    const token = req.cookies.token;
    console.log(req.cookies.district);
    const isCustomAuth = token.length < 500;
    req.role = req.cookies.role;
    req.district = req.cookies.district;

    //  req.district = req.headers.district;
    //req.district=["dong_da","dong_anh","nam_tu_liem"];
    console.log(req.district.length);
    // req.district = req.district.replace("[", "");
    // req.district = req.district.replace("]", "");
    // req.district = req.district.replace(/"/g, "");

    //  console.log(req.district.length);
    //  console.log(req.district.split(",")[0]);
    //console.log(req.headers.authorization);
   // req.district = req.district.split(",");
    //console.log(req.district);
    //  console.log(req.district);
    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      //console.log()

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    res.status(401).send({
      message: "you need to sign in",
    });
  }
};
