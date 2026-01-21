package com.example.spm.domain.dto;

import java.time.LocalDateTime;

import com.example.spm.domain.entity.ProductChangeLog;
import com.example.spm.domain.enums.ChangeType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 변경 이력 관련 DTO
 */
public class ChangeLogDto {

    /**
     * 변경 이력 요청 DTO
     */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Request {
        Long productId;
        ChangeType changeType;
        String changedField;
        String oldValue;
        String newValue;
        String changedBy;
        LocalDateTime changedDate;
    }

    /**
     * 변경 이력 응답 DTO
     */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        Long changeLogId;
        Long productId;
        String productCode;
        String productName;
        ChangeType changeType;
        String changedField;
        String oldValue;
        String newValue;
        String changedBy;
        LocalDateTime changedDate;

        /**
         * Entity를 Response DTO로 변환
         */
        public static Response from(ProductChangeLog changeLog) {
            return Response.builder()
                    .changeLogId(changeLog.getChangeLogId())
                    .productId(changeLog.getProduct().getProductId())
                    .productCode(changeLog.getProduct().getProductCode())
                    .productName(changeLog.getProduct().getProductName())
                    .changeType(changeLog.getChangeType())
                    .changedField(changeLog.getChangedField())
                    .oldValue(changeLog.getOldValue())
                    .newValue(changeLog.getNewValue())
                    .changedBy(changeLog.getChangedBy())
                    .changedDate(changeLog.getChangedDate())
                    .build();
        }
    }

    /**
     * 변경 이력 검색 조건 DTO
     */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SearchCondition {
        Long productId;
        ChangeType changeType;
        LocalDateTime startDate;
        LocalDateTime endDate;
    }
}
