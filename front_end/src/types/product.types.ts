/**
 * 상품 관련 TypeScript 타입 정의
 */

// 상품 상태 열거형
export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED',
}

// 카테고리 정보
export interface Category {
  categoryId: number;
  categoryName: string;
  parent?: Category;
  depth?: number;
  sortOrder?: number;
}

// 상품 기본 정보
export interface Product {
  productId: number;
  productCode: string;
  productName: string;
  description?: string;
  categoryId?: number;
  categoryName?: string;
  status: ProductStatus;
  createdDate?: string;
  lastModifiedDate?: string;
}

// 상품 추가/수정 요청 DTO
export interface ProductRequest {
  productCode: string;
  productName: string;
  description?: string;
  categoryId?: number;
  status?: ProductStatus;
}

// 상품 응답 DTO
export interface ProductResponse {
  productId: number;
  productCode: string;
  productName: string;
  description?: string;
  categoryId?: number;
  categoryName?: string;
  status: ProductStatus;
  createdDate?: string;
  lastModifiedDate?: string;
}

// 상품 검색 조건
export interface ProductSearchCondition {
  productName?: string;
  productCode?: string;
  minPrice?: number;
  maxPrice?: number;
  categoryId?: number;
  status?: ProductStatus;
}

// 페이징 정보
export interface PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

// 페이징된 상품 목록 응답
export interface PagedProductResponse {
  content: ProductResponse[];
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  numberOfElements: number;
}
