import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TodoService } from '../../core/services/todo.service';
import { Task } from '../../shared/models/task.model';
import { TodoItemComponent } from './todo-item.component';

type Filter = 'all' | 'active' | 'completed';

@Component({
  selector: 'app-todo-list', standalone: true,
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, TodoItemComponent],
  templateUrl: './todo-list.component.html', styleUrl: './todo-list.component.scss', changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  readonly todoService = inject(TodoService);
  readonly tasks = this.todoService.tasks;
  readonly filter = signal<Filter>('all');
  readonly search = signal('');
  readonly newTaskTitle = signal('');
  readonly filteredTasks = computed(() => {
    const query = this.search().toLowerCase().trim();
    return this.tasks().filter((task) => (this.filter() === 'all' || (this.filter() === 'completed' ? task.completed : !task.completed)) && task.title.toLowerCase().includes(query));
  });

  addTask(): void { this.todoService.addTask(this.newTaskTitle()); this.newTaskTitle.set(''); }
  updateSearch(value: string): void { this.search.set(value); }
  setFilter(value: Filter): void { this.filter.set(value); }
  editTask(task: Task): void {
    const title = window.prompt('Update task', task.title);
    if (title !== null) this.todoService.updateTask(task.id, title);
  }
}
