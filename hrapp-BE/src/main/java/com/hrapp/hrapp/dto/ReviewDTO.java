package com.hrapp.hrapp.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record ReviewDTO(UUID uuid, UUID target, UUID author, String content, LocalDateTime createdAt) {
}
