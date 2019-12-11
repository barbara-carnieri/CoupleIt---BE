const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Couple = require('../models/couple');

const parser = require('../config/cloudinary');

// HELPER FUNCTIONS
const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin,
} = require('../helpers/middlewares');


//  GET /couple	--> Renders the form view to add the couple
router.get('/', isLoggedIn,  (req, res, next) => {
  res.render('/', {
    userInfo: req.session.currentUser
  });
});


// POST	/couple	--> Add new couple in the DB 
router.post('/', isLoggedIn, (req, res, next) => {

  const theCouple = new Couple({
    name: req.body.name,
    gallery: [],
    tasks: [],
    stories: [],
    calendar: [],
    members:[{req.session.currentUser._id,}],
  });

  theCouple.save()
    .then(coupleevent => {

      User.updateOne({ _id: req.session.currentUser._id }, 
        { $addToSet: { coupleId: coupleevent._id }
        }, { new: true })
        .then((data) => console.log('USER UPDATEDDDDD', data))
        .catch((err) => console.log(err))
    })
    .then(() => {
      res.redirect('/home');
    })
    .catch((err) => {
      console.log(err);
      res.render('couple');
    });
});




module.exports = router;