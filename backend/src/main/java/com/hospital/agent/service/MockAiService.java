package com.hospital.agent.service;

import org.springframework.stereotype.Service;

@Service("mock")
public class MockAiService implements AiService {

    @Override
    public String generateResponse(String prompt, String context) {
        if (context == null || context.trim().isEmpty()) {
            return "I apologize, but I couldn't find any relevant details in our hospital directory. " +
                   "For direct assistance, you can contact our general reception desk at +1-800-555-0199.";
        }
        
        return "Based on the hospital directory, here is the information:\n\n" + context + 
               "\n\nIf you need additional assistance, feel free to ask about other doctors, departments, or visiting hours.";
    }
}
