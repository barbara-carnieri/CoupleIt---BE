//      routes/task.js
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Task = require('../models/task');
const Couple = require('../models/couple');


// POST '/tasks'      => to create a new task
router.post('/', (req, res, next) => {
  const { name, description, coupleId } = req.body;

  Task.create({ name, description, coupleId: coupleId })

    .then( (newTask) => {

      //it will push to the array created
      return Couple.findByIdAndUpdate(coupleId, { $push: { tasks: newTask._id} }, {new: true})
      .populate('tasks')
    })
      .then((updatedCouple) => {
      res.status(201).json(updatedCouple); 
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// GET '/task'		 => to get all tasks
router.get('/', (req, res, next) => {
  Task.find()
    // .populate('tasks')
    .then(allTasks => {
      res.status(200).json(allTasks);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// GET '/tasks/:id'   => to retrieve a specific task
router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid( id)) {
    res.status(500).json({ message: 'Specified taskId is invalid' });
    return;
  }

  Task.findById( id )
    .then(foundTask => {
      res.status(200).json(foundTask);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});


// // PUT '/tasks/:id'    => to edit a specific task
router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const { name, description } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(500).json({
      message: 'Specified taskid is invalid',
    });
    return;
  }

  Task.findByIdAndUpdate(id, { name, description })
    .then(() => {
      res.status(201).json({
        message: 'Task updated !',
      });
    })
    .catch(err => {
      res.status(400).json(err);
    });
});



// // DELETE '/tasks/:id'     => to delete a specific task
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(500).json({ message: 'Specified task id is invalid' });
    return;
  }

  Task.findByIdAndRemove( id )
    .then( (deletedTask) => {
      return deletedTask.couple; // return the project id to the next then statement
    })
    .then( (coupleId) => {
       return Couple.findByIdAndUpdate( coupleId, { $pull : {tasks: id}});    
    })
    .then( () => {
      // when project update promise is done we send the response 
      res.status(201).json({ message: 'Task deleted'});
    })
    .catch( (err) => {
      res.status(400).json(err);
    });
})

module.exports = router;