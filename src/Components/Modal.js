import React from 'react';

const Modal = (props) => {
  console.log("=userData==>>>>", props.userData)

  return (
    <React.Fragment>
      <div className="modal-lg">
        <div className="modal-content rs-inner-popup">
            <button className="purple-close" onClick={() => props.modalOpen(false)}>
              <span>×</span>
            </button>
          <div className="modal-body">
            <div className="submit-section text-center">
              <h1 className="text-center head-submit">YOUR ORDER HAS BEEN SENT</h1>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Modal;
