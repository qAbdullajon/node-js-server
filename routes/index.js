const { Router } = require("express");
const router = Router();

router.use("/employers", require("./employers"));
router.use("/jobs", require("./jobs"));

module.exports = router;
