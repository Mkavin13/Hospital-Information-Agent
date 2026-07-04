package com.hospital.agent.controller;

import com.hospital.agent.dto.ContactInfoDto;
import com.hospital.agent.dto.DepartmentDto;
import com.hospital.agent.dto.DoctorDto;
import com.hospital.agent.dto.FaqDto;
import com.hospital.agent.service.HospitalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class HospitalController {

    private final HospitalService hospitalService;

    @Autowired
    public HospitalController(HospitalService hospitalService) {
        this.hospitalService = hospitalService;
    }

    // --- Doctors ---

    @GetMapping("/doctors")
    public ResponseEntity<List<DoctorDto>> getAllDoctors() {
        return ResponseEntity.ok(hospitalService.getAllDoctors());
    }

    @GetMapping("/doctors/search")
    public ResponseEntity<List<DoctorDto>> searchDoctors(@RequestParam("keyword") String keyword) {
        return ResponseEntity.ok(hospitalService.searchDoctors(keyword));
    }

    @GetMapping("/doctors/department/{deptName}")
    public ResponseEntity<List<DoctorDto>> getDoctorsByDepartment(@PathVariable("deptName") String deptName) {
        return ResponseEntity.ok(hospitalService.getDoctorsByDepartment(deptName));
    }

    // --- Departments ---

    @GetMapping("/departments")
    public ResponseEntity<List<DepartmentDto>> getAllDepartments() {
        return ResponseEntity.ok(hospitalService.getAllDepartments());
    }

    @GetMapping("/departments/{id}")
    public ResponseEntity<DepartmentDto> getDepartmentById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(hospitalService.getDepartmentById(id));
    }

    // --- FAQs ---

    @GetMapping("/faqs")
    public ResponseEntity<List<FaqDto>> getAllFaqs() {
        return ResponseEntity.ok(hospitalService.getAllFaqs());
    }

    @GetMapping("/faqs/search")
    public ResponseEntity<List<FaqDto>> searchFaqs(@RequestParam("keyword") String keyword) {
        return ResponseEntity.ok(hospitalService.searchFaqs(keyword));
    }

    // --- Contact Info ---

    @GetMapping("/contact")
    public ResponseEntity<List<ContactInfoDto>> getContactDetails() {
        return ResponseEntity.ok(hospitalService.getContactDetails());
    }
}
