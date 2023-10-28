import { Button, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getData, postData } from '../Services/NodeServices';
import Swal from 'sweetalert2';
const UserPage = () => {
  const [productName,setProductName]=useState('')
  const [quantity,setQuantity]=useState('')
  const [date,setDate]=useState('')
  const [vendorId,setVendorId]=useState('')
  const [message,setMessage]=useState('')
  const [vendors,setVendors]=useState([])
  const [file,setFile]=useState({url:"",bytes:""})

  const handlePdf = (event) => {
    setFile({
        url: URL.createObjectURL(event.target.files[0]),
        bytes: event.target.files[0],
    });
    setMessage('Uploaded Successfully')
   
};

const fetchVendors=async()=>{
  const response=await getData('vendor/displayallvendor')

  setVendors(response.data)

}
useEffect(()=>{
  fetchVendors()
},[])
  const handleChange=(e)=>{
    setVendorId(e.target.value)
  }

  const handleSubmit=async()=>{
    var formData=new FormData
    formData.append('productName',productName)
    formData.append('Quantity',quantity)
    formData.append('dateOfShipping',date)
    formData.append('vendorId',vendorId)
    formData.append('file',file.bytes)

    const response=await postData('user/addpurchase',formData,true)
    
    if(response.status=='added'){
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Added Successfully',
        showConfirmButton: false,
        timer: 1500
      })
      setDate('')
      setProductName('')
      setQuantity('')
      setFile({url:"",bytes:""})
      setVendorId('')
      setMessage('')
    }

     
  }

  return (
    <Grid sx={{display:'flex',justifyContent:'center',alignItems:'center',margin:10}}>
    <Grid container spacing={2} sx={{display:'flex',justifyContent:'center',alignItems:"center"}}>
  <Grid item xs={12} md={7}>
    <Typography>Product Name</Typography>
        <TextField fullWidth  value={productName} onChange={(e)=>setProductName(e.target.value)}/>

      </Grid>
      <Grid item xs={12} md={7}>
      <Typography>Quantity</Typography>
      <TextField fullWidth type='number' value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
      </Grid>
      <Grid item xs={12} md={7}>
      <Typography>Shipping Date</Typography>
      <TextField fullWidth  type='date' value={date} onChange={(e)=>setDate(e.target.value)}/>
      </Grid>
      <Grid item xs={12} md={7}>
      <Typography>Vendor</Typography>
      <FormControl fullWidth>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={vendorId}
   
    onChange={handleChange}
  >
   {vendors.map((item)=>{
    return(
<MenuItem value={item._id}>{item.vendorName}</MenuItem>
    )
   })} 
  </Select>
</FormControl>

      </Grid>
      <Grid item xs={12} md={7}>
      <label htmlFor="icon-button-file">
                    <input
                      style={{ display: "none" }}
                     
                      id="icon-button-file"
                      type="file"
                      onChange={handlePdf}
                    />
                    <Button
                      color="primary"
                      aria-label="upload picture"
                      variant='contained'
                      component="span"
                    >
                      Upload Pdf
                    </Button>
                  </label>
      </Grid>
      <Grid item xs={12} md={7}>
      <Typography>{message}</Typography>
      </Grid>
      <Grid item xs={12} md={7}>
          <Button onClick={()=>handleSubmit()} variant='contained'>
            Submit
          </Button>
      </Grid>

    </Grid>

   </Grid>
  )
}

export default UserPage
