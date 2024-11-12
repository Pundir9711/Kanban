import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import add from "../assets/add.svg";
import dot from "../assets/3 dot menu.svg";
import done from "../assets/Done.svg";
import todo from "../assets/To-do.svg";
import inProgress from "../assets/in-progress.svg";
import canceled from "../assets/Cancelled.svg";
import backlog from "../assets/Backlog.svg";

const TaskBoard = () => {
  const [users, setUsers] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [sortOption, setSortOption] = useState("priority");

  const statusImages = {
    Todo: todo,
    "In progress": inProgress,
    Done: done,
    Backlog: backlog,
    Canceled: canceled,
  };

  useEffect(() => {
    axios
      .get("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => {
        setUsers(response.data.users || []);
        setTickets(response.data.tickets || []);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const toggleSortOption = () => {
    setSortOption((prevOption) => (prevOption === "priority" ? "title" : "priority"));
  };

  const sortTickets = (tickets) => {
    if (sortOption === "priority") {
      return tickets.slice().sort((a, b) => b.priority - a.priority);
    } else if (sortOption === "title") {
      return tickets.slice().sort((a, b) => a.title.localeCompare(b.title));
    }
    return tickets;
  };

  return (
    <div className="board">
      <Navbar />
      <div className="sorting-options">
        <button onClick={toggleSortOption}>
          Sort by {sortOption === "priority" ? "Title" : "Priority"}
        </button>
      </div>
      <div className="file">
        {Array.isArray(users) &&
          users.map((user) => (
            <div key={user.id} className="userColumn">
              <div className="userHeader">
                <div className="userInfo">
                  <div className="name">
                    <h2>{user.name}</h2>
                    <span>
                      {
                        tickets.filter((ticket) => ticket.userId === user.id)
                          .length
                      }{" "}
                    </span>
                  </div>
                  <div className="dote">
                    <img src={add} className="add" />
                    <img src={dot} />
                  </div>
                </div>
              </div>
              <div className="tickets">
                {sortTickets(
                  tickets.filter((ticket) => ticket.userId === user.id)
                ).map((ticket) => (
                  <div key={ticket.id} className="ticketCard">
                    <h3>{ticket.id}</h3>
                    <div className="same">
                      {statusImages[ticket.status] && (
                        <img
                          src={statusImages[ticket.status]}
                          alt={ticket.status}
                          className="status-icon"
                        />
                      )}
                      <h3 className="title">{ticket.title}</h3>
                    </div>
                    <h3>Feature Request</h3>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
      <style jsx>{`
        .board {
          display: flex-col;
          padding: 20px;
          background-color: #f5f7fa;
          overflow-x: auto;
        }
        .sorting-options {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }
        .sorting-options button {
          padding: 8px 12px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .file {
          display: flex;
        }
        .userColumn {
          min-width: 250px;
          margin: 0 10px;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          padding: 16px;
          flex-shrink: 0;
        }
        .userHeader {
          display: flex;
          align-items: center;
          margin-bottom: 16px;
        }
        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 10px;
        }
        .userInfo {
          display: flex;
          width: 100%;
          justify-content: space-between;
          align-items: center;
        }
        .name {
          display: flex;
        }
        .dote {
        }
        h2 {
          font-size: 16px;
          font-weight: bold;
          margin: 0;
          color: #333;
          margin-right: 5px;
        }
        span {
          font-size: 13px;
          color: #888;
        }
        .same {
          display: flex;
        }
        .tickets {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .ticketCard {
          background: #f8f9fc;
          border: 1px solid #e1e4e8;
          border-radius: 8px;
          padding: 12px;
          display: flex;
          flex-direction: column;
        }
        h3 {
          font-size: 14px;
          font-weight: 500;
          margin: 0 0 6px 0;
          color: #555;
        }
        .status-icon {
          width: 5%;
          margin-right: 10px;
        }
      `}</style>
    </div>
  );
};

export default TaskBoard;
