export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ChatApiRequest {
  message: string;
}

export interface ChatApiResponse {
  response: string;
}

export interface ChatResponses {
  responses: Record<string, string>;
}
