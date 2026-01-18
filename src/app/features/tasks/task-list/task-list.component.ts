import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  hasError = false;

  statuses = ['new', 'in_progress', 'done', 'closed'];
  priorities = ['low', 'medium', 'high', 'critical'];

  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('TaskListComponent initialized');
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;
    this.hasError = false;

    this.apiService.getTasks().subscribe({
      next: (tasks) => {
        console.log('Tasks loaded:', tasks);
        this.tasks = tasks;
        this.filteredTasks = tasks;
        this.isLoading = false;
        this.cdr.detectChanges(); // Важно!
      },
      error: (error) => {
        console.error('Ошибка загрузки задач:', error);
        this.notificationService.showError('Не удалось загрузить задачи');
        this.hasError = true;
        this.isLoading = false;
        this.cdr.detectChanges();
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
      'new': 'status-open',
      'in_progress': 'status-in_progress',
      'done': 'status-resolved',
      'closed': 'status-closed'
    };
    return colors[status] || 'status-closed';
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
}
