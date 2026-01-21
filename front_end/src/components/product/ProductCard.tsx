/**
 * 상품 카드 컴포넌트
 */
import { ProductResponse } from '../../types/product.types';
import { formatPrice } from '../../utils/formatters';
import { formatDate } from '../../utils/dateUtils';

interface ProductCardProps {
  product: ProductResponse;
  onClick?: (product: ProductResponse) => void;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onClick && onClick(product)}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900">{product.productName}</h3>
        <span className={`px-2 py-1 text-xs rounded ${
          product.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {product.status}
        </span>
      </div>
      
      <p className="text-sm text-gray-600 mb-2">상품코드: {product.productCode}</p>
      
      {product.categoryName && (
        <p className="text-sm text-gray-600 mb-2">카테고리: {product.categoryName}</p>
      )}
      
      {product.description && (
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description}</p>
      )}
      
      <div className="flex justify-between items-center mt-4">
        <span className="text-lg font-bold text-blue-600">
          {formatPrice(0)}
        </span>
        {product.createdDate && (
          <span className="text-xs text-gray-500">
            {formatDate(product.createdDate, 'YYYY-MM-DD')}
          </span>
        )}
      </div>
    </div>
  );
};
