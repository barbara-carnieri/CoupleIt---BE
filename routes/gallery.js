//      routes/task.js
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Gallery = require('../models/gallery');
const Couple = require('../models/couple');


// POST '/gallery'      => to create a new photo
router.post('/', (req, res, next) => {
  const { title, photoUrl, coupleId } = req.body;

  Gallery.create({ title, photoUrl, coupleId: coupleId })

    .then( (newPhoto) => {

      //it will push to the array created
      return Couple.findByIdAndUpdate(coupleId, { $push: { gallery: newPhoto._id} }, {new: true})
      .populate('gallery')
    })
      .then((updatedCouple) => {
      res.status(201).json(updatedCouple); 
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// GET '/gallery'		 => to get all photos
router.get('/', (req, res, next) => {
  Gallery.find()
    // .populate('tasks')
    .then(allPhotos => {
      res.status(200).json(allPhotos);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// GET '/gallery/:id'   => to retrieve a specific photo
router.get('/:id', (req, res, next) => {
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
router.put('/:id', (req, res, next) => {
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
router.delete('/:id', (req, res, next) => {
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