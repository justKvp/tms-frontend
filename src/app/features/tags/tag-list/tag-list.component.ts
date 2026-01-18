import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  hasError = false;

  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('TagListComponent initialized');
    this.loadTags();
  }

  loadTags(): void {
    this.isLoading = true;
    this.hasError = false;

    this.apiService.getTags().subscribe({
      next: (tags: any) => {
        console.log('Tags loaded:', tags);
        this.tags = this.transformTags(tags);
        this.filteredTags = this.tags;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Ошибка загрузки тегов:', error);
        this.notificationService.showError('Не удалось загрузить теги');
        this.hasError = true;
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  private transformTags(tags: any[]): TagResponse[] {
    return tags.map(tag => ({
      id: tag.id,
      name: tag.name || ''
    }));
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
