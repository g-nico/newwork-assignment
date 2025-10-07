package com.hrapp.hrapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Review {

    @Id
    @UuidGenerator
    private UUID uuid;

    @ManyToOne
    @JoinColumn(name = "author_uuid", referencedColumnName = "uuid")
    private Employee author;

    @ManyToOne
    @JoinColumn(name = "target_uuid", referencedColumnName = "uuid")
    private Employee target;

    @Column(columnDefinition = "TEXT")
    private String content;

    @CreatedDate
    private LocalDateTime createdAt;

}
