// Modal.js
import React from 'react';
import './Modal.css'; 

const Modal = ({ message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Success</h2>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
