package com.hospital.agent.dto;

public class ContactInfoDto {
    private Long id;
    private String phoneType;
    private String phoneNumber;
    private String email;
    private String address;
    private String visitingHours;

    public ContactInfoDto() {}

    public ContactInfoDto(Long id, String phoneType, String phoneNumber, String email, String address, String visitingHours) {
        this.id = id;
        this.phoneType = phoneType;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.address = address;
        this.visitingHours = visitingHours;
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

        public Builder id(Long id) { this.id = id; return this; }
        public Builder phoneType(String phoneType) { this.phoneType = phoneType; return this; }
        public Builder phoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; return this; }
        public Builder email(String email) { this.email = email; return this; }
        public Builder address(String address) { this.address = address; return this; }
        public Builder visitingHours(String visitingHours) { this.visitingHours = visitingHours; return this; }

        public ContactInfoDto build() {
            return new ContactInfoDto(id, phoneType, phoneNumber, email, address, visitingHours);
        }
    }
}
