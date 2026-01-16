package com.example.spm.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    PRODUCT_NOT_FOUND(HttpStatus.BAD_REQUEST, "PRODUCT_001", "상품을 찾을 수 없습니다."),
    CATEGORY_NOT_FOUND(HttpStatus.BAD_REQUEST, "PRODUCT_002", "카테고리를 찾을 수 없습니다."),
    INSUFFICIENT_STOCK(HttpStatus.BAD_REQUEST, "PRODUCT_003", "재고가 부족합니다."),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "SERVER_001", "서버 내부 오류가 발생했습니다.");

    /** HTTP 상태 코드 */
    private final HttpStatus httpStatus;

    /** 에러 코드 (클라이언트가 식별할 수 있는 고유 코드) */
    private final String code;

    /** 에러 메시지 (사용자에게 표시될 메시지) */
    private final String message;
}
