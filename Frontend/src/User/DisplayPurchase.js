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

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const Input = styled("input")({
  display: "none",
});

export default function DisplayPurchase(props) {
  var theme = useTheme();
 
  const matches = useMediaQuery(theme.breakpoints.down(700));
  const [purchases, setPurchases] = useState([]);
  

  useEffect(
    function () {
      fetchAllPurchases();
    },
    []
  );
  const handleDownload=(path)=>{
    const pdfPath = path; // Replace with the actual path to your PDF file on the backend
    
    // Create a temporary anchor element
    const a = document.createElement('a');
    a.href = pdfPath;
    a.download = 'your-file-name.pdf'; // Set the desired file name for the downloaded PDF
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
            field: "shippingSchedule1",
          },
          {
            title: "Schedule 2",
            field: "shippingSchedule2",
          },
          {
            title: "Schedule 3",
            field: "shippingSchedule3",
          },
          {
            title: "Vendor Id",
            field: "vendorId",
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
    const result = await getData("user/displaypurchase");

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
    </Grid>
  );
}
