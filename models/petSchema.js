const mongoose = require("mongoose");

// create a schema for the user object
const petSchema = new mongoose.Schema({
    type: String,
    name: String,
    adoptionStatus: String,
    picture: String,
    height: String,
    weight: String,
    color: String,
    bio: String,
    hypoallergenic: String,
    dietaryRestrictions: String,
    breed: String,
});

// create a model for the user object
const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;