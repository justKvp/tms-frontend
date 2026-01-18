import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { NotificationService } from '../../../core/services/notification.service';
import { UserResponse } from '../../../models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: UserResponse[] = [];
  filteredUsers: UserResponse[] = [];
  searchTerm = '';
  roleFilter = '';
  isLoading = false;
  hasError = false;

  roles = ['ADMIN', 'MANAGER', 'DEVELOPER', 'TESTER', 'VIEWER'];

  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('UserListComponent initialized');
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.hasError = false;

    this.apiService.getUsers().subscribe({
      next: (users: any) => {
        console.log('Users loaded:', users);
        this.users = this.transformUsers(users);
        this.filteredUsers = this.users;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Ошибка загрузки пользователей:', error);
        this.notificationService.showError('Не удалось загрузить пользователей');
        this.hasError = true;
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  private transformUsers(users: any[]): UserResponse[] {
    return users.map(user => ({
      id: user.id,
      username: user.username || '',
      email: user.email || '',
      fullName: user.fullName || user.full_name || '',
      role: user.role || 'VIEWER',
      createdAt: user.createdAt || user.created_at || new Date().toISOString(),
      updatedAt: user.updatedAt || user.updated_at || new Date().toISOString()
    }));
  }

  filterUsers(): void {
    this.filteredUsers = this.users.filter(user => {
      const matchesSearch = user.username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.fullName.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesRole = !this.roleFilter || user.role.toUpperCase() === this.roleFilter.toUpperCase();
      return matchesSearch && matchesRole;
    });
  }

  deleteUser(id: number): void {
    if (confirm('Удалить пользователя?')) {
      this.apiService.deleteUser(id).subscribe({
        next: () => {
          this.notificationService.showSuccess('Пользователь удален');
          this.loadUsers();
        },
        error: (error) => {
          console.error('Ошибка удаления пользователя:', error);
          this.notificationService.showError('Не удалось удалить пользователя');
        }
      });
    }
  }

  getRoleColor(role: string): string {
    const roleUpper = role.toUpperCase();
    const colors: any = {
      'ADMIN': 'role-admin',
      'MANAGER': 'role-manager',
      'DEVELOPER': 'role-developer',
      'TESTER': 'role-tester',
      'VIEWER': 'role-viewer'
    };
    return colors[roleUpper] || 'role-viewer';
  }
}
