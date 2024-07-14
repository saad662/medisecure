const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Medicine = require("./Medicines").MedicineSchema;
const Distributor = require("./Distributors").DistributorSchema;
const Production = require("./Productions").ProductionSchema;

const DistributorStockSchema = new Schema({
    medicine: { type: Schema.Types.ObjectId, ref: 'medicines' },
    manDate: Date,
    expiryDate: Date,
    units: Number,
    price: Number,
    valid: Boolean,
    distributor:{ type: Schema.Types.ObjectId, ref: 'distributors' },
    production:{ type: Schema.Types.ObjectId, ref: 'productions' }
})

const DistributorStocks = mongoose.model('distributorStocks', DistributorStockSchema);

module.exports = {
    DistributorStocks,
    DistributorStockSchema
};