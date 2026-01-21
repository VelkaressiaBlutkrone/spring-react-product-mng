/**
 * 메인 페이지 - 대시보드
 */
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getProducts } from '@/services/api/productApi';
import { formatDate, getRelativeTime } from '@/utils/dateUtils';
import { EmptyState } from '@/components/common/EmptyState';

export const HomePage = () => {
  // 최근 추가된 상품 조회 (최근 10개)
  const { data: recentProducts, isLoading, error } = useQuery({
    queryKey: ['products', 0, 10, {}],
    queryFn: () => getProducts({}, { page: 0, size: 10 }),
  });

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="section-title text-2xl sm:text-3xl">대시보드</h1>
        <p className="text-gray-500 text-sm sm:text-base">상품 관리 현황을 한눈에 확인하세요</p>
      </div>

      {/* 대시보드 위젯 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="card-imweb p-5 sm:p-6 bg-gradient-to-br from-blue-50 to-white">
          <h3 className="text-sm font-medium text-gray-600 mb-3">전체 상품 수</h3>
          <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
            {recentProducts?.totalElements || 0}
          </p>
        </div>
        <div className="card-imweb p-5 sm:p-6 bg-gradient-to-br from-green-50 to-white">
          <h3 className="text-sm font-medium text-gray-600 mb-3">오늘 추가된 상품</h3>
          <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">-</p>
          <p className="text-xs text-gray-400 mt-2">(변경 이력 기능 구현 필요)</p>
        </div>
        <div className="card-imweb p-5 sm:p-6 sm:col-span-2 md:col-span-1 bg-gradient-to-br from-purple-50 to-white">
          <h3 className="text-sm font-medium text-gray-600 mb-3">이번 주 변경된 상품</h3>
          <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">-</p>
          <p className="text-xs text-gray-400 mt-2">(변경 이력 기능 구현 필요)</p>
        </div>
      </div>

      {/* 최근 추가된 항목 */}
      <div className="card-imweb">
        <div className="p-5 sm:p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">최근 추가된 항목</h2>
            <Link
              to="/products"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 transition-colors"
            >
              전체 보기 <span>→</span>
            </Link>
          </div>
        </div>
        <div className="p-5 sm:p-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-gray-500">로딩 중...</div>
            </div>
          ) : error ? (
            <EmptyState
              title="데이터를 불러올 수 없습니다"
              message="상품 목록을 불러오는 중 오류가 발생했습니다."
            />
          ) : recentProducts && recentProducts.content.length > 0 ? (
            <div className="space-y-3">
              {recentProducts.content.slice(0, 5).map((product) => (
                <Link
                  key={product.productId}
                  to={`/products`}
                  className="block p-4 border border-gray-100 rounded-xl hover:bg-gray-50 hover:border-gray-200 hover:shadow-sm transition-all duration-200"
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
            <EmptyState
              title="등록된 상품이 없습니다"
              message="아직 등록된 상품이 없습니다. 첫 상품을 추가해보세요."
              action={
                <Link
                  to="/products"
                  className="btn-primary-imweb touch-manipulation"
                >
                  상품 추가하기
                </Link>
              }
            />
          )}
        </div>
      </div>

      {/* 변경 이력 정보 */}
      <div className="card-imweb">
        <div className="p-5 sm:p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">최근 변경 이력</h2>
        </div>
        <div className="p-5 sm:p-6">
          <EmptyState
            title="변경 이력이 없습니다"
            message="상품을 추가하거나 수정하면 변경 이력이 표시됩니다."
          />
        </div>
      </div>

      {/* 빠른 액션 */}
      <div className="card-imweb p-5 sm:p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-5">빠른 액션</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/products"
            className="flex items-center justify-center p-5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all duration-300 group"
          >
            <span className="text-blue-600 font-medium group-hover:text-blue-700">상품 목록</span>
          </Link>
          <Link
            to="/statistics"
            className="flex items-center justify-center p-5 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:from-green-100 hover:to-green-200 transition-all duration-300 group"
          >
            <span className="text-green-600 font-medium group-hover:text-green-700">통계 보기</span>
          </Link>
          <Link
            to="/about"
            className="flex items-center justify-center p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:from-gray-100 hover:to-gray-200 transition-all duration-300 group"
          >
            <span className="text-gray-600 font-medium group-hover:text-gray-700">About</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
