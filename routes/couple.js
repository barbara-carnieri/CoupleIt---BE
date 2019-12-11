const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Couple = require('../models/couple');
const User = require('../models/user');

const parser = require('../config/cloudinary');

// HELPER FUNCTIONS
const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin,
} = require('../helpers/middlewares');


 // POST '/couple'    => to post a new project
router.post('/', (req, res, next) => {
  const { name, email } = req.body;
  const user = User.find(email).populate('members')
  Couple.create({ name, tasks: [], gallery: [], stories:[], calendar: [], members:[] })
    .then(createdCouple => {
      console.log('CREATEEE', createdCouple)
      res.status(201).json(createdCouple); //   .send(  JSON.stringify(createdProject)  )
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//GET user email
router.get('/email/:email', (req, res) => {
  const { email } = req.params;
  User.find( {email} ).populate('members')  // add .populate('') when other param of usermodel added
    .then( (foundUser) => {
      res.status(200).json(foundUser);
    })
    .catch((err) => {
      res.res.status(500).json(err);
    })
  });

  router.get('/', (req, res, next) => {
    Couple.find()
      .then(allProjects => {
        res.status(200).json(allProjects);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });


module.exports = router;