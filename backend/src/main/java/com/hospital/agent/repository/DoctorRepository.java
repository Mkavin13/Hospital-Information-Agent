package com.hospital.agent.repository;

import com.hospital.agent.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    @Query("SELECT d FROM Doctor d WHERE LOWER(d.name) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(d.specialization) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(d.department.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Doctor> searchByKeyword(@Param("keyword") String keyword);

    @Query("SELECT d FROM Doctor d WHERE LOWER(d.department.name) = LOWER(:deptName)")
    List<Doctor> findByDepartmentNameIgnoreCase(@Param("deptName") String deptName);
}
