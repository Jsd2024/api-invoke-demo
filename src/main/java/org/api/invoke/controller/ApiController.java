package org.api.invoke.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.api.invoke.service.ApiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.api.invoke.entity.ChatRequest;
import org.api.invoke.entity.ChatResponse;
import org.api.invoke.service.ChatService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class ApiController {

    private static final Logger log = LogManager.getLogger(ApiController.class);
    private final ApiService apiService;
    private final ChatService chatService;

    public ApiController(ApiService apiService, ChatService chatService) {
        this.apiService = apiService;
        this.chatService = chatService;
    }

    @GetMapping("/fetch-data")
    public ResponseEntity<?> fetchData() {
        String response;
        try {
             response = apiService.callFinalApi();
        }
        catch (Exception ex)
        {
            log.error("Exception: {}", String.valueOf(ex));
            return   ResponseEntity.ok(ex);
        }
        return ResponseEntity.ok(response);
    }

    /* Chat bot */

    @PostMapping("/chat")
    public ChatResponse getResponse(
            @RequestBody ChatRequest request) {

        String response = chatService.getResponse(
                request.getMessage());

        return new ChatResponse(response);
    }



        @PostMapping("/agent")
        public ChatResponse chat(@RequestBody ChatRequest request) {
            String agentResponse;
            ChatResponse chatResponse;
            try {
                agentResponse = chatService.askGeminiAI(request.getMessage());
                chatResponse = new ChatResponse(agentResponse);
            } catch (Exception e) {
                log.error("Exception in ApiController :{}", String.valueOf(e));
                throw new RuntimeException(e);
            }
            return chatResponse;
        }

}
