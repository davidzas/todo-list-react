import React, { useEffect, useState } from "react";
import { deleteTask, getAllTasks, markTaskAsComplete, saveTask } from "../../SqlHelper";
import { ItemType } from "../../types/types";
import { AddItemForm } from "../add-item/add.item";
import { List } from "../list/list";

export const ListContainer: React.FC = () => {
  const [tasks, setTasks] = useState<ItemType[]>([]); // State to manage tasks

  useEffect(() => {
    fetchTasks(); // Fetch tasks when the component mounts
  }, []);

  // Fetch tasks from IndexedDB
  const fetchTasks = async (): Promise<void> => {
    const fetchedTasks = await getAllTasks();
    setTasks(fetchedTasks);
  };

  // Handle adding a new task
  const handleAddTask = async (task: ItemType): Promise<void> => {
    await saveTask(task);
    fetchTasks(); // Refresh the task list after adding
  };

  // Handle deleting a task
  const handleDeleteTask = async (id: string): Promise<void> => {
    await deleteTask(id);
    fetchTasks(); // Refresh the task list after deleting
  };

  // Handle marking a task as complete
  const handleMarkAsComplete = async (id: string): Promise<void> => {
    await markTaskAsComplete(id);
    fetchTasks(); // Refresh the task list after marking as complete
  };

  return (
    <div className="list-container">
      <div className="add-item-form">
        <h1>To-Do List</h1>
        <AddItemForm onTaskAdded={handleAddTask} />
      </div>
      <div className="list-wrapper">
        <List items={tasks} deleteItem={handleDeleteTask} markAsComplete={handleMarkAsComplete} />
      </div>
    </div>
  );
};
