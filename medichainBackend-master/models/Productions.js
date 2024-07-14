const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ProductionSchema = new Schema({
    name: String,
    address: String,
    country: String,
    city: String,
    zip: String,
    phone: String,
    email: {
        type: String,
        required: true,
        index: true,
        unique: true,
        dropDups: true
    },
    license: {
        type: String,
        required: true,
        index: true,
        unique: true,
        dropDups: true
    },
    password: {
        type: String,
        required: true
    },
    ownerName: String,
    token: String,
})

ProductionSchema.methods.comparePassword = function (password) {
    const user = this;

    return bcryptjs.compareSync(password, user.password);
}

ProductionSchema.methods.generateToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id }, "productions", {})
    user.token = token;

    await user.save();
    return;
}

ProductionSchema.methods.removeToken = async function (token) {
    const user = this;

    await user.findOneAndUpdate({ token }, { token: null });
    return;
}

//Hook that will run before (new Users()).save()
ProductionSchema.pre("save", function (next) {
    const user = this;

    if (user.isModified('password')) {
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(user.password, salt);

        user.password = hash;
    }

    next();
})

const Productions = mongoose.model('productions', ProductionSchema);

module.exports = {
    Productions,
    ProductionSchema
};