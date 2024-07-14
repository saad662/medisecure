const express = require("express");
const { DistributorStocks } = require("../models/DistributorStocks");
const router = express.Router();
const CustomerOrders = require("../models/CustomerOrders").CustomerOrders;

//protected route
router.get("/getAll", (req, res) => {
  try {
    const order = CustomerOrders.find()
      .populate("distributor", "-password -token")
      .populate("medicine");
    order
      .then((allCustomerOrders) => {
        res.send({ result: allCustomerOrders });
      })
      .catch((e) => {
        res.send({ message: e.message });
      });
  } catch (e) {
    res.send({ message: "invalid request" });
  }
});

router.get("/getOrderById/:id", (req, res) => {
  var id = req.params.id;
  const order = CustomerOrders.findOne({ _id: id }).populate(
    "products.distributorStock customer",
    "-password -token"
  );
  order
    .then((allCustomerOrders) => {
      res.send({ result: allCustomerOrders });
    })
    .catch((e) => {
      res.send({ message: e.message });
    });
});
router.get("/getOrdersByDistributor/:id", (req, res) => {
  var id = req.params.id;
  const stock = CustomerOrders.find({ distributor: id }).populate(
    "products.distributorStock customer"
  );
  stock
    .then((allCustomerOrders) => {
      res.send({ data: allCustomerOrders });
    })
    .catch((e) => {
      res.send({ message: e.message, error: true });
    });
});
router.get("/getOrdersByCustomerId/:id", (req, res) => {
  var id = req.params.id;
  const stock = CustomerOrders.find({ customer: id }).populate(
    "distributorStock"
  );
  stock
    .then((allCustomerOrders) => {
      res.send({ data: allCustomerOrders, error: false });
    })
    .catch((e) => {
      res.send({ message: e.message, error: true });
    });
});

router.post("/add", (req, res) => {
  const data = req.body;
  console.log(data, "data");
  const order = new CustomerOrders(data);
  order
    .save()
    .then((s) => {
      console.log("order created successfully");
      res.send({
        message: "Order created successfully with order id: " + s.id,
        error: false,
      });
    })
    .catch((e) => {
      res.send({ message: e.message, error: true });
    });
});

router.put("/update", async (req, res) => {
  try {
    const data = req.body;
    if (data._id) {
      if (data?.status === "accepted") {
        var promises = [];
        data?.products?.map((e) => {
          var updatedUnits = e?.distributorStock?.units - e?.qty;
          var promise = DistributorStocks.updateOne(
            { _id: e.distributorStock?._id },
            { $set: { units: updatedUnits } }
          );
          promises.push(promise);
        });
        var results = await Promise.all(promises);
      }
      await CustomerOrders.updateOne(
        { _id: data?._id },
        { status: data?.status }
      );
      res.send({ message: "Order updated successfully!", error: false });
    } else {
      res.send({ message: "Id is not present for the entity", error: true });
    }
  } catch (e) {
    res.send({ message: e.message, error: true });
  }
});

module.exports = router;
