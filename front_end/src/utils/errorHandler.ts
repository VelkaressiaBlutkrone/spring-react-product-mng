/**
 * 에러 처리 유틸리티
 */
import axios, { AxiosError } from 'axios';
import type { ApiErrorResponse } from '@/types/common.types';

/**
 * API 에러에서 사용자 친화적인 메시지 추출
 */
export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    
    // 네트워크 에러
    if (!axiosError.response) {
      if (axiosError.code === 'ECONNABORTED') {
        return '요청 시간이 초과되었습니다. 네트워크 연결을 확인해주세요.';
      }
      if (axiosError.message === 'Network Error') {
        return '네트워크 연결에 실패했습니다. 인터넷 연결을 확인해주세요.';
      }
      return '서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.';
    }

    const status = axiosError.response.status;
    const errorData = axiosError.response.data;

    // 백엔드에서 반환한 에러 메시지가 있는 경우
    if (errorData && typeof errorData === 'object' && 'message' in errorData) {
      return errorData.message as string;
    }

    // HTTP 상태 코드별 메시지
    switch (status) {
      case 400:
        return '잘못된 요청입니다. 입력 정보를 확인해주세요.';
      case 401:
        return '인증이 필요합니다. 다시 로그인해주세요.';
      case 403:
        return '접근 권한이 없습니다.';
      case 404:
        return '요청한 리소스를 찾을 수 없습니다.';
      case 409:
        return '이미 존재하는 데이터입니다.';
      case 422:
        return '입력 정보를 확인해주세요.';
      case 500:
        return '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
      case 503:
        return '서비스를 일시적으로 사용할 수 없습니다. 잠시 후 다시 시도해주세요.';
      default:
        return `오류가 발생했습니다. (${status})`;
    }
  }

  // 일반 에러
  if (error instanceof Error) {
    return error.message || '알 수 없는 오류가 발생했습니다.';
  }

  return '알 수 없는 오류가 발생했습니다.';
};

/**
 * 네트워크 에러인지 확인
 */
export const isNetworkError = (error: unknown): boolean => {
  if (axios.isAxiosError(error)) {
    return !error.response || error.code === 'ECONNABORTED' || error.message === 'Network Error';
  }
  return false;
};

/**
 * 재시도 가능한 에러인지 확인
 */
export const isRetryableError = (error: unknown): boolean => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    // 5xx 에러 또는 네트워크 에러는 재시도 가능
    return !status || (status >= 500 && status < 600) || isNetworkError(error);
  }
  return false;
};
