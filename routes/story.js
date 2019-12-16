const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Story = require('../models/Story');
const Couple = require('../models/Couple');
const User = require('../models/User');

// HELPER FUNCTIONS
const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin,
} = require('../helpers/middlewares');

// POST '/stories'      => to create a new story
router.post('/', isLoggedIn, async (req, res, next) => {
  try { 
    const currentUser = await User.findById(req.session.currentUser._id)
    const { date, title, description, type } = req.body;
    const {coupleId} = currentUser;
  
    const newStory = await Story.create({ date, title, description, type, coupleId })
    const updatedCouple = await Couple.findByIdAndUpdate(coupleId, { $push: { stories: newStory._id} }, {new: true})
    
    res.status(201).json(updatedCouple); 
  } catch (error) {
    next (error)
  }
});

// GET '/story'		 => to get all stories
router.get('/', isLoggedIn, async (req, res, next) => {
  try { 
    const currentUser = await User.findById(req.session.currentUser._id)
    const {coupleId} = currentUser;
  
    const couple = await Couple.findById(coupleId)
    .populate("stories");
    // console.log('couplestories', couple);
    
    res.status(201).json(couple.stories); 
  } catch (error) {
    next (error)
  }
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