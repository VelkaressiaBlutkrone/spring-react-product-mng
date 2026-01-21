/**
 * 공통 TypeScript 타입 정의
 */

// API 응답 기본 구조
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// API 에러 응답
export interface ApiErrorResponse {
  errorCode: string;
  message: string;
  timestamp?: string;
  path?: string;
}

// 페이지 정보
export interface PaginationParams {
  page: number;
  size: number;
}

// 정렬 정보
export interface SortParams {
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
}
