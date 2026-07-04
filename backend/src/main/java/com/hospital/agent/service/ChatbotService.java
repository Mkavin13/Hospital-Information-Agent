package com.hospital.agent.service;

import com.hospital.agent.dto.ChatResponse;
import com.hospital.agent.entity.ChatLog;
import com.hospital.agent.entity.ContactInfo;
import com.hospital.agent.entity.Department;
import com.hospital.agent.entity.Doctor;
import com.hospital.agent.entity.FAQ;
import com.hospital.agent.repository.*;
import org.springframework.context.ApplicationContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class ChatbotService {

    private final DoctorRepository doctorRepository;
    private final DepartmentRepository departmentRepository;
    private final FAQRepository faqRepository;
    private final ContactInfoRepository contactInfoRepository;
    private final ChatLogRepository chatLogRepository;
    private final ApplicationContext applicationContext;

    @Value("${hospital.ai.provider:mock}")
    private String aiProvider;

    private static final Set<String> SCOPE_KEYWORDS = Set.of(
            "hospital", "doctor", "cardiologist", "pediatrician", "surgeon", "physician",
            "medicine", "emergency", "visiting", "visitor", "visitors", "visit", "visits", "hours", "contact", "phone", "number",
            "reception", "ambulance", "address", "location", "floor", "wing", "room",
            "cabin", "department", "radiology", "cardiology", "pediatrics", "orthopedics",
            "billing", "discharge", "parking", "pharmacy", "opd", "schedule", "timings",
            "available", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday",
            "help", "hi", "hello", "appointment", "consultation", "test", "mri", "xray",
            "who", "where", "what", "how", "when", "list", "child", "children", "kid", "kids", "allowed", "allow", "policy", "policies", "rule", "rules", "can"
    );

    @Autowired
    public ChatbotService(DoctorRepository doctorRepository,
                          DepartmentRepository departmentRepository,
                          FAQRepository faqRepository,
                          ContactInfoRepository contactInfoRepository,
                          ChatLogRepository chatLogRepository,
                          ApplicationContext applicationContext) {
        this.doctorRepository = doctorRepository;
        this.departmentRepository = departmentRepository;
        this.faqRepository = faqRepository;
        this.contactInfoRepository = contactInfoRepository;
        this.chatLogRepository = chatLogRepository;
        this.applicationContext = applicationContext;
    }

    public ChatResponse processUserMessage(String message) {
        String normalizedMsg = message.toLowerCase().trim();

        // 1. Check Scope
        if (!isInScope(normalizedMsg)) {
            String outOfScopeAnswer = "I can currently help only with hospital-related information such as doctors, departments, timings, FAQs, and contact details.";
            saveChatLog(message, outOfScopeAnswer, "out_of_scope", "fallback");
            return ChatResponse.builder()
                    .answer(outOfScopeAnswer)
                    .source("fallback")
                    .matchedIntent("out_of_scope")
                    .build();
        }

        // Handle greetings directly
        if (normalizedMsg.equals("hi") || normalizedMsg.equals("hello") || normalizedMsg.equals("hey")) {
            String greeting = "Hello! I am the Hospital Information Agent. I can help you find doctors, locate departments, check timings, FAQs, or contact numbers. What can I assist you with today?";
            saveChatLog(message, greeting, "greeting", "db");
            return ChatResponse.builder()
                    .answer(greeting)
                    .source("db")
                    .matchedIntent("greeting")
                    .build();
        }

        // 2. Detect Intent & Build Context
        StringBuilder contextBuilder = new StringBuilder();
        String matchedIntent = "general";
        String source = "db";

        boolean queriedDoctors = false;
        boolean queriedDepts = false;
        boolean queriedContacts = false;
        boolean queriedFaqs = false;

        // Doctor Schedule intent keywords
        if (normalizedMsg.contains("doctor") || normalizedMsg.contains("cardiolog") || normalizedMsg.contains("pediatric") || 
            normalizedMsg.contains("orthoped") || normalizedMsg.contains("surgeon") || normalizedMsg.contains("physician") ||
            normalizedMsg.contains("available") || normalizedMsg.contains("schedule") || normalizedMsg.contains("timings") ||
            normalizedMsg.contains("monday") || normalizedMsg.contains("tuesday") || normalizedMsg.contains("wednesday") ||
            normalizedMsg.contains("thursday") || normalizedMsg.contains("friday") || normalizedMsg.contains("saturday") || normalizedMsg.contains("sunday")) {
            
            queriedDoctors = true;
            matchedIntent = "doctor_schedule";
            List<Doctor> doctors = doctorRepository.findAll();
            contextBuilder.append("Doctors Roster & Schedules:\n");
            for (Doctor d : doctors) {
                contextBuilder.append(String.format("- %s, Specialization: %s, Department: %s, Available Days: %s, Timings: %s, Cabin: %s, Available: %s\n",
                        d.getName(), d.getSpecialization(), d.getDepartment() != null ? d.getDepartment().getName() : "General",
                        d.getAvailabilityDays(), d.getOpTimings(), d.getRoomCabin(), d.getIsAvailable() ? "Yes" : "No"));
            }
            contextBuilder.append("\n");
        }

        // Location / Department intent keywords
        if (normalizedMsg.contains("where") || normalizedMsg.contains("location") || normalizedMsg.contains("floor") || 
            normalizedMsg.contains("wing") || normalizedMsg.contains("department") || normalizedMsg.contains("radiology") ||
            normalizedMsg.contains("cardiology") || normalizedMsg.contains("pediatrics") || normalizedMsg.contains("orthopedics")) {
            
            queriedDepts = true;
            if (!matchedIntent.equals("doctor_schedule")) {
                matchedIntent = "department_location";
            }
            List<Department> departments = departmentRepository.findAll();
            contextBuilder.append("Hospital Departments & Locations:\n");
            for (Department d : departments) {
                contextBuilder.append(String.format("- Department: %s, Floor/Location: %s, Timings: %s, Services: %s, Description: %s\n",
                        d.getName(), d.getFloorLocation(), d.getTimings(), d.getServices(), d.getDescription()));
            }
            contextBuilder.append("\n");
        }

        // Contact info / Visiting hours intent keywords
        if (normalizedMsg.contains("contact") || normalizedMsg.contains("phone") || normalizedMsg.contains("number") || 
            normalizedMsg.contains("call") || normalizedMsg.contains("emergency") || normalizedMsg.contains("reception") || 
            normalizedMsg.contains("ambulance") || normalizedMsg.contains("address") || normalizedMsg.contains("visit") || 
            normalizedMsg.contains("hour")) {
            
            queriedContacts = true;
            matchedIntent = "contact_and_visiting";
            List<ContactInfo> contacts = contactInfoRepository.findAll();
            contextBuilder.append("Hospital Contacts & Visiting Details:\n");
            for (ContactInfo c : contacts) {
                contextBuilder.append(String.format("- Type: %s, Phone: %s, Email: %s, Address: %s, Visiting Hours: %s\n",
                        c.getPhoneType(), c.getPhoneNumber(), c.getEmail(), c.getAddress(), c.getVisitingHours()));
            }
            contextBuilder.append("\n");
        }

        // Keyword based FAQ search
        List<FAQ> matchedFaqs = new ArrayList<>();
        String[] words = normalizedMsg.split("\\s+");
        for (String word : words) {
            if (word.length() > 3) {
                matchedFaqs.addAll(faqRepository.searchByKeyword(word));
            }
        }
        matchedFaqs = matchedFaqs.stream().distinct().collect(Collectors.toList());
        if (!matchedFaqs.isEmpty()) {
            queriedFaqs = true;
            if (matchedIntent.equals("general")) {
                matchedIntent = "faq_match";
            }
            contextBuilder.append("Frequently Asked Questions (FAQs):\n");
            for (FAQ f : matchedFaqs) {
                contextBuilder.append(String.format("Q: %s\nA: %s\n", f.getQuestion(), f.getAnswer()));
            }
            contextBuilder.append("\n");
        }

        // If context remains empty, load all FAQs to give some contextual knowledge
        if (contextBuilder.length() == 0) {
            List<FAQ> allFaqs = faqRepository.findAll();
            contextBuilder.append("Frequently Asked Questions (FAQs):\n");
            for (FAQ f : allFaqs) {
                contextBuilder.append(String.format("Q: %s\nA: %s\n", f.getQuestion(), f.getAnswer()));
            }
        }

        String context = contextBuilder.toString().trim();

        // 3. Delegate to AI service (with direct db fallback if it fails)
        String answer;
        try {
            AiService aiService = getAiService();
            answer = aiService.generateResponse(message, context);
            source = "ai_augmented (" + aiProvider + ")";
        } catch (Exception e) {
            answer = generateFallbackAnswer(normalizedMsg, matchedFaqs);
            source = "db_fallback";
        }

        // 4. Save and return response
        saveChatLog(message, answer, matchedIntent, source);

        return ChatResponse.builder()
                .answer(answer)
                .source(source)
                .matchedIntent(matchedIntent)
                .build();
    }

    private boolean isInScope(String message) {
        return true;
    }

    private AiService getAiService() {
        try {
            return applicationContext.getBean(aiProvider, AiService.class);
        } catch (Exception e) {
            return applicationContext.getBean("mock", AiService.class);
        }
    }

    private String generateFallbackAnswer(String query, List<FAQ> faqs) {
        if (faqs != null && !faqs.isEmpty()) {
            return "Based on our FAQ: " + faqs.get(0).getAnswer();
        }
        return "I apologize, but our AI service is currently offline and I couldn't find a direct FAQ matching your request. " +
               "Please check our Contacts section or call our reception desk at +1-800-555-0199 for assistance.";
    }

    private void saveChatLog(String query, String botResponse, String intent, String source) {
        try {
            ChatLog log = ChatLog.builder()
                    .userMessage(query)
                    .botAnswer(botResponse)
                    .matchedIntent(intent)
                    .source(source)
                    .build();
            chatLogRepository.save(log);
        } catch (Exception e) {
            System.err.println("Failed to write chat log: " + e.getMessage());
        }
    }
}
