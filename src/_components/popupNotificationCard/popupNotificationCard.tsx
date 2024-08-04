import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import '../popupNotificationCard/styles.module.css';
import './styles.module.css';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50vw',
  height: '50vh',
  bgcolor: '#ff9800',
  border: 'none',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  borderRadius: '40px', 
  color: 'white'
};

interface BasicModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

const BasicModal: React.FC<BasicModalProps> = ({ open, onClose, title, description }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div>
        <div className="modal-overlay" onClick={onClose} />
        <Box sx={style} className="modal-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography id="modal-modal-title" variant="h6" component="h2" className="modal-title">
              {title}
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button variant="contained" onClick={onClose} sx={{ marginRight: 1, }}>Close</Button>
              <IconButton onClick={onClose} aria-label="close" className="modal-close-button">
                <CloseIcon />
              </IconButton>
            </div>
          </div>
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 2,
              flexGrow: 1,
              padding: '10px', 
              border: '5px solid white',
              borderRadius: '50px' 
            }}
            className="modal-description"
            align="center"
          >
            {description}
          </Typography>
        </Box>
      </div>
    </Modal>
  );
};

export default BasicModal;