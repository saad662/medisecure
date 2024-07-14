const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const CustomerSchema = new Schema({
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

CustomerSchema.methods.comparePassword = function (password) {
    const user = this;

    return bcryptjs.compareSync(password, user.password);
}

CustomerSchema.methods.generateToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id }, "customers", {})
    user.token = token;

    await user.save();
    return;
}

CustomerSchema.methods.removeToken = async function (token) {
    const user = this;

    await user.findOneAndUpdate({ token }, { token: null });
    return;
}

//Hook that will run before (new Users()).save()
CustomerSchema.pre("save", function (next) {
    const user = this;

    if (user.isModified('password')) {
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(user.password, salt);

        user.password = hash;
    }

    next();
})

const Customers = mongoose.model('customers', CustomerSchema);

module.exports = {
    Customers,
    CustomerSchema
};