const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkEmail = require("../middlewares/checkEmail");
const Pet = require("../models/petSchema");

// Update a user by ID
router.put("/:id", (req, res) => {
  const {
    name,
    image,
    adoptionStatus,
    type,
    height,
    weight,
    color,
    bio,
    hypoallergenic,
    dietaryRestrictions,
    breed,
  } = req.body;

  console.log(req.params);

  Pet.findByIdAndUpdate(req.params.id, {
    name,
    image,
    adoptionStatus,
    type,
    height,
    weight,
    color,
    bio,
    hypoallergenic,
    dietaryRestrictions,
    breed,
  })
    .then((pet) => {
      res.json({
        message: "Pet updated successfully",
        pet,
      });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

module.exports = router;
