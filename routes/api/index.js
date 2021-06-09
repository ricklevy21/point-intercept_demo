const router = require("express").Router();
const projectRoutes = require("./projects");
const transectRoutes = require("./transects");
const pointRoutes = require("./points")
const dataRoutes = require("./data")
const registerRoute = require("./register")
const loginRoute = require("./login")
const editRoute = require("./edit")


//Project routes
router.use("/api/projects", projectRoutes);
router.use("/api/transects", transectRoutes);
router.use("/api/points", pointRoutes);
router.use("/api/data", dataRoutes);
router.use("/api/register", registerRoute);
router.use("/api/login", loginRoute);
router.use("/api/edit", editRoute);





module.exports = router;
