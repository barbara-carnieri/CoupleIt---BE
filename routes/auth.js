const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/user');

const parser = require('../config/cloudinary');

// HELPER FUNCTIONS
const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin,
} = require('../helpers/middlewares');

//  GET    '/me'
router.get('/me', isLoggedIn, (req, res, next) => {
  req.session.currentUser.password = '*';
  res.json(req.session.currentUser);
});


//  POST    '/login'
router.post(
  '/login',
  isNotLoggedIn,
  validationLoggin,
  async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        next(createError(404));
      } else if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        res.status(200).json(user);
        return;
      } else {
        next(createError(401));
      }
    } catch (error) {
      next(error);
    }
  },
);


// upload Image
// router.post('/signup/image', parser.single('photo'), (req, res, next) => {
//   console.log('file upload');
//   if (!req.file) {
//     next(new Error('No file uploaded!'));
//   };
//   const imageUrl = req.file.secure_url;
//   res.json(imageUrl).status(200);
// });




//  POST    '/signup'
router.post(
  '/signup',
  parser.single('photo'),
  isNotLoggedIn,
  validationLoggin,
  async (req, res, next) => {
    const { email, password, username } = req.body;
    const photoUrl = req.file.secure_url;

    try {
      // projection
      const emailExists = await User.findOne({ email }, 'email');

      if (emailExists) return next(createError(400));
      else {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPass = bcrypt.hashSync(password, salt);
        const newUser = await User.create({ email, username, password: hashPass, photoUrl });
        req.session.currentUser = newUser;
        res
          .status(200) //  OK
          .json(newUser);
      }
    } catch (error) {
      next(error);
    }
  },
);



//  POST    '/logout'
router.post('/logout', isLoggedIn, (req, res, next) => {
  const { email } = req.session.currentUser;
  req.session.destroy();
  res
    .status(200) //  No Content
    .json({ message: `User '${email}' logged out - session destroyed` });
  return;
});

//  GET    '/private'   --> Only for testing - Same as /me but it returns a message instead
router.get('/private', isLoggedIn, (req, res, next) => {
  res
    .status(200) // OK
    .json({ message: 'Test - User is logged in' });
});

module.exports = router;
