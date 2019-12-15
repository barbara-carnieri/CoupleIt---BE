//      routes/task.js
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Gallery = require('../models/gallery');
const Couple = require('../models/couple');
const User = require('../models/user');

// HELPER FUNCTIONS
const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin,
} = require('../helpers/middlewares');

// POST '/gallery'      => to create a new photo
router.post('/', isLoggedIn, async (req, res, next) => {
try { 
  const currentUser = await User.findById(req.session.currentUser._id)
  const { title, photoUrl } = req.body;
  const {coupleId} = currentUser;

  const newPhoto = await Gallery.create({ title, photoUrl, coupleId })
  const updatedCouple = await Couple.findByIdAndUpdate(coupleId, { $push: { gallery: newPhoto._id} }, {new: true})
  
  res.status(201).json(updatedCouple); 
} catch (error) {
  next (error)
}
});

// GET '/gallery'		 => to get all photos
router.get('/', isLoggedIn,  async (req, res, next) => {

try { 
  const currentUser = await User.findById(req.session.currentUser._id)
  const {coupleId} = currentUser;

  const couple = await Couple.findById(coupleId)
  .populate("gallery");
  // console.log('couplegalleryy', couple);
  
  res.status(201).json(couple.gallery); 
} catch (error) {
  next (error)
}
});


// GET '/gallery/:id'   => to retrieve a specific photo
router.get('/:id', isLoggedIn,  (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid( id)) {
    res.status(500).json({ message: 'Specified photoID is invalid' });
    return;
  }

  Gallery.findById( id )
    .then(foundPhoto => {
      res.status(200).json(foundPhoto);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});


// // PUT '/gallery/:id'    => to edit a specific photo
router.put('/:id', isLoggedIn, (req, res, next) => {
  const { id } = req.params;
  const { title, photoUrl } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(500).json({
      message: 'Specified photoID is invalid',
    });
    return;
  }

  Gallery.findByIdAndUpdate(id, { title, photoUrl })
    .then(() => {
      res.status(201).json({
        message: 'Photo updated !',
      });
    })
    .catch(err => {
      res.status(400).json(err);
    });
});



// // DELETE '/gallery/:id'     => to delete a specific task
router.delete('/:id', isLoggedIn, (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(500).json({ message: 'Specified photo id is invalid' });
    return;
  }

  Gallery.findByIdAndRemove( id )
    .then( (deletedPhoto) => {
      return deletedPhoto.couple; // return the project id to the next then statement
    })
    .then( (coupleId) => {
       return Couple.findByIdAndUpdate( coupleId, { $pull : {gallery: id}});    
    })
    .then( () => {
      // when project update promise is done we send the response 
      res.status(201).json({ message: 'Photo deleted'});
    })
    .catch( (err) => {
      res.status(400).json(err);
    });
})

module.exports = router;