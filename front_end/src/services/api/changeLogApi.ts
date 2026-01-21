/**
 * 변경 이력 API 서비스
 */
import axios from 'axios';
import type { ChangeLogSearchCondition, PagedChangeLogResponse } from '@/types/changeLog.types';
import type { PaginationParams } from '@/types/common.types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 변경 이력 목록 조회
 */
export const getChangeLogs = async (
  searchCondition: ChangeLogSearchCondition,
  pagination: PaginationParams
): Promise<PagedChangeLogResponse> => {
  const params = new URLSearchParams();
  
  if (searchCondition.productId !== undefined) {
    params.append('productId', searchCondition.productId.toString());
  }
  if (searchCondition.changeType) {
    params.append('changeType', searchCondition.changeType);
  }
  if (searchCondition.startDate) {
    params.append('startDate', searchCondition.startDate);
  }
  if (searchCondition.endDate) {
    params.append('endDate', searchCondition.endDate);
  }
  
  params.append('page', pagination.page.toString());
  params.append('size', pagination.size.toString());

  const response = await apiClient.get<PagedChangeLogResponse>(`/api/change-logs?${params.toString()}`);
  return response.data;
};

/**
 * 최근 변경 이력 조회
 */
export const getRecentChangeLogs = async (
  startDate: string,
  pagination: PaginationParams
): Promise<PagedChangeLogResponse> => {
  const params = new URLSearchParams();
  params.append('startDate', startDate);
  params.append('page', pagination.page.toString());
  params.append('size', pagination.size.toString());

  const response = await apiClient.get<PagedChangeLogResponse>(`/api/change-logs/recent?${params.toString()}`);
  return response.data;
};
