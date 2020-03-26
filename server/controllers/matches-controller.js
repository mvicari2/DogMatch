const Dog = require('../models/dog-model');

//--> Determine Matches per Doggo <--//
// 1. find doggo by ID 
// 2. query mongodb for matches based on individual data points
// 3. add matches for each data point/query to profileMatches array (allows duplicates)
// 4. after queries complete count occurances of each doggo in profileMatches array
// 5. sort array by occurances of each doggo 
// 6. return first 10 matches to client
// ---------------------------------------------------------------- //

getMatchesById = async (req, res) => {
    var profile = {};
    var profileMatches = [];
    var matchPointCount = 0;

    // get current dog
    await Dog.findOne({ _id: req.params.id }
        , (err, dog) => {
            if (err) {
                return res.status(400).json({ success: false, error: err });
            };

            if (!dog) {
                return res
                    .status(404)
                    .json({ success: false, error: `Doggo not found` });
            };
            profile = dog;
        }).catch(err => console.log(err));

    // get the profile fields and values to use in query
    const matchProperties = await getMatchProperties(profile);

    // loop through fields used for finding matches, run match query for each
    for (const matchProp of matchProperties) {
        var matchBatch = [];

        matchBatch = await matchQuery(profile.id, matchProp.property, matchProp.value);

        if (matchBatch !== undefined && matchBatch.length > 0) {
            matchPointCount = matchPointCount + 1;

            matchBatch.forEach(match => {
                profileMatches.push(match);
            });
        };
    };

    // count the number of times each match 
    // in the array occurs and save the counts to an object -
    // also track match id to query with later
    var matchCounts = [];
    for (var i in profileMatches) {
        if (!(matchCounts.hasOwnProperty(profileMatches[i]._id))) {
            matchCounts[profileMatches[i]._id] = {
                count: 1,
                id: profileMatches[i]._id.toString()
            }
        } else {
            matchCounts[profileMatches[i]._id] = {
                count: matchCounts[profileMatches[i]._id].count += 1,
                id: profileMatches[i]._id.toString()
            }
        };
    };

    //Sort the match counts (smallest to largest)
    var matchesByCount = []
    matchesByCount = Object.keys(matchCounts).sort((a, b) => {
        return matchCounts[a].count - matchCounts[b].count;
    });

    // reverse the array so largest count is first, then slice array for top 10 matches
    matchesByCount.reverse();
    matchesByCount = matchesByCount.slice(0, 10);

    // query for each match's model and add them to payload
    var matchesPayload = [];
    for (const match of matchesByCount) {
        var singleMatch = await topTenMatchQuery(match);
        matchesPayload.push(singleMatch);
    };

    // return payload of top ten matches, in order from best match
    if (matchesPayload.length < 1) {
        // return error if no matches
        return res
            .status(404)
            .json({ success: false, error: `SAD DOGGO, NO MATCHES :-(` });
    } else {
        return res.status(200).json({ success: true, data: matchesPayload });
    }
};

matchQuery = async (id, property, value) => {
    var matchBatch = [];
    var query = {};

    // set query w/ special conditons for age & weight
    if (property === 'age') {
        // query matches within +/- 2 years
        query = {
            $and: [{
                _id: { $ne: id },
                age: { $gt: value - 2, $lt: value + 2 },
            }]
        };
    } else if (property === 'weight') {
        // query matches within +/- 10 lbs
        query = {
            $and: [{
                _id: { $ne: id },
                weight: { $gt: value - 10, $lt: value + 10 }
            }]
        };
    } else {
        // query exact matches for remaining basic profile values and temperament ratings
        query = {
            $and: [{
                _id: { $ne: id },
                [property]: value
            }]
        };
    };

    await Dog.find(query, (err, matches) => {
        if (err) {
            console.log('Error on ' + property + 'query');
        };
        if (matches !== undefined) {
            if (!matches.length) {
                console.log('No Matches on ' + property);
            } else {
                matches.forEach(match => {
                    matchBatch.push(match);
                });
                console.log('Profiles added for ' + property);
            };
        } else {
            console.log('err: matches undefined on ' + property);
        };
    }).catch(err => console.log(err));

    return matchBatch;
};

topTenMatchQuery = async matchID => {
    var dogMatch = {};

    await Dog.findOne({ _id: matchID }
        , (err, dog) => {
            if (err) {
                console.log('error in top ten match query');
            };

            if (!dog) {
                console.log('Doggo not found in topTenMatchQuery');
            };
            dogMatch = dog;
        }).catch(err => console.log(err));

    return dogMatch;
};

getMatchProperties = async profile => {
    const matchProperties = [
        { property: "breed", value: profile.breed },
        { property: "age", value: profile.age },
        { property: "weight", value: profile.weight },
        { property: "gender", value: profile.gender },
        { property: "temperament.empathetic", value: profile.temperament.empathetic },
        { property: "temperament.anxiety", value: profile.temperament.anxiety },
        { property: "temperament.fearful", value: profile.temperament.fearful },
        { property: "temperament.isAfraidFireworks", value: profile.temperament.isAfraidFireworks },
        { property: "temperament.friendlinessOverall", value: profile.temperament.friendlinessOverall },
        { property: "temperament.goodWithPeople", value: profile.temperament.goodWithPeople },
        { property: "temperament.goodWithOtherDogs", value: profile.temperament.goodWithOtherDogs },
        { property: "temperament.goodWithCats", value: profile.temperament.goodWithCats },
        { property: "temperament.goodWithOtherAnimals", value: profile.temperament.goodWithOtherAnimals },
        { property: "temperament.goodWithChildren", value: profile.temperament.goodWithChildren },
        { property: "temperament.playfulness", value: profile.temperament.playfulness },
        { property: "temperament.likesPlayingHumans", value: profile.temperament.likesPlayingHumans },
        { property: "temperament.fearful", value: profile.temperament.fearful },
        { property: "temperament.likesPlayingDogs", value: profile.temperament.likesPlayingDogs },
        { property: "temperament.playsFetch", value: profile.temperament.playsFetch },
        { property: "temperament.likesToys", value: profile.temperament.likesToys },
        { property: "temperament.likesTreats", value: profile.temperament.likesTreats },
        { property: "temperament.athleticLevel", value: profile.temperament.athleticLevel },
        { property: "temperament.likesExcersize", value: profile.temperament.likesExcersize }, { property: "temperament.empathetic", value: profile.temperament.empathetic },
        { property: "temperament.trainingLevel", value: profile.temperament.trainingLevel },
        { property: "temperament.trainability", value: profile.temperament.trainability },
        { property: "temperament.stubbornness", value: profile.temperament.stubbornness },
        { property: "temperament.intelligence", value: profile.temperament.intelligence },
        { property: "temperament.senseOfSmell", value: profile.temperament.senseOfSmell },
        { property: "temperament.preyDrive", value: profile.temperament.preyDrive },
        { property: "temperament.aggressionLevel", value: profile.temperament.aggressionLevel },
        { property: "temperament.protectiveness", value: profile.temperament.protectiveness }, { property: "temperament.empathetic", value: profile.temperament.empathetic },
        { property: "temperament.distinguishThreatening", value: profile.temperament.distinguishThreatening },
        { property: "temperament.balanceStability", value: profile.temperament.balanceStability },
        { property: "temperament.confidence", value: profile.temperament.confidence },
        { property: "temperament.isPickyEater", value: profile.temperament.isPickyEater },
        { property: "temperament.shedding", value: profile.temperament.shedding },
        { property: "temperament.barking", value: profile.temperament.barking },
        { property: "temperament.smellRating", value: profile.temperament.smellRating },
        { property: "temperament.hairOrFur", value: profile.temperament.hairOrFur },
        { property: "temperament.housebroken", value: profile.temperament.housebroken },
        { property: "temperament.outsideOrInside", value: profile.temperament.outsideOrInside },
        { property: "temperament.isFixed", value: profile.temperament.isFixed }
    ];
    return matchProperties
};

module.exports = {
    getMatchesById
};

