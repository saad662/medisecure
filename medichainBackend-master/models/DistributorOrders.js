const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DistributorOrderSchema = new Schema({
    distributor: { type: Schema.Types.ObjectId, ref: 'distributors' },
    production: { type: Schema.Types.ObjectId, ref: 'productions' },
    createdAt: Date,
    updatedAt: Date,
    description: String,
    status: String,
    productionStock: { type: Schema.Types.ObjectId, ref: 'productionStocks' },
    qty: Number,
})

const DistributorOrder = mongoose.model('distributorOrders', DistributorOrderSchema);
module.exports = {
    DistributorOrder,
    DistributorOrderSchema
};