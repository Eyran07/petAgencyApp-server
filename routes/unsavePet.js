const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Pet = require("../models/petSchema");
const User = require("../models/user");

router.post("/:id/unsave", async (req, res) => {
  // Get the pet by id
  const pet = await Pet.findById(req.params.id);
  
  // Get the user id from the request headers or token
  const userId = req.body.userId;
  // Find the user by id
  const user = await User.findById(userId);
  // delete the pet's id to the user's adoptedPets array
  const index = user.pets.savedPets.indexOf(pet._id);
  if (index > -1) {
    user.pets.savedPets.splice(index, 1);
  }
  await user.save();
  await pet.save();
  // Send a success message
  res.json({ message: "Pet unsave successfully." });
});

module.exports = router;