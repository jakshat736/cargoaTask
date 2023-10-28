const { json } = require('express');
var express = require('express');
const pool = require('./pool');
var router = express.Router();
const upload = require('./multer');
const mailjet = require ('node-mailjet')
var Vendor=require('./Schemas/VendorSchema')



router.post('/addvendor', upload.single(''),async (req, res) => {
    const { vendorId, vendorName , vendorPassword } = req.body;
    
    try {
        let vendor = await Vendor.findOne({ vendorId });
        if(vendor){
            res.status(200).json({status:'exist'})
            console.log('Vendor credentials not inserted ');
        }else{
                vendor = new Vendor({ vendorId, vendorName , vendorPassword  });
               await vendor.save();
             
const request = mailjet
.post("send", {'version': 'v3.1'})
.request({
  "Messages":[
    {
      "From": {
        "Email": "jakshat736@gmail.com",
        "Name": "Akshat"
      },
      "To": [
        {
          "Email": "jakshat736@gmail.com",
          "Name": "Akshat"
        }
      ],
      "Subject": "Greetings from Mailjet.",
      "TextPart": "My first Mailjet email",
      "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
      "CustomID": "AppGettingStartedTest"
    }
  ]
})
request
  .then((result) => {
    console.log(result.body)
  })
  .catch((err) => {
    console.log(err.statusCode)
  })

               res.status(200).json({status:'added'})
               console.log('Vendor credentials inserted successfully');
        }
              
             } catch (error) {
               console.error(error);
               res.status(500).json({ error: 'Internal server error' });
             }
           
  });
router.get('/displayallvendor',async (req, res) => {
    
    try {
        let vendor = await Vendor.find();
        
              console.log(vendor)
               res.status(200).json({data:vendor})
             
              
             } catch (error) {
               console.error(error);
               res.status(500).json({ error: 'Internal server error' });
             }
           
  });
router.post('/checkVendor', async (req, res) => {
    const { vendorId, vendorPassword } = req.body;
    console.log(vendorId)
    try {
      const vendor = await Vendor.findOne({ vendorId });
      if (vendor && vendor.vendorPassword === vendorPassword) {
        console.log('Vendor credentials verified successfully');
        res.json({ status: true,data:vendor });
      } else {
        console.log('Incorrect admin credentials');
        res.status(401).json({ error: 'Incorrect admin credentials' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  module.exports = router;
