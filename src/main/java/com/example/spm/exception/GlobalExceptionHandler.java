package com.example.spm.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import lombok.extern.slf4j.Slf4j;

import java.util.Iterator;

/**
 * 전역 예외 처리 핸들러 - 예외 발생 시 상세 로깅
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * BusinessException 처리
     */
    @ExceptionHandler(BusinessException.class)
    protected ResponseEntity<ErrorResponse> handleBusinessException(
            BusinessException e, WebRequest request) {
        
        ErrorCode errorCode = e.getErrorCode();
        String requestInfo = getRequestInfo(request);
        
        log.error("[비즈니스 예외] {} - {} - 요청 정보: {} - 메시지: {}", 
                errorCode.getCode(), errorCode.getMessage(), requestInfo, e.getMessage());
        
        return ErrorResponse.toResponseEntity(errorCode);
    }

    /**
     * 일반 Exception 처리
     */
    @ExceptionHandler(Exception.class)
    protected ResponseEntity<ErrorResponse> handleException(Exception e, WebRequest request) {
        String requestInfo = getRequestInfo(request);
        StackTraceElement[] stackTrace = e.getStackTrace();
        
        log.error("[시스템 예외] 예외 타입: {} - 메시지: {} - 요청 정보: {}",
                e.getClass().getName(), e.getMessage(), requestInfo, e);
        
        // 스택 트레이스 로깅 (최상위 10줄만)
        if (stackTrace.length > 0) {
            StringBuilder stackTraceStr = new StringBuilder();
            int maxLines = Math.min(10, stackTrace.length);
            for (int i = 0; i < maxLines; i++) {
                stackTraceStr.append("\n  at ").append(stackTrace[i]);
            }
            if (stackTrace.length > maxLines) {
                stackTraceStr.append("\n  ... (").append(stackTrace.length - maxLines).append(" more lines)");
            }
            log.error("[스택 트레이스]{}", stackTraceStr.toString());
        }
        
        return ErrorResponse.toResponseEntity(ErrorCode.INTERNAL_SERVER_ERROR);
    }

    /**
     * 요청 정보 추출
     */
    private String getRequestInfo(WebRequest request) {
        String description = request.getDescription(false); // URI 정보
        Iterator<String> paramNames = request.getParameterNames();
        
        StringBuilder info = new StringBuilder("URI: ").append(description);
        
        if (paramNames != null && paramNames.hasNext()) {
            info.append(" - 파라미터: ");
            while (paramNames.hasNext()) {
                String paramName = paramNames.next();
                info.append(paramName).append("=").append(request.getParameter(paramName)).append(", ");
            }
            info.delete(info.length() - 2, info.length()); // 마지막 쉼표 제거
        }
        
        return info.toString();
    }
}
