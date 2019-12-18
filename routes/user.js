const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/User');

const parser = require('../config/cloudinary');
// HELPER FUNCTIONS
const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin,
} = require('../helpers/middlewares');

// GET '/user/:id'		 => to get a user
router.get('/:id', (req, res, next) => {
  // console.log(req.params)
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(500).json({ message: 'Specified id is invalid' });
    return;
  }

  User.findById(id)
    .populate('coupleId')
    .then(foundUser => {
      res.status(200).json(foundUser);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});


// PUT '/user/:id/edit' 		=> to update a specific user
router.put('/:id/edit',  parser.single('photoUrl'), async (req, res, next) => {
  const { id } = req.params;
  const { username, email, password, photoUrl, coupleId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(500).json({
      message: 'Specified id is invalid',
    });
    return;
  }


  try {
 
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashPass = bcrypt.hashSync(password, salt);
  const newUser = await User.findByIdAndUpdate( id, { coupleId, username, email, password: hashPass, photoUrl })
  req.session.currentUser = newUser;
  
      res
        .status(200) //  OK
        .json(newUser);
    
  } catch (error) {
    next(error);
  }

});

module.exports = router;
