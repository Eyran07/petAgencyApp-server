const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const db = require("../db");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const user = await User.findOne({
		email: req.body.email,
	})

	if (!user) {
		return { status: 'error', error: 'Invalid login' }
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

	if (isPasswordValid) {
		const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
				userId: user._id,
			},
			'secret123'
		)

		return res.send({ user: user, token: token, })
	} else {
		return res.status(500).send(error)
	}
});

module.exports = router;