const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Pet = require("../models/petSchema");
const User = require("../models/user");

router.post("/:id/save", async (req, res) => {
  // Get the pet by id
  const pet = await Pet.findById(req.params.id);
  
  // Get the user id from the request headers or token
  const userId = req.body.userId;
  // Find the user by id
  const user = await User.findById(userId);
  // Add the pet's id to the user's adoptedPets array
  user.pets.savedPets.push(pet._id);
  await user.save();
  // Send a success message
  res.json({ message: "Pet saved succesfully." });
});

module.exports = router;