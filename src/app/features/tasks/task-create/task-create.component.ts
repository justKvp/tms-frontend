import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { NotificationService } from '../../../core/services/notification.service';
import { TaskRequest } from '../../../models/task.model';
import { ProjectResponse } from '../../../models/project.model';
import { UserResponse } from '../../../models/user.model';

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
    assigneeId: null,
    projectId: 0,
    dueDate: null
  };

  projects: ProjectResponse[] = [];
  users: UserResponse[] = [];
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
      next: (projects: any[]) => {
        console.log('Загруженные проекты из API:', projects);
        this.projects = projects.map((project: any) => ({
          ...project,
          id: Number(project.id) // Преобразуем ID в число
        }));
      },
      error: (error) => {
        console.error('Ошибка загрузки проектов:', error);
        this.notificationService.showError('Не удалось загрузить проекты');
      }
    });
  }

  loadUsers(): void {
    this.apiService.getUsers().subscribe({
      next: (users: any[]) => {
        console.log('Загруженные пользователи из API:', users);
        this.users = users.map((user: any) => ({
          ...user,
          id: Number(user.id) // Преобразуем ID в число
        }));
      },
      error: (error) => {
        console.error('Ошибка загрузки пользователей:', error);
        this.notificationService.showError('Не удалось загрузить пользователей');
      }
    });
  }

  // Метод для получения выбранного проекта
  getSelectedProject(): ProjectResponse | null {
    if (!this.task.projectId || !this.projects.length) {
      return null;
    }

    const projectId = Number(this.task.projectId);
    const foundProject = this.projects.find((project: ProjectResponse) => Number(project.id) === projectId);

    return foundProject || null;
  }

  // Для работы с select и null
  get assigneeSelectValue(): string {
    return this.task.assigneeId === null ? 'null' : String(this.task.assigneeId);
  }

  set assigneeSelectValue(value: string) {
    if (value === 'null') {
      this.task.assigneeId = null;
    } else {
      this.task.assigneeId = Number(value);
    }
  }

  // Для работы с datetime-local
  get dueDateLocal(): string {
    if (!this.task.dueDate) return '';
    try {
      const date = new Date(this.task.dueDate);
      return date.toISOString().slice(0, 16);
    } catch {
      return '';
    }
  }

  set dueDateLocal(value: string) {
    this.task.dueDate = value || null;
  }

  formatDateForBackend(dateString: string | null): string | null {
    if (!dateString) return null;

    try {
      // Если dateString уже в формате ISO, возвращаем как есть
      if (dateString.includes('T') && (dateString.includes('Z') || dateString.includes('+'))) {
        return dateString;
      }

      // Иначе преобразуем из формата datetime-local
      const date = new Date(dateString);
      return date.toISOString();
    } catch {
      return null;
    }
  }

  // Проверка существования проекта
  isProjectExists(): boolean {
    const selectedProject = this.getSelectedProject();
    return selectedProject !== null;
  }

  prepareTaskData(): any {
    const data = {
      title: this.task.title.trim(),
      description: this.task.description.trim(),
      status: this.task.status,
      priority: this.task.priority,
      assigneeId: this.task.assigneeId,
      projectId: this.task.projectId,
      dueDate: this.formatDateForBackend(this.task.dueDate)
    };

    console.log('Подготовленные данные для отправки:', data);
    return data;
  }

  validateForm(): string[] {
    const errors: string[] = [];

    if (!this.task.title.trim()) {
      errors.push('Введите заголовок задачи');
    }

    if (!this.task.projectId || this.task.projectId <= 0) {
      errors.push('Выберите проект');
    } else if (!this.isProjectExists()) {
      errors.push(`Выбранный проект (ID: ${this.task.projectId}) не существует в системе`);
    }

    if (this.task.assigneeId !== null && this.task.assigneeId !== undefined && this.task.assigneeId > 0) {
      const userId = Number(this.task.assigneeId);
      const selectedUser = this.users.find((user: UserResponse) => Number(user.id) === userId);
      if (!selectedUser) {
        errors.push(`Выбранный исполнитель (ID: ${this.task.assigneeId}) не существует`);
      }
    }

    return errors;
  }

  onSubmit(): void {
    const errors = this.validateForm();

    if (errors.length > 0) {
      this.notificationService.showError(errors.join('\n'));
      return;
    }

    const taskData = this.prepareTaskData();

    this.apiService.createTask(taskData).subscribe({
      next: () => {
        this.notificationService.showSuccess('Задача создана');
        this.router.navigate(['/tasks']);
      },
      error: (error) => {
        console.error('Ошибка создания задачи:', error);

        let errorMessage = 'Не удалось создать задачу';
        if (error.error?.error) {
          const errorText = error.error.error;
          if (errorText.includes('foreign key constraint')) {
            if (errorText.includes('assignee_id_fkey')) {
              errorMessage = 'Ошибка: выбранный исполнитель не существует в системе';
            } else if (errorText.includes('project_id_fkey')) {
              errorMessage = 'Ошибка: выбранный проект не существует в системе';
            } else {
              errorMessage = `Ошибка базы данных: ${errorText}`;
            }
          } else {
            errorMessage = `Ошибка: ${errorText}`;
          }
        } else if (error.status === 400) {
          errorMessage = 'Некорректные данные задачи';
        } else if (error.status === 404) {
          errorMessage = 'Проект или исполнитель не найдены';
        }

        this.notificationService.showError(errorMessage);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/tasks']);
  }
}
