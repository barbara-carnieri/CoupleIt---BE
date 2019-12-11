//      routes/task.js
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Task = require('../models/task');
const Couple = require('../models/couple');


// POST '/tasks'      => to create a new task
router.post('/', (req, res, next) => {
  const { name, description, coupleId } = req.body;

  //project comes from project-routes and projectID from here
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

// // GET '/task'		 => to get all tasks
// router.get('/', (req, res, next) => {
//   Task.find()
//     // .populate('tasks')
//     .then(allTasks => {
//       res.status(200).json(allTasks);
//     })
//     .catch(err => {
//       res.status(400).json(err);
//     });
// });

// GET '/api/projects/:projectId/tasks/:taskId'   => to retrieve a specific task
// router.get('/projects/:projectId/tasks/:taskId', (req, res, next) => {
//   const { taskId } = req.params;

//   if (!mongoose.Types.ObjectId.isValid( taskId)) {
//     res.status(500).json({ message: 'Specified taskId is invalid' });
//     return;
//   }

//   Task.findById( taskId )
//     .then(foundTask => {
//       res.status(200).json(foundTask);
//     })
//     .catch(err => {
//       res.status(400).json(err);
//     });
// });


// // PUT '/api/tasks/:id'    => to update a specific task
// router.put('/tasks/:id', (req, res, next) => {
//   const { id } = req.params;
//   const { name, description } = req.body;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     res.status(500).json({
//       message: 'Specified taskid is invalid',
//     });
//     return;
//   }

//   Task.findByIdAndUpdate(id, { title, description })
//     .then(() => {
//       res.status(201).json({
//         message: 'Task updated !',
//       });
//     })
//     .catch(err => {
//       res.status(400).json(err);
//     });
// });



// // DELETE '/api/tasks/:id'     => to delete a specific task
// router.delete('/tasks/:id', (req, res, next) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     res.status(500).json({ message: 'Specified task id is invalid' });
//     return;
//   }

//   Task.findByIdAndRemove( id )
//     .then( (deletedTask) => {
//       return deletedTask.project; // return the project id to the next then statement
//     })
//     .then( (projectId) => {
//        return Project.findByIdAndUpdate( projectId, { $pull : {tasks: id}}); // return the peding project update promise to the next then statement      
//     })
//     .then( () => {
//       // when project update promise is done we send the response 
//       res.status(201).json({ message: 'Task deleted'});
//     })
//     .catch( (err) => {
//       res.status(400).json(err);
//     });
// })

module.exports = router;