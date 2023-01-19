const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const db = require('../db');
const Pet = require("../models/petSchema");

router.get("/", (req, res) => {
  let filter = {} 
  if (req.query.type) filter.type = req.query.type; 
  if (req.query.adoptionStatus) filter.adoptionStatus = req.query.adoptionStatus;
  if (req.query.name) filter.name = new RegExp(req.query.name, 'i');
  if (req.query.maxWeight) filter.weight = { $lte: req.query.maxWeight };
  if (req.query.minWeight) filter.weight = { ...filter.weight, $gte: req.query.minWeight };
  if (req.query.maxHeight) filter.height = { $lte: req.query.maxHeight };
  if (req.query.minHeight) filter.height = { ...filter.height, $gte: req.query.minHeight };
  Pet.find(filter)
    .then(pets => res.json(pets))
    .catch(err => res.status(400).json(err));
});

module.exports = router;