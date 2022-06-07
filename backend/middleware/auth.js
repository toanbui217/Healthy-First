const jwt = require("jsonwebtoken");
const sanitize = require("mongo-sanitize");

exports.auth = async (req, res, next) => {
  req.body = sanitize(req.body);
  try {
    const token = req.cookies.token;
    const isCustomAuth = token.length < 500;
    req.role = req.cookies.role;
    req.district = req.cookies.district;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }

    const expires = 300000000; // tính theo giây

    const tokentemp = jwt.sign(
      { username: req.cookies.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: expires + "s" }
    );
    res.cookie("token", tokentemp, {
      expires: new Date(Date.now() + 1000 * expires),
      httpOnly: true,
    });
    res.cookie("role", req.cookies.role, {
      expires: new Date(Date.now() + 1000 * expires),
      httpOnly: true,
    });
    res.cookie("district", req.cookies.district, {
      expires: new Date(Date.now() + 1000 * expires),
      httpOnly: true,
    });
    next();
  } catch (error) {
    res.status(401).send({
      message: "you need to sign in",
    });
  }
};
