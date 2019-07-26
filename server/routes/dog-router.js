const express = require('express');

const DogController = require('../controllers/dog-controller');

const router = express.Router();

router.post('/dog', DogController.createDog);
router.put('/dog/:id', DogController.updateDog);
router.delete('/dog/:id', DogController.deleteDog);
router.get('/dog/:id', DogController.getDogById);
router.get('/dog', DogController.getDogs);

module.exports = router;