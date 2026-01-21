/**
 * 변경 이력 관련 타입 정의
 */

/**
 * 변경 타입 (CREATE, UPDATE, DELETE)
 */
export enum ChangeType {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

/**
 * 변경 이력 응답 타입
 */
export interface ChangeLogResponse {
  changeLogId: number;
  productId: number;
  productCode: string;
  productName: string;
  changeType: ChangeType;
  changedField: string | null;
  oldValue: string | null;
  newValue: string | null;
  changedBy: string | null;
  changedDate: string; // ISO 8601 형식 (예: "2024-01-15T10:30:00")
}

/**
 * 변경 이력 검색 조건
 */
export interface ChangeLogSearchCondition {
  productId?: number;
  changeType?: ChangeType;
  startDate?: string; // ISO 8601 형식
  endDate?: string; // ISO 8601 형식
}

/**
 * 변경 이력 페이징 응답
 */
export interface PagedChangeLogResponse {
  content: ChangeLogResponse[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}
