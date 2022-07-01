const model = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body)
    const getEmailUsers = await model.getByEmail(email);

    if (getEmailUsers.rowCount) {
      // validate password
      const checkPassword = bcrypt.compareSync(
        password,
        getEmailUsers.rows[0].password
      ); // true or false

      if (checkPassword) {
        const token = jwt.sign(
          getEmailUsers.rows[0],
          "784f6be02ff0832df7ad69245bd3e6c5a4cc4a8764c50b140b3845e62f8a81ee", 
          { expiresIn: "24h" }
        );

        res.status(200).send(token);
      } else {
        res.status(401).send("password tidak sesuai");
      }
    } else {
      res.status(400).send("user tidak terdaftar");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("ada yang error");
  }
};

module.exports = { login };