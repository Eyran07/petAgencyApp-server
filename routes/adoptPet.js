const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Pet = require("../models/petSchema");
const User = require("../models/user");

router.post("/:id/adopt", async (req, res) => {
  // Get the pet by id
  const pet = await Pet.findById(req.params.id);
  // Check if the actionType is "adopt" or "foster"
  if (req.body.actionType !== "adopted" && req.body.actionType !== "foster") {
    return res.status(400).json({ message: "Invalid actionType." });
  }

  // Check if the pet is already adopted
  if (pet.adoptionStatus !== "available") {
    return res.status(400).json({ message: "This pet already adopted." });
  }
  // Update the pet's adoptionStatus field
  pet.adoptionStatus = req.body.actionType;
  await pet.save();
  // Get the user id from the request headers or token
  const userId = req.body.userId;
  // Find the user by id
  const user = await User.findById(userId);
  // Add the pet's id to the user's adoptedPets array
  if (req.body.actionType === "adopted") {
  user.pets.adoptedPets.push(pet._id);
  } else {
  user.pets.fosteredPets.push(pet._id);
  }
  await user.save();
  // Send a success message
  res.json({ message: "Pet adopted/fostered successfully." });
});

module.exports = router;