import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

interface WarningPopupProps {
  message: string;
  onClose: () => void;
}

const WarningPopup: React.FC<WarningPopupProps> = ({ message, onClose }) => {
  return (
    <Dialog
      open={true}
      onClose={onClose}
    >
      <DialogTitle>Advertencia</DialogTitle>
      <DialogContent>
        {message}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Aceptar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default WarningPopup;
