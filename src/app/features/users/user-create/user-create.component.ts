import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { NotificationService } from '../../../core/services/notification.service';
import { UserRequest } from '../../../models/user.model';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent {
  user: UserRequest = {
    username: '',
    email: '',
    password: '',
    fullName: '',
    role: 'VIEWER'
  };

  roles = ['ADMIN', 'MANAGER', 'DEVELOPER', 'TESTER', 'VIEWER'];

  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.user.username.trim()) {
      this.notificationService.showError('Введите имя пользователя');
      return;
    }

    if (!this.user.email.trim()) {
      this.notificationService.showError('Введите email');
      return;
    }

    if (!this.user.password.trim()) {
      this.notificationService.showError('Введите пароль');
      return;
    }

    // Подготавливаем данные для отправки
    const userData = {
      username: this.user.username,
      email: this.user.email,
      password: this.user.password,
      fullName: this.user.fullName,
      role: this.user.role
    };

    console.log('Creating user:', userData);

    this.apiService.createUser(userData).subscribe({
      next: () => {
        this.notificationService.showSuccess('Пользователь создан');
        this.router.navigate(['/users']);
      },
      error: (error) => {
        console.error('Ошибка создания пользователя:', error);
        this.notificationService.showError('Не удалось создать пользователя');
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/users']);
  }
}
