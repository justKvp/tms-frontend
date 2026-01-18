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
      next: (tasks: any[]) => {
        console.log('Tasks loaded:', tasks);
        this.tasks = this.transformTasks(tasks);
        this.filteredTasks = this.tasks;
        this.isLoading = false;
        this.cdr.detectChanges();
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

  private transformTasks(tasks: any[]): TaskResponse[] {
    return tasks.map((task: any) => ({
      id: task.id,
      title: task.title || '',
      description: task.description || '',
      status: task.status || 'new',
      priority: task.priority || 'medium',
      assigneeId: task.assigneeId === 0 ? null : task.assigneeId,
      projectId: task.projectId,
      dueDate: task.dueDate || null,
      createdAt: task.createdAt || task.created_at || new Date().toISOString(),
      updatedAt: task.updatedAt || task.updated_at || new Date().toISOString()
    }));
  }

  filterTasks(): void {
    this.filteredTasks = this.tasks.filter((task: TaskResponse) => {
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
    const colors: Record<string, string> = {
      'new': 'status-open',
      'in_progress': 'status-in_progress',
      'done': 'status-resolved',
      'closed': 'status-closed'
    };
    return colors[status] || 'status-closed';
  }

  getPriorityColor(priority: string): string {
    const colors: Record<string, string> = {
      'low': 'priority-low',
      'medium': 'priority-medium',
      'high': 'priority-high',
      'critical': 'priority-critical'
    };
    return colors[priority] || 'priority-medium';
  }
}
