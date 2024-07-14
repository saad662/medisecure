const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Production = require("./Productions").ProductionSchema;

const MedicineSchema = new Schema({
    name: String,
    description: String,
    category: String,
    formula: String,
    antibiotic: Boolean,
    chemicals: [String],
    production: {
        type: Schema.Types.ObjectId, ref: 'productions',
        unique: false,
    }
})

const Medicines = mongoose.model('medicines', MedicineSchema);

module.exports = {
    Medicines,
    MedicineSchema
};