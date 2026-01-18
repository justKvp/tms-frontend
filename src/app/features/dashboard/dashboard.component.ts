import { Component, OnInit } from '@angular/core';
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

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.isLoading = true;

    this.apiService.getProjects().subscribe({
      next: (projects) => {
        this.stats.projects = projects.length;
        this.recentProjects = projects.slice(0, 5);
      },
      error: (error) => {
        console.error('Ошибка загрузки проектов:', error);
      }
    });

    this.apiService.getTasks().subscribe({
      next: (tasks) => {
        this.stats.tasks = tasks.length;
        this.stats.openTasks = tasks.filter((t: TaskResponse) => t.status === 'OPEN').length;
        this.recentTasks = tasks.slice(0, 5);
      },
      error: (error) => {
        console.error('Ошибка загрузки задач:', error);
      }
    });

    this.apiService.getUsers().subscribe({
      next: (users) => {
        this.stats.users = users.length;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Ошибка загрузки пользователей:', error);
        this.isLoading = false;
      }
    });
  }

  getStatusColor(status: string): string {
    const colors: any = {
      'OPEN': 'status-open',
      'IN_PROGRESS': 'status-in_progress',
      'RESOLVED': 'status-resolved',
      'CLOSED': 'status-closed',
      'ACTIVE': 'status-active',
      'INACTIVE': 'status-inactive'
    };
    return colors[status] || 'status-inactive';
  }

  getPriorityColor(priority: string): string {
    const colors: any = {
      'LOW': 'priority-low',
      'MEDIUM': 'priority-medium',
      'HIGH': 'priority-high',
      'CRITICAL': 'priority-critical'
    };
    return colors[priority] || 'priority-medium';
  }
}
