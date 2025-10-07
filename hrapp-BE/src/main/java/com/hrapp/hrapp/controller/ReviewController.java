package com.hrapp.hrapp.controller;

import com.hrapp.hrapp.dto.ReviewDTO;
import com.hrapp.hrapp.mapper.ReviewMapper;
import com.hrapp.hrapp.model.Review;
import com.hrapp.hrapp.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    private final ReviewMapper reviewMapper;

    @GetMapping("/{id}")
    public ResponseEntity<List<ReviewDTO>> getAllReviews(@PathVariable UUID id) {
        List<Review> allReviews = reviewService.getAllReviewsForTarget(id);
        List<ReviewDTO> reviewDTOs = reviewMapper.toReviewDTOs(allReviews);
        return ResponseEntity.ok(reviewDTOs);
    }

    @PostMapping
    public ResponseEntity<ReviewDTO> createReview(@RequestBody ReviewDTO reviewDTO) {
        Review created = reviewService.createReview(reviewDTO);
        return ResponseEntity.ok(reviewMapper.toReviewDTO(created));
    }
    
}