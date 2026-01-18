import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { ProjectResponse } from '../../models/project.model';
import { TaskResponse } from '../../models/task.model';
import { UserResponse } from '../../models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats = {
    projects: 0,
    tasks: 0,
    users: 0,
    openTasks: 0
  };

  recentTasks: TaskResponse[] = [];
  recentProjects: ProjectResponse[] = [];
  isLoading = false;
  hasError = false;

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('DashboardComponent initialized');
    this.loadStats();
  }

  loadStats(): void {
    this.isLoading = true;
    this.hasError = false;

    let loadedCount = 0;
    const totalCalls = 3;

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === totalCalls) {
        this.isLoading = false;
        this.cdr.detectChanges(); // Принудительно запускаем обнаружение изменений
        console.log('All stats loaded:', this.stats);
      }
    };

    // Загружаем проекты
    this.apiService.getProjects().subscribe({
      next: (projects: ProjectResponse[]) => {
        console.log('Projects loaded:', projects);
        this.stats.projects = projects.length;
        this.recentProjects = projects.slice(0, 5);
        checkAllLoaded();
      },
      error: (error) => {
        console.error('Ошибка загрузки проектов:', error);
        this.hasError = true;
        checkAllLoaded();
      }
    });

    // Загружаем задачи
    this.apiService.getTasks().subscribe({
      next: (tasks: TaskResponse[]) => {
        console.log('Tasks loaded:', tasks);
        this.stats.tasks = tasks.length;
        // Считаем открытые задачи (status: 'new' согласно вашим данным)
        this.stats.openTasks = tasks.filter((t: TaskResponse) =>
          t.status === 'new' || t.status === 'in_progress'
        ).length;
        this.recentTasks = tasks.slice(0, 5);
        checkAllLoaded();
      },
      error: (error) => {
        console.error('Ошибка загрузки задач:', error);
        this.hasError = true;
        checkAllLoaded();
      }
    });

    // Загружаем пользователей
    this.apiService.getUsers().subscribe({
      next: (users: UserResponse[]) => {
        console.log('Users loaded:', users);
        this.stats.users = users.length;
        checkAllLoaded();
      },
      error: (error) => {
        console.error('Ошибка загрузки пользователей:', error);
        this.hasError = true;
        checkAllLoaded();
      }
    });
  }

  getStatusColor(status: string): string {
    const colors: any = {
      'new': 'status-open',
      'in_progress': 'status-in_progress',
      'done': 'status-resolved',
      'closed': 'status-closed',
      'active': 'status-active',
      'inactive': 'status-inactive'
    };
    return colors[status] || 'status-inactive';
  }

  getPriorityColor(priority: string): string {
    const colors: any = {
      'low': 'priority-low',
      'medium': 'priority-medium',
      'high': 'priority-high',
      'critical': 'priority-critical'
    };
    return colors[priority] || 'priority-medium';
  }

  refresh(): void {
    this.loadStats();
  }
}
