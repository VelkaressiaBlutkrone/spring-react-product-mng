/**
 * 상품 카드 컴포넌트
 */
import { memo } from 'react';
import type { ProductResponse } from '@/types/product.types';
import { formatPrice } from '@/utils/formatters';
import { formatDate } from '@/utils/dateUtils';

interface ProductCardProps {
  product: ProductResponse;
  onClick?: (product: ProductResponse) => void;
}

export const ProductCard = memo(({ product, onClick }: ProductCardProps) => {
  const handleClick = () => {
    onClick?.(product);
  };

  return (
    <div
      className="card-imweb p-5 sm:p-6 cursor-pointer active:scale-[0.98] touch-manipulation group"
      onClick={handleClick}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
          product.status === 'ACTIVE' 
            ? 'bg-green-100 text-green-600' 
            : 'bg-gray-100 text-gray-600'
        }`}>
          <span className="text-lg">📦</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2 mb-1">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 break-words group-hover:text-blue-600 transition-colors">
              {product.productName}
            </h3>
            <span className={`badge-imweb flex-shrink-0 ${
              product.status === 'ACTIVE' 
                ? 'bg-gradient-to-r from-green-100 to-green-50 text-green-700 border border-green-200' 
                : 'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 border border-gray-200'
            }`}>
              {product.status}
            </span>
          </div>
          <p className="text-sm text-gray-600 break-words">상품코드: {product.productCode}</p>
        </div>
      </div>
      
      {product.categoryName && (
        <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
          <span className="text-xs">🏷️</span>
          <span className="break-words">카테고리: {product.categoryName}</span>
        </div>
      )}
      
      {product.description && (
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 break-words pl-[52px]">{product.description}</p>
      )}
      
      <div className="flex justify-between items-center pt-3 border-t border-gray-100 gap-2">
        <div className="flex items-center gap-2">
          <span className="text-base sm:text-lg font-bold text-blue-600">
            {formatPrice(0)}
          </span>
        </div>
        {product.createdDate && (
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span>📅</span>
            <span className="whitespace-nowrap">{formatDate(product.createdDate, 'YYYY-MM-DD')}</span>
          </div>
        )}
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';
