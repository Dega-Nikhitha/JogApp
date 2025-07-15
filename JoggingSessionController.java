package com.jogtracker.jogapp.controller;

import com.jogtracker.jogapp.model.JoggingSession;
import com.jogtracker.jogapp.repository.JoggingSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jog")
public class JoggingSessionController {

    @Autowired
    private JoggingSessionRepository repository;
    @GetMapping("/api/jog/all")
    public List<JoggingSession> getAllSessions() {
        return repository.findAll();
    }

    @PostMapping("/save")
    public JoggingSession saveSession(@RequestBody JoggingSession session) {
        return repository.save(session);
    }

    @GetMapping("/user/{userId}")
    public List<JoggingSession> getSessionsByUser(@PathVariable String userId) {
        return repository.findByUserId(userId);
    }
    

}
