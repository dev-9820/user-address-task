const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  address: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // This must reference the 'User' model
    required: true,
  },
});

module.exports = mongoose.model('Address', addressSchema);
