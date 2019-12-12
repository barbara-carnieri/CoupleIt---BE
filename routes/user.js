const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/user');

const parser = require('../config/cloudinary');
// HELPER FUNCTIONS
const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin,
} = require('../helpers/middlewares');




// GET '/user/:id'		 => to get a user
router.get('/:id', (req, res, next) => {
  console.log(req.params)
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(500).json({ message: 'Specified id is invalid' });
    return;
  }

  User.findById(id)
    // .populate('tasks')
    .then(foundUser => {
      res.status(200).json(foundUser);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});


// PUT '/user/:id' 		=> to update a specific project
router.patch('/:id', (req, res, next) => {
  const { id } = req.params;
  const { username, email, password, photoUrl } = req.body;

  if (!username || !email || !password || !photoUrl) {
    res.status(500).json({
      message: 'all fields are mandatory',
    });
    return;
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(500).json({
      message: 'Specified id is invalid',
    });
    return;
  }

  User.findByIdAndUpdate(id, { username, email, password, photoUrl })
    .then(() => {
      res.status(200).json({
        message: 'Project updated !',
      });
    })
    .catch(err => {
      res.status(400).json(err);
    });
});




module.exports = router;
