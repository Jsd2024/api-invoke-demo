import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, delay, map } from 'rxjs';
import { ChatApiResponse, ChatResponses } from '../../shared/models/chat.model';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8081/api/agent';//'http://localhost:8081/api/chat';
  
  //'assets/data/chat-responses.json';

  getResponse(message: string) {
  return this.http.post<ChatApiResponse>(
    this.apiUrl,
    {
      message: message
    }
  );
}
  // getResponse(message: string): Observable<ChatApiResponse> {
  //   const normalizedMessage = message.trim().toLowerCase();
  //   return this.http.get<ChatResponses>(this.responsesUrl).pipe(
  //     map((data) => ({ response: data.responses[normalizedMessage] ?? data.responses['default'] })),
  //     delay(800),
  //   );
  // }

  // TODO: Replace mock JSON with actual backend endpoint.
  // POST /api/chat
  // getResponseFromApi(request: ChatApiRequest): Observable<ChatApiResponse> { ... }
}
