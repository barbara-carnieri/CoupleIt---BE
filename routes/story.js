const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Story = require('../models/story');
const Couple = require('../models/couple');

// HELPER FUNCTIONS
const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin,
} = require('../helpers/middlewares');


// POST '/story'      => to create a new story
router.post('/', isLoggedIn, (req, res, next) => {
  const { date, title, description, type, coupleId } = req.body;
  console.log('hhhhh', title);
  

  Story.create({ date, title, description, type, coupleId: coupleId })

    .then( (newStory) => {

      //it will push to the array created
      return Couple.findByIdAndUpdate(coupleId, { $push: { stories: newStory._id} }, {new: true})
      .populate('gallery')
    })
      .then((updatedCouple) => {
      res.status(201).json(updatedCouple); 
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// GET '/story'		 => to get all story
router.get('/', isLoggedIn, (req, res, next) => {
  Story.find()
    // .populate('tasks')
    .then(allStories => {
      res.status(200).json(allStories);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// // GET '/story/:id'   => to retrieve a specific photo
// router.get('/:id', (req, res, next) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid( id)) {
//     res.status(500).json({ message: 'Specified storyID is invalid' });
//     return;
//   }

//   Story.findById( id )
//     .then(foundStory => {
//       res.status(200).json(foundStory);
//     })
//     .catch(err => {
//       res.status(400).json(err);
//     });
// });


// // PUT '/story/:id'    => to edit a specific story
router.put('/:id', isLoggedIn, (req, res, next) => {
  const { id } = req.params;
  const { date, title, description, type, coupleId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(500).json({
      message: 'Specified photoID is invalid',
    });
    return;
  }

  Story.findByIdAndUpdate(id, { date, title, description, type, coupleId })
    .then(() => {
      res.status(201).json({
        message: 'Story updated !',
      });
    })
    .catch(err => {
      res.status(400).json(err);
    });
});



// // DELETE '/story/:id'     => to delete a specific story
router.delete('/:id', isLoggedIn, (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(500).json({ message: 'Specified photo id is invalid' });
    return;
  }

  Story.findByIdAndRemove( id )
    .then( (deletedStory) => {
      return deletedStory.couple; // return the project id to the next then statement
    })
    .then( (coupleId) => {
       return Couple.findByIdAndUpdate( coupleId, { $pull : {stories: id}});    
    })
    .then( () => {
      // when project update promise is done we send the response 
      res.status(201).json({ message: 'Story deleted'});
    })
    .catch( (err) => {
      res.status(400).json(err);
    });
})

module.exports = router;