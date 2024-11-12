import React, { useEffect, useState } from "react";
import display from "../assets/Display.svg";
import down from "../assets/down.svg";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar({ onOrderingChange }) {
  const [grouping, setGrouping] = useState("Status");
  const [ordering, setOrdering] = useState("Priority");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setGrouping("Status");
    } else if (location.pathname === "/priority-view") {
      setGrouping("Priority");
    } else if (location.pathname === "/taskboard") {
      setGrouping("User");
    }
  }, [location.pathname]);

  const handleGroupingChange = (e) => {
    const selectedGrouping = e.target.value;
    setGrouping(selectedGrouping);

    if (selectedGrouping === "Priority") {
      navigate("/priority-view");
    } else if (selectedGrouping === "Status") {
      navigate("/");
    } else if (selectedGrouping === "User") {
      navigate("/taskboard");
    }
  };

  const handleOrderingChange = (e) => {
    const selectedOrdering = e.target.value;
    setOrdering(selectedOrdering);
    onOrderingChange(selectedOrdering);
  };

  return (
    <div>
      <div className="kanban-board">
        <div className="header">
          <div className="display-dropdown">
            <button
              className="display-button"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <img src={display} className="img" alt="Display icon" />
              Display
              <img src={down} className="img1" alt="Dropdown icon" />
            </button>
            {showDropdown && (
              <div className="dropdown-content">
                <div className="group">
                  <label className="left">Grouping</label>
                  <select
                    value={grouping}
                    onChange={handleGroupingChange}
                    className="priority"
                  >
                    <option value="Status">Status</option>
                    <option value="Priority">Priority</option>
                    <option value="User">User</option>
                  </select>
                </div>
                <div className="group">
                  <label className="left">Ordering</label>
                  <select
                    value={ordering}
                    onChange={handleOrderingChange}
                    className="priority"
                  >
                    <option value="Priority">Priority</option>
                    <option value="Title">Title</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        <style jsx="true">{`
          .kanban-board {
            padding: 20px;
            background-color: #f8f9fa;
          }
          .header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
          }
          .display-dropdown {
            position: relative;
          }
          .img {
            margin-right: 4px;
          }
          .img1 {
            margin-left: 1px;
          }
          .display-button {
            display: flex;
            background-color: #ffffff;
            padding: 8px 12px;
            border-radius: 5px;
            border: none;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            color: #495057;
          }
          .group {
            display: flex;
          }
          .priority {
          }
          .left {
            margin-right: 60px;
          }
          .dropdown-content {
            position: absolute;
            top: 100%;
            left: 0;
            background: white;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
            padding: 10px;
            border-radius: 5px;
            z-index: 1;
            display: flex;
            flex-direction: column;
            gap: 10px;
            min-width: 200px;
          }
          .dropdown-content label {
            font-size: 0.9rem;
            color: #495057;
            margin-bottom: 5px;
          }
          .dropdown-content select {
            padding: 5px;
            width: 100%;
            border: 1px solid #ced4da;
            border-radius: 5px;
          }
        `}</style>
      </div>
    </div>
  );
}

export default Navbar;
