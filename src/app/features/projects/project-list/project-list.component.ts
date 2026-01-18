import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { NotificationService } from '../../../core/services/notification.service';
import { ProjectResponse } from '../../../models/project.model';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects: ProjectResponse[] = [];
  filteredProjects: ProjectResponse[] = [];
  searchTerm = '';
  statusFilter = '';
  isLoading = false;
  hasError = false;

  statuses = ['ACTIVE', 'INACTIVE', 'COMPLETED'];

  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('ProjectListComponent initialized');
    this.loadProjects();
  }

  loadProjects(): void {
    this.isLoading = true;
    this.hasError = false;

    this.apiService.getProjects().subscribe({
      next: (projects: any) => {
        console.log('Projects loaded:', projects);
        // Преобразуем данные, если нужно
        this.projects = this.transformProjects(projects);
        this.filteredProjects = this.projects;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Ошибка загрузки проектов:', error);
        console.error('Error details:', error.message, error.status, error.url);
        this.notificationService.showError('Не удалось загрузить проекты');
        this.hasError = true;
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // Метод для преобразования данных, если API возвращает разные форматы
  private transformProjects(projects: any[]): ProjectResponse[] {
    return projects.map(project => {
      // Если поля приходят в snake_case, преобразуем их в camelCase
      return {
        id: project.id,
        name: project.name || '',
        description: project.description || '',
        status: project.status || 'ACTIVE',
        createdAt: project.createdAt || project.created_at || new Date().toISOString(),
        updatedAt: project.updatedAt || project.updated_at || new Date().toISOString()
      };
    });
  }

  filterProjects(): void {
    this.filteredProjects = this.projects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = !this.statusFilter || project.status.toUpperCase() === this.statusFilter.toUpperCase();
      return matchesSearch && matchesStatus;
    });
  }

  deleteProject(id: number): void {
    if (confirm('Удалить проект? Все связанные задачи также будут удалены.')) {
      this.apiService.deleteProject(id).subscribe({
        next: () => {
          this.notificationService.showSuccess('Проект удален');
          this.loadProjects();
        },
        error: (error) => {
          console.error('Ошибка удаления проекта:', error);
          this.notificationService.showError('Не удалось удалить проект');
        }
      });
    }
  }

  getStatusColor(status: string): string {
    const statusUpper = status.toUpperCase();
    const colors: any = {
      'ACTIVE': 'status-active',
      'INACTIVE': 'status-inactive',
      'COMPLETED': 'status-resolved',
      'NEW': 'status-open',
      'IN_PROGRESS': 'status-in_progress',
      'DONE': 'status-resolved',
      'CLOSED': 'status-closed'
    };
    return colors[statusUpper] || 'status-inactive';
  }
}
