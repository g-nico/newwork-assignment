package com.hrapp.hrapp.service.external;

public record ChatRequest(
        boolean stream,
        String model,
        java.util.List<Message> messages
) {}