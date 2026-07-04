package com.hospital.agent.dto;

public class DoctorDto {
    private Long id;
    private String name;
    private String specialization;
    private Long departmentId;
    private String departmentName;
    private String availabilityDays;
    private String opTimings;
    private String roomCabin;
    private Boolean isAvailable;

    public DoctorDto() {}

    public DoctorDto(Long id, String name, String specialization, Long departmentId, String departmentName,
                     String availabilityDays, String opTimings, String roomCabin, Boolean isAvailable) {
        this.id = id;
        this.name = name;
        this.specialization = specialization;
        this.departmentId = departmentId;
        this.departmentName = departmentName;
        this.availabilityDays = availabilityDays;
        this.opTimings = opTimings;
        this.roomCabin = roomCabin;
        this.isAvailable = isAvailable;
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

    public Long getDepartmentId() { 
        return departmentId; 
    }
    public void setDepartmentId(Long departmentId) { 
        this.departmentId = departmentId; 
    }

    public String getDepartmentName() { 
        return departmentName; 
    }
    public void setDepartmentName(String departmentName) { 
        this.departmentName = departmentName; 
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

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private String name;
        private String specialization;
        private Long departmentId;
        private String departmentName;
        private String availabilityDays;
        private String opTimings;
        private String roomCabin;
        private Boolean isAvailable;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder specialization(String specialization) { this.specialization = specialization; return this; }
        public Builder departmentId(Long departmentId) { this.departmentId = departmentId; return this; }
        public Builder departmentName(String departmentName) { this.departmentName = departmentName; return this; }
        public Builder availabilityDays(String availabilityDays) { this.availabilityDays = availabilityDays; return this; }
        public Builder opTimings(String opTimings) { this.opTimings = opTimings; return this; }
        public Builder roomCabin(String roomCabin) { this.roomCabin = roomCabin; return this; }
        public Builder isAvailable(Boolean isAvailable) { this.isAvailable = isAvailable; return this; }

        public DoctorDto build() {
            return new DoctorDto(id, name, specialization, departmentId, departmentName, availabilityDays, opTimings, roomCabin, isAvailable);
        }
    }
}
