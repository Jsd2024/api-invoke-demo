import { AfterViewChecked, ChangeDetectionStrategy, Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ChatService } from '../../core/services/chat.service';
import { ChatMessage } from '../../shared/models/chat.model';
import { ChatMessageComponent } from './chat-message.component';

@Component({ selector: 'app-chatbot', standalone: true, imports: [FormsModule, MatButtonModule, MatIconModule, MatInputModule, ChatMessageComponent], templateUrl: './chatbot.component.html', styleUrl: './chatbot.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class ChatbotComponent implements AfterViewChecked {
  private readonly chatService = inject(ChatService);
  readonly isOpen = signal(false);
  readonly isTyping = signal(false);
  readonly draft = signal('');
  readonly messages = signal<ChatMessage[]>([{ id: 'welcome', text: 'Hi! I am your Todo Assistant. Ask me something about your tasks.', sender: 'bot', timestamp: new Date() }]);
  @ViewChild('messageList') private messageList?: ElementRef<HTMLElement>;
  private shouldScroll = false;

  toggle(): void { this.isOpen.update((open) => !open); this.shouldScroll = true; }
  send(): void {
    const text = this.draft().trim();
    if (!text || this.isTyping()) return;
    this.messages.update((messages) => [...messages, { id: crypto.randomUUID(), text, sender: 'user', timestamp: new Date() }]);
    this.draft.set(''); this.isTyping.set(true); this.shouldScroll = true;
    this.chatService.getResponse(text).subscribe({ next: (result) => { this.messages.update((messages) => [...messages, { id: crypto.randomUUID(), text: result.response, sender: 'bot', timestamp: new Date() }]); this.isTyping.set(false); this.shouldScroll = true; }, error: () => { this.isTyping.set(false); } });
  }
  ngAfterViewChecked(): void { if (this.shouldScroll && this.messageList) { this.messageList.nativeElement.scrollTop = this.messageList.nativeElement.scrollHeight; this.shouldScroll = false; } }
}
