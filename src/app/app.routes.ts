import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'tasks',
    loadComponent: () => import('./features/tasks/task-list/task-list.component').then(m => m.TaskListComponent)
  },
  {
    path: 'tasks/create',
    loadComponent: () => import('./features/tasks/task-create/task-create.component').then(m => m.TaskCreateComponent)
  },
  {
    path: 'projects',
    loadComponent: () => import('./features/projects/project-list/project-list.component').then(m => m.ProjectListComponent)
  },
  {
    path: 'projects/create',
    loadComponent: () => import('./features/projects/project-create/project-create.component').then(m => m.ProjectCreateComponent)
  },
  {
    path: 'users',
    loadComponent: () => import('./features/users/user-list/user-list.component').then(m => m.UserListComponent)
  },
  {
    path: 'users/create',
    loadComponent: () => import('./features/users/user-create/user-create.component').then(m => m.UserCreateComponent)
  },
  {
    path: 'tags',
    loadComponent: () => import('./features/tags/tag-list/tag-list.component').then(m => m.TagListComponent)
  },
  {
    path: 'tags/create',
    loadComponent: () => import('./features/tags/tag-create/tag-create.component').then(m => m.TagCreateComponent)
  },
  { path: '**', redirectTo: '/dashboard' }
];
