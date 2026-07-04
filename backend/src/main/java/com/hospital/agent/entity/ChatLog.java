package com.hospital.agent.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "chat_logs")
public class ChatLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_message", nullable = false, columnDefinition = "TEXT")
    private String userMessage;

    @Column(name = "bot_answer", nullable = false, columnDefinition = "TEXT")
    private String botAnswer;

    @Column(name = "matched_intent", length = 50)
    private String matchedIntent;

    @Column(length = 50)
    private String source;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    public ChatLog() {}

    public ChatLog(Long id, String userMessage, String botAnswer, String matchedIntent, String source, LocalDateTime createdAt) {
        this.id = id;
        this.userMessage = userMessage;
        this.botAnswer = botAnswer;
        this.matchedIntent = matchedIntent;
        this.source = source;
        this.createdAt = createdAt;
    }

    public Long getId() { 
        return id; 
    }
    public void setId(Long id) { 
        this.id = id; 
    }

    public String getUserMessage() { 
        return userMessage; 
    }
    public void setUserMessage(String userMessage) { 
        this.userMessage = userMessage; 
    }

    public String getBotAnswer() { 
        return botAnswer; 
    }
    public void setBotAnswer(String botAnswer) { 
        this.botAnswer = botAnswer; 
    }

    public String getMatchedIntent() { 
        return matchedIntent; 
    }
    public void setMatchedIntent(String matchedIntent) { 
        this.matchedIntent = matchedIntent; 
    }

    public String getSource() { 
        return source; 
    }
    public void setSource(String source) { 
        this.source = source; 
    }

    public LocalDateTime getCreatedAt() { 
        return createdAt; 
    }
    public void setCreatedAt(LocalDateTime createdAt) { 
        this.createdAt = createdAt; 
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private String userMessage;
        private String botAnswer;
        private String matchedIntent;
        private String source;
        private LocalDateTime createdAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder userMessage(String userMessage) { this.userMessage = userMessage; return this; }
        public Builder botAnswer(String botAnswer) { this.botAnswer = botAnswer; return this; }
        public Builder matchedIntent(String matchedIntent) { this.matchedIntent = matchedIntent; return this; }
        public Builder source(String source) { this.source = source; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public ChatLog build() {
            return new ChatLog(id, userMessage, botAnswer, matchedIntent, source, createdAt);
        }
    }
}
