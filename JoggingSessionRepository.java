package com.jogtracker.jogapp.repository;

import com.jogtracker.jogapp.model.JoggingSession;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface JoggingSessionRepository extends JpaRepository<JoggingSession, Long> {
    List<JoggingSession> findByUserId(String userId);
}
