const Dog = require('../models/dog-model');

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

module.exports = {
    getDogs,
    getDogById,
    createDog,
    updateDog,
    updateBiography,
    updateAlbumFileNames,
    deleteDog    
};