const model = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  // console.log(req.body)
  try {
    const { email, password } = req.body;
    // console.log(req.body)
    const getEmailUsers = await model.getUserByEmail(email);

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

        res.status(200).send({
          result: {
            auth_token: token,
            user: getEmailUsers.rows[0]
          }
        });
      } else {
        res.status(401).send("Invalid password!");
      }
    } else {
      res.status(400).send("User not register!");
    }
  } catch (error) {
    console.log(error);
    res.send(
      {
        result: {
          message: 'Something went wrong',
          code: 400
        }
      });
  }
};

module.exports = { login };