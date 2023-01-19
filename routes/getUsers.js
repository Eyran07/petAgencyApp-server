const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const db = require('../db');
const User = require("../models/user");

router.get('/', (req, res) => {
    User.find({}, (err, users) => {
      if (err) {
        res.send(err);
      }
      res.json(users);
    });
  });  

module.exports = router;