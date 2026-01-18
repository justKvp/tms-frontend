export interface UserRequest {
  username: string;
  email: string;
  password: string;
  fullName: string;
  role: string;
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}
