const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Pet = require("../models/petSchema");
const User = require("../models/user");

router.post("/:id/return", async (req, res) => {
  // Get the pet by id
  const pet = await Pet.findById(req.params.id);
  
  if (req.body.actionType !== "available") {
    return res.status(400).json({ message: "Invalid actionType." });
  }
  // Update the pet's adoptionStatus field
  pet.adoptionStatus = req.body.actionType;
  // Get the user id from the request headers or token
  const userId = req.body.userId;
  // Find the user by id
  const user = await User.findById(userId);
  // delete the pet's id to the user's adoptedPets array
  const index = user.pets.adoptedPets.indexOf(pet._id);
  if (index > -1) {
    user.pets.adoptedPets.splice(index, 1);
  }
  const index2 = user.pets.fosteredPets.indexOf(pet._id);
  if (index2 > -1) {
    user.pets.fosteredPets.splice(index2, 1);
  }
  await user.save();
  await pet.save();
  // Send a success message
  res.json({ message: "Pet return successfully." });
});

module.exports = router;