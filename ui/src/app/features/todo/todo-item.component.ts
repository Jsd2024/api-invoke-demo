import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { Task } from '../../shared/models/task.model';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [MatButtonModule, MatCheckboxModule, MatIconModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {
  @Input({ required: true }) task!: Task;
  @Output() readonly toggled = new EventEmitter<void>();
  @Output() readonly edited = new EventEmitter<void>();
  @Output() readonly deleted = new EventEmitter<void>();
}
