const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  
    vendorId: {
    type: String,
    required: true
  },
    vendorName: {
    type: String,
    required: true
  },
    vendorPassword: {
    type: String,
    required: true
  },
  
 
  
});

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;
