const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const db = require('../db');
const checkPassword = require('../middlewares/checkPassword');
const checkEmail = require('../middlewares/checkEmail');
const jwt = require('jsonwebtoken');
const User = require("../models/user");

// create a route to handle form submissions
router.post('/', checkPassword, checkEmail, (req, res) => {
  // get the form data from the request body
  const formData = req.body;

  // check that all fields are filled
  if (!formData.email || !formData.password || !formData.firstName || !formData.lastName ) {
    return res.status(400).send({ message: 'All fields are required' });
  }

  // create a new user object with the form data
  const user = new User({
    email: formData.email,
    password: formData.password,
    firstName: formData.firstName,
    lastName: formData.lastName,
    phoneNumber: formData.phoneNumber,
    admin: false,
    pets: { savedPets: [], adoptedPets: [], fosteredPets: [] }
  });
  
  user.save((error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send({user: user});
    }
  });
});

module.exports = router;