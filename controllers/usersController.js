//dependencies
const db = require("../models");

module.exports = {

//method to register / create a new user
create: function(req, res) {
    //make sure the user doesnt already exsit
    db.User
        .findOne({email: req.body.email})
        .then(user => {
            if(user) {
                //User already exists
                res.json("this user already exists")
            }else{
                //submit the user registrant data to the database
                db.User
                    .create(req.body)
                    .then(function(users){
                        res.json(users)
                    })
                    .catch(err => res.status(422).json(err));
            }
        })
    },

//method to login a user. checks if the username and passord submitted match a record in the database
login: function(req, res) {
    console.log(req.body)
    //check the database
    db.User
        .findOne({
            email: req.body.email,
            password: req.body.password
        })
        .then(function(loginInfo) {
            if(loginInfo){
                console.log("success")
                res.json(true)
            }
            else{
                console.log("login failed")
                res.json(false)
            }
        })
        .catch(err => res.status(422).json(err));
    }
}