import React, { useState, useEffect } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { getData, serverURL } from ".././Services/NodeServices";
import MaterialTable from "@material-table/core";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { postData } from ".././Services/NodeServices";
import Swal from "sweetalert2";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Switch from "@mui/material/Switch";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const Input = styled("input")({
  display: "none",
});

export default function VendorDashboard(props) {
  var theme = useTheme();
  var location=useLocation();
  var navigate=useNavigate();
  let data=location.state.data
 
  const matches = useMediaQuery(theme.breakpoints.down(700));
  const [purchases, setPurchases] = useState([]);
  const [schedule1, setSchedule1] = useState('');
  const [schedule2, setSchedule2] = useState('');
  const [schedule3, setSchedule3] = useState('');
  

  useEffect(
    function () {
      fetchAllPurchases();
    },
    []
  );
  const handleDownload=(path)=>{
    const pdfPath = path; 
    
   
    const a = document.createElement('a');
    a.href = pdfPath;
    a.download = 'your-file-name.pdf'; 
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  const handleUpdate=async(rowData)=>{
if(schedule1!='' || schedule2!='' || schedule3!=''){
    var formData=new FormData
    formData.append('_id',rowData._id)
    formData.append('shippingSchedule1',schedule1)
    formData.append('shippingSchedule2',schedule2)
    formData.append('shippingSchedule3',schedule3)
    formData.append('edited','edited')
    const response=await postData('user/updatepurchasebyid',formData,true)

    if(response.status=='true'){
      Swal.fire({
        position: 'center',
        icon: 'Success',
        title: 'Updated Successfully',
        showConfirmButton: false,
        timer: 1500
      })
      fetchAllPurchases()
    }
}else{
  alert('Select the Shipping Schedule')
}

   
  }


  function displayTable() {
    return (
      <MaterialTable
        title={"Purchase List"}
        data={purchases}
        style={{}}
        columns={[
          {
            title: "Id",
            field: "_id",
          },
          {
            title: "Product Name",
            field: "productName",
          },
          {
            title: "Quantity",
            field: "Quantity",
          },
          {
            title: "Shipping Date",
            field: "dateOfShipping",
          },
          {
            title: "Schedule 1",
            render: (rowData) => (
              rowData.shippingSchedule1==''?
                <div>
                  <TextField type='date' value={schedule1} onChange={(e)=>setSchedule1(e.target.value)}/>
                </div>:<div>{rowData.shippingSchedule1}</div>
              ),
          },
          {
            title: "Schedule 2",
            render: (rowData) => (
              rowData.shippingSchedule2==''?
              <div>
                <TextField type='date' value={schedule2} onChange={(e)=>setSchedule2(e.target.value)}/>
              </div>:<div>{rowData.shippingSchedule2}</div>
            ),
          },
          {
            title: "Schedule 3",
            render: (rowData) => (
              rowData.shippingSchedule3==''?
              <div>
                <TextField type='date' value={schedule3} onChange={(e)=>setSchedule3(e.target.value)}/>
              </div>:<div>{rowData.shippingSchedule3}</div>
            ),
          },
          {
            title: "Vendor Id",
            field: "vendorId",
          },

          
          
          {
            title: "Action",
            render: (rowData) => (
             rowData.edit=='edited'? <div>
             <Button variant="contained">
               Read Only
             </Button>
           </div>: <div>
                <Button variant="contained" onClick={() => handleUpdate(rowData)}>
                  Save the Edits
                </Button>
              </div>
            ),
          },
          {
            title: "Download Pdf",
            render: (rowData) => (
              <div>
                <Button variant="contained" onClick={() => handleDownload(`${serverURL}/images/${rowData.file}`)}>
                  Download Purchase Pdf
                </Button>
              </div>
            ),
          },
        ]}
        actions={[]}
      />
    );
  }

  const fetchAllPurchases = async () => {
    var formdata=new FormData
    formdata.append('vendorId',data._id)
    const result = await postData("user/displaypurchasebyid",formdata,true);

    setPurchases(result.data);
   
  };

  return (
    <Grid
      container
      spacing={2}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        item
        xs={12}
        sm={8}
        style={{ marginTop: 20, fontSize: matches ? 10 : 20 }}
      >
        {displayTable()}
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        style={{ marginTop: 20, fontSize: matches ? 10 : 20 }}
      >
        <Button variant='contained' onClick={()=>navigate('/vendorlogin')}>Logout</Button>
      </Grid>
    </Grid>
  );
}
