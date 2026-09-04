package org.api.invoke.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ChatService {

    public String getResponse(String message) {

        switch (message.trim().toLowerCase()) {

            case "hello":
                return "Hello! How can I help you today?";

            case "hi":
                return "Hi Ashwin! Need help managing your tasks?";

            case "add task":
                return "You can add a task using the input field above.";

            case "completed":
                return "Completed tasks appear in the completed section.";

            case "help":
                return "I can answer simple todo-related questions.";

            default:
                return "Sorry, I am using mock data right now. Backend integration can be added later.";
        }
    }

    private final RestTemplate restTemplate = new RestTemplate();
    @Value("${gemini.api.key}")
    private String apiKey;

    public String askAI(String prompt) {

        String url =
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key="
                        + apiKey;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String requestBody = """
                {
                  "contents": [
                    {
                      "parts": [
                        {
                          "text": "%s"
                        }
                      ]
                    }
                  ]
                }
                """.formatted(prompt);

        HttpEntity<String> entity =
                new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> response =
                restTemplate.exchange(
                        url,
                        HttpMethod.POST,
                        entity,
                        String.class);

//        return response.getBody();
        ObjectMapper mapper = new ObjectMapper();

        JsonNode root = null;
        try {
            root = mapper.readTree(response.getBody());
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        return root.path("candidates")
                .get(0)
                .path("content")
                .path("parts")
                .get(0)
                .path("text")
                .asText();


        /* Open APi */
//        String apiKey = "sk-or-v1-0d3...178";
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setBearerAuth(apiKey);
//        headers.setContentType(MediaType.APPLICATION_JSON);
//
//        String requestBody = """
//        {
//          "model":"deepseek/deepseek-chat",
//          "messages":[
//            {
//              "role":"user",
//              "content":"%s"
//            }
//          ]
//        }
//        """.formatted(message);
//
//        HttpEntity<String> entity =
//                new HttpEntity<>(requestBody, headers);
//
//        ResponseEntity<String> response =
//                restTemplate.postForEntity(
//                        "https://openrouter.ai/api/v1/chat/completions",
//                        entity,
//                        String.class
//                );
//
//        return response.getBody();
    }
}