const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Dog = new Schema(
    {
        name: { type: String, required: true },
        breed: { type: String, required: true },
        color: { type: [String], required: true },
        age: { type: Number, required: true },
        weight: { type: Number, Required: true },
        birthday: { type: Date, required: false },
        smellRating: { type: Number, required: false }
    },
    { timestamps: true }
);

module.exports = mongoose.model('profiles', Dog);