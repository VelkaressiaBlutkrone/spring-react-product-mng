/**
 * 데이터 포맷팅 유틸리티 함수
 */

/**
 * 숫자를 천단위 콤마가 포함된 문자열로 변환
 * @param value 숫자
 * @returns 포맷된 문자열
 */
export const formatNumber = (value: number | string | null | undefined): string => {
  if (value === null || value === undefined || value === '') return '0';
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return '0';
  return num.toLocaleString('ko-KR');
};

/**
 * 가격을 원화 형식으로 포맷팅
 * @param price 가격
 * @returns 포맷된 가격 문자열
 */
export const formatPrice = (price: number | string | null | undefined): string => {
  if (price === null || price === undefined || price === '') return '0원';
  const num = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(num)) return '0원';
  return `${formatNumber(num)}원`;
};

/**
 * 텍스트를 지정된 길이로 자르고 말줄임표 추가
 * @param text 텍스트
 * @param maxLength 최대 길이
 * @returns 잘린 텍스트
 */
export const truncateText = (text: string | null | undefined, maxLength: number = 50): string => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};
