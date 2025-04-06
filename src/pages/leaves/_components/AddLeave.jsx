import React, { useEffect, useState } from "react";
import "./addLeaveModel.css";
import { API } from "../../../services";
import { Select } from "antd";

const AddLeaveModal = ({ onClose, getAllLeave }) => {
  const [employs, setEmploys] = useState([]);
  const [formData, setFormData] = useState({
    employee: "",
    designation: "",
    leaveDate: "",
    documents: null,
    reason: "",
  });
  const getAllEmployee = async () => {
    await API.getAllEmployee()
      .then((res) => {
        setEmploys(res.data);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    getAllEmployee();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSelectChange = (value) => {
    setFormData({ ...formData, employee: value });
  };

  const handleSubmit = async () => {
    const form = new FormData();
    form.append("employeeId", formData.employee);
    form.append("designation", formData.designation);
    form.append("leaveDate", formData.leaveDate);
    form.append("documents", formData.documents);
    form.append("reason", formData.reason);

    await API.AddLeave(
      form,
      "Leave applied successfully",
      "Submitting leave..."
    )
      .then(() => {
        onClose(false), getAllLeave();
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="modal-overlay-1">
      <div className="modal">
        <div className="modal-header">
          Add New Leave
          <span className="close" onClick={() => onClose(false)}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <div className="input-group">
            <Select
              showSearch
              variant="borderless"
              placeholder="Select an employee"
              style={{
                width: "48%",
                padding: "19px",
                border: "1px solid #4d007d",
                borderRadius: "16px",
              }}
              onChange={handleSelectChange}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={employs?.map((item) => ({
                value: item._id,
                label: item.name,
              }))}
            />

            <input
              type="text"
              placeholder="Designation*"
              onChange={handleInputChange}
              name="designation"
            />
          </div>
          <div className="input-group">
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              placeholder="Leave date*"
              onChange={handleInputChange}
              name="leaveDate"
            />
            <input type="file" onChange={handleInputChange} name="documents" />
          </div>
          <div className="input-group">
            <input
              type="text"
              className="full-width"
              placeholder="Reason*"
              onChange={handleInputChange}
              name="reason"
            />
          </div>
          {!formData.employee ||
          !formData.designation ||
          !formData.leaveDate ||
          !formData.documents ||
          !formData.reason ? (
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

export default AddLeaveModal;
