import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import done from "../assets/Done.svg";
import todo from "../assets/To-do.svg";
import inProgress from "../assets/in-progress.svg";
import canceled from "../assets/Cancelled.svg";
import backlog from "../assets/Backlog.svg";
import high from "../assets/Img - High Priority.svg";
import add from "../assets/add.svg";
import dot from "../assets/3 dot menu.svg";
import low from "../assets/Img - Low Priority.svg";
import medium from "../assets/Img - Medium Priority.svg";
import noPriority from "../assets/No-priority.svg";
import urgent from "../assets/SVG - Urgent Priority colour.svg";

const PriorityView = () => {
  const [tasks, setTasks] = useState({
    urgent: [],
    high: [],
    medium: [],
    low: [],
    noPriority: [],
  });

  const [ordering, setOrdering] = useState("Priority");

  const statusImages = {
    Todo: todo,
    "In progress": inProgress,
    Done: done,
    Backlog: backlog,
    Canceled: canceled,
  };

  const priorityImages = {
    Urgent: urgent,
    High: high,
    Low: low,
    Medium: medium,
    NoPriority: noPriority, 
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );
      const ticketsArray = response.data.tickets;

      const groupedTasks = {
        urgent: ticketsArray.filter((task) => task.priority === 4),
        high: ticketsArray.filter((task) => task.priority === 3),
        medium: ticketsArray.filter((task) => task.priority === 2),
        low: ticketsArray.filter((task) => task.priority === 1),
        noPriority: ticketsArray.filter((task) => task.priority === 0),
      };

      setTasks(groupedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const getSortedTasks = (tasksList) => {
    return tasksList.sort((a, b) => {
      if (ordering === "Priority") {
        return b.priority - a.priority; 
      } else if (ordering === "Title") {
        return a.title.localeCompare(b.title); 
      }
      return 0;
    });
  };

  return (
    <div className="kanban-board">
      <div className="header">
        <Navbar onOrderingChange={setOrdering} />
      </div>

      <div className="columns">
        {Object.entries(tasks).map(([priority, tasksList]) => (
          <div key={priority} className="column">
            <div className="main">
              <div className="header1">
                {priorityImages[
                  priority.charAt(0).toUpperCase() + priority.slice(1)
                ] && (
                  <img
                    src={
                      priorityImages[
                        priority.charAt(0).toUpperCase() + priority.slice(1)
                      ]
                    }
                    alt={priority}
                    className="status-icon"
                  />
                )}
                <h2>{priority.charAt(0).toUpperCase() + priority.slice(1)}</h2>
              </div>
              <div className="dote">
                <img src={add} className="add" />
                <img src={dot} />
              </div>
            </div>

            {getSortedTasks(tasksList).map((task) => (
              <div key={task.id} className="task-card">
                <h3>{task.id}</h3>

                <div className="priority">
                  {statusImages[task.status] && (
                    <img
                      src={statusImages[task.status]}
                      alt={task.status}
                      className="status-icon"
                    />
                  )}
                  <h3>{task.title}</h3>
                </div>
                <p>{task.description}</p>
                <p>Feature Request</p>
                <span>{task.type}</span>
              </div>
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
        .main {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .header1 {
          align-items: center;

          display: flex;
        }
        .header1 h2 {
          display: flex;
          align-items: center;
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
        .priority {
          display: flex;
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
          width: 20px;
          height: 20px;
          margin-right: 8px;
        }
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
      `}</style>
    </div>
  );
};

export default PriorityView;
