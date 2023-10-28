import { Button, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'
import { postData } from '../Services/NodeServices'
import Swal from 'sweetalert2'

const AddVendor = () => {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const handleAdd=async()=>{
     var formdata=new FormData
     formdata.append('vendorId',email)
     formdata.append('vendorName',name)
     formdata.append('vendorPassword',password)

     const response=await postData('vendor/addvendor',formdata,true)
     if(response.status=='added'){
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Added Successfully',
        showConfirmButton: false,
        timer: 1500
      })
      setEmail('')
      setName('')
      setPassword('')
     
    }else if(response.status=='exist'){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Already Exist submit new id',
        showConfirmButton: false,
        timer: 1500
      })
      setEmail('')
      setName('')
      setPassword('')
    }
    }
  return (
    <Grid sx={{display:'flex',justifyContent:'center',alignItems:'center',margin:10}}>
        <Grid container spacing={2} sx={{display:'flex',justifyContent:'center',alignItems:"center"}}>
            <Grid item xs={12} md={7}>
            <TextField fullWidth label='Vendor Name' value={name} onChange={(e)=>setName(e.target.value)}/>
            </Grid>
            <Grid item xs={12} md={7}>
            <TextField fullWidth label='Vendor Email'  value={email} onChange={(e) => setEmail(e.target.value)}/>
            </Grid>
            <Grid item xs={12} md={7}>
            <TextField fullWidth label='Vendor Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </Grid>
            <Grid item xs={12} md={7}>
            <Button onClick={()=>handleAdd()} variant='contained'>Add Vendor</Button>
            </Grid>

        </Grid>
    </Grid>
  )
}

export default AddVendor
