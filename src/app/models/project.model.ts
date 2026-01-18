export interface ProjectRequest {
  name: string;
  description: string;
  status: string;
}

export interface ProjectResponse {
  id: number;
  name: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
