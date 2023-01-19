const bcrypt = require('bcrypt');

const checkPassword = async (req, res, next) => {
  const { password, confirmPassword } = req.body;

  // check that the password and confirm password fields match
  if(password !== confirmPassword) {
    // if they don't match, send an error response
    return res.status(400).send({ message: 'Password and confirm password do not match' });
  } else {
    console.log('Passwords match');
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(password, salt);

    delete req.body.confirmPassword;

    next();
  }
}

module.exports = checkPassword;