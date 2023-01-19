const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Pet = require("../models/petSchema");
const fs = require("fs");
const multer = require("multer");
const {upload} = require("../middlewares/uploadImage");

router.post("/", upload.single("image"), (req, res) => {
  // get the form data from the request body
  const formData = req.body;

  // create a new user object with the form data
  const pet = new Pet({
    type: formData.type,
    name: formData.name,
    adoptionStatus: formData.adoptionStatus,
    picture: req.file.path,
    height: formData.height,
    weight: formData.weight,
    color: formData.color,
    bio: formData.bio,
    hypoallergenic: formData.hypoallergenic,
    dietaryRestrictions: formData.dietaryRestrictions,
    breed: formData.breed,
  });

  // save the user object to the database
  pet.save((error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send({ pet: pet });
    }
  });
});

module.exports = router;