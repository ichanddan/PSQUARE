import { Bell, Mail, User } from "lucide-react";
import React from "react";
import { useLocation } from "react-router-dom";
import "./header.css";

const Header = () => {
  const title = useLocation().pathname.split("/").slice(-1)[0].replace(/-/g, " ");
  const formattedTitle = title.charAt(0).toUpperCase() + title.slice(1);
  return (
    <header className="header">
      <h1 className="page-title">{formattedTitle}</h1>
      <div className="header-actions">
        <div className="notification-icon">
          <Mail />
        </div>
        <div className="notification-icon">
          <Bell />
        </div>
        <div className="user-profile">
          <User />
        </div>
          {/* <span className="dropdown-arrow"><ChevronDown /></span> */}
      </div>
    </header>
  );
};

export default Header;
