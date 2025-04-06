import Dashboard from "../../components/Dashboard";
import React, { useEffect, useState } from "react";
import { API } from "../../services";

export default function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [positionFilter, setPositionFilter] = useState("");
  // const [attendance, setAttendance] = useState();

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredattendance = attendance.filter((candidate) => {
    const matchesSearch =
      candidate?.employeeId?.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      candidate?.employeeId?.position
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesPosition =
      !positionFilter ||
      candidate.position.toLowerCase() === positionFilter.toLowerCase();

    return matchesSearch && matchesPosition;
  });
  const handleUpdateStatus = async (id, e) => {
    await API.UpdateAttendance(
      id,
      { attendance: e },
      "Update success",
      "updating.."
    )
      .then(() => getAllAttendance())
      .catch((e) => console.log(e));
  };

  const getAllAttendance = async () => {
    await API.getAllAttendance()
      .then((res) => {
        setAttendance(res.data);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    getAllAttendance();
  }, []);

  return (
    <Dashboard className="candidates-container">
      <div className="candidates-header">
        <div className="filter-section">
          <div className="filter-dropdown">
            <select
              className="filter-select"
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
            >
              <option value="">Status</option>
              <option value="Absent">Absent</option>
              <option value="Present">Present</option>
            </select>
          </div>
        </div>
        <div className="action-section">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search"
              className="search-input"
              value={searchTerm}
              onChange={handleSearch}
            />
            {/* <span className="search-icon"><Search /></span> */}
          </div>
        </div>
      </div>
      <div className="leave-management-container">
        <div className="table-container">
          <table className="candidates-table">
            <thead>
              <tr>
                <th>Profile</th>
                <th>Employee Name</th>
                <th>Position</th>
                <th>Department</th>
                <th>Task</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredattendance.map((candidate) => (
                <tr key={candidate._id}>
                  <td>
                    <img
                      src={candidate?.employeeId?.profileUrl}
                      width={40}
                      height={40}
                      alt="no"
                      style={{ borderRadius: "50px" }}
                    />
                  </td>
                  <td>{candidate?.employeeId?.name}</td>
                  <td>{candidate?.employeeId?.position}</td>
                  <td>{candidate?.employeeId?.department}</td>
                  <td>
                    {candidate?.tasks?.map((item, index) => (
                      <span key={index}>
                        {item}
                        {index < candidate.tasks.length - 1 && ", "}
                      </span>
                    ))}
                  </td>{" "}
                  <td>
                    <select
                      className="filter-select"
                      value={candidate.attendance}
                      onChange={(e) =>
                        handleUpdateStatus(candidate._id, e.target.value)
                      }
                    >
                      <option value="Absent">Absent</option>
                      <option value="Present">Present</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Dashboard>
  );
}
