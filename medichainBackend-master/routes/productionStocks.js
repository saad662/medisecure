const express = require("express");
const router = express.Router();
const Medicines = require("../models/Medicines").Medicines;
const ProductionStock = require("../models/ProductionStocks").ProductionStocks;

//protected route
router.get("/getAll", (req, res) => {
  try {
    const stock = ProductionStock.find()
      .populate("production", "-password -token")
      .populate("medicine");
    stock
      .then((allProductionStock) => {
        res.send({ result: allProductionStock });
      })
      .catch((e) => {
        res.send({ message: e.message });
      });
  } catch (e) {
    res.send({ message: "invalid request" });
  }
});

router.get("/getStockById/:id", (req, res) => {
  var id = req.params.id;
  const stock = ProductionStock.findOne({ id }).populate(
    "production",
    "-password -token"
  );
  stock
    .then((allProductionStock) => {
      res.send({ result: allProductionStock });
    })
    .catch((e) => {
      res.send({ message: e.message });
    });
});
router.get("/getStocksByProduction/:id", (req, res) => {
  var id = req.params.id;
  const stock = ProductionStock.find({ production: id }).populate("medicine");
  stock
    .then((allProductionStock) => {
      res.send({ data: allProductionStock });
    })
    .catch((e) => {
      res.send({ message: e.message, error: true });
    });
});

router.post("/add", (req, res) => {
  const data = req.body;
  const stock = new ProductionStock(data);
  stock
    .save()
    .then((s) => {
      res.send({ message: "Stocks added successfully with stock id: " + s.id });
    })
    .catch((e) => {
      res.send({ message: e.message, error: true });
    });
});

router.put("/update", (req, res) => {
  const data = req.body;
  if (data.id) {
    const stock = ProductionStock.findOne({ id: data.id }).update(data);
    stock
      .then(() => {
        res.send({ message: "Medicine updated successfully!" });
      })
      .catch((e) => {
        console.log("e ===>", e);
        res.send({ message: e.message });
      });
  } else {
    res.send({ message: "Id is not present for the entity" });
  }
});

module.exports = router;
