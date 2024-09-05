export type ItemType = {
  id: string; // Unique identifier for each item
  name: string;
  description: string;
  location?: string;
  image?: string;
  type: ItemTypes;
  dueDate?: Date; // Optional due date for tasks or events
  priority?: PriorityLevel; // Priority of the task or event
  reminders?: Date[]; // Array of reminder dates
  isCompleted: boolean; // Status of the task or event
  createdAt: Date; // Date when the item was created
  updatedAt?: Date; // Date when the item was last updated
  tags?: string[]; // Tags for categorizing tasks or events
  assignedTo?: string[]; // People assigned to the task or event
  notes?: string; // Additional notes for the task or event
  recurrence?: RecurrencePattern; // Recurrence pattern for repeating tasks/events
  attachments?: Attachment[]; // Optional attachments (e.g., files or links)
};

export type Attachment = {
  name: string;
  url: string;
};

export enum ItemTypes {
  TASK = "Task",
  EVENT = "Event"
}

export enum PriorityLevel {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
  URGENT = "Urgent"
}

export type RecurrencePattern = {
  frequency: "Daily" | "Weekly" | "Monthly" | "Yearly";
  interval: number; // Interval of recurrence (e.g., every 2 weeks)
  daysOfWeek?: string[]; // Days of the week for weekly recurrence
  endDate?: Date; // Optional end date for the recurrence
};
