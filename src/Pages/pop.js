import React, { useState } from 'react';
import './pop.css'; 

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div className="input-container">
          <label htmlFor="country">Country:</label>
          <input type="text" id="country" name="country" />
        </div>
        <div className="input-container">
          <label htmlFor="item">Item:</label>
          <input type="text" id="item" name="item" />
        </div>
        <button onClick={handleClose}>Close</button>
        <button onClick={handleClose}>Send</button>
      </section>
    </div>
  );
};

// Main App component
function Pop() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="App">
      <h1>React Modal Example</h1>
      <button onClick={handleShowModal}>Open Modal</button>
      <Modal show={showModal} handleClose={handleCloseModal}>
        <h2>Modal Content</h2>
        <p>This is a modal dialog!</p>
      </Modal>
    </div>
  );
}

export default Pop;
