require('dotenv').config();

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
 
cloudinary.config({
  cloud_name:'dbravjxyr',
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
  });

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'coupleIt',
  allowedFormats: ['jpg', 'png', 'jpeg', 'gif']
});
 
const parser = multer({ storage: storage });

module.exports = parser