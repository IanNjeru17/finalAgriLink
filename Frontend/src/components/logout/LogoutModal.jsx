import React from 'react';
import { Modal, Button } from '@mui/material';

const LogoutModal = ({ open, handleClose, handleLogout }) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <div className="modalContent">
                <h2>Confirm Logout</h2>
                <p>Are you sure you want to log out?</p>
                <Button onClick={handleClose} color="primary">Cancel</Button>
                <Button onClick={handleLogout} color="secondary">Logout</Button>
            </div>
        </Modal>
    );
};

export default LogoutModal;
