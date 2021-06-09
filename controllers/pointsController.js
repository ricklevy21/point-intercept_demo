//dependencies
const db = require("../models");


//CRUD methods for point level data

//Method to get all of the points from the db
module.exports = {
    findAll: function(req, res) {
        db.Point
            .find({})
            .then(function(points) {
                res.json(points)
            })
            .catch(err => res.status(422).json(err));
    },


//Method to add a point, which also adds the point ID to the specified transect via projectID
    create: function(req, res) {
        const transectID = req.body.transectID

        db.Point
            .create(req.body)
            .then(function(points){
                return db.Transect.findOneAndUpdate({_id:transectID}, { $push: { points: points._id } }, { new: true })
            })
            .then(function(transectObj){
                    res.json(transectObj)
            })
            .catch(err => res.status(422).json(err));
    }
}