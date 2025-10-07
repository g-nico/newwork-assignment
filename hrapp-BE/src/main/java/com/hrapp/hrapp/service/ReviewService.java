package com.hrapp.hrapp.service;

import com.hrapp.hrapp.dto.ReviewDTO;
import com.hrapp.hrapp.mapper.ReviewMapper;
import com.hrapp.hrapp.model.Review;
import com.hrapp.hrapp.repository.EmployeeRepository;
import com.hrapp.hrapp.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final EmployeeRepository employeeRepository;
    private final ReviewMapper reviewMapper;
    private final AIEditService AIEditService;

    public Review createReview(ReviewDTO review) {
        String improved = AIEditService.professionalize(review.content());
        ReviewDTO polishedDto = new ReviewDTO(
                review.uuid(),
                review.target(),
                review.author(),
                improved,
                review.createdAt()
        );

        Review entity = reviewMapper.toEntity(polishedDto, employeeRepository);
        return reviewRepository.save(entity);
    }

    public List<Review> getAllReviewsForTarget(UUID targetId) {
        return reviewRepository.findByTargetUuid(targetId);
    }

}