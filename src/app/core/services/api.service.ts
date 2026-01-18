import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Projects
  getProjects(): Observable<any> {
    return this.http.get(`${this.baseUrl}/projects`);
  }

  getProject(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/projects/${id}`);
  }

  createProject(project: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/projects`, project);
  }

  updateProject(id: number, project: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/projects/${id}`, project);
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/projects/${id}`);
  }

  // Tasks
  getTasks(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tasks`);
  }

  getTask(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/tasks/${id}`);
  }

  createTask(task: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/tasks`, task);
  }

  updateTask(id: number, task: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/tasks/${id}`, task);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/tasks/${id}`);
  }

  // Users
  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }

  getUser(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${id}`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, user);
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/${id}`);
  }

  // Tags
  getTags(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tags`);
  }

  getTag(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/tags/${id}`);
  }

  createTag(tag: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/tags`, tag);
  }

  deleteTag(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/tags/${id}`);
  }

  // Task Tags
  getTaskTags(): Observable<any> {
    return this.http.get(`${this.baseUrl}/task-tags`);
  }

  getTaskTag(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/task-tags/${id}`);
  }

  createTaskTag(taskTag: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/task-tags`, taskTag);
  }

  deleteTaskTag(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/task-tags/${id}`);
  }

  // Comments
  getComments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/comments`);
  }

  getComment(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/comments/${id}`);
  }

  createComment(comment: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/comments`, comment);
  }

  deleteComment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/comments/${id}`);
  }
}
