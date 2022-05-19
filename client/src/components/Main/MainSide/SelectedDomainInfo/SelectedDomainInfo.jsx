import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./selectedDomainInfo.css";

const SelectedDomainInfo = () => {
  const [openedDropdown, setOpenedDropdown] = useState(false);
  const userData = useSelector((state) => state.userData);

  const logOut = () => localStorage.removeItem('user')

  return (
    <div className="info">
      <div>
        <h2 className="domain-name">Domain Name</h2>
        <div className="domain-content">
          <h4 className="user-name">{userData.name}</h4>
          <div className="dropdown">
          <p
            onClick={() => setOpenedDropdown(!openedDropdown)}
            style={{
              transform: openedDropdown ? "rotate(90deg)" : "rotate(270deg)"
            }}
          >
            &#10095;
          </p>
          <div
            style={{ display: openedDropdown ? "block" : "none" }}
            className="dropdown-content"
          >
            <a onClick={logOut} href="/">Log Out</a>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedDomainInfo;
