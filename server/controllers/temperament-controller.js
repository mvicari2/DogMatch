const Dog = require('../models/dog-model');

updateTemperamentSectionOne = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a doggo to update',
        });
    };

    Dog.findOne({ _id: req.params.id }, (err, dog) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Doggo not found!',
            });
        };
        dog.temperament.empathetic = body.empathetic;
        dog.temperament.anxiety = body.anxiety;
        dog.temperament.fearful = body.fearful;
        dog.temperament.isAfraidFireworks = body.isAfraidFireworks;        
        dog
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: dog._id,
                    message: 'Doggo updated!',
                });
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Doggo not updated!',
                });
            });
    });
};

updateTemperamentSectionTwo = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a doggo to update',
        });
    };

    Dog.findOne({ _id: req.params.id }, (err, dog) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Doggo not found!',
            });
        };
        dog.temperament.friendlinessOverall = body.friendlinessOverall;
        dog.temperament.goodWithPeople = body.goodWithPeople;
        dog.temperament.goodWithOtherDogs = body.goodWithOtherDogs;
        dog.temperament.goodWithCats = body.goodWithCats;
        dog.temperament.goodWithOtherAnimals = body.goodWithOtherAnimals;
        dog.temperament.goodWithChildren = body.goodWithChildren;        
        dog
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: dog._id,
                    message: 'Doggo updated!',
                });
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Doggo not updated!',
                });
            });
    });
};

updateTemperamentSectionThree = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a doggo to update',
        });
    };

    Dog.findOne({ _id: req.params.id }, (err, dog) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Doggo not found!',
            });
        };
        dog.temperament.playfulness = body.playfulness;
        dog.temperament.likesPlayingHumans = body.likesPlayingHumans;
        dog.temperament.likesPlayingDogs = body.likesPlayingDogs;
        dog.temperament.playsFetch = body.playsFetch;
        dog.temperament.likesToys = body.likesToys;
        dog.temperament.likesTreats = body.likesTreats;        
        dog
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: dog._id,
                    message: 'Doggo updated!',
                });
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Doggo not updated!',
                });
            });
    });
};

updateTemperamentSectionFour = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a doggo to update',
        });
    };

    Dog.findOne({ _id: req.params.id }, (err, dog) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Doggo not found!',
            });
        };        
        dog.temperament.athleticLevel = body.athleticLevel;
        dog.temperament.likesExcersize = body.likesExcersize;
        dog.temperament.trainingLevel = body.trainingLevel;
        dog.temperament.trainability = body.trainability;
        dog.temperament.stubbornness = body.stubbornness;
        dog.temperament.intelligence = body.intelligence;
        dog
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: dog._id,
                    message: 'Doggo updated!',
                });
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Doggo not updated!',
                });
            });
    });
};

updateTemperamentSectionFive = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a doggo to update',
        });
    };

    Dog.findOne({ _id: req.params.id }, (err, dog) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Doggo not found!',
            });
        };       
        dog.temperament.senseOfSmell = body.senseOfSmell;
        dog.temperament.preyDrive = body.preyDrive;
        dog.temperament.aggressionLevel = body.aggressionLevel;
        dog.temperament.protectiveness = body.protectiveness;
        dog.temperament.distinguishThreatening = body.distinguishThreatening;
        dog.temperament.balanceStability = body.balanceStability;
        dog.temperament.confidence = body.confidence;
        dog
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: dog._id,
                    message: 'Doggo updated!',
                });
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Doggo not updated!',
                });
            });
    });
};

updateTemperamentSectionSix = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a doggo to update',
        });
    };

    Dog.findOne({ _id: req.params.id }, (err, dog) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Doggo not found!',
            });
        };        
        dog.temperament.isPickyEater = body.isPickyEater;
        dog.temperament.shedding = body.shedding;
        dog.temperament.barking = body.barking;
        dog.temperament.smellRating = body.smellRating;
        dog
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: dog._id,
                    message: 'Doggo updated!',
                });
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Doggo not updated!',
                });
            });
    });
};

updateTemperamentSectionSeven = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a doggo to update',
        });
    };

    Dog.findOne({ _id: req.params.id }, (err, dog) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Doggo not found!',
            });
        };
        dog.temperament.hairOrFur = body.hairOrFur;
        dog.temperament.housebroken = body.housebroken;
        dog.temperament.outsideOrInside = body.outsideOrInside;
        dog.temperament.isFixed = body.isFixed;
        dog
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: dog._id,
                    message: 'Doggo updated!',
                });
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Doggo not updated!',
                });
            });
    });
};

module.exports = {
    updateTemperamentSectionOne,
    updateTemperamentSectionTwo,
    updateTemperamentSectionThree,
    updateTemperamentSectionFour,
    updateTemperamentSectionFive,
    updateTemperamentSectionSix,
    updateTemperamentSectionSeven
};