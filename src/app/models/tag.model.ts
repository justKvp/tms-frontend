export interface TagRequest {
  name: string;
}

export interface TagResponse {
  id: number;
  name: string;
}

export interface TaskTagRequest {
  taskId: number;
  tagId: number;
}

export interface TaskTagResponse {
  id: number;
  taskId: number;
  tagId: number;
}
