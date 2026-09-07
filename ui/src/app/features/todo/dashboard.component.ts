import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TodoService } from '../../core/services/todo.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private readonly todoService = inject(TodoService);
  readonly total = computed(() => this.todoService.tasks().length);
  readonly completed = computed(() => this.todoService.tasks().filter((task) => task.completed).length);
  readonly pending = computed(() => this.total() - this.completed());
}
