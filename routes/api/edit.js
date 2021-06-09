//dependencies
const router = require("express").Router();
const editController = require("../../controllers/editController")


//Matches with "/api/edit"
router.route("/")
    .put(editController.update)

module.exports = router
