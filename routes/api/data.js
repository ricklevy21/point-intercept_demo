//dependencies
const router = require("express").Router();
const projectsController = require("../../controllers/projectsController")


//Matches with "/api/data/:id"
router.route("/:id")
    .get(projectsController.projectData)

module.exports = router
