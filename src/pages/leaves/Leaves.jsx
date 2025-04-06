import React, { useEffect, useState } from "react";
import Dashboard from "../../components/Dashboard";
import "./leaves.css";
import AddLeaveModal from "./_components/AddLeave";
import { API } from "../../services";
import moment from "moment";

export default function Leaves() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAddLeaveModal, setShowAddLeaveModal] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const goToPreviousMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const goToNextMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const toggleDropdown = (id) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id));
  };

  const updateLeaveStatus = (id, newStatus) => {
    API.UpdateLeave(
      id,
      { status: newStatus },
      "Leave update successfully",
      "Leave Updating.."
    )
      .then(() => getAllLeave())
      .catch((e) => console.log(e));
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const getLeavesForDay = (year, month, day) => {
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;

    return leaves.filter((leave) => {
      const leaveDate = moment(leave.leaveDate).format("YYYY-MM-DD");
      return leaveDate === dateString;
    });
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    const today = new Date();

    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayLeaves = getLeavesForDay(year, month, day);
      const hasLeaves = dayLeaves.length > 0;
      const isToday =
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

      days.push(
        <div
          key={`day-${day}`}
          className={`day ${hasLeaves ? "highlighted" : ""} ${
            isToday ? "today" : ""
          }`}
        >
          {day}
          {hasLeaves && (
            <div className="leave-indicator">
              <span>{dayLeaves.length}</span>
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const formatDateForDisplay = (dateString) => {
    return moment(dateString).format("DD-MM-YYYY");
  };

  const getAllLeave = async () => {
    setLoading(true);
    try {
      const res = await API.getAllLeave();
      setLeaves(res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllLeave();
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setOpenDropdownId(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const filteredLeaves = leaves.filter(
    (leave) =>
      (!statusFilter || leave.status === statusFilter) &&
      (!searchTerm ||
        leave.employeeId.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const approvedLeaves = filteredLeaves.filter(
    (leave) => leave.status === "approved"
  );

  return (
    <Dashboard>
      <div className="candidates-header">
        <div className="filter-section">
          <div className="filter-dropdown">
            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
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
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className="add-button"
            onClick={() => setShowAddLeaveModal(true)}
          >
            + Add Leave
          </button>
        </div>
      </div>

      <div className="leave-management-container">
        <div className="applied-leaves-card">
          <div className="leave-header">
            <h2>Applied Leaves</h2>
          </div>

          <div className="table-header">
            <div className="profile-col">Profile</div>
            <div className="name-col">Name</div>
            <div className="date-col">Date</div>
            <div className="reason-col">Reason</div>
            <div className="status-col">Status</div>
            <div className="docs-col">Docs</div>
          </div>

          {loading ? (
            <div className="loading-message">Loading...</div>
          ) : (
            filteredLeaves.map((leave) => (
              <div key={leave._id} className="table-row">
                <div className="profile-col">
                  <img
                    src={leave.employeeId.profileUrl || "/placeholder.svg"}
                    alt={leave.employeeId.name}
                    className="profile-image"
                  />
                </div>
                <div className="name-col">
                  <div className="employee-name">{leave.employeeId.name}</div>
                  <div className="employee-title">{leave.designation}</div>
                </div>
                <div className="date-col">
                  {formatDateForDisplay(leave.leaveDate)}
                </div>
                <div className="reason-col">{leave.reason}</div>
                <div className="status-col">
                  <div className="dropdown-container">
                    <div
                      className={`status-dropdown ${leave.status.toLowerCase()}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(leave._id);
                      }}
                    >
                      <span>{leave.status}</span>
                      <span className="dropdown-icon">▼</span>
                    </div>
                    {openDropdownId === leave._id && (
                      <div className="status-dropdown-menu">
                        <div
                          className="dropdown-item pending"
                          onClick={() =>
                            updateLeaveStatus(leave._id, "pending")
                          }
                        >
                          Pending
                        </div>
                        <div
                          className="dropdown-item approved"
                          onClick={() =>
                            updateLeaveStatus(leave._id, "approved")
                          }
                        >
                          Approved
                        </div>
                        <div
                          className="dropdown-item rejected"
                          onClick={() =>
                            updateLeaveStatus(leave._id, "rejected")
                          }
                        >
                          Rejected
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="docs-col">
                  <button className="docs-button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="leave-calendar-card">
          <div className="leave-header">
            <h2>Leave Calendar</h2>
          </div>
          <div className="calendar-navigation">
            <button className="nav-button prev" onClick={goToPreviousMonth}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <span className="month-year">
              {currentDate.toLocaleString("default", { month: "long" })},{" "}
              {currentDate.getFullYear()}
            </span>
            <button className="nav-button next" onClick={goToNextMonth}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
          <div className="calendar">
            <div className="weekdays">
              <div className="day-header">S</div>
              <div className="day-header">M</div>
              <div className="day-header">T</div>
              <div className="day-header">W</div>
              <div className="day-header">T</div>
              <div className="day-header">F</div>
              <div className="day-header">S</div>
            </div>
            <div className="days-grid">{generateCalendarDays()}</div>
          </div>
          <div className="approved-leaves">
            <h3>Approved Leaves</h3>
            {approvedLeaves.length > 0 ? (
              approvedLeaves.map((leave) => (
                <div key={leave._id} className="approved-leave-item">
                  <img
                    src={leave.employeeId.profileUrl || "/placeholder.svg"}
                    alt={leave.employeeId.name}
                    className="profile-image"
                  />
                  <div className="employee-info">
                    <div className="employee-name">{leave.employeeId.name}</div>
                    <div className="employee-title">{leave.designation}</div>
                  </div>
                  <div className="leave-date">
                    {formatDateForDisplay(leave.leaveDate)}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-leaves-message">No approved leaves</div>
            )}
          </div>
        </div>
      </div>

      {showAddLeaveModal && (
        <AddLeaveModal
          onClose={() => {
            setShowAddLeaveModal(false);
            getAllLeave();
          }}
        />
      )}
    </Dashboard>
  );
}
