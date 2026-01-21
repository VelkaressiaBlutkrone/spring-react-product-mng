/**
 * 통계 페이지
 */
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getChangeLogs } from '@/services/api/changeLogApi';
import type { ChangeLogSearchCondition, ChangeType } from '@/types/changeLog.types';
import { getWeekRange, getMonthRange, getQuarterRange, getYearRange, toISOString, formatDate } from '@/utils/dateUtils';
import { EmptyState } from '@/components/common/EmptyState';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Pagination } from '@/components/common/Pagination';
import { useToast } from '@/components/common/useToast';
import { getErrorMessage } from '@/utils/errorHandler';

type PeriodType = 'week' | 'month' | 'quarter' | 'year' | 'custom';

export const StatisticsPage = () => {
  const [periodType, setPeriodType] = useState<PeriodType>('month');
  const [selectedChangeType, setSelectedChangeType] = useState<ChangeType | 'ALL'>('ALL');
  const [page, setPage] = useState(0);
  const [size] = useState(20);
  const [customStartDate, setCustomStartDate] = useState<string>('');
  const [customEndDate, setCustomEndDate] = useState<string>('');

  // 기간 계산
  const getDateRange = (): { startDate: string; endDate: string } => {
    const now = new Date();
    let range: { start: Date; end: Date };

    switch (periodType) {
      case 'week':
        range = getWeekRange(now);
        break;
      case 'month':
        range = getMonthRange(now);
        break;
      case 'quarter':
        range = getQuarterRange(now);
        break;
      case 'year':
        range = getYearRange(now);
        break;
      case 'custom':
        if (customStartDate && customEndDate) {
          return {
            startDate: new Date(customStartDate).toISOString(),
            endDate: new Date(customEndDate + 'T23:59:59').toISOString(),
          };
        }
        // 커스텀 날짜가 없으면 이번 달로 기본값
        range = getMonthRange(now);
        break;
      default:
        range = getMonthRange(now);
    }

    return {
      startDate: toISOString(range.start),
      endDate: toISOString(range.end),
    };
  };

  // 검색 조건 구성
  const searchCondition: ChangeLogSearchCondition = {
    ...getDateRange(),
    changeType: selectedChangeType !== 'ALL' ? selectedChangeType : undefined,
  };

  const { showError } = useToast();

  // 변경 이력 조회
  const { data: changeLogs, isLoading, error } = useQuery({
    queryKey: ['changeLogs', searchCondition, page, size],
    queryFn: () => getChangeLogs(searchCondition, { page, size }),
    onError: (error) => {
      showError(getErrorMessage(error));
    },
  });

  // 통계 요약 계산
  const stats = changeLogs?.content.reduce(
    (acc, log) => {
      if (log.changeType === 'CREATE') acc.createCount++;
      else if (log.changeType === 'UPDATE') acc.updateCount++;
      else if (log.changeType === 'DELETE') acc.deleteCount++;
      return acc;
    },
    { createCount: 0, updateCount: 0, deleteCount: 0 }
  ) || { createCount: 0, updateCount: 0, deleteCount: 0 };

  const changeTypeLabel = (type: ChangeType): string => {
    switch (type) {
      case 'CREATE':
        return '추가';
      case 'UPDATE':
        return '수정';
      case 'DELETE':
        return '삭제';
      default:
        return type;
    }
  };

  const changeTypeColor = (type: ChangeType): string => {
    switch (type) {
      case 'CREATE':
        return 'bg-gradient-to-r from-green-100 to-green-50 text-green-700 border border-green-200';
      case 'UPDATE':
        return 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 border border-blue-200';
      case 'DELETE':
        return 'bg-gradient-to-r from-red-100 to-red-50 text-red-700 border border-red-200';
      default:
        return 'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 border border-gray-200';
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="section-title text-2xl sm:text-3xl">통계</h1>
        <p className="text-gray-500 text-sm sm:text-base">상품 변경 이력을 확인하고 분석하세요</p>
      </div>

      {/* 기간 선택 */}
      <div className="card-imweb p-5 sm:p-6">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">기간 선택</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setPeriodType('week')}
            className={`min-h-[44px] px-4 py-2 rounded-xl transition-all duration-200 touch-manipulation ${
              periodType === 'week'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300'
            }`}
          >
            이번 주
          </button>
          <button
            onClick={() => setPeriodType('month')}
            className={`min-h-[44px] px-4 py-2 rounded-xl transition-all duration-200 touch-manipulation ${
              periodType === 'month'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300'
            }`}
          >
            이번 달
          </button>
          <button
            onClick={() => setPeriodType('quarter')}
            className={`min-h-[44px] px-4 py-2 rounded-xl transition-all duration-200 touch-manipulation ${
              periodType === 'quarter'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300'
            }`}
          >
            이번 분기
          </button>
          <button
            onClick={() => setPeriodType('year')}
            className={`min-h-[44px] px-4 py-2 rounded-xl transition-all duration-200 touch-manipulation ${
              periodType === 'year'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300'
            }`}
          >
            올해
          </button>
          <button
            onClick={() => setPeriodType('custom')}
            className={`min-h-[44px] px-4 py-2 rounded-xl transition-all duration-200 touch-manipulation ${
              periodType === 'custom'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300'
            }`}
          >
            커스텀
          </button>
        </div>

        {periodType === 'custom' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">시작일</label>
              <input
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                className="input-imweb min-h-[44px] text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">종료일</label>
              <input
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                className="input-imweb min-h-[44px] text-base"
              />
            </div>
          </div>
        )}
      </div>

      {/* 변경 타입 필터 */}
      <div className="card-imweb p-5 sm:p-6">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">변경 타입 필터</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedChangeType('ALL')}
            className={`min-h-[44px] px-4 py-2 rounded-xl transition-all duration-200 touch-manipulation ${
              selectedChangeType === 'ALL'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300'
            }`}
          >
            전체
          </button>
          <button
            onClick={() => setSelectedChangeType('CREATE')}
            className={`min-h-[44px] px-4 py-2 rounded-xl transition-all duration-200 touch-manipulation ${
              selectedChangeType === 'CREATE'
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300'
            }`}
          >
            추가
          </button>
          <button
            onClick={() => setSelectedChangeType('UPDATE')}
            className={`min-h-[44px] px-4 py-2 rounded-xl transition-all duration-200 touch-manipulation ${
              selectedChangeType === 'UPDATE'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300'
            }`}
          >
            수정
          </button>
          <button
            onClick={() => setSelectedChangeType('DELETE')}
            className={`min-h-[44px] px-4 py-2 rounded-xl transition-all duration-200 touch-manipulation ${
              selectedChangeType === 'DELETE'
                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300'
            }`}
          >
            삭제
          </button>
        </div>
      </div>

      {/* 통계 요약 카드 - Materio 스타일 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {/* 추가 건수 카드 */}
        <div className="stat-card-materio bg-gradient-to-br from-green-50 via-green-50/50 to-white before:bg-green-500">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-green-100">
              <span className="text-2xl">✅</span>
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">추가</span>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">총 추가 건수</h3>
            <p className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">{stats.createCount}</p>
            <p className="text-xs text-gray-500">상품 생성</p>
          </div>
        </div>

        {/* 수정 건수 카드 */}
        <div className="stat-card-materio bg-gradient-to-br from-blue-50 via-blue-50/50 to-white before:bg-blue-500">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100">
              <span className="text-2xl">✏️</span>
            </div>
            <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">수정</span>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">총 수정 건수</h3>
            <p className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">{stats.updateCount}</p>
            <p className="text-xs text-gray-500">정보 변경</p>
          </div>
        </div>

        {/* 삭제 건수 카드 */}
        <div className="stat-card-materio sm:col-span-2 md:col-span-1 bg-gradient-to-br from-red-50 via-red-50/50 to-white before:bg-red-500">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-100">
              <span className="text-2xl">🗑️</span>
            </div>
            <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded-full">삭제</span>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">총 삭제 건수</h3>
            <p className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">{stats.deleteCount}</p>
            <p className="text-xs text-gray-500">상품 삭제</p>
          </div>
        </div>
      </div>

      {/* 변경 이력 목록 */}
      <div className="card-imweb">
        <div className="p-5 sm:p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">변경 이력 목록</h2>
        </div>
        <div className="p-5 sm:p-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <LoadingSpinner message="로딩 중..." />
            </div>
          ) : error ? (
            <EmptyState
              title="데이터를 불러올 수 없습니다"
              message="변경 이력을 불러오는 중 오류가 발생했습니다."
            />
          ) : changeLogs && changeLogs.content.length > 0 ? (
            <>
              <div className="space-y-4">
                {changeLogs.content.map((log) => (
                  <div
                    key={log.changeLogId}
                    className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50 hover:border-gray-200 transition-all duration-200"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`badge-imweb ${changeTypeColor(log.changeType)}`}>
                            {changeTypeLabel(log.changeType)}
                          </span>
                          <span className="font-semibold text-gray-900">{log.productName}</span>
                          <span className="text-sm text-gray-500">({log.productCode})</span>
                        </div>
                        {log.changedField && (
                          <div className="text-sm text-gray-600 mt-1">
                            <span className="font-medium">{log.changedField}:</span>{' '}
                            {log.oldValue && <span className="text-red-600 line-through">{log.oldValue}</span>}
                            {log.oldValue && log.newValue && <span className="mx-2">→</span>}
                            {log.newValue && <span className="text-green-600">{log.newValue}</span>}
                          </div>
                        )}
                        <div className="text-xs text-gray-500 mt-2">
                          {formatDate(log.changedDate, 'YYYY-MM-DD HH:mm:ss')}
                          {log.changedBy && ` · ${log.changedBy}`}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Pagination
                currentPage={page}
                totalPages={changeLogs.totalPages}
                totalElements={changeLogs.totalElements}
                onPageChange={setPage}
              />
            </>
          ) : (
            <EmptyState
              title="변경 이력이 없습니다"
              message="선택한 기간 동안 변경 이력이 없습니다."
            />
          )}
        </div>
      </div>
    </div>
  );
};
