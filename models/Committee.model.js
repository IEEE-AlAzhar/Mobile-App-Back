const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const committeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Committee = mongoose.model("Committee", committeeSchema);
module.exports = Committee;
