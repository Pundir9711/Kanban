import React, { useEffect, useState } from "react";
import display from "../assets/Display.svg";
import down from "../assets/down.svg";
import add from "../assets/add.svg";
import dot from "../assets/3 dot menu.svg";
import done from "../assets/Done.svg";
import todo from "../assets/To-do.svg";
import inProgress from "../assets/in-progress.svg";
import canceled from "../assets/Cancelled.svg";
import backlog from "../assets/Backlog.svg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
    backlog: [],
    canceled: [],
  });

  const statusImages = {
    todo: todo,
    inProgress: inProgress,
    done: done,
    backlog: backlog,
    canceled: canceled,
  };

  const [ordering, setOrdering] = useState("Priority");

  useEffect(() => {
    fetchTasks();
  }, [ordering]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );
      const ticketsArray = response.data.tickets;

      const sortedTickets = [...ticketsArray].sort((a, b) => {
        if (ordering === "Priority") {
          return b.priority - a.priority;
        } else if (ordering === "Title") {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });

      const todo = sortedTickets.filter((task) => task.status === "Todo");
      const inProgress = sortedTickets.filter(
        (task) => task.status === "In progress"
      );
      const done = sortedTickets.filter((task) => task.status === "Done");
      const backlog = sortedTickets.filter((task) => task.status === "Backlog");
      const canceled = sortedTickets.filter((task) => task.status === "Canceled");

      setTasks({ todo, inProgress, done, backlog, canceled });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  return (
    <div className="kanban-board">
      <Navbar onOrderingChange={setOrdering} />
      <div className="columns">
        {Object.entries(tasks).map(([status, tasksList]) => (
          <div key={status} className="column">
            <h2 className="merge">
            <div>
            <img
                src={statusImages[status]}
                alt={status}
                className="status-icon"
              />
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </div>
              <div className="dote">
                <img src={add} className="add" />
                <img src={dot} />
              </div>
            </h2>
            {tasksList.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        ))}
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
        .columns {
          display: flex;
          gap: 20px;
        }
        .column {
          flex: 1;
          background: #f4f4f4;
          border-radius: 5px;
          padding: 10px;
        }
        .column h2 {
          display: flex;
          color: #333;
          justify-content: space-between;

          font-size: 1.2rem;
          margin-bottom: 10px;
          font-weight: 500;
        }
        .status-icon {
          margin-right: 8px;
          width: 20px;
          height: 20px;
        }
        dote {
        }
        .add {
          margin-right: 5px;
        }
      `}</style>
    </div>
  );
};

const TaskCard = ({ task }) => {
  return (
    <div className="task-card">
      <h3>{task.id}</h3>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <span className="task-type">
        {task.type}
        <div className="dot">
          <img src={dot} className="dot1" />
          <p>Feature Request</p>
        </div>
      </span>

      <style jsx="true">{`
        .task-card {
          padding: 15px;
          margin: 10px 0;
          background: white;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          gap: 5px;
          font-size: 14px;
        }
        .task-card h3 {
          font-size: 1rem;
          margin: 0;
          color: #333;
          font-weight: 500;
        }
        .task-card p {
          font-size: 0.85rem;
          color: #666;
          margin: 0 0 5px;
        }
        .task-type {
          font-size: 0.8rem;
          color: #868e96;
          font-weight: 500;
        }
        .dot {
          display: flex;
          align-items: center;
        }
        .dot1 {
          margin-right: 3px;
        }
      `}</style>
    </div>
  );
};

export default KanbanBoard;
