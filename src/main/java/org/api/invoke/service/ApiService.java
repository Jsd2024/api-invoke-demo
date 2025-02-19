package org.api.invoke.service;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class ApiService {

    private final RestTemplate restTemplate;

    public ApiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String callFinalApi() {
        // Step 1: Get Bearer Token from API 1
        String token1 = getBearerToken("https://oauth2.googleapis.com/token", "client-id-1", "client-secret-1");

        // Step 2: Get Bearer Token from API 2
        String token2 = getBearerToken("https://api2.example.com/auth", "client-id-2", "client-secret-2");

        // Step 3: Call Final API using both tokens
        return callTargetApi(token1, token2);
    }

    private String getBearerToken(String authUrl, String clientId, String clientSecret) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Request body for authentication
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("client_id", clientId);
        requestBody.put("client_secret", clientSecret);

        HttpEntity<Map<String, String>> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<Map> response = restTemplate.exchange(authUrl, HttpMethod.POST, entity, Map.class);

        // Assuming response contains { "access_token": "xyz" }
        return response.getBody() != null ? response.getBody().get("access_token").toString() : null;
    }

    private String callTargetApi(String token1, String token2) {
        String finalApiUrl = "https://finalapi.example.com/data";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + token1);
        headers.set("X-Secondary-Authorization", "Bearer " + token2); // Custom header for second token

        HttpEntity<String> entity = new HttpEntity<>(null, headers);

        ResponseEntity<String> response = restTemplate.exchange(finalApiUrl, HttpMethod.GET, entity, String.class);

        return response.getBody();
    }
}
