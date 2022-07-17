const jwt = require("jsonwebtoken");

const checkToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(
      token.substring(7, token.length),
      process.env.SECRET_KEY
    );

    if (decoded) {
      next();
    }
  } catch (error) {
    res.status(401).send("token tidak valid");
  }
};

module.exports = { checkToken };