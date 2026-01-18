import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // ===================== PROJECTS =====================
  getProjects(): Observable<any> {
    const url = `${this.baseUrl}/projects`;
    console.log('Fetching projects from:', url);
    return this.http.get(url).pipe(
      tap(response => console.log('Projects response:', response)),
      catchError(error => {
        console.error('Error fetching projects:', error);
        return throwError(() => error);
      })
    );
  }

  getProject(id: number): Observable<any> {
    const url = `${this.baseUrl}/projects/${id}`;
    console.log('Fetching project from:', url);
    return this.http.get(url).pipe(
      tap(response => console.log('Project response:', response)),
      catchError(error => {
        console.error(`Error fetching project ${id}:`, error);
        return throwError(() => error);
      })
    );
  }

  createProject(project: any): Observable<any> {
    const url = `${this.baseUrl}/projects`;
    console.log('Creating project at:', url, project);
    return this.http.post(url, project).pipe(
      tap(response => console.log('Project created:', response)),
      catchError(error => {
        console.error('Error creating project:', error);
        return throwError(() => error);
      })
    );
  }

  updateProject(id: number, project: any): Observable<any> {
    const url = `${this.baseUrl}/projects/${id}`;
    console.log('Updating project at:', url, project);
    return this.http.put(url, project).pipe(
      tap(response => console.log('Project updated:', response)),
      catchError(error => {
        console.error(`Error updating project ${id}:`, error);
        return throwError(() => error);
      })
    );
  }

  deleteProject(id: number): Observable<any> {
    const url = `${this.baseUrl}/projects/${id}`;
    console.log('Deleting project at:', url);
    return this.http.delete(url).pipe(
      tap(response => console.log('Project deleted:', response)),
      catchError(error => {
        console.error(`Error deleting project ${id}:`, error);
        return throwError(() => error);
      })
    );
  }

  // ===================== TASKS =====================
  getTasks(): Observable<any> {
    const url = `${this.baseUrl}/tasks`;
    console.log('Fetching tasks from:', url);
    return this.http.get(url).pipe(
      tap(response => console.log('Tasks response:', response)),
      catchError(error => {
        console.error('Error fetching tasks:', error);
        return throwError(() => error);
      })
    );
  }

  getTask(id: number): Observable<any> {
    const url = `${this.baseUrl}/tasks/${id}`;
    console.log('Fetching task from:', url);
    return this.http.get(url).pipe(
      tap(response => console.log('Task response:', response)),
      catchError(error => {
        console.error(`Error fetching task ${id}:`, error);
        return throwError(() => error);
      })
    );
  }

  createTask(task: any): Observable<any> {
    const url = `${this.baseUrl}/tasks`;
    console.log('Creating task at:', url, task);
    return this.http.post(url, task).pipe(
      tap(response => console.log('Task created:', response)),
      catchError(error => {
        console.error('Error creating task:', error);
        return throwError(() => error);
      })
    );
  }

  updateTask(id: number, task: any): Observable<any> {
    const url = `${this.baseUrl}/tasks/${id}`;
    console.log('Updating task at:', url, task);
    return this.http.put(url, task).pipe(
      tap(response => console.log('Task updated:', response)),
      catchError(error => {
        console.error(`Error updating task ${id}:`, error);
        return throwError(() => error);
      })
    );
  }

  deleteTask(id: number): Observable<any> {
    const url = `${this.baseUrl}/tasks/${id}`;
    console.log('Deleting task at:', url);
    return this.http.delete(url).pipe(
      tap(response => console.log('Task deleted:', response)),
      catchError(error => {
        console.error(`Error deleting task ${id}:`, error);
        return throwError(() => error);
      })
    );
  }

  // ===================== USERS =====================
  getUsers(): Observable<any> {
    const url = `${this.baseUrl}/users`;
    console.log('Fetching users from:', url);
    return this.http.get(url).pipe(
      tap(response => console.log('Users response:', response)),
      catchError(error => {
        console.error('Error fetching users:', error);
        return throwError(() => error);
      })
    );
  }

  getUser(id: number): Observable<any> {
    const url = `${this.baseUrl}/users/${id}`;
    console.log('Fetching user from:', url);
    return this.http.get(url).pipe(
      tap(response => console.log('User response:', response)),
      catchError(error => {
        console.error(`Error fetching user ${id}:`, error);
        return throwError(() => error);
      })
    );
  }

  createUser(user: any): Observable<any> {
    const url = `${this.baseUrl}/users`;
    console.log('Creating user at:', url, user);
    return this.http.post(url, user).pipe(
      tap(response => console.log('User created:', response)),
      catchError(error => {
        console.error('Error creating user:', error);
        return throwError(() => error);
      })
    );
  }

  updateUser(id: number, user: any): Observable<any> {
    const url = `${this.baseUrl}/users/${id}`;
    console.log('Updating user at:', url, user);
    return this.http.put(url, user).pipe(
      tap(response => console.log('User updated:', response)),
      catchError(error => {
        console.error(`Error updating user ${id}:`, error);
        return throwError(() => error);
      })
    );
  }

  deleteUser(id: number): Observable<any> {
    const url = `${this.baseUrl}/users/${id}`;
    console.log('Deleting user at:', url);
    return this.http.delete(url).pipe(
      tap(response => console.log('User deleted:', response)),
      catchError(error => {
        console.error(`Error deleting user ${id}:`, error);
        return throwError(() => error);
      })
    );
  }

  // ===================== TAGS =====================
  getTags(): Observable<any> {
    const url = `${this.baseUrl}/tags`;
    console.log('Fetching tags from:', url);
    return this.http.get(url).pipe(
      tap(response => console.log('Tags response:', response)),
      catchError(error => {
        console.error('Error fetching tags:', error);
        return throwError(() => error);
      })
    );
  }

  getTag(id: number): Observable<any> {
    const url = `${this.baseUrl}/tags/${id}`;
    console.log('Fetching tag from:', url);
    return this.http.get(url).pipe(
      tap(response => console.log('Tag response:', response)),
      catchError(error => {
        console.error(`Error fetching tag ${id}:`, error);
        return throwError(() => error);
      })
    );
  }

  createTag(tag: any): Observable<any> {
    const url = `${this.baseUrl}/tags`;
    console.log('Creating tag at:', url, tag);
    return this.http.post(url, tag).pipe(
      tap(response => console.log('Tag created:', response)),
      catchError(error => {
        console.error('Error creating tag:', error);
        return throwError(() => error);
      })
    );
  }

  deleteTag(id: number): Observable<any> {
    const url = `${this.baseUrl}/tags/${id}`;
    console.log('Deleting tag at:', url);
    return this.http.delete(url).pipe(
      tap(response => console.log('Tag deleted:', response)),
      catchError(error => {
        console.error(`Error deleting tag ${id}:`, error);
        return throwError(() => error);
      })
    );
  }

  // ===================== TASK TAGS =====================
  getTaskTags(): Observable<any> {
    const url = `${this.baseUrl}/task-tags`;
    console.log('Fetching task tags from:', url);
    return this.http.get(url).pipe(
      tap(response => console.log('Task tags response:', response)),
      catchError(error => {
        console.error('Error fetching task tags:', error);
        return throwError(() => error);
      })
    );
  }

  getTaskTag(id: number): Observable<any> {
    const url = `${this.baseUrl}/task-tags/${id}`;
    console.log('Fetching task tag from:', url);
    return this.http.get(url).pipe(
      tap(response => console.log('Task tag response:', response)),
      catchError(error => {
        console.error(`Error fetching task tag ${id}:`, error);
        return throwError(() => error);
      })
    );
  }

  createTaskTag(taskTag: any): Observable<any> {
    const url = `${this.baseUrl}/task-tags`;
    console.log('Creating task tag at:', url, taskTag);
    return this.http.post(url, taskTag).pipe(
      tap(response => console.log('Task tag created:', response)),
      catchError(error => {
        console.error('Error creating task tag:', error);
        return throwError(() => error);
      })
    );
  }

  deleteTaskTag(id: number): Observable<any> {
    const url = `${this.baseUrl}/task-tags/${id}`;
    console.log('Deleting task tag at:', url);
    return this.http.delete(url).pipe(
      tap(response => console.log('Task tag deleted:', response)),
      catchError(error => {
        console.error(`Error deleting task tag ${id}:`, error);
        return throwError(() => error);
      })
    );
  }

  // ===================== COMMENTS =====================
  getComments(): Observable<any> {
    const url = `${this.baseUrl}/comments`;
    console.log('Fetching comments from:', url);
    return this.http.get(url).pipe(
      tap(response => console.log('Comments response:', response)),
      catchError(error => {
        console.error('Error fetching comments:', error);
        return throwError(() => error);
      })
    );
  }

  getComment(id: number): Observable<any> {
    const url = `${this.baseUrl}/comments/${id}`;
    console.log('Fetching comment from:', url);
    return this.http.get(url).pipe(
      tap(response => console.log('Comment response:', response)),
      catchError(error => {
        console.error(`Error fetching comment ${id}:`, error);
        return throwError(() => error);
      })
    );
  }

  createComment(comment: any): Observable<any> {
    const url = `${this.baseUrl}/comments`;
    console.log('Creating comment at:', url, comment);
    return this.http.post(url, comment).pipe(
      tap(response => console.log('Comment created:', response)),
      catchError(error => {
        console.error('Error creating comment:', error);
        return throwError(() => error);
      })
    );
  }

  deleteComment(id: number): Observable<any> {
    const url = `${this.baseUrl}/comments/${id}`;
    console.log('Deleting comment at:', url);
    return this.http.delete(url).pipe(
      tap(response => console.log('Comment deleted:', response)),
      catchError(error => {
        console.error(`Error deleting comment ${id}:`, error);
        return throwError(() => error);
      })
    );
  }
}
