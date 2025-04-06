import React, { useEffect, useState } from "react";
import Dashboard from "../../components/Dashboard";
import { API } from "../../services";

export default function Employees() {
  const [employs, setEmploys] = useState([]);
  const [positionFilter, setPositionFilter] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredemploys = employs.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition =
      !positionFilter ||
      candidate.position.toLowerCase() === positionFilter.toLowerCase();

    return matchesSearch && matchesPosition;
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
              <option value="">Position</option>
              <option value="Intern">Intern</option>
              <option value="Developer">Developer</option>
              <option value="Manager">Manager</option>
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
                <th>Email Address</th>
                <th>Phone Number</th>
                <th>Position</th>
                <th>Department</th>
                <th>Date of Joining</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredemploys.map((candidate) => (
                <tr key={candidate._id}>
                  <td>
                    <img
                      src={candidate.profileUrl}
                      width={40}
                      height={40}
                      alt="no"
                      style={{ borderRadius: "50px" }}
                    />
                  </td>
                  <td>{candidate.name}</td>
                  <td>{candidate.email}</td>
                  <td>{candidate.number}</td>
                  <td>{candidate.position}</td>
                  <td>{candidate.department}</td>
                  <td>{candidate.date_of_joining}</td>
                  <td>
                    <button className="action-button">⋮</button>
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
