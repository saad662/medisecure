const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://kaifqureshidev:vjRlQQgtTajmPulU@cluster0.7itezpz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURI);

module.exports = mongoose;