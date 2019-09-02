const Dog = require('../models/dog-model');

createDog = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a doggo',
        });
    };

    const dog = new Dog(body);

    if (!dog) {
        return res.status(400).json({ success: false, error: err });
    };

    dog
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: dog._id,
                message: 'Doggo created!',
            });
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Doggo not created!',
            });
        });
};

updateDog = async (req, res) => {
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
        // basic profile fields
        dog.name = body.name;
        dog.breed = body.breed;
        dog.color = body.color;
        dog.age = body.age;
        dog.weight = body.weight;
        dog.birthday = body.birthday;
        dog.gender = body.gender;
        dog.fileName = body.fileName;
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

updateTemperament = async (req, res) => {
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
        // temperament and personality fields
        dog.temperament.empathetic = body.empathetic;
        dog.temperament.anxiety = body.anxiety;
        dog.temperament.fearful = body.fearful
        dog.temperament.isAfraidFireworks = body.isAfraidFireworks;
        //
        dog.temperament.friendlinessOverall = body.friendlinessOverall;
        dog.temperament.goodWithPeople = body.goodWithPeople;
        dog.temperament.goodWithOtherDogs = body.goodWithOtherDogs;
        dog.temperament.goodWithCats = body.goodWithCats;
        dog.temperament.goodWithOtherAnimals = body.goodWithOtherAnimals;
        dog.temperament.goodWithChildren = body.goodWithChildren;
        //
        dog.temperament.playfulness = body.playfulness;
        dog.temperament.likesPlayingHumans = body.likesPlayingHumans;
        dog.temperament.likesPlayingDogs = body.likesPlayingDogs;
        dog.temperament.playsFetch = body.playsFetch;
        dog.temperament.likesToys = body.likesToys;
        dog.temperament.likesTreats = body.likesTreats
        //
        dog.temperament.athleticLevel = body.athleticLevel;
        dog.temperament.likesExcersize = body.likesExcersize;
        dog.temperament.trainingLevel = body.trainingLevel;
        dog.temperament.trainability = body.trainability;
        dog.temperament.stubbornness = body.stubbornness;
        dog.temperament.intelligence = body.intelligence;
        //
        dog.temperament.senseOfSmell = body.senseOfSmell;
        dog.temperament.preyDrive = body.preyDrive;
        dog.temperament.aggressionLevel = body.aggressionLevel;
        dog.temperament.protectiveness = body.protectiveness;
        dog.temperament.distinguishThreatening = body.distinguishThreatening;
        dog.temperament.balanceStability = body.balanceStability;
        dog.temperament.confidence = body.confidence;
        //
        dog.temperament.isPickyEater = body.isPickyEater;
        dog.temperament.shedding = body.shedding;
        dog.temperament.barking = body.barking;
        dog.temperament.smellRating = body.smellRating;
        //
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

updateBiography = async (req, res) => {
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
        // biography fields
        dog.biography.aboutDoggo = body.aboutDoggo;
        dog.biography.favoriteMemory = body.favoriteMemory;
        dog.biography.favoriteFoods = body.favoriteFoods;
        dog.biography.favoriteToy = body.favoriteToy;
        dog.biography.favoriteSleepLocation = body.favoriteSleepLocation;
        dog.biography.favoriteWalkLocation = body.favoriteWalkLocation;
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

updateAlbumFileNames = async (req, res) => {
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
        dog.albumFileNames = body.albumFileNames;
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

deleteDog = async (req, res) => {
    await Dog.findOneAndDelete({ _id: req.params.id }, (err, dog) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        };

        if (!dog) {
            return res
                .status(404)
                .json({ success: false, error: `Doggo not found` });
        };

        return res.status(200).json({ success: true, data: dog });
    }).catch(err => console.log(err));
};

getDogById = async (req, res) => {
    await Dog.findOne({ _id: req.params.id }, (err, dog) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        };

        if (!dog) {
            return res
                .status(404)
                .json({ success: false, error: `Doggo not found` });
        };
        return res.status(200).json({ success: true, data: dog });
    }).catch(err => console.log(err));
};

getDogs = async (req, res) => {
    await Dog.find({}, (err, dogs) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        };
        if (!dogs.length) {
            return res
                .status(404)
                .json({ success: false, error: `Doggo not found` });
        };
        return res.status(200).json({ success: true, data: dogs });
    }).catch(err => console.log(err));
};

module.exports = {
    createDog,
    updateDog,
    updateTemperament,
    updateBiography,
    updateAlbumFileNames,
    deleteDog,
    getDogs,
    getDogById
};