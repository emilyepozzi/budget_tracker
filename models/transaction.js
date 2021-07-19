const mongoose = require("mongoose");

const theSchema = mongoose.Schema;

const schemaTrans = new theSchema({
  name: {
    type: String,
    trim: true,
    required: "Enter your transaction name."
  },
  value: {
    type: Number,
    required: "Enter your amount with a number. "
  },
  date: {
    type: Date,
    default: Date.now
  }
});



const theTransaction = mongoose.model("theTransaction", schemaTrans);

module.exports = theTransaction;