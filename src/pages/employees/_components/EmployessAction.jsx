import { useState } from "react";
import { Button, Modal, Space } from "antd";
import DeleteModelForEmp from "./DeleteConformationEmp";
import UpdateEmployeesFormModal from "./UpdateEmployess";

function EmployessAction({ data, getAllCandidate }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };


  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        className="action-button"
        onClick={toggleDropdown}
        style={{
          background: "transparent",
          border: "none",
          fontSize: "24px",
          cursor: "pointer",
        }}
      >
        ⋮
      </button>

      {showDropdown && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            zIndex: 1000,
            padding: "8px",
            minWidth: "120px",
          }}
        >
          <Space>
            <Button type="text" style={{ width: 100 }} onClick={()=>setIsModalOpen(true)}>
              Edit
            </Button>
          </Space>
          <DeleteModelForEmp data={data} getAllCandidate={getAllCandidate} />
        </div>
      )}
      {isModalOpen && (
        <UpdateEmployeesFormModal onClose={() => setIsModalOpen(false)} data={data} getAllCandidate={getAllCandidate}/>
      )}
    </div>
  );
}

// const dropdownBtnStyle = {
//   display: "block",
//   width: "100%",
//   padding: "8px",
//   background: "none",
//   border: "none",
//   textAlign: "left",
//   cursor: "pointer",
//   fontSize: "14px",
//   hover: "red",
// };

export default EmployessAction;
