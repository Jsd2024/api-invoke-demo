package org.api.invoke.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.api.invoke.service.ApiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ApiController {

    private static final Logger log = LogManager.getLogger(ApiController.class);
    private final ApiService apiService;

    public ApiController(ApiService apiService) {
        this.apiService = apiService;
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
}
