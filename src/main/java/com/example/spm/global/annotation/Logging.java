package com.example.spm.global.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 로깅 어노테이션 - 메서드 실행 전후 로깅
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Logging {
    
    /**
     * 로깅 레벨 (기본값: INFO)
     */
    LogLevel level() default LogLevel.INFO;
    
    /**
     * 요청 파라미터 로깅 여부 (기본값: true)
     */
    boolean logParams() default true;
    
    /**
     * 응답 결과 로깅 여부 (기본값: true)
     */
    boolean logResult() default true;
    
    /**
     * 실행 시간 로깅 여부 (기본값: true)
     */
    boolean logExecutionTime() default true;

    /**
     * 로깅 레벨 열거형
     */
    enum LogLevel {
        DEBUG, INFO, WARN, ERROR
    }
}
