import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { NotificationService } from '../../../core/services/notification.service';
import { TaskRequest } from '../../../models/task.model';

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {
  task: TaskRequest = {
    title: '',
    description: '',
    status: 'OPEN',
    priority: 'MEDIUM',
    assigneeId: 0,
    projectId: 0,
    dueDate: ''
  };

  projects: any[] = [];
  users: any[] = [];
  statuses = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];
  priorities = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProjects();
    this.loadUsers();
  }

  loadProjects(): void {
    this.apiService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
      },
      error: (error) => {
        console.error('Ошибка загрузки проектов:', error);
        this.notificationService.showError('Не удалось загрузить проекты');
      }
    });
  }

  loadUsers(): void {
    this.apiService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        console.error('Ошибка загрузки пользователей:', error);
        this.notificationService.showError('Не удалось загрузить пользователей');
      }
    });
  }

  onSubmit(): void {
    if (!this.task.title.trim()) {
      this.notificationService.showError('Введите заголовок задачи');
      return;
    }

    if (!this.task.projectId) {
      this.notificationService.showError('Выберите проект');
      return;
    }

    this.apiService.createTask(this.task).subscribe({
      next: () => {
        this.notificationService.showSuccess('Задача создана');
        this.router.navigate(['/tasks']);
      },
      error: (error) => {
        console.error('Ошибка создания задачи:', error);
        this.notificationService.showError('Не удалось создать задачу');
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/tasks']);
  }
}
