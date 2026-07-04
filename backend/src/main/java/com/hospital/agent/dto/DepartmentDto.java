package com.hospital.agent.dto;

public class DepartmentDto {
    private Long id;
    private String name;
    private String description;
    private String floorLocation;
    private String timings;
    private String services;

    public DepartmentDto() {}

    public DepartmentDto(Long id, String name, String description, String floorLocation, String timings, String services) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.floorLocation = floorLocation;
        this.timings = timings;
        this.services = services;
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

        public Builder id(Long id) { this.id = id; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder floorLocation(String floorLocation) { this.floorLocation = floorLocation; return this; }
        public Builder timings(String timings) { this.timings = timings; return this; }
        public Builder services(String services) { this.services = services; return this; }

        public DepartmentDto build() {
            return new DepartmentDto(id, name, description, floorLocation, timings, services);
        }
    }
}
