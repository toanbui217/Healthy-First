const jwt = require("jsonwebtoken");
//const config = require('../config/config');
//acess token , refresh token
exports.auth = async (req, res, next) => {
          try {
                   // console.log("lol");
                    //console.log(req.headers.authorization);

                    const token = req.headers.authorization;
                    const isCustomAuth = token.length < 500;
                    req.role=req.headers.role;
                    req.district=req.headers.district;
                    console.log("lol");
                    console.log(req.district);
                    //console.log(req.headers.authorization);

                    let decodedData;

                    if (token && isCustomAuth) {
                              decodedData = jwt.verify(
                                        token,
                                        process.env.ACCESS_TOKEN_SECRET
                              );
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
