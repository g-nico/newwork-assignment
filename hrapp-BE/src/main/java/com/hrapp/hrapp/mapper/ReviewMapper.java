package com.hrapp.hrapp.mapper;

import com.hrapp.hrapp.dto.ReviewDTO;
import com.hrapp.hrapp.model.Employee;
import com.hrapp.hrapp.model.Review;
import com.hrapp.hrapp.repository.EmployeeRepository;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
import java.util.UUID;

@Mapper(componentModel = "spring")
public interface ReviewMapper {

    @Mapping(target = "author", source = "author.uuid")
    @Mapping(target = "target", source = "target.uuid")
    ReviewDTO toReviewDTO(Review entity);

    @Mapping(target = "author", expression = "java(employee(dto.author(), repo))")
    @Mapping(target = "target", expression = "java(employee(dto.target(), repo))")
    Review toEntity(ReviewDTO dto, @Context EmployeeRepository repo);

    List<ReviewDTO> toReviewDTOs(List<Review> entities);

    default Employee employee(UUID id, @Context EmployeeRepository repo) {
        if (id == null) return null;
        return repo.getReferenceById(id);
        // return repo.findById(id).orElseThrow(() -> new jakarta.persistence.EntityNotFoundException("Employee " + id + " not found"));
    }

}