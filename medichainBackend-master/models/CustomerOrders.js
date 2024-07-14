const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerOrderSchema = new Schema({
    distributor: { type: Schema.Types.ObjectId, ref: 'distributors' },
    customer: { type: Schema.Types.ObjectId, ref: 'customers' },
    createdAt: Date,
    updatedAt: Date,
    description: String,
    status: String,
    distributorStock: { type: Schema.Types.ObjectId, ref: 'distributorStocks' },
    qty: Number,
    products: [
        {
            name: String,
            qty: Number,
            distributorStock: { type: Schema.Types.ObjectId, ref: 'distributorStocks' },
            price: Number
        }
    ],
    name: String,
    address: String,
    zip: String,
    city: String,
    phone: String,
    totalBill: Number
})

const CustomerOrders = mongoose.model('customerOrders', CustomerOrderSchema);
module.exports = {
    CustomerOrders,
    CustomerOrderSchema
};