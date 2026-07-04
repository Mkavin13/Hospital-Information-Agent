package com.hospital.agent.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("gemini")
public class GeminiAiService implements AiService {

    private final RestTemplate restTemplate;

    @Value("${hospital.ai.gemini.url}")
    private String apiUrl;

    @Value("${hospital.ai.gemini.key}")
    private String apiKey;

    public GeminiAiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public String generateResponse(String prompt, String context) {
        if (apiKey == null || apiKey.trim().isEmpty()) {
            return "ERROR: Gemini API key is missing. Please configure GEMINI_API_KEY in your application.properties or set the environment variable.";
        }

        try {
            String fullUrl = apiUrl + "?key=" + apiKey;

            // Combine prompt and context
            String finalPrompt = "Context:\n" + context + "\n\nUser Query: " + prompt;

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // Structure Gemini payload:
            // { "contents": [ { "parts": [ { "text": "..." } ] } ] }
            Map<String, Object> textPart = new HashMap<>();
            textPart.put("text", finalPrompt);

            Map<String, Object> partsMap = new HashMap<>();
            partsMap.put("parts", List.of(textPart));

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("contents", List.of(partsMap));

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            ResponseEntity<Map> response = restTemplate.postForEntity(fullUrl, entity, Map.class);

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                List<?> candidates = (List<?>) response.getBody().get("candidates");
                if (candidates != null && !candidates.isEmpty()) {
                    Map<?, ?> firstCandidate = (Map<?, ?>) candidates.get(0);
                    Map<?, ?> content = (Map<?, ?>) firstCandidate.get("content");
                    if (content != null) {
                        List<?> parts = (List<?>) content.get("parts");
                        if (parts != null && !parts.isEmpty()) {
                            Map<?, ?> firstPart = (Map<?, ?>) parts.get(0);
                            return (String) firstPart.get("text");
                        }
                    }
                }
            }
            return "I apologize, I received an invalid response structure from the Gemini AI service.";
        } catch (Exception e) {
            return "I apologize, but I am unable to connect to the Gemini AI service right now. Details: " + e.getMessage();
        }
    }
}
