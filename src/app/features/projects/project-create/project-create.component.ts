import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { NotificationService } from '../../../core/services/notification.service';
import { ProjectRequest } from '../../../models/project.model';

@Component({
  selector: 'app-project-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent {
  project: ProjectRequest = {
    name: '',
    description: '',
    status: 'ACTIVE'
  };

  statuses = ['ACTIVE', 'INACTIVE', 'COMPLETED'];

  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.project.name.trim()) {
      this.notificationService.showError('Введите название проекта');
      return;
    }

    this.apiService.createProject(this.project).subscribe({
      next: () => {
        this.notificationService.showSuccess('Проект создан');
        this.router.navigate(['/projects']);
      },
      error: (error) => {
        console.error('Ошибка создания проекта:', error);
        this.notificationService.showError('Не удалось создать проект');
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/projects']);
  }
}
