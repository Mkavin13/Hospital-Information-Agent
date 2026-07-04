package com.hospital.agent.service;

import com.hospital.agent.dto.ContactInfoDto;
import com.hospital.agent.dto.DepartmentDto;
import com.hospital.agent.dto.DoctorDto;
import com.hospital.agent.dto.FaqDto;
import com.hospital.agent.entity.ContactInfo;
import com.hospital.agent.entity.Department;
import com.hospital.agent.entity.Doctor;
import com.hospital.agent.entity.FAQ;
import com.hospital.agent.exception.ResourceNotFoundException;
import com.hospital.agent.repository.ContactInfoRepository;
import com.hospital.agent.repository.DepartmentRepository;
import com.hospital.agent.repository.DoctorRepository;
import com.hospital.agent.repository.FAQRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class HospitalService {

    private final DoctorRepository doctorRepository;
    private final DepartmentRepository departmentRepository;
    private final FAQRepository faqRepository;
    private final ContactInfoRepository contactInfoRepository;

    @Autowired
    public HospitalService(DoctorRepository doctorRepository,
                           DepartmentRepository departmentRepository,
                           FAQRepository faqRepository,
                           ContactInfoRepository contactInfoRepository) {
        this.doctorRepository = doctorRepository;
        this.departmentRepository = departmentRepository;
        this.faqRepository = faqRepository;
        this.contactInfoRepository = contactInfoRepository;
    }

    // --- Doctors ---

    public List<DoctorDto> getAllDoctors() {
        return doctorRepository.findAll().stream()
                .map(this::convertToDoctorDto)
                .collect(Collectors.toList());
    }

    public List<DoctorDto> searchDoctors(String keyword) {
        return doctorRepository.searchByKeyword(keyword).stream()
                .map(this::convertToDoctorDto)
                .collect(Collectors.toList());
    }

    public List<DoctorDto> getDoctorsByDepartment(String deptName) {
        return doctorRepository.findByDepartmentNameIgnoreCase(deptName).stream()
                .map(this::convertToDoctorDto)
                .collect(Collectors.toList());
    }

    // --- Departments ---

    public List<DepartmentDto> getAllDepartments() {
        return departmentRepository.findAll().stream()
                .map(this::convertToDepartmentDto)
                .collect(Collectors.toList());
    }

    public DepartmentDto getDepartmentById(Long id) {
        Department dept = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + id));
        return convertToDepartmentDto(dept);
    }

    // --- FAQs ---

    public List<FaqDto> getAllFaqs() {
        return faqRepository.findAll().stream()
                .map(this::convertToFaqDto)
                .collect(Collectors.toList());
    }

    public List<FaqDto> searchFaqs(String keyword) {
        return faqRepository.searchByKeyword(keyword).stream()
                .map(this::convertToFaqDto)
                .collect(Collectors.toList());
    }

    // --- Contact Info ---

    public List<ContactInfoDto> getContactDetails() {
        return contactInfoRepository.findAll().stream()
                .map(this::convertToContactInfoDto)
                .collect(Collectors.toList());
    }

    // --- Mappers ---

    private DoctorDto convertToDoctorDto(Doctor doctor) {
        return DoctorDto.builder()
                .id(doctor.getId())
                .name(doctor.getName())
                .specialization(doctor.getSpecialization())
                .departmentId(doctor.getDepartment() != null ? doctor.getDepartment().getId() : null)
                .departmentName(doctor.getDepartment() != null ? doctor.getDepartment().getName() : "None")
                .availabilityDays(doctor.getAvailabilityDays())
                .opTimings(doctor.getOpTimings())
                .roomCabin(doctor.getRoomCabin())
                .isAvailable(doctor.getIsAvailable())
                .build();
    }

    private DepartmentDto convertToDepartmentDto(Department dept) {
        return DepartmentDto.builder()
                .id(dept.getId())
                .name(dept.getName())
                .description(dept.getDescription())
                .floorLocation(dept.getFloorLocation())
                .timings(dept.getTimings())
                .services(dept.getServices())
                .build();
    }

    private FaqDto convertToFaqDto(FAQ faq) {
        return FaqDto.builder()
                .id(faq.getId())
                .category(faq.getCategory())
                .question(faq.getQuestion())
                .answer(faq.getAnswer())
                .build();
    }

    private ContactInfoDto convertToContactInfoDto(ContactInfo info) {
        return ContactInfoDto.builder()
                .id(info.getId())
                .phoneType(info.getPhoneType())
                .phoneNumber(info.getPhoneNumber())
                .email(info.getEmail())
                .address(info.getAddress())
                .visitingHours(info.getVisitingHours())
                .build();
    }
}
