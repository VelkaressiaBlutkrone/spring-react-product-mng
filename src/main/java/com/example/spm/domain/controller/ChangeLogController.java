package com.example.spm.domain.controller;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.spm.domain.dto.ChangeLogDto;
import com.example.spm.domain.enums.ChangeType;
import com.example.spm.domain.service.ChangeLogService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 변경 이력 컨트롤러 - 상품 변경 이력 조회 API
 */
@Slf4j
@RestController
@RequestMapping("/api/change-logs")
@RequiredArgsConstructor
@Validated
public class ChangeLogController {

    private final ChangeLogService changeLogService;

    /**
     * 변경 이력 목록 조회
     * GET /api/change-logs?page=0&size=10&productId=1&changeType=UPDATE&startDate=2024-01-01T00:00:00&endDate=2024-12-31T23:59:59
     */
    @GetMapping
    public ResponseEntity<Page<ChangeLogDto.Response>> getChangeLogs(
            @RequestParam(required = false) Long productId,
            @RequestParam(required = false) ChangeType changeType,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        ChangeLogDto.SearchCondition condition = ChangeLogDto.SearchCondition.builder()
                .productId(productId)
                .changeType(changeType)
                .startDate(startDate)
                .endDate(endDate)
                .build();

        Pageable pageable = PageRequest.of(page, size);
        Page<ChangeLogDto.Response> changeLogs = changeLogService.getChangeLogs(condition, pageable);

        return ResponseEntity.ok(changeLogs);
    }

    /**
     * 최근 변경 이력 조회
     * GET /api/change-logs/recent?startDate=2024-01-01T00:00:00&page=0&size=10
     */
    @GetMapping("/recent")
    public ResponseEntity<Page<ChangeLogDto.Response>> getRecentChangeLogs(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<ChangeLogDto.Response> changeLogs = changeLogService.getRecentChangeLogs(startDate, pageable);

        return ResponseEntity.ok(changeLogs);
    }
}
