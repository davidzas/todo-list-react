import React, { useState } from "react";
import { ItemType, ItemTypes, PriorityLevel } from "../../types/types";

type AddItemFormProps = {
  onTaskAdded: (task: ItemType) => void; // Callback to refresh the task list after adding
};

export const AddItemForm: React.FC<AddItemFormProps> = ({ onTaskAdded }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<ItemTypes>(ItemTypes.TASK);
  const [priority, setPriority] = useState<PriorityLevel>(PriorityLevel.MEDIUM);
  const [dueDate, setDueDate] = useState<Date | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return; // Validation: name is required

    const newTask: ItemType = {
      id: Date.now().toString(), // Generate a unique ID
      name,
      description,
      type,
      isCompleted: false,
      createdAt: new Date(),
      priority,
      dueDate: dueDate || undefined
    };

    onTaskAdded(newTask); // Use callback to add task and refresh list
    setName("");
    setDescription("");
    setType(ItemTypes.TASK);
    setPriority(PriorityLevel.MEDIUM);
    setDueDate(null);
  };

  return (
    <form className="add-item-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required className="form-control" />
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" />
      <select value={type} onChange={(e) => setType(e.target.value as ItemTypes)} className="form-control">
        <option value={ItemTypes.TASK}>Task</option>
        <option value={ItemTypes.EVENT}>Event</option>
      </select>
      <select value={priority} onChange={(e) => setPriority(e.target.value as PriorityLevel)} className="form-control">
        <option value={PriorityLevel.LOW}>Low</option>
        <option value={PriorityLevel.MEDIUM}>Medium</option>
        <option value={PriorityLevel.HIGH}>High</option>
        <option value={PriorityLevel.URGENT}>Urgent</option>
      </select>
      <input type="date" onChange={(e) => setDueDate(e.target.value ? new Date(e.target.value) : null)} className="form-control" />
      <button type="submit" className="btn-submit">
        Add Task
      </button>
    </form>
  );
};
