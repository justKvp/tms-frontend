import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { NotificationService } from '../../../core/services/notification.service';
import { TagRequest } from '../../../models/tag.model';

@Component({
  selector: 'app-tag-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tag-create.component.html',
  styleUrls: ['./tag-create.component.scss']
})
export class TagCreateComponent {
  tag: TagRequest = {
    name: ''
  };

  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.tag.name.trim()) {
      this.notificationService.showError('Введите название тега');
      return;
    }

    this.apiService.createTag(this.tag).subscribe({
      next: () => {
        this.notificationService.showSuccess('Тег создан');
        this.router.navigate(['/tags']);
      },
      error: (error) => {
        console.error('Ошибка создания тега:', error);
        this.notificationService.showError('Не удалось создать тег');
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/tags']);
  }
}
