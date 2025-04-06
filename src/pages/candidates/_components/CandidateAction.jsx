import { useState } from "react";
import DeleteModel from "./DeleteConfermation";
import { Button, Modal, Space } from "antd";

function ActionMenu({ data, getAllCandidate }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const downloadFile = (filename = "file.pdf") => {
    const link = document.createElement("a");
    link.href = data.resume;
    link.download = filename;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          <DeleteModel data={data} getAllCandidate={getAllCandidate} />
          <Space>
            <Button type="text" style={{ width: 100 }} onClick={downloadFile}>
              Download
            </Button>
          </Space>
        </div>
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

export default ActionMenu;
