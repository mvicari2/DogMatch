const express = require('express');
const multer = require('multer');

const DogController = require('../controllers/dog-controller');

const router = express.Router();

router.post('/dog', DogController.createDog);
router.put('/dog/:id', DogController.updateDog);
router.delete('/dog/:id', DogController.deleteDog);
router.get('/dog/:id', DogController.getDogById);
router.get('/dog', DogController.getDogs);

var profilePicStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './data/uploads/profile');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

var profilePicUpload = multer({ storage: profilePicStorage });

//Upload Profile Picture (single)
router.post('/uploadProfilePicture', profilePicUpload.single('profilePicture') ,function (req, res, next) {
    const file = req.file;

    if (!file) {
        const error = new Error('Please upload a picture');
        error.httpStatusCode = 400;
        return next(error);
    }
    res.send(file);    
});

//Future Enhancement: Upload Multiple Pictures (dogAlbum)
// router.post('/uploadDogAlbum', upload.array('dogAlbum', 12), (req, res, next) => {
//   const files = req.files;

//   if (!files) {
//     const error = new Error('Please choose files');
//     error.httpStatusCode = 400;
//     return next(error);
//   }

//     res.send(files);
 
// });

module.exports = router;