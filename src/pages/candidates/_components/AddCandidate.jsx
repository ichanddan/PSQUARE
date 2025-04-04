import React from "react";
import "./addcandidate.css";

const AddCandidateFormModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          Add New Candidate
          <span className="close" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <div className="input-group">
            <input type="text" placeholder="Full Name*" />
            <input type="email" placeholder="Email Address*" />
          </div>
          <div className="input-group">
            <input type="tel" placeholder="Phone Number*" />
            <input type="text" placeholder="Position*" />
          </div>
          <div className="input-group">
            <input
              type="text"
              className="full-width"
              placeholder="Experience*"
            />
            <input type="file" className="full-width" />
          </div>
          <div className="ischeck">
            <input type="checkbox" size={16} id="declaration" />
            <label htmlFor="declaration">
              I hereby declare that the above information is true to the best of
              my knowledge and belief
            </label>
          </div>
          <button className="save-btn" disabled>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCandidateFormModal;
