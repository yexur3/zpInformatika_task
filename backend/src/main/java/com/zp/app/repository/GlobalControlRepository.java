package com.zp.app.repository;

import com.zp.app.model.GlobalControl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GlobalControlRepository extends JpaRepository<GlobalControl, Integer> {
    Optional<GlobalControl> findByPage(String page);
}