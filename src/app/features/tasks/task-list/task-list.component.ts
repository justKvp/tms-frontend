import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { NotificationService } from '../../../core/services/notification.service';
import { TaskResponse } from '../../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: TaskResponse[] = [];
  filteredTasks: TaskResponse[] = [];
  searchTerm = '';
  statusFilter = '';
  isLoading = false;

  statuses = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];
  priorities = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;
    this.apiService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.filteredTasks = tasks;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Ошибка загрузки задач:', error);
        this.notificationService.showError('Не удалось загрузить задачи');
        this.isLoading = false;
      }
    });
  }

  filterTasks(): void {
    this.filteredTasks = this.tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = !this.statusFilter || task.status === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }

  deleteTask(id: number): void {
    if (confirm('Удалить задачу?')) {
      this.apiService.deleteTask(id).subscribe({
        next: () => {
          this.notificationService.showSuccess('Задача удалена');
          this.loadTasks();
        },
        error: (error) => {
          console.error('Ошибка удаления задачи:', error);
          this.notificationService.showError('Не удалось удалить задачу');
        }
      });
    }
  }

  getStatusColor(status: string): string {
    const colors: any = {
      'OPEN': 'status-open',
      'IN_PROGRESS': 'status-in_progress',
      'RESOLVED': 'status-resolved',
      'CLOSED': 'status-closed'
    };
    return colors[status] || 'status-closed';
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
