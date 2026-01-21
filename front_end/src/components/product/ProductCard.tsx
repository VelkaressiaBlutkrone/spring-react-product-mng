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
      className="card-imweb p-5 sm:p-6 cursor-pointer active:scale-[0.98] touch-manipulation"
      onClick={handleClick}
    >
      <div className="flex justify-between items-start mb-3 gap-2">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex-1 break-words">{product.productName}</h3>
        <span className={`badge-imweb flex-shrink-0 ${
          product.status === 'ACTIVE' 
            ? 'bg-gradient-to-r from-green-100 to-green-50 text-green-700 border border-green-200' 
            : 'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 border border-gray-200'
        }`}>
          {product.status}
        </span>
      </div>
      
      <p className="text-sm text-gray-600 mb-2 break-words">상품코드: {product.productCode}</p>
      
      {product.categoryName && (
        <p className="text-sm text-gray-600 mb-2 break-words">카테고리: {product.categoryName}</p>
      )}
      
      {product.description && (
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 break-words">{product.description}</p>
      )}
      
      <div className="flex justify-between items-center mt-4 gap-2">
        <span className="text-base sm:text-lg font-bold text-blue-600">
          {formatPrice(0)}
        </span>
        {product.createdDate && (
          <span className="text-xs text-gray-500 whitespace-nowrap">
            {formatDate(product.createdDate, 'YYYY-MM-DD')}
          </span>
        )}
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';
