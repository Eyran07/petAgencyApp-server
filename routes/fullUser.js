const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Pet = require("../models/petSchema") // or whatever the correct file path is
const User = require("../models/user"); // or whatever the correct file path is

router.get("/:id/full", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("pets.savedPets")
      .populate("pets.adoptedPets")
      .populate("pets.fosteredPets");
    if (!user) return res.status(404).send("User not found");
    const pets = {
      savedPets: user.pets.savedPets,
      adoptedPets: user.pets.adoptedPets,
      fosteredPets: user.pets.fosteredPets,
    };
    res.send({ user, pets });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving user and pets");
  }
});

module.exports = router;