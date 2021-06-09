//dependencies
const router = require("express").Router();
const usersController = require("../../controllers/usersController")

//Matches with "/api/register"
router.route("/")
    .post(usersController.create)

module.exports = router