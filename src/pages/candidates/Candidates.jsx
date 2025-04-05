import React, { useEffect, useState } from "react";
import Dashboard from "../../components/Dashboard";
import { API } from "../../services";
import AddCandidateFormModal from "./_components/AddCandidate";
import "./candidates.css";

export default function Candidates() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [candidates, setCandidate] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.status.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      !statusFilter ||
      candidate.status.toLowerCase() === statusFilter.toLowerCase();

    const matchesPosition =
      !positionFilter ||
      candidate.position.toLowerCase() === positionFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesPosition;
  });

  const getAllCandidate = async () => {
    await API.getAll()
      .then((res) => {
        setCandidate(res.data);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    getAllCandidate();
  }, []);

  return (
    <Dashboard className="candidates-container">
      <div className="candidates-header">
        <div className="filter-section">
          <div className="filter-dropdown">
            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Status</option>
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Hired">Hired</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div className="filter-dropdown">
            <select
              className="filter-select"
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
            >
              <option value="">Position</option>
              <option value="Designer">Designer</option>
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
          <button className="add-button" onClick={() => setIsModalOpen(true)}>
            Add Candidate
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="candidates-table">
          <thead>
            <tr>
              <th>Sr no.</th>
              <th>Candidates Name</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Position</th>
              <th>Status</th>
              <th>Experience</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.map((candidate, index) => (
              <tr key={candidate._id}>
                <td>{index + 1}</td>
                <td>{candidate.name}</td>
                <td>{candidate.email}</td>
                <td>{candidate.phone}</td>
                <td>{candidate.position}</td>
                <td>
                  <div className="filter-dropdown">
                    <select className="filter-select">
                      <option value="Applied">Applied</option>
                      <option value="Interviewing">Interviewing</option>
                      <option value="Hired">Hired</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </td>
                <td>{candidate.experience}</td>
                <td>
                  <button className="action-button">⋮</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isModalOpen && (
          <AddCandidateFormModal onClose={() => setIsModalOpen(false)} />
        )}
      </div>
    </Dashboard>
  );
}
