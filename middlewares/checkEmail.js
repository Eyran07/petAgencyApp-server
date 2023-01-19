const validator = require("validator");

const checkEmail = async (req, res, next) => {
  const { email } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(400).send({ message: "Invalid email address" });
  } else {
    console.log("Email is valid");
    next();
  }
};

module.exports = checkEmail;