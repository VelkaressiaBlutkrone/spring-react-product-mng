/**
 * 상품 목록 페이지
 */
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../services/api/productApi';
import { ProductSearchCondition } from '../types/product.types';
import { ProductCard } from '../components/product/ProductCard';
import { ProductSearch } from '../components/product/ProductSearch';
import { Pagination } from '../components/common/Pagination';

export const ProductListPage = () => {
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [searchCondition, setSearchCondition] = useState<ProductSearchCondition>({});

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', page, size, searchCondition],
    queryFn: () => getProducts(searchCondition, { page, size }),
  });

  const handleSearch = (condition: ProductSearchCondition) => {
    setSearchCondition(condition);
    setPage(0); // 검색 시 첫 페이지로
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-600">에러가 발생했습니다.</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">상품 목록</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          새로 추가
        </button>
      </div>

      <ProductSearch onSearch={handleSearch} />

      {data && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {data.content.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </div>

          {data.content.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              상품이 없습니다.
            </div>
          )}

          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            totalElements={data.totalElements}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};
