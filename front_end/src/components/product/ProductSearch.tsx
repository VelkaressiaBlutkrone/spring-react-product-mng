/**
 * 상품 검색 컴포넌트
 */
import { useState } from 'react';
import { ProductSearchCondition } from '../../types/product.types';

interface ProductSearchProps {
  onSearch: (condition: ProductSearchCondition) => void;
}

export const ProductSearch = ({ onSearch }: ProductSearchProps) => {
  const [productName, setProductName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      productName: productName || undefined,
      productCode: productCode || undefined,
      minPrice,
      maxPrice,
    });
  };

  const handleReset = () => {
    setProductName('');
    setProductCode('');
    setMinPrice(undefined);
    setMaxPrice(undefined);
    onSearch({});
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">상품명</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="상품명 입력"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">상품코드</label>
          <input
            type="text"
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="상품코드 입력"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">최소 가격</label>
          <input
            type="number"
            value={minPrice || ''}
            onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="최소 가격"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">최대 가격</label>
          <input
            type="number"
            value={maxPrice || ''}
            onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="최대 가격"
          />
        </div>
      </div>
      
      <div className="flex justify-end gap-2 mt-4">
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          초기화
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          검색
        </button>
      </div>
    </form>
  );
};
