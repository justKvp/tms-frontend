export interface CommentRequest {
  taskId: number;
  authorId: number;
  content: string;
}

export interface CommentResponse {
  id: number;
  taskId: number;
  authorId: number;
  content: string;
  createdAt: string;
}
