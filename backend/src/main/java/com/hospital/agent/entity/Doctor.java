package com.hospital.agent.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "doctors")
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 100)
    private String specialization;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "department_id")
    private Department department;

    @Column(name = "availability_days", nullable = false, length = 100)
    private String availabilityDays;

    @Column(name = "op_timings", nullable = false, length = 100)
    private String opTimings;

    @Column(name = "room_cabin", nullable = false, length = 50)
    private String roomCabin;

    @Column(name = "is_available")
    private Boolean isAvailable = true;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    public Doctor() {}

    public Doctor(Long id, String name, String specialization, Department department, String availabilityDays, String opTimings, String roomCabin, Boolean isAvailable, LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.specialization = specialization;
        this.department = department;
        this.availabilityDays = availabilityDays;
        this.opTimings = opTimings;
        this.roomCabin = roomCabin;
        this.isAvailable = isAvailable;
        this.createdAt = createdAt;
    }

    public Long getId() { 
        return id; 
    }
    public void setId(Long id) { 
        this.id = id; 
    }

    public String getName() { 
        return name; 
    }
    public void setName(String name) { 
        this.name = name; 
    }

    public String getSpecialization() { 
        return specialization; 
    }
    public void setSpecialization(String specialization) { 
        this.specialization = specialization; 
    }

    public Department getDepartment() { 
        return department; 
    }
    public void setDepartment(Department department) { 
        this.department = department; 
    }

    public String getAvailabilityDays() { 
        return availabilityDays; 
    }
    public void setAvailabilityDays(String availabilityDays) { 
        this.availabilityDays = availabilityDays; 
    }

    public String getOpTimings() { 
        return opTimings; 
    }
    public void setOpTimings(String opTimings) { 
        this.opTimings = opTimings; 
    }

    public String getRoomCabin() { 
        return roomCabin; 
    }
    public void setRoomCabin(String roomCabin) { 
        this.roomCabin = roomCabin; 
    }

    public Boolean getIsAvailable() { 
        return isAvailable; 
    }
    public void setIsAvailable(Boolean isAvailable) { 
        this.isAvailable = isAvailable; 
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
        private String name;
        private String specialization;
        private Department department;
        private String availabilityDays;
        private String opTimings;
        private String roomCabin;
        private Boolean isAvailable = true;
        private LocalDateTime createdAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder specialization(String specialization) { this.specialization = specialization; return this; }
        public Builder department(Department department) { this.department = department; return this; }
        public Builder availabilityDays(String availabilityDays) { this.availabilityDays = availabilityDays; return this; }
        public Builder opTimings(String opTimings) { this.opTimings = opTimings; return this; }
        public Builder roomCabin(String roomCabin) { this.roomCabin = roomCabin; return this; }
        public Builder isAvailable(Boolean isAvailable) { this.isAvailable = isAvailable; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Doctor build() {
            return new Doctor(id, name, specialization, department, availabilityDays, opTimings, roomCabin, isAvailable, createdAt);
        }
    }
}
