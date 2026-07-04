package com.hospital.agent.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "contact_info")
public class ContactInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "phone_type", nullable = false, length = 50)
    private String phoneType;

    @Column(name = "phone_number", nullable = false, length = 20)
    private String phoneNumber;

    @Column(nullable = false, length = 100)
    private String email;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String address;

    @Column(name = "visiting_hours", nullable = false, length = 100)
    private String visitingHours;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    public ContactInfo() {}

    public ContactInfo(Long id, String phoneType, String phoneNumber, String email, String address, String visitingHours, LocalDateTime createdAt) {
        this.id = id;
        this.phoneType = phoneType;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.address = address;
        this.visitingHours = visitingHours;
        this.createdAt = createdAt;
    }

    public Long getId() { 
        return id; 
    }
    public void setId(Long id) { 
        this.id = id; 
    }

    public String getPhoneType() { 
        return phoneType; 
    }
    public void setPhoneType(String phoneType) { 
        this.phoneType = phoneType; 
    }

    public String getPhoneNumber() { 
        return phoneNumber; 
    }
    public void setPhoneNumber(String phoneNumber) { 
        this.phoneNumber = phoneNumber; 
    }

    public String getEmail() { 
        return email; 
    }
    public void setEmail(String email) { 
        this.email = email; 
    }

    public String getAddress() { 
        return address; 
    }
    public void setAddress(String address) { 
        this.address = address; 
    }

    public String getVisitingHours() { 
        return visitingHours; 
    }
    public void setVisitingHours(String visitingHours) { 
        this.visitingHours = visitingHours; 
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
        private String phoneType;
        private String phoneNumber;
        private String email;
        private String address;
        private String visitingHours;
        private LocalDateTime createdAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder phoneType(String phoneType) { this.phoneType = phoneType; return this; }
        public Builder phoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; return this; }
        public Builder email(String email) { this.email = email; return this; }
        public Builder address(String address) { this.address = address; return this; }
        public Builder visitingHours(String visitingHours) { this.visitingHours = visitingHours; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public ContactInfo build() {
            return new ContactInfo(id, phoneType, phoneNumber, email, address, visitingHours, createdAt);
        }
    }
}
