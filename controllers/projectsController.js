const db = require("../models");

//methods

module.exports = {
    findAll: function(req, res) {
        db.Project
            .find({})
            .then(function(projects) {
                res.json(projects)
            })
            .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
        db.Project
            .create(req.body)
            .then(function(projects){
                res.json(projects)
            })
            .catch(err => res.status(422).json(err));
    },
    findById: function(req, res) {
        db.Project
            .findById(req.params.id)
            .then(project => res.status(200).json(project))
            .catch(err => res.status(404).json(err));
    },
    //method to grab all data for one project
    projectData: function(req,res) {
        db.Project
            .findById(req.params.id)
            .populate({
                path:"transects",
                model: "Transect",
                populate: {
                    path: "points",
                    model: "Point"
                }
            })
            .then(projectData => res.status(200).json(projectData))
            .catch(err => res.status(404).json(err));    }
}