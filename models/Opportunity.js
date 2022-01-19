const mongoose = require("mongoose");
const { Schema } = mongoose;
const OpportunitySchema = new mongoose.Schema({
  position: {
    type: String,
    require: true,
  },

  description: {
    type: String,
    required: true,
  },
  lastdate: {
    type: Date,
    required: true,
  },
  requirements: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  company:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"startup"

  },
  numberofpostions:{
    type:Number,
    required:true
  }
});
const opportunity = mongoose.model("Opportunity", OpportunitySchema);
opportunity.createIndexes();
module.exports = opportunity;
