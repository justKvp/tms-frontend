import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { NotificationService } from '../../../core/services/notification.service';
import { TagResponse } from '../../../models/tag.model';

@Component({
  selector: 'app-tag-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit {
  tags: TagResponse[] = [];
  filteredTags: TagResponse[] = [];
  searchTerm = '';
  isLoading = false;

  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadTags();
  }

  loadTags(): void {
    this.isLoading = true;
    this.apiService.getTags().subscribe({
      next: (tags) => {
        this.tags = tags;
        this.filteredTags = tags;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Ошибка загрузки тегов:', error);
        this.notificationService.showError('Не удалось загрузить теги');
        this.isLoading = false;
      }
    });
  }

  filterTags(): void {
    this.filteredTags = this.tags.filter(tag =>
      tag.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  deleteTag(id: number): void {
    if (confirm('Удалить тег?')) {
      this.apiService.deleteTag(id).subscribe({
        next: () => {
          this.notificationService.showSuccess('Тег удален');
          this.loadTags();
        },
        error: (error) => {
          console.error('Ошибка удаления тега:', error);
          this.notificationService.showError('Не удалось удалить тег');
        }
      });
    }
  }
}
