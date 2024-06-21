import React from 'react';

const Modal = ({ show, handleClose, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <button onClick={handleClose}>Close</button>
        {children}
      </section>
    </div>
  );
};

export default Modal;
