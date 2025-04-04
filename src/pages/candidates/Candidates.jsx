import React from "react";
import Dashboard from "../../components/Dashboard";
import { useState } from "react";
import "./candidates.css";
import { Search } from "lucide-react";
import AddCandidateFormModal from "./_components/AddCandidate";

export default function Candidates() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [candidates] = useState([
    {
      id: "01",
      name: "Jane Copper",
      email: "jane.copper@example.com",
      phone: "(704) 555-0127",
      position: "Designer Intern",
      status: "New",
      experience: "0",
    },
    {
      id: "02",
      name: "Janney Wilson",
      email: "janney.wilson@example.com",
      phone: "(252) 555-0126",
      position: "Senior Developer",
      status: "New",
      experience: "1+",
    },
    {
      id: "03",
      name: "Guy Hawkins",
      email: "kenzi.lawson@example.com",
      phone: "(907) 555-0101",
      position: "Human Resource Manager",
      status: "New",
      experience: "10+",
    },
    {
      id: "04",
      name: "Arlene McCoy",
      email: "arlene.mccoy@example.com",
      phone: "(302) 555-0107",
      position: "Full Time Designer",
      status: "Selected",
      experience: "5+",
    },
    {
      id: "05",
      name: "Leslie Alexander",
      email: "willie.jennings@example.com",
      phone: "(207) 555-0119",
      position: "Full Time Developer",
      status: "Rejected",
      experience: "0",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Dashboard className="candidates-container">
      <div className="candidates-header">
        <div className="filter-section">
          <div className="filter-dropdown">
            <select className="filter-select">
              <option value="">Status</option>
              <option value="new">New</option>
              <option value="selected">Selected</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="filter-dropdown">
            <select className="filter-select">
              <option value="">Position</option>
              <option value="designer">Designer</option>
              <option value="developer">Developer</option>
              <option value="manager">Manager</option>
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
            {candidates.map((candidate) => (
              <tr key={candidate.id}>
                <td>{candidate.id}</td>
                <td>{candidate.name}</td>
                <td>{candidate.email}</td>
                <td>{candidate.phone}</td>
                <td>{candidate.position}</td>
                <td>
                  <div
                    className={`status-dropdown status-${candidate.status.toLowerCase()}`}
                  >
                    <span>{candidate.status}</span>
                    <span className="dropdown-arrow">▼</span>
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
