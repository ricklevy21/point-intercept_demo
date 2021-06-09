//dependencies
const mongoose = require("mongoose");

const Schema = mongoose.Schema

const TransectSchema = new Schema({
    transect: {
        type: String,
        required: true
    },
    date: {
        type: Date
        },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    elevation: {
        type: Number
    },
    crew: [String],
    additionalSpecies: [String],
    points: [
    {
        type: Schema.Types.ObjectId,
        ref: "Point"
    }
    ]
});

const Transect = mongoose.model("Transect", TransectSchema);

module.exports = Transect;