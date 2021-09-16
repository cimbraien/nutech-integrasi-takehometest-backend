const jwt = require("jsonwebtoken");

class Access {
  getToken(req, res, next) {
    if (req.body.accesscode != process.env.ACCESS_CODE)
      return next({
        status: 401,
        message:
          "Kode akses salah! Contact developer (Kimbrian Marshall) untuk mendapatkan kode.",
      });

    const ip = req.ip;
    const jwtToken = jwt.sign({ ip }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });
    res.status(200).json({ jwtToken });
  }

  async verifyToken(req, res, next) {
    if (!req.headers.authorization)
      return next({
        status: 401,
        message: "JWT Token diperlukan untuk melakukan request.",
      });
    const jwtToken = req.headers.authorization.replace("Bearer ", "");
    try {
      jwt.verify(jwtToken, process.env.JWT_SECRET);
    } catch (error) {
      if (error.name == "TokenExpiredError")
        return next({
          status: 401,
          message: "JWT Token expired, silahkan melakukan request token baru.",
        });
      return next({ status: 401, message: "JWT Token salah." });
    }
    next();
  }
}

module.exports = new Access();
