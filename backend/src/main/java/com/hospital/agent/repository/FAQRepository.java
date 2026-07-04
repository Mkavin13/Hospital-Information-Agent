package com.hospital.agent.repository;

import com.hospital.agent.entity.FAQ;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FAQRepository extends JpaRepository<FAQ, Long> {

    @Query("SELECT f FROM FAQ f WHERE LOWER(f.question) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(f.answer) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(f.category) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<FAQ> searchByKeyword(@Param("keyword") String keyword);
}
