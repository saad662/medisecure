const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ProductionStocks = require('./ProductionStocks').ProductionStockSchema;

const DistributorSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        index: true,
        unique: true,
        dropDups: true
    },
    cnic: {
        type: String,
        required: true,
        index: true,
        unique: true,
        dropDups: true
    },
    password: {
        type: String,
        required: true,
    },
    address: String,
    country: String,
    city: String,
    token: String,
})

DistributorSchema.methods.comparePassword = function (password) {
    const user = this;
    return bcryptjs.compareSync(password, user.password);
}

DistributorSchema.methods.generateToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id }, "distributors", {})
    user.token = token;

    await user.save();
    return;
}

DistributorSchema.methods.removeToken = async function (token) {
    const user = this;

    await user.findOneAndUpdate({ token }, { token: null });
    return;
}

//Hook that will run before (new Users()).save()
DistributorSchema.pre("save", function (next) {
    const user = this;

    if (user.isModified('password')) {
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(user.password, salt);

        user.password = hash;
    }

    next();
})

const Distributors = mongoose.model('distributors', DistributorSchema);

module.exports = {
    Distributors,
    DistributorSchema
};