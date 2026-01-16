package com.example.spm.exception;

public class BusinessException extends RuntimeException {

    /** 에러 코드 */
    private final ErrorCode errorCode;

    /**
     * 에러 코드만으로 예외를 생성합니다.
     *
     * @param errorCode 에러 코드 (ErrorCode enum)
     */
    public BusinessException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

    /**
     * 에러 코드와 추가 메시지로 예외를 생성합니다.
     *
     * @param errorCode 에러 코드 (ErrorCode enum)
     * @param message   추가 상세 메시지
     */
    public BusinessException(ErrorCode errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }

    /**
     * 에러 코드를 반환합니다.
     *
     * @return ErrorCode enum
     */
    public ErrorCode getErrorCode() {
        return errorCode;
    }
}
