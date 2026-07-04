package com.hospital.agent.dto;

public class ChatResponse {
    private String answer;
    private String source;
    private String matchedIntent;

    public ChatResponse() {}

    public ChatResponse(String answer, String source, String matchedIntent) {
        this.answer = answer;
        this.source = source;
        this.matchedIntent = matchedIntent;
    }

    public String getAnswer() { 
        return answer; 
    }
    
    public void setAnswer(String answer) { 
        this.answer = answer; 
    }

    public String getSource() { 
        return source; 
    }
    
    public void setSource(String source) { 
        this.source = source; 
    }

    public String getMatchedIntent() { 
        return matchedIntent; 
    }
    
    public void setMatchedIntent(String matchedIntent) { 
        this.matchedIntent = matchedIntent; 
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private String answer;
        private String source;
        private String matchedIntent;

        public Builder answer(String answer) {
            this.answer = answer;
            return this;
        }

        public Builder source(String source) {
            this.source = source;
            return this;
        }

        public Builder matchedIntent(String matchedIntent) {
            this.matchedIntent = matchedIntent;
            return this;
        }

        public ChatResponse build() {
            return new ChatResponse(answer, source, matchedIntent);
        }
    }
}
