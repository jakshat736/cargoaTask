const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  
    productName: {
    type: String,
    default:''
  },
    Quantity: {
    type: Number,
    
  },
    edit: {
    type: String,
    default:''
    
  },
    dateOfShipping: {
    type: String,
    default:''
  },
    shippingSchedule1: {
    type: String,
    default:''
  },
  shippingSchedule2: {
    type: String,
    default:''
  },
  shippingSchedule3: {
    type: String,
    default:''
  },
  vendorId: {
    type: String,
   default:''
  },
  file: {
    type: String,
    default:''
    
  },
  
 
  
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;
