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

@Service("llama")
public class LlamaAiService implements AiService {

    private final RestTemplate restTemplate;

    @Value("${hospital.ai.llama.url}")
    private String apiUrl;

    @Value("${hospital.ai.llama.key}")
    private String apiKey;

    @Value("${hospital.ai.llama.model}")
    private String modelName;

    public LlamaAiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public String generateResponse(String prompt, String context) {
        if (apiKey == null || apiKey.trim().isEmpty()) {
            return "ERROR: Llama 3 / Groq API key is missing. Please configure LLAMA_API_KEY in your application.properties or set the environment variable.";
        }

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);

            String finalPrompt = "Context:\n" + context + "\n\nUser Query: " + prompt;

            // Structure Llama 3 (OpenAI compatible) payload:
            // { "model": "llama3-8b-8192", "messages": [ { "role": "user", "content": "..." } ] }
            Map<String, Object> message = new HashMap<>();
            message.put("role", "user");
            message.put("content", finalPrompt);

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", modelName);
            requestBody.put("messages", List.of(message));

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            ResponseEntity<Map> response = restTemplate.postForEntity(apiUrl, entity, Map.class);

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                List<?> choices = (List<?>) response.getBody().get("choices");
                if (choices != null && !choices.isEmpty()) {
                    Map<?, ?> firstChoice = (Map<?, ?>) choices.get(0);
                    Map<?, ?> responseMessage = (Map<?, ?>) firstChoice.get("message");
                    if (responseMessage != null) {
                        return (String) responseMessage.get("content");
                    }
                }
            }
            return "I apologize, I received an invalid response structure from the Llama AI service.";
        } catch (Exception e) {
            return "I apologize, but I am unable to connect to the Llama AI service right now. Details: " + e.getMessage();
        }
    }
}
