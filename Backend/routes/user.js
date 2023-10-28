const { json } = require('express');
var express = require('express');
const pool = require('./pool');
var router = express.Router();
const upload = require('./multer');

var Purchase=require('./Schemas/PurchaseSchema')


router.post('/addpurchase', upload.single('file'),async (req, res) => {
    const { productName, Quantity , dateOfShipping,vendorId } = req.body;
    console.log(req.file)
    
    try {
        
              const  purchase = new Purchase({ productName:productName, Quantity:Quantity , dateOfShipping:dateOfShipping,vendorId:vendorId,file:req.file.filename  });
               await purchase.save();
               res.status(200).json({status:'added'})
               console.log('purchase order inserted successfully');
    
              
             } catch (error) {
               console.error(error);
               res.status(500).json({ error: 'Internal server error' });
             }
           
  });
router.get('/displaypurchase', async (req, res) => {
   
    try {
        
              const  purchase = await Purchase.find()
               
               res.status(200).json({data:purchase})
               console.log('purchase order inserted successfully');
    
              
             } catch (error) {
               console.error(error);
               res.status(500).json({ error: 'Internal server error' });
             }
           
  });
router.post('/displaypurchasebyid', upload.single(''),async (req, res) => {
       const {vendorId}=req.body
    try {
        
              const  purchase = await Purchase.find({vendorId:vendorId})
               
               res.status(200).json({data:purchase})
               
              
             } catch (error) {
               console.error(error);
               res.status(500).json({ error: 'Internal server error' });
             }
           
  });
router.post('/updatepurchasebyid', upload.single(''),async (req, res) => {
       const {_id,shippingSchedule1,shippingSchedule2,shippingSchedule3,edited}=req.body
    try {
        
              const  purchase = await Purchase.findOne({_id:_id})
               if(purchase){
                purchase.shippingSchedule1=shippingSchedule1;
                purchase.shippingSchedule2=shippingSchedule2;
                purchase.shippingSchedule3=shippingSchedule3;
                purchase.edit=edited;
                await purchase.save()
               }
               res.status(200).json({status:'true',data:purchase})
               
              
             } catch (error) {
               console.error(error);
               res.status(500).json({ error: 'Internal server error' });
             }
           
  });

  module.exports=router