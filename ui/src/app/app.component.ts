import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ChatbotComponent } from './features/chatbot/chatbot.component';
import { DashboardComponent } from './features/todo/dashboard.component';
import { TodoListComponent } from './features/todo/todo-list.component';

@Component({
  selector: 'app-root',
  imports: [MatButtonModule, MatIconModule, ChatbotComponent, DashboardComponent, TodoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
}
