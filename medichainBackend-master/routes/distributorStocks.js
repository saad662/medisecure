const express = require('express');
const router = express.Router();
const Medicines = require("../models/Medicines").Medicines;
const DistributorStock = require('../models/DistributorStocks').DistributorStocks;
// const multichain = require("../config/multichain");

//protected route
router.get('/getAll', (req, res) => {
    try {
        const stock = DistributorStock.find()
            .populate("production", "-password -token")
            .populate("medicine");
        stock.then((allDistributorStock) => {
            res.send({ result: allDistributorStock })
        }).catch(e => {
            res.send({ message: e.message });
        })
    } catch (e) {
        res.send({ message: "invalid request" });
    }
})

router.get('/getStockById/:id', (req, res) => {
    var id = req.params.id
    const stock = DistributorStock.findOne({ id }).populate("production", "-password -token");
    stock.then((allDistributorStock) => {
        res.send({ result: allDistributorStock })
    }).catch(e => {
        res.send({ message: e.message });
    })
})
router.get('/getStocksByDistributor/:id', (req, res) => {
    var id = req.params.id
    const stock = DistributorStock.find({ distributor: id })
        .populate("medicine");
    stock.then((allDistributorStock) => {
        res.send({ data: allDistributorStock })
    }).catch(e => {
        res.send({ message: e.message, error: true });
    })
})
router.get('/getMyStocks/:id', (req, res) => {
    var id = req.params.id
    const stock = DistributorStock.find({ distributor: id })
        .populate("medicine");
    stock.then((allDistributorStock) => {
        res.send({ data: allDistributorStock })
    }).catch(e => {
        res.send({ message: e.message, error: true });
    })
})

router.post('/add', (req, res) => {
    const data = req.body;
    console.log(data, 'data');
    const medicine = Medicines.findOne({ id: data.medicine });
    console.log(medicine, 'medicine');
    const stock = new DistributorStock(data);
    medicine.then((med) => {
        stock.save()
            .then((s) => {
                res.send({ message: "Stocks added successfully with stock id: " + s.id })
            })
            .catch(e => {
                res.send({ message: e.message, error: true })
            })
    })

});

router.put('/update', (req, res) => {
    const data = req.body;
    if (data.id) {
        const stock = DistributorStock.findOne({ id: data.id }).update(data);
        stock
            .then(() => {
                res.send({ message: "Medicine updated successfully!" })
            })
            .catch(e => {
                console.log('e ===>', e);
                res.send({ message: e.message })
            })
    } else {
        res.send({ message: "Id is not present for the entity" })
    }
})

module.exports = router;