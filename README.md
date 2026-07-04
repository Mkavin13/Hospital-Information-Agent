# Hospital Information Agent (Phase 1)

A web-based conversational AI assistant and dashboard directory system designed to help patients and hospital visitors retrieve specialized schedules, department floor layouts, visiting hours, and clinic FAQs 24x7.

---

## 1. Project Overview

Reception desks in major hospital lobbies handle massive volumes of repetitive queries regarding consultant availability, department floor wings, billing details, and visiting hours. This project presents a full-stack digital solution featuring a responsive web dashboard and an intelligent context-aware chatbot. By harvesting structured directory details from a relational database and using a provider-agnostic AI layer (Google Gemini or Llama 3), the assistant resolves queries instantly.

### Core Objectives:
- **Reduce Front-Desk Workload**: Automate responses to standard administrative queries, allowing receptionists to focus on urgent visitor requests.
- **Provide 24/7 Availability**: Deliver immediate answers to patient queries around the clock.
- **Prevent AI Hallucination**: Implement a hybrid intent-retrieval pattern that prioritizes local database facts over generated text.
- **Secure Scope Boundaries**: Rejects out-of-scope prompts (e.g. general programming, cooking queries) with polite boundary notices.

---

## 2. Technical Stack

- **Frontend Client**: React 18, React Router (v6), Axios, Lucide Icons, Vanilla CSS Variables.
- **Backend API**: Java 17, Spring Boot 3, Hibernate JPA, Spring Web, Hibernate Validation, Lombok.
- **Database**: MySQL (Normalized schema).
- **AI Integrations**: Google Gemini 1.5 Flash API or Llama 3 (via Groq or Ollama completions endpoint).

---

## 3. System Architecture Flow

```text
User Interface (React SPA)
       │ (HTTP REST Calls / Axios)
       ▼
REST Controllers (Spring Web)
       │ (DTO Transport & Validations)
       ▼
Service Layer (Business Logic & Hybrid Intent Engine)
       ├─────────────── Query harvesting ─────────────────┐
       ▼                                                   ▼
Repositories (Spring Data JPA)                     AI Service Abstraction (AiService)
       │ (SQL Queries)                                     │ (JSON payload wrapper)
       ▼                                                   ▼
Database Tier (MySQL Server)                       LLM Engine (Gemini / Llama 3)
```

---

## 4. Directory Structure

```text
Hospital agent/
├── db/
│   ├── schema.sql                     # Table schemas, indices & relations
│   └── seed.sql                       # Seed records for test runs
├── backend/
│   ├── pom.xml                        # Maven dependencies config
│   └── src/main/java/com/hospital/agent/
│       ├── config/                    # CORS and AI RestTemplate beans
│       ├── controller/                # REST endpoints
│       ├── dto/                       # Data Transfer Objects
│       ├── entity/                    # JPA mappings
│       ├── exception/                 # Error mappings
│       ├── repository/                # JPA repositories
│       └── service/                   # Orchestrations & AI clients
└── frontend/
    ├── package.json                   # Client configurations
    ├── vite.config.js                 # Vite port mappings
    ├── index.html                     # HTML container
    └── src/
        ├── App.jsx                    # Routing and floating widget wrapper
        ├── index.css                  # Typography, layout tokens & keyframes
        ├── components/                # Reusable cards, widgets & navs
        ├── pages/                     # Full-screen page views
        └── services/                  # Axios connector client
```

---

## 5. MySQL Database Setup

1. Open your MySQL client terminal and create the project database:
   ```sql
   CREATE DATABASE hospital_agent_db;
   ```
2. Import the table schema structures using the SQL script placed in the database directory:
   ```bash
   mysql -u root -p hospital_agent_db < db/schema.sql
   ```
3. Load the default mock records to seed tables for testing:
   ```bash
   mysql -u root -p hospital_agent_db < db/seed.sql
   ```

### Entity Mappings & Indexes:
- **`departments` to `doctors`**: Evaluated as a `One-to-Many` relation. The field `department_id` in `doctors` is registered as a foreign key pointing to `id` in the `departments` table. The action `ON DELETE SET NULL` prevents cascading deletions of consultants if a department is deleted.
- **Indices**: A BTREE index is mapped on the composite fields `doctors(name, specialization)` to optimize lookup queries. A `FULLTEXT` index is mapped on `faqs(question, answer)` for quick natural language matches.

---

## 6. Backend Setup & Run

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Configure database connection parameters and AI tokens inside the properties file `src/main/resources/application.properties` or declare them in your system environment:
   ```properties
   spring.datasource.username=YOUR_MYSQL_USERNAME
   spring.datasource.password=YOUR_MYSQL_PASSWORD
   GEMINI_API_KEY=YOUR_GEMINI_TOKEN_KEY
   ```
3. Build the application and compile Java classes using Maven:
   ```bash
   mvn clean install
   ```
4. Start the Spring Boot application server:
   ```bash
   mvn spring-boot:run
   ```
   The backend API will listen on `http://localhost:8080`.

---

## 7. Frontend Client Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install npm dependency packages:
   ```bash
   npm install
   ```
3. Create a local environment properties file `frontend/.env.development` to target the local backend port:
   ```properties
   VITE_API_BASE_URL=http://localhost:8080/api
   ```
4. Launch the local Vite development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

---

## 8. AI Provider Configurations

The chatbot service abstraction supports switching LLM providers via properties:

### A. Google Gemini Integration
Set `AI_PROVIDER=gemini` and register your API key:
```properties
hospital.ai.provider=gemini
GEMINI_API_KEY=AIzaSy...
```

### B. Llama 3 (via Groq Cloud / Ollama)
Set `AI_PROVIDER=llama` and supply the endpoint and credentials:
```properties
hospital.ai.provider=llama
LLAMA_API_KEY=gsk_...
hospital.ai.llama.url=https://api.groq.com/openai/v1/chat/completions
hospital.ai.llama.model=llama3-8b-8192
```

### C. Mock Fallback (Default offline)
Set `AI_PROVIDER=mock`. The chatbot will process queries and return direct data lookups from local database records, bypassing external API calls completely. This is the default setup for local development.

---

## 9. Sample REST API Endpoints

- **GET** `/api/doctors` — Retrieve all doctor records.
- **GET** `/api/doctors/search?keyword=Sarah` — Search doctor listings by name or specialization.
- **GET** `/api/departments` — List departments and floor coordinates.
- **GET** `/api/faqs` — List categorized frequently asked questions.
- **POST** `/api/chat` — Transmit message inputs and get AI responses.

### Request Body JSON:
```json
{
  "message": "Which cardiologist is available on Monday?"
}
```

### Response Body JSON:
```json
{
  "answer": "Dr. Sarah Jenkins is available on Monday from 09:00 AM to 01:00 PM in Room 201.",
  "source": "ai_augmented (gemini)",
  "matchedIntent": "doctor_schedule"
}
```

---

## 10. Screenshots (Dashboard & AI Chatbot UI)
*(Placeholder: Insert screenshots of the responsive cards dashboard layout, search filters, and chat overlay windows here for submission reports).*

---

## 11. Phase 2 Scope & Enhancements
- **Security & RBAC**: Spring Security configurations utilizing JWT tokens for doctor log-ins.
- **Appointment Booking**: Connect calendar timeslots to patient registration workflows.
- **EHR Records Access**: Allow patient profiles to access PDF prescription files.
- **Multilingual AI**: Integrate Google Translation APIs to translate chat sessions dynamically.

---

## 12. Academic Project Submission Metadata

- **Project Title**: Hospital Information Agent (Phase 1)
- **Course**: Final Year Capstone Project / Software Engineering 101
- **Academic Year**: 2026
- **Student Details**: Kavin M. (ID: 69cff593)
- **Project Advisor**: Senior Full-Stack Architect
- **Institution**: Department of Computer Science & Engineering
