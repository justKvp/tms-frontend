export interface TaskRequest {
  title: string;
  description: string;
  status: string;
  priority: string;
  assigneeId: number;
  projectId: number;
  dueDate: string;
}

export interface TaskResponse {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  assigneeId: number;
  projectId: number;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}
