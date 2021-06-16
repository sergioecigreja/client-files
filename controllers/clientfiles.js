let express = require("express");
let router = express.Router();
let ClientFile = require("../models/clientfile");
const { handleError } = require("./utils");

router.get("/:_id", function (req, res) {
  ClientFile.findOne({ client: req.params._id })
    .exec()
    .then((doc) => {
      if (!doc) {
        res.status(400).send({ message: "Document does not exist" });
      }
      res.json(doc);
    })
    .catch((err) => {
      handleError(err, "Error getting client file", res);
    });
});

router.put("/:_id", function (req, res) {
  ClientFile.findByIdAndUpdate(req.params._id, req.body, {
    new: true,
    lean: true,
    useFindAndModify: false,
  })
    .exec()
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      handleError(err, "Error updating Client File", res);
    });
});

router.delete("/:_id", function (req, res) {
  ClientFile.findByIdAndDelete(req.params._id)
    .exec()
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      handleError(res, "Error deleting Client File", err);
    });
});

router.post("/", function (req, res) {
  ClientFile.create(req.body)
    .exec()
    .then(
      ((doc) => {
        console.log("loege");
        res.json(doc);
      }).catch((err) => {
        handleError(res, "Error creating Client File", err);
      })
    );
});

module.exports = router;
