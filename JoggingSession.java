package com.jogtracker.jogapp.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class JoggingSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userId;

    private double distanceInKm;

    private String duration; // e.g., "00:25:42"

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    @Column(length = 10000) // to store GPS points as JSON or string
    private String pathJson;  // Example: "[{lat:.., lng:..}, {...}]"
}
