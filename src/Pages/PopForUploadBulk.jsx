import React from 'react';
import { Dialog, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CustomerEditForm from './CustomerEditForm';
import BulkCustomersUpload from './BulkCustomersUpload';



const PopForUploadBulk = (props) => {
    const {openBulkUpload , setOpenBulkUpload } = props;

    return (
      <Dialog open={openBulkUpload} style={{ zIndex: 500 }}>
        <DialogTitle>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>Upload Bulk Customer In Excel</div>
            <IconButton onClick={() => setOpenBulkUpload(false)}>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
  
<BulkCustomersUpload/>


             </Dialog>
    );
  };

export default PopForUploadBulk
