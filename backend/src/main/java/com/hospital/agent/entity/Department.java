package com.hospital.agent.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "departments")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "floor_location", nullable = false, length = 100)
    private String floorLocation;

    @Column(nullable = false, length = 100)
    private String timings;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String services;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    public Department() {}

    public Department(Long id, String name, String description, String floorLocation, String timings, String services, LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.floorLocation = floorLocation;
        this.timings = timings;
        this.services = services;
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

    public String getDescription() { 
        return description; 
    }
    public void setDescription(String description) { 
        this.description = description; 
    }

    public String getFloorLocation() { 
        return floorLocation; 
    }
    public void setFloorLocation(String floorLocation) { 
        this.floorLocation = floorLocation; 
    }

    public String getTimings() { 
        return timings; 
    }
    public void setTimings(String timings) { 
        this.timings = timings; 
    }

    public String getServices() { 
        return services; 
    }
    public void setServices(String services) { 
        this.services = services; 
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
        private String description;
        private String floorLocation;
        private String timings;
        private String services;
        private LocalDateTime createdAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder floorLocation(String floorLocation) { this.floorLocation = floorLocation; return this; }
        public Builder timings(String timings) { this.timings = timings; return this; }
        public Builder services(String services) { this.services = services; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Department build() {
            return new Department(id, name, description, floorLocation, timings, services, createdAt);
        }
    }
}
