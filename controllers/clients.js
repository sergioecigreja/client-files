let express = require("express");
let router = express.Router();
let Client = require("../models/client");
let handleError = require("./utils");

router.get("/", function (req, res) {
  Client.find().then(function (clients) {
    res.json(clients);
  });
});

router.get("/:clientId", function (req, res) {
  const query = Client.findById(req.params.clientId);

  query.exec(function (err, client) {
    if (err) {
      handleError(err, "Client ID not found", res);
    }
    res.json(client);
  });
});

router.put("/:clientId", function (req, res) {
  Client.findByIdAndUpdate(req.params.clientId, req.body, {
    new: true,
    lean: true,
    useFindAndModify: false,
  })
    .exec()
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      handleError(err, "Error updating Client", res);
    });
});

router.delete("/:clientId", function (req, res) {
  Client.findByIdAndDelete(req.params.clientId)
    .exec()
    .then((docs) => {
      res.json(docs);
    })
    .catch((err) => {
      handleError(res, "Error deleting Client", err);
    });
});

router.post("/", function (req, res) {
  Client.create(
    {
      name: req.body.name,
      birthdate: new Date(req.body.birthdate),
      phone_number: req.body.phone_number,
      address: req.body.address,
      nif: req.body.nif,
    },
    function (err, client) {
      if (err) {
        handleError(err, "Error creating client", res);
      }

      res.json(client);
    }
  );
});

module.exports = router;
