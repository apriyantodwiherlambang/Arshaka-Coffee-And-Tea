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
          process.env.SECRET_KEY, 
          { expiresIn: "1h" }
        );

        res.status(200).send(token);
      } else {
        res.status(401).send("Invalid password!");
      }
    } else {
      res.status(400).send("User not register!");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong!");
  }
};

module.exports = { login };