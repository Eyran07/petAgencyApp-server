const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const db = require("../db");
const User = require("../models/user");

router.get("/:id", async (req, res) => {
  try {
    // Find the user in the database by their ID
    const user = await User.findById(req.params.id);

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;