import React from 'react';

const Modal = ({ isOpen, onRequestClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        <button onClick={onRequestClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;