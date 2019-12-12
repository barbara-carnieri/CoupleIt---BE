const express = require('express');
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "./../public/images/uploads/" });
const parser = require("./../config/cloudinary");

// router.post("/", upload.single("photo"), function(req, res, next) {
//   const { creator } = req.body;
//   Paintings.create(req.body)
//     .then(newPainting => {
//       console.log(newPainting);
//       res.status(202).json(newPainting);
//       User.findByIdAndUpdate(
//         creator,
//         { $push: { paintings: newPainting._id } },
//         { new: true, useFindAndModify: false }
//       )
//         .populate("paintings")
//         .then(updatedUser => {
//           {
//             console.log(updatedUser);
//           }
//         })
//         .catch(err => console.log(err));
//       return;
//     })
//     .catch(err => {
//       res.status();
//       console.log(err);
//     });
// });

router.post("/", parser.single("photo"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
  }
  const imageUrl = req.file.secure_url;
  console.log(imageUrl);
  res.json(imageUrl).status(200);
});

module.exports = router;