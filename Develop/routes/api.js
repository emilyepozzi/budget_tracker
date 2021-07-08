
const theRoutes = require("express").Router();
const theTransaction = require("../models/transaction.js");

theRoutes.post("/api/transaction", ({ body }, res) => {
  theTransaction.create(body)
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

theRoutes.post("/api/transaction/bulk", ({ body }, res) => {
  theTransaction.insertMany(body)
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

theRoutes.get("/api/transaction", (req, res) => {
  theTransaction.find({})
    .sort({ date: -1 })
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = theRoutes ;