import React, { useEffect, useState } from "react";
import { API } from "../../../services";
import { Select } from "antd";

const UpdateEmployeesFormModal = ({ onClose, data, getAllCandidate }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    position: "",
    department: "",
    date_of_joining: "",
  });

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

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
    await API.UpdateEmployee(
      data?._id,
      formData,
      "Employees update successfully",
      "Employees updating..."
    )
      .then(() => {
        onClose(false), getAllCandidate();
      })
      .catch((e) => console.log(e));
    console.log(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          Edit Employee Details{" "}
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
              value={formData.name}
            />
            <input
              type="email"
              placeholder="Email Address*"
              onChange={handleInputChange}
              name="email"
              value={formData.email}
            />
          </div>
          <div className="input-group">
            <input
              type="tel"
              placeholder="Phone Number*"
              onChange={handleInputChange}
              name="number"
              value={formData.number}
            />
            <input
              type="text"
              placeholder="Department*"
              onChange={handleInputChange}
              name="department"
              value={formData.department}
            />
          </div>
          <div className="input-group">
            <Select
              showSearch
              variant="borderless"
              placeholder="Select a Position"
              style={{
                width: "48%",
                padding: "19px",
                border: "1px solid #4d007d",
                borderRadius: "16px",
              }}
              value={formData.position}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, position: value }))
              }
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  value: "Intern",
                  label: "Intern",
                },
                {
                  value: "Full-Time",
                  label: "Full Time",
                },
                {
                  value: "Junior",
                  label: "Junior",
                },
                {
                  value: "Senior",
                  label: "Senior",
                },
                {
                  value: "team-lead",
                  label: "Team Lead",
                },
              ]}
            />

            <input
              type="date"
              className="full-width"
              onChange={handleInputChange}
              name="date_of_joining"
              value={formData.date_of_joining}
            />
          </div>

          {!formData.email ||
          !formData.name ||
          !formData.date_of_joining ||
          !formData.position ||
          !formData.department ||
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

export default UpdateEmployeesFormModal;
