package com.example.spm.domain.entity;

import java.time.LocalDateTime;

import com.example.spm.domain.enums.ChangeType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 상품 변경 이력 Entity - 상품 정보 변경 이력 추적
 */
@Getter
@Entity
@Table(name = "product_change_log")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProductChangeLog extends BaseTimeEntity {

    @Id
    @Column(name = "change_log_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long changeLogId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "change_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private ChangeType changeType;

    @Column(name = "changed_field")
    private String changedField;

    @Column(name = "old_value", columnDefinition = "TEXT")
    private String oldValue;

    @Column(name = "new_value", columnDefinition = "TEXT")
    private String newValue;

    @Column(name = "changed_by")
    private String changedBy;

    @Column(name = "changed_date", nullable = false)
    private LocalDateTime changedDate;

    @Builder
    public ProductChangeLog(Product product, ChangeType changeType, String changedField,
                           String oldValue, String newValue, String changedBy, LocalDateTime changedDate) {
        this.product = product;
        this.changeType = changeType;
        this.changedField = changedField;
        this.oldValue = oldValue;
        this.newValue = newValue;
        this.changedBy = changedBy;
        this.changedDate = changedDate != null ? changedDate : LocalDateTime.now();
    }
}
