import React, { useState } from "react";
import "./addcandidate.css";
import { API } from "../../../services";

const AddCandidateFormModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    position: "",
    experience: "",
    resume: "",
    informationRight: false,
  });
  const handleInputChange = (e) => {
    const { name, value, type, files, checked } = e.target;

    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("number", formData.number);
    form.append("position", formData.position);
    form.append("experience", formData.experience);
    form.append("resume", formData.resume);
    form.append("informationRight", formData.informationRight);
    await API.Add(
      form,
      "Candidate registered successfully",
      "Candidate registering..."
    )
      .then(() => onClose(false))
      .catch((e) => console.log(e));
  };
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
            <input
              type="text"
              placeholder="Full Name*"
              onChange={handleInputChange}
              name="name"
            />
            <input
              type="email"
              placeholder="Email Address*"
              onChange={handleInputChange}
              name="email"
            />
          </div>
          <div className="input-group">
            <input
              type="tel"
              placeholder="Phone Number*"
              onChange={handleInputChange}
              name="number"
            />
            <input
              type="text"
              placeholder="Position*"
              onChange={handleInputChange}
              name="position"
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              className="full-width"
              placeholder="Experience*"
              onChange={handleInputChange}
              name="experience"
            />
            <input
              type="file"
              className="full-width"
              onChange={handleInputChange}
              name="resume"
            />
          </div>
          <div className="ischeck">
            <input
              type="checkbox"
              size={16}
              id="declaration"
              onChange={handleInputChange}
              name="informationRight"
            />
            <label htmlFor="declaration">
              I hereby declare that the above information is true to the best of
              my knowledge and belief
            </label>
          </div>
          {!formData.email ||
          !formData.name ||
          !formData.experience ||
          !formData.position ||
          !formData.resume ||
          !formData.number ? (
            <button className="save-btn" disabled>
              Save
            </button>
          ) : (
            <button className="save-btn-value" onClick={handleSubmit}>
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCandidateFormModal;
