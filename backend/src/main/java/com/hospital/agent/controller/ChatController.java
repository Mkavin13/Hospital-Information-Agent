package com.hospital.agent.controller;

import com.hospital.agent.dto.ChatRequest;
import com.hospital.agent.dto.ChatResponse;
import com.hospital.agent.service.ChatbotService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ChatController {

    private final ChatbotService chatbotService;

    @Autowired
    public ChatController(ChatbotService chatbotService) {
        this.chatbotService = chatbotService;
    }

    @PostMapping("/chat")
    public ResponseEntity<ChatResponse> processChatMessage(@Valid @RequestBody ChatRequest request) {
        ChatResponse response = chatbotService.processUserMessage(request.getMessage());
        return ResponseEntity.ok(response);
    }
}
