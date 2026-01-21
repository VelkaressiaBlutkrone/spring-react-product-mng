/**
 * 날짜/시간 관련 유틸리티 함수
 */

/**
 * 날짜를 지정된 형식으로 포맷팅
 * @param date 날짜 (Date 객체 또는 ISO 문자열)
 * @param format 포맷 형식 (YYYY-MM-DD, YYYY-MM-DD HH:mm:ss 등)
 * @returns 포맷된 날짜 문자열
 */
export const formatDate = (date: Date | string | null | undefined, format: string = 'YYYY-MM-DD'): string => {
  if (!date) return '';
  
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(d.getTime())) return '';
  
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  
  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
};

/**
 * 상대 시간 표시 (예: "3일 전", "1시간 전")
 * @param date 날짜
 * @returns 상대 시간 문자열
 */
export const getRelativeTime = (date: Date | string | null | undefined): string => {
  if (!date) return '';
  
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return '';
  
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffSeconds < 60) return '방금 전';
  if (diffMinutes < 60) return `${diffMinutes}분 전`;
  if (diffHours < 24) return `${diffHours}시간 전`;
  if (diffDays < 7) return `${diffDays}일 전`;
  
  return formatDate(d, 'YYYY-MM-DD');
};

/**
 * 오늘인지 확인
 */
export const isToday = (date: Date | string | null | undefined): boolean => {
  if (!date) return false;
  
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return false;
  
  const today = new Date();
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
};

/**
 * 주간 시작일과 종료일 반환
 */
export const getWeekRange = (date: Date = new Date()): { start: Date; end: Date } => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day; // 일요일로 이동
  
  const start = new Date(d.setDate(diff));
  start.setHours(0, 0, 0, 0);
  
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  
  return { start, end };
};

/**
 * 월간 시작일과 종료일 반환
 */
export const getMonthRange = (date: Date = new Date()): { start: Date; end: Date } => {
  const d = new Date(date);
  
  const start = new Date(d.getFullYear(), d.getMonth(), 1);
  start.setHours(0, 0, 0, 0);
  
  const end = new Date(d.getFullYear(), d.getMonth() + 1, 0);
  end.setHours(23, 59, 59, 999);
  
  return { start, end };
};
