let express = require("express");
let router = express.Router();

router.get("/", function (req, res) {
  res.json(req.headers);
});

router.get("/:clientId", function (req, res) {
  res.json(req.params);
});

module.exports = router;
