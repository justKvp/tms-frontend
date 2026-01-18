import { Component, OnInit } from '@angular/core';
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

  statuses = ['ACTIVE', 'INACTIVE', 'COMPLETED'];

  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.isLoading = true;
    this.apiService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
        this.filteredProjects = projects;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Ошибка загрузки проектов:', error);
        this.notificationService.showError('Не удалось загрузить проекты');
        this.isLoading = false;
      }
    });
  }

  filterProjects(): void {
    this.filteredProjects = this.projects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = !this.statusFilter || project.status === this.statusFilter;
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
    const colors: any = {
      'ACTIVE': 'status-active',
      'INACTIVE': 'status-inactive',
      'COMPLETED': 'status-resolved'
    };
    return colors[status] || 'status-inactive';
  }
}
