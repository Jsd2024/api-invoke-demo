import { Injectable, signal } from '@angular/core';
import { Task } from '../../shared/models/task.model';

const STORAGE_KEY = 'smart-todo-assistant.tasks';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly taskState = signal<Task[]>(this.loadTasks());
  readonly tasks = this.taskState.asReadonly();

  addTask(title: string): void {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    this.taskState.update((tasks) => [
      { id: crypto.randomUUID(), title: trimmedTitle, completed: false, createdAt: new Date().toISOString() },
      ...tasks,
    ]);
    this.persist();
  }

  updateTask(id: string, title: string): void {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;
    this.taskState.update((tasks) => tasks.map((task) => task.id === id ? { ...task, title: trimmedTitle } : task));
    this.persist();
  }

  toggleTask(id: string): void {
    this.taskState.update((tasks) => tasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task));
    this.persist();
  }

  deleteTask(id: string): void {
    this.taskState.update((tasks) => tasks.filter((task) => task.id !== id));
    this.persist();
  }

  private loadTasks(): Task[] {
    if (typeof localStorage === 'undefined') return [];
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as Task[];
    } catch {
      return [];
    }
  }

  private persist(): void {
    if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_KEY, JSON.stringify(this.taskState()));
  }
}
