import React from 'react';
import { Dialog, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CustomerEditForm from './CustomerEditForm';

const PopUpDialoge = (props) => {
  const { openPopup, setOpenPopUp, rowDataForEdit, fetchData } = props;

  return (
    <Dialog open={openPopup} style={{ zIndex: 500 }}>
      <DialogTitle>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         <div></div>
          <IconButton onClick={() => setOpenPopUp(false)}>
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>

      <CustomerEditForm rowData={rowDataForEdit} setOpenPopUp={setOpenPopUp} fetchData={fetchData} />
    </Dialog>
  );
};

export default PopUpDialoge;
