export interface TaskRequest {
  title: string;
  description: string;
  status: string;
  priority: string;
  assigneeId: number | null;  // Может быть null
  projectId: number;
  dueDate: string | null;      // Может быть null
}

export interface TaskResponse {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  assigneeId: number | null;  // Может быть null
  projectId: number;
  dueDate: string | null;      // Может быть null
  createdAt: string;
  updatedAt: string;
}
