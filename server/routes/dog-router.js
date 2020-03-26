const express = require('express');
const multer = require('multer');

const DogController = require('../controllers/dog-controller');
const TemperamentController = require('../controllers/temperament-controller');
const MatchesController = require('../controllers/matches-controller');

const router = express.Router();

// Dog Controller Routes
router.post('/dog', DogController.createDog);
router.put('/dog/:id', DogController.updateDog);
router.put('/dog/biography/:id', DogController.updateBiography);
router.put('/dog/album/:id', DogController.updateAlbumFileNames);
router.delete('/dog/:id', DogController.deleteDog);
router.get('/dog/:id', DogController.getDogById);
router.get('/dog', DogController.getDogs);

// Temperament Controller Routes
router.put('/temperament/sectionOne/:id', TemperamentController.updateTemperamentSectionOne);
router.put('/temperament/sectionTwo/:id', TemperamentController.updateTemperamentSectionTwo);
router.put('/temperament/sectionThree/:id', TemperamentController.updateTemperamentSectionThree);
router.put('/temperament/sectionFour/:id', TemperamentController.updateTemperamentSectionFour);
router.put('/temperament/sectionFive/:id', TemperamentController.updateTemperamentSectionFive);
router.put('/temperament/sectionSix/:id', TemperamentController.updateTemperamentSectionSix);
router.put('/temperament/sectionSeven/:id', TemperamentController.updateTemperamentSectionSeven);

// Matches Controller Routes
router.get('/matches/:id', MatchesController.getMatchesById);


// multer storage for profile picture
var profilePicStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './data/uploads/profile');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// multer storage for album storage
var albumStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './data/uploads/album');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

var profilePicUpload = multer({ storage: profilePicStorage });
var albumUpload = multer({ storage: albumStorage });

// Upload Profile Picture (single)
router.post('/uploadProfilePicture', profilePicUpload.single('profilePicture'), function (req, res, next) {
  const file = req.file;

  if (!file) {
    const error = new Error('Please upload a picture');
    error.httpStatusCode = 400;
    return next(error);
  };
  res.send(file);
});

// Upload Multiple Pictures (array)
router.post('/uploadAlbum', albumUpload.array('albumFiles', 12), (req, res, next) => {
  const files = req.files;

  if (!files) {
    const error = new Error('Please choose files');
    error.httpStatusCode = 400;
    return next(error);
  };
  res.send(files);
});

module.exports = router;