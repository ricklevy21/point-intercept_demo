//dependencies
const mongoose = require("mongoose");

const Schema = mongoose.Schema

const PointSchema = new Schema({
    point: {
        type: Number
        },
    ground_surface: {
        type: String,
        default: null
        },
    soil_moisture_percentage: {
        type: Number
    },
    soil_moisture_depth_cm: {
        type: Number
    },
    shrub_density: {
        type: Number
    },
    shrub_density_detail: {
        type: [String]
    },
    canopy_score: {
        type: Number
    },
    canopy_taxa: {
        type: [String]
    },
    hit_one: {
        type: String,
        default: null
    },
    hit_two: {
        type: [String],
        default: null
    }
});

const Point = mongoose.model("Point", PointSchema);

module.exports = Point;