import React, { useState } from "react";
import { ItemType, RecurrencePattern } from "../../types/types";

// Import the types you defined
// Adjust the import path as necessary

type ItemProps = {
  item: ItemType; // Define the props type to include an Item object
};

export const Item: React.FC<ItemProps> = ({ item }) => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  // Function to display the recurrence pattern in a readable format
  const formatRecurrence = (recurrence: RecurrencePattern | undefined) => {
    if (!recurrence) return "None";
    const days = recurrence.daysOfWeek ? `on ${recurrence.daysOfWeek.join(", ")}` : "";
    return `${recurrence.frequency} every ${recurrence.interval} ${days}`;
  };

  const handleToggleDetails = () => {
    setIsDetailsVisible(!isDetailsVisible);
  };

  return (
    <div className={`item-card ${item.isCompleted ? "completed-task" : ""}`} onClick={handleToggleDetails} style={{ cursor: "pointer" }}>
      <h2>{item.name}</h2>
      {isDetailsVisible && (
        <div className="item-details">
          <p>{item.description}</p>
          {item.location && (
            <p>
              <strong>Location:</strong> {item.location}
            </p>
          )}
          {item.dueDate && (
            <p>
              <strong>Due Date:</strong> {item.dueDate.toLocaleDateString()}
            </p>
          )}
          <p>
            <strong>Type:</strong> {item.type}
          </p>
          {item.priority && (
            <p>
              <strong>Priority:</strong> {item.priority}
            </p>
          )}
          {item.reminders && item.reminders.length > 0 && (
            <div>
              <strong>Reminders:</strong>
              <ul>
                {item.reminders.map((reminder, index) => (
                  <li key={index}>{reminder.toLocaleDateString()}</li>
                ))}
              </ul>
            </div>
          )}
          <p>
            <strong>Status:</strong> {item.isCompleted ? "Completed" : "Pending"}
          </p>
          {item.tags && item.tags.length > 0 && (
            <div>
              <strong>Tags:</strong>
              <ul>
                {item.tags.map((tag, index) => (
                  <li key={index}>{tag}</li>
                ))}
              </ul>
            </div>
          )}
          {item.assignedTo && item.assignedTo.length > 0 && (
            <div>
              <strong>Assigned To:</strong>
              <ul>
                {item.assignedTo.map((person, index) => (
                  <li key={index}>{person}</li>
                ))}
              </ul>
            </div>
          )}
          {item.notes && (
            <p>
              <strong>Notes:</strong> {item.notes}
            </p>
          )}
          {item.recurrence && (
            <p>
              <strong>Recurrence:</strong> {formatRecurrence(item.recurrence)}
            </p>
          )}
          {item.attachments && item.attachments.length > 0 && (
            <div>
              <strong>Attachments:</strong>
              <ul>
                {item.attachments.map((attachment, index) => (
                  <li key={index}>
                    <a href={attachment.url} target="_blank" rel="noopener noreferrer">
                      {attachment.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p>
            <small>Created on: {item.createdAt.toLocaleDateString()}</small>
          </p>
          {item.updatedAt && (
            <p>
              <small>Last updated: {item.updatedAt.toLocaleDateString()}</small>
            </p>
          )}
        </div>
      )}
    </div>
  );
};
