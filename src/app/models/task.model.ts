export interface TaskRequest {
  title: string;
  description: string;
  status: string;
  priority: string;
  assigneeId: number; // правильно
  projectId: number;  // правильно
  dueDate: string;    // правильно
}

export interface TaskResponse {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  assigneeId: number; // правильно
  projectId: number;  // правильно
  dueDate: string;    // правильно
  createdAt: string;  // правильно
  updatedAt: string;  // правильно
}
