package com.hospital.agent.dto;

public class FaqDto {
    private Long id;
    private String category;
    private String question;
    private String answer;

    public FaqDto() {}

    public FaqDto(Long id, String category, String question, String answer) {
        this.id = id;
        this.category = category;
        this.question = question;
        this.answer = answer;
    }

    public Long getId() { 
        return id; 
    }
    public void setId(Long id) { 
        this.id = id; 
    }

    public String getCategory() { 
        return category; 
    }
    public void setCategory(String category) { 
        this.category = category; 
    }

    public String getQuestion() { 
        return question; 
    }
    public void setQuestion(String question) { 
        this.question = question; 
    }

    public String getAnswer() { 
        return answer; 
    }
    public void setAnswer(String answer) { 
        this.answer = answer; 
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private String category;
        private String question;
        private String answer;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder category(String category) { this.category = category; return this; }
        public Builder question(String question) { this.question = question; return this; }
        public Builder answer(String answer) { this.answer = answer; return this; }

        public FaqDto build() {
            return new FaqDto(id, category, question, answer);
        }
    }
}
