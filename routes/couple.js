const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Couple = require('../models/Couple');
const User = require('../models/User');
const mongoose = require('mongoose');

const parser = require('../config/cloudinary');

// HELPER FUNCTIONS
const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin,
} = require('../helpers/middlewares');



// POST	/couple	--> Adds a new event in the DB 
router.post('/', isLoggedIn, async (req, res, next) => {
  const { email } = req.body;
  console.log(req.body);
  
  try {
    const userPartner = await User.findOne( {email} )
    // console.log(userPartner);
    
    const userId = req.session.currentUser._id
    const partnerId = userPartner._id

    const theCouple = {
      name: req.body.name,
      members: [userId, partnerId],
        }

    const newCouple = await Couple.create( theCouple )
    // console.log('NEW COUPLEE', newCouple);

  await User.findByIdAndUpdate( userId, {$push: { coupleId: newCouple._id}}, {new: true})
  await User.findByIdAndUpdate( partnerId, {$push: { coupleId: newCouple._id}}, {new: true})
    
    res.status(200).json(newCouple);
      
  } catch (error) {
    next(error);
  }

});


// GET '/couple'		 => to get all couples
router.get('/', isLoggedIn, (req, res, next) => {
  Couple.find()
    // .populate('tasks')
    .then(allCouples => {
      res.status(200).json(allCouples);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});


// GET '/couple/:id'   => to retrieve a specific task
router.get('/:id', isLoggedIn, (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid( id)) {
    res.status(500).json({ message: 'Specified coupleID is invalid' });
    return;
  }

  Couple.findById( id )
    .then(foundCouple => {
      res.status(200).json(foundCouple);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});



module.exports = router;