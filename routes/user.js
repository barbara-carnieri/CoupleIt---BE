const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/user');

const parser = require('../config/cloudinary');


// GET	/profile --> Redirects to the profile page
router.get("/:id", (req, res, next) => {
  const id = req.session.currentUser._id;
  res.redirect(`/profile/${id}`);
});



module.exports = router;
