/**
 * 상품 API 서비스
 */
import axios from 'axios';
import { ProductRequest, ProductResponse, PagedProductResponse, ProductSearchCondition } from '../../types/product.types';
import { PaginationParams } from '../../types/common.types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 상품 목록 조회 (검색, 페이징)
 */
export const getProducts = async (
  searchCondition: ProductSearchCondition,
  pagination: PaginationParams
): Promise<PagedProductResponse> => {
  const params = new URLSearchParams();
  
  if (searchCondition.productName) {
    params.append('productName', searchCondition.productName);
  }
  if (searchCondition.productCode) {
    params.append('productCode', searchCondition.productCode);
  }
  if (searchCondition.minPrice !== undefined) {
    params.append('minPrice', searchCondition.minPrice.toString());
  }
  if (searchCondition.maxPrice !== undefined) {
    params.append('maxPrice', searchCondition.maxPrice.toString());
  }
  
  params.append('page', pagination.page.toString());
  params.append('size', pagination.size.toString());

  const response = await apiClient.get<PagedProductResponse>(`/api/products?${params.toString()}`);
  return response.data;
};

/**
 * 상품 상세 조회
 */
export const getProduct = async (productId: number): Promise<ProductResponse> => {
  const response = await apiClient.get<ProductResponse>(`/api/products/${productId}`);
  return response.data;
};

/**
 * 상품 추가
 */
export const createProduct = async (product: ProductRequest): Promise<ProductResponse> => {
  const response = await apiClient.post<ProductResponse>('/api/products', product);
  return response.data;
};

/**
 * 상품 수정
 */
export const updateProduct = async (productId: number, product: ProductRequest): Promise<ProductResponse> => {
  const response = await apiClient.put<ProductResponse>(`/api/products/${productId}`, product);
  return response.data;
};

/**
 * 상품 삭제
 */
export const deleteProduct = async (productId: number): Promise<void> => {
  await apiClient.delete(`/api/products/${productId}`);
};
