/**
 * 메인 페이지 - 대시보드
 */
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api/productApi';
import { formatDate, getRelativeTime } from '../utils/dateUtils';

export const HomePage = () => {
  // 최근 추가된 상품 조회 (최근 10개)
  const { data: recentProducts } = useQuery({
    queryKey: ['products', 0, 10, {}],
    queryFn: () => getProducts({}, { page: 0, size: 10 }),
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">대시보드</h1>

      {/* 대시보드 위젯 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">전체 상품 수</h3>
          <p className="text-3xl font-bold text-gray-900">
            {recentProducts?.totalElements || 0}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">오늘 추가된 상품</h3>
          <p className="text-3xl font-bold text-gray-900">-</p>
          <p className="text-xs text-gray-500 mt-1">(변경 이력 기능 구현 필요)</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">이번 주 변경된 상품</h3>
          <p className="text-3xl font-bold text-gray-900">-</p>
          <p className="text-xs text-gray-500 mt-1">(변경 이력 기능 구현 필요)</p>
        </div>
      </div>

      {/* 최근 추가된 항목 */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">최근 추가된 항목</h2>
            <Link
              to="/products"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              전체 보기 →
            </Link>
          </div>
        </div>
        <div className="p-6">
          {recentProducts && recentProducts.content.length > 0 ? (
            <div className="space-y-4">
              {recentProducts.content.slice(0, 5).map((product) => (
                <Link
                  key={product.productId}
                  to={`/products`}
                  className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{product.productName}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        상품코드: {product.productCode}
                      </p>
                      {product.createdDate && (
                        <p className="text-xs text-gray-500 mt-1">
                          {getRelativeTime(product.createdDate)}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">등록된 상품이 없습니다.</p>
          )}
        </div>
      </div>

      {/* 변경 이력 정보 */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">최근 변경 이력</h2>
        </div>
        <div className="p-6">
          <p className="text-gray-500 text-center py-8">
            변경 이력 기능은 4단계에서 구현 예정입니다.
          </p>
        </div>
      </div>

      {/* 빠른 액션 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">빠른 액션</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/products"
            className="flex items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <span className="text-blue-600 font-medium">상품 목록</span>
          </Link>
          <Link
            to="/statistics"
            className="flex items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <span className="text-green-600 font-medium">통계 보기</span>
          </Link>
          <Link
            to="/about"
            className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="text-gray-600 font-medium">About</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
