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
// router.post('/', (req, res, next) => {
//   const { name, email } = req.body;
  
//   const user = User.find(email).populate('members')
//   Couple.create({ name, tasks: [], gallery: [], stories:[], calendar: [], members:[] })
//     .then(createdCouple => {
//       console.log('CREATEEE', createdCouple)
//       res.status(201).json(createdCouple); //   .send(  JSON.stringify(createdProject)  )
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });


// POST	/couple	--> Adds a new event in the DB 
router.post('/', async (req, res, next) => {
  const { email } = req.body;
  // console.log(req.body);
  
  try {
    const userPartner = await User.findOne( {email} )
    console.log(userPartner._id);
    
    const userId = req.session.currentUser._id
    const partnerId = userPartner._id

    const theCouple = {
      name: req.body.name,
      members: [userId, partnerId],
        }
  console.log(theCouple);

    const newCouple = await Couple.create( theCouple )
    console.log('NEW COUPLEE', newCouple);

  await User.findByIdAndUpdate( userId, {$push: { coupleId: newCouple._id}})
  await User.findByIdAndUpdate( partnerId, {$push: { coupleId: newCouple._id}})
    
    res.status(200).json(newCouple);
      
  } catch (error) {
    next(error);
  }
    

//   const theCouple = new Couple({
//     name: req.body.name,
//     members: [req.session.currentUser._id, emailuserID],
//     gallery: [],
//     tasks: [],
//     stories: [],
//     calendar: [],


//   theCouple.save()
//     .then(coupleevent => {
//       User.updateOne({ _id: req.session.currentUser._id }, 
//         { $addToSet: { coupleId: coupleevent._id }
//         }, { new: true })
//         .then((data) => console.log('USER UPDATEDDDDD', data))
//         .catch((err) => console.log(err))
//     })
//     .then(() => {
//       const { email } = req.body;
//       User.find( {email} ).populate('members'); 
//     })
//     .then(() => {
//       res.redirect('/couple');
//     })
//     .catch((err) => {
//       console.log(err);
//       res.render('/');
//     });
});




//GET user email
// router.get('/email/:email', (req, res) => {
//   const { email } = req.params;
//   User.find( {email} ).populate('members')  // add .populate('') when other param of usermodel added
//     .then( (foundUser) => {
//       res.status(200).json(foundUser);
//     })
//     .catch((err) => {
//       res.res.status(500).json(err);
//     })
//   });


// router.get('/', (req, res, next) => {
//     Couple.find()
//       .then(allProjects => {
//         res.status(200).json(allProjects);
//       })
//       .catch(err => {
//         res.status(400).json(err);
//       });
//   });


module.exports = router;