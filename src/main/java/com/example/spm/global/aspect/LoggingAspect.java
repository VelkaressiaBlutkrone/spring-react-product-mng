package com.example.spm.global.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import com.example.spm.global.annotation.Logging;
import com.google.gson.Gson;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.stream.Collectors;

/**
 * 로깅 AOP - 메서드 실행 전후 로깅 처리
 */
@Slf4j
@Aspect
@Component
@RequiredArgsConstructor
public class LoggingAspect {

    // Gson을 사용한 JSON 직렬화
    private final Gson gson;

    /**
     * @Logging 어노테이션이 있는 메서드에 대한 로깅 처리
     */
    @Around("@annotation(logging)")
    public Object logMethod(ProceedingJoinPoint joinPoint, Logging logging) throws Throwable {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();
        String className = joinPoint.getTarget().getClass().getSimpleName();
        String methodName = method.getName();
        Object[] args = joinPoint.getArgs();

        long startTime = System.currentTimeMillis();
        Object result = null;
        Throwable exception = null;

        try {
            // 메서드 실행 전 로깅
            logMethodStart(className, methodName, args, logging);

            // 메서드 실행
            result = joinPoint.proceed();

            // 메서드 실행 후 로깅
            long executionTime = System.currentTimeMillis() - startTime;
            logMethodEnd(className, methodName, result, executionTime, logging);

            return result;
        } catch (Throwable e) {
            exception = e;
            long executionTime = System.currentTimeMillis() - startTime;
            logMethodError(className, methodName, e, executionTime, logging);
            throw e;
        }
    }

    /**
     * 메서드 시작 로깅
     */
    private void logMethodStart(String className, String methodName, Object[] args, Logging logging) {
        if (logging.logParams()) {
            String params = formatParameters(args);
            logMessage(logging.level(), "[{}] 메서드 시작 - {}#{} - 파라미터: {}", 
                    className, className, methodName, params);
        } else {
            logMessage(logging.level(), "[{}] 메서드 시작 - {}#{}", className, className, methodName);
        }
    }

    /**
     * 메서드 종료 로깅
     */
    private void logMethodEnd(String className, String methodName, Object result, 
                              long executionTime, Logging logging) {
        String message = String.format("[%s] 메서드 완료 - %s#%s", className, className, methodName);
        
        if (logging.logExecutionTime()) {
            message += String.format(" - 실행 시간: %dms", executionTime);
        }
        
        if (logging.logResult() && result != null) {
            try {
                String resultStr = gson.toJson(result);
                // 결과가 너무 길면 잘라서 표시
                if (resultStr.length() > 500) {
                    resultStr = resultStr.substring(0, 500) + "... (truncated)";
                }
                message += String.format(" - 결과: %s", resultStr);
            } catch (Exception e) {
                message += String.format(" - 결과: %s", result.toString());
            }
        }
        
        logMessage(logging.level(), message);
    }

    /**
     * 메서드 에러 로깅
     */
    private void logMethodError(String className, String methodName, Throwable exception, 
                                long executionTime, Logging logging) {
        String message = String.format("[%s] 메서드 실패 - %s#%s - 예외: %s - 실행 시간: %dms",
                className, className, methodName, exception.getClass().getSimpleName(), executionTime);
        
        log.error(message, exception);
    }

    /**
     * 파라미터 포맷팅
     */
    private String formatParameters(Object[] args) {
        if (args == null || args.length == 0) {
            return "없음";
        }

        return Arrays.stream(args)
                .map(arg -> {
                    if (arg == null) {
                        return "null";
                    }
                    try {
                        String str = gson.toJson(arg);
                        // 너무 길면 잘라서 표시
                        if (str.length() > 200) {
                            return str.substring(0, 200) + "... (truncated)";
                        }
                        return str;
                    } catch (Exception e) {
                        return arg.toString();
                    }
                })
                .collect(Collectors.joining(", ", "[", "]"));
    }

    /**
     * 로그 레벨에 따라 메시지 출력
     */
    private void logMessage(Logging.LogLevel level, String format, Object... args) {
        switch (level) {
            case DEBUG -> log.debug(format, args);
            case INFO -> log.info(format, args);
            case WARN -> log.warn(format, args);
            case ERROR -> log.error(format, args);
        }
    }
}
