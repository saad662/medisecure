const express = require('express');
const router = express.Router();
const DistributorOrder = require('../models/DistributorOrders').DistributorOrder;
const ProductionStock = require("../models/ProductionStocks").ProductionStocks;
const DistributorStock = require("../models/DistributorStocks").DistributorStocks;
const medicine = require("../models/Medicines").Medicines

//protected route
router.get('/getAll', (req, res) => {
    try {
        const order = DistributorOrder.find()
            .populate("production", "-password -token")
            .populate("medicine");
        order.then((allDistributorOrder) => {
            res.send({ result: allDistributorOrder })
        }).catch(e => {
            res.send({ message: e.message });
        })
    } catch (e) {
        res.send({ message: "invalid request" });
    }
})

router.get('/getOrderById/:id', (req, res) => {
    var id = req.params.id
    const order = DistributorOrder.findOne({ id })
        .populate("production", "-password -token");
    order.then((allDistributorOrder) => {
        res.send({ result: allDistributorOrder })
    }).catch(e => {
        res.send({ message: e.message });
    })
})
router.get('/getOrdersByProduction/:id', (req, res) => {
    var id = req.params.id
    const stock = DistributorOrder.find({ production: id })
        .populate("distributor production productionStock").populate({
            path: 'productionStock',
            populate: {
                path: 'medicine',
                model: medicine
            }
        });
    stock.then((allDistributorOrder) => {
        res.send({ data: allDistributorOrder })
    }).catch(e => {
        res.send({ message: e.message, error: true });
    })
})
router.get('/getOrdersByDistributor/:id', (req, res) => {
    var id = req.params.id
    const stock = DistributorOrder.find({ distributor: id })
        .populate("production productionStock").populate({
            path: 'productionStock',
            populate: {
                path: 'medicine',
                model: medicine
            }
        });
    stock.then((allDistributorOrder) => {
        res.send({ data: allDistributorOrder })
    }).catch(e => {
        res.send({ message: e.message, error: true });
    })
})

router.post('/add', (req, res) => {
    const data = req.body;
    console.log(data, 'data');
    const order = new DistributorOrder(data);
    order.save()
        .then((s) => {
            console.log(s, 'order after adding ');
            res.send({
                message: "Order created successfully with order id: " + s.id,
                error: false
            })
        })
        .catch(e => {
            res.send({ message: e.message, error: true })
        })
});

router.put('/update', (req, res) => {
    const data = req.body;
    data.updatedAt = new Date();
    var id = data._id;
    console.log(id, 'idddd');
    data._id = null;
    delete data["_id"];
    console.log(data, 'data');
    if (id) {
        if (data.status === "Accepted") {
            console.log(data.productionStock)
            var prodStock = ProductionStock.findOne({ _id: data.productionStock })
            prodStock.then((stock) => {
                var newStock = stock;
                var medicine = stock.medicine;
                if (stock.units > data.qty) {
                    newStock.units = stock.units - data.qty;
                    console.log(stock, "newStock")
                    ProductionStock.updateOne({ _id: stock._id }, { $set: { units: newStock.units } })
                        .then((e) => {
                            console.log(e, 'Hell')
                            var distStock = {
                                medicine,
                                production: data.production,
                                distributor: data.distributor,
                                manDate: stock.manDate,
                                expiryDate: stock.expiryDate,
                                units: data.qty,
                                price: stock.price,
                                valid: stock.valid,
                            };
                            var newDistStock = new DistributorStock(distStock)
                            newDistStock.save()
                                .then(() => {
                                    DistributorOrder.updateOne({ _id: id }, data).then((d) => {
                                        res.send({ data: d, message: "Order updated successfully!" })
                                    })
                                        .catch(e => {
                                            console.log('e ===>', e);
                                            res.send({ message: e.message, error: true })
                                        })
                                })
                        })
                } else {
                    res.send({ message: "You Don't have enough stocks", error: true })
                }
            })
        } else {
            DistributorOrder.updateOne({ _id: id }, data).then((d) => {
                res.send({ data: d, message: "Order updated successfully!" })
            })
                .catch(e => {
                    console.log('e ===>', e);
                    res.send({ message: e.message, error: true })
                })
        }

    } else {
        res.send({ message: "Id is not present for the entity", error: true })
    }
})

module.exports = router;