const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Medicine = require("./Medicines").MedicineSchema;
const Production = require("./Productions").ProductionSchema;

const ProductionStockSchema = new Schema({
    medicine: { type: Schema.Types.ObjectId, ref: 'medicines' },
    manDate: Date,
    expiryDate: Date,
    units: Number,
    price: Number,
    valid: Boolean,
    production: { type: Schema.Types.ObjectId, ref: 'productions' }
})

const ProductionStocks = mongoose.model('productionStocks', ProductionStockSchema);

module.exports = {
    ProductionStocks,
    ProductionStockSchema
};