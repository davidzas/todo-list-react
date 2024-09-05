// indexedDBHelper.ts
import Dexie, { Table } from "dexie";
import { ItemType } from "./types/types";
// Adjust the import path as necessary

// Initialize the Dexie database
class TaskDatabase extends Dexie {
  tasks!: Table<ItemType, string>; // Define the type of table

  constructor() {
    super("tasksDatabase");
    this.version(1).stores({
      tasks: "id, name, description, type, isCompleted, createdAt, dueDate, priority"
    });
  }
}

const db = new TaskDatabase();

// Helper functions for managing tasks

// Save a new task
const saveTask = async (task: ItemType): Promise<void> => {
  try {
    await db.tasks.add(task);
    console.log("Task saved successfully:", task);
  } catch (error) {
    console.error("Failed to save task:", error);
  }
};

// Delete a task by ID
const deleteTask = async (id: string): Promise<void> => {
  try {
    await db.tasks.delete(id);
    console.log("Task deleted successfully:", id);
  } catch (error) {
    console.error("Failed to delete task:", error);
  }
};

// Retrieve all tasks
const getAllTasks = async (): Promise<ItemType[]> => {
  try {
    const tasks = await db.tasks.toArray();
    return tasks;
  } catch (error) {
    console.error("Failed to retrieve tasks:", error);
    return [];
  }
};

// Retrieve a task by ID
const getTaskById = async (id: string): Promise<ItemType | undefined> => {
  try {
    const task = await db.tasks.get(id);
    return task;
  } catch (error) {
    console.error("Failed to retrieve task:", error);
    return undefined;
  }
};

// Mark task as complete
const markTaskAsComplete = async (id: string): Promise<void> => {
  try {
    await db.tasks.update(id, { isCompleted: true });
    console.log("Task marked as complete:", id);
  } catch (error) {
    console.error("Failed to mark task as complete:", error);
  }
};

export { deleteTask, getAllTasks, getTaskById, markTaskAsComplete, saveTask };
