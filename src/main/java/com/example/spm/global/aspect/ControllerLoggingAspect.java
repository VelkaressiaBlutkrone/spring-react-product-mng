package com.example.spm.global.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Controller 레이어 요청/응답 로깅 AOP
 */
@Slf4j
@Aspect
@Component
public class ControllerLoggingAspect {

    /**
     * Controller 패키지의 모든 public 메서드에 대한 Pointcut
     */
    @Pointcut("execution(public * com.example.spm.domain.controller..*(..))")
    public void controllerMethods() {}

    /**
     * Controller 메서드 실행 전후 - 요청/응답 정보 로깅
     */
    @Around("controllerMethods()")
    public Object logRequestResponse(ProceedingJoinPoint joinPoint) throws Throwable {
        ServletRequestAttributes attributes = 
                (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        
        if (attributes == null) {
            return joinPoint.proceed();
        }
        
        HttpServletRequest request = attributes.getRequest();
        String className = joinPoint.getTarget().getClass().getSimpleName();
        String methodName = joinPoint.getSignature().getName();
        String httpMethod = request.getMethod();
        String requestURI = request.getRequestURI();
        String queryString = request.getQueryString();
        String clientIP = getClientIP(request);
        
        // 요청 파라미터
        Map<String, String[]> parameterMap = request.getParameterMap();
        String params = parameterMap.entrySet().stream()
                .map(entry -> entry.getKey() + "=" + Arrays.toString(entry.getValue()))
                .collect(Collectors.joining(", "));

        long startTime = System.currentTimeMillis();
        
        // 요청 로깅
        log.info("[요청] {} {} - {}#{} - IP: {} - 파라미터: {}",
                httpMethod, requestURI + (queryString != null ? "?" + queryString : ""),
                className, methodName, clientIP, params.isEmpty() ? "없음" : params);
        
        try {
            // 메서드 실행
            Object result = joinPoint.proceed();
            
            long executionTime = System.currentTimeMillis() - startTime;
            
            // 응답 로깅
            String resultStr = result != null ? result.toString() : "null";
            if (resultStr.length() > 300) {
                resultStr = resultStr.substring(0, 300) + "... (truncated)";
            }
            
            log.info("[응답] {}#{} - 실행 시간: {}ms - 결과: {}", 
                    className, methodName, executionTime, resultStr);
            
            return result;
        } catch (Throwable e) {
            long executionTime = System.currentTimeMillis() - startTime;
            log.error("[예외] {}#{} - 실행 시간: {}ms - 예외: {}", 
                    className, methodName, executionTime, e.getClass().getSimpleName(), e);
            throw e;
        }
    }

    /**
     * 클라이언트 IP 주소 추출
     */
    private String getClientIP(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip;
    }
}
