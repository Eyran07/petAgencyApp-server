const mongoose = require("mongoose");

// create a schema for the user object
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
  phoneNumber: String,
  bio: String,
  admin: Boolean,
  pets: {
    savedPets:[{type: mongoose.Types.ObjectId, ref: "pets"}],
    adoptedPets:[{type: mongoose.Types.ObjectId, ref: "pets"}],
    fosteredPets:[{type: mongoose.Types.ObjectId, ref: "pets"}]
  }
});

// create a model for the user object
const User = mongoose.model("User", userSchema);

module.exports = User;