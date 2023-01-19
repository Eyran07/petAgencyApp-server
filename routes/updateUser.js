const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkEmail = require("../middlewares/checkEmail");

// Update a user by ID
router.put("/:id", checkEmail, (req, res) => {
  const { email, firstName, lastName, admin } = req.body;

  console.log(req.params);

  User.findByIdAndUpdate(req.params.id, {
    email,
    firstName,
    lastName,
    admin,
  })
    .then((user) => {
      res.json({
        message: "User updated successfully",
        user,
      });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

module.exports = router;