const express = require('express');
const router = express.Router();

router.use('/productions', require('./productions.js'))
router.use('/medicines', require('./medicines.js'))
router.use('/distributors', require('./distributors.js'))
router.use('/productionStocks', require('./productionStocks.js'))
router.use('/distributorStocks', require('./distributorStocks.js'))
router.use('/orders', require('./distributorOrders.js'))
router.use('/customerOrders', require('./customerOrders.js'))
router.use('/customers', require('./customers.js'))

module.exports = router;