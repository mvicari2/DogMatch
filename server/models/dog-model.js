const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Dog = new Schema(
    {
        name: { type: String, required: true },
        breed: { type: String, required: false },
        color: { type: [String], required: false },
        age: { type: Number, required: false },
        weight: { type: Number, Required: false },
        birthday: { type: Date, required: false },
        gender: { type: String, required: false },
        fileName: { type: String, required: false }, //profile pic filename        
        albumFileNames: { type: [String], required: false },

        // Personality and Temperament
        temperament: { 
            // ratings:
            empathetic: { type: Number, required: false },
            anxiety: { type: Number, required: false },
            fearful: { type: Number, required: false },
            isAfraidFireworks: { type: Number, required: false },           
            //
            friendlinessOverall: { type: Number, requried: false },
            goodWithPeople: { type: Number, required: false },
            goodWithOtherDogs: { type: Number, required: false },
            goodWithCats: { type: Number, required: false },
            goodWithOtherAnimals: { type: Number, required: false },
            goodWithChildren: { type: Number, required: false },
            //
            playfulness: { type: Number, required: false },
            likesPlayingHumans: { type: Number, required: false },
            likesPlayingDogs: { type: Number, required: false },
            playsFetch: { type: Number, required: false },
            likesToys: { type: Number, required: false },
            likesTreats: { type: Number, required: false },
            //
            athleticLevel: { type: Number, required: false },
            likesExcersize: { type: Number, required: false },
            trainingLevel: { type: Number, required: false },
            trainability: { type: Number, required: false },
            stubbornness: { type: Number, required: false },
            intelligence: { type: Number, required: false },
            //            
            senseOfSmell: { type: Number, required: false },
            preyDrive: { type: Number, required: false },
            aggressionLevel: { type: Number, required: false },
            protectiveness: { type: Number, required: false },
            distinguishThreatening: { type: Number, required: false },
            balanceStability: { type: Number, required: false },
            confidence: { type: Number, required: false },
            //
            isPickyEater: { type: Number, required: false },
            shedding: { type: Number, required: false },
            barking: { type: Number, required: false },            
            smellRating: { type: Number, required: false },
            //
            hairOrFur: { type: String, required: false },
            housebroken: { type: Boolean, required: false },
            outsideOrInside: { type: String, required: false },
            isFixed: { type: Boolean, required: false }
        },
        biography: {
            aboutDoggo: { type: String, required: false },            
            favoriteMemory: {type: String, required: false },
            favoriteFoods: {type: String, required: false },
            favoriteToy: { type: String, required: false },
            favoriteSleepLocation: { type: String, required: false },
            favoriteWalkLocation: { type: String, required: false }
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('profiles', Dog);