/**
 * 상품 폼 컴포넌트 - 상품 추가/수정용
 */
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { ProductRequest, ProductResponse } from '@/types/product.types';
import { ProductStatus } from '@/types/product.types';

// 상품 폼 스키마
const productFormSchema = z.object({
  productCode: z.string().min(1, '상품코드는 필수입니다'),
  productName: z.string().min(1, '상품명은 필수입니다'),
  description: z.string().optional(),
  categoryId: z.number().optional(),
  status: z.nativeEnum(ProductStatus).optional(),
});

type ProductFormData = z.infer<typeof productFormSchema>;

interface ProductFormProps {
  product?: ProductResponse;
  onSubmit: (data: ProductRequest) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export const ProductForm = ({ product, onSubmit, onCancel, isLoading }: ProductFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: product
      ? {
          productCode: product.productCode,
          productName: product.productName,
          description: product.description || '',
          categoryId: product.categoryId,
          status: product.status,
        }
      : {
          status: ProductStatus.ACTIVE,
        },
  });

  const handleFormSubmit = async (data: ProductFormData) => {
    await onSubmit(data as ProductRequest);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          상품코드 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register('productCode')}
          disabled={!!product} // 수정 시 상품코드 변경 불가
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.productCode ? 'border-red-500' : 'border-gray-300'
          } ${product ? 'bg-gray-100' : ''}`}
          placeholder="상품코드를 입력하세요"
        />
        {errors.productCode && (
          <p className="mt-1 text-sm text-red-600">{errors.productCode.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          상품명 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register('productName')}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.productName ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="상품명을 입력하세요"
        />
        {errors.productName && (
          <p className="mt-1 text-sm text-red-600">{errors.productName.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
        <textarea
          {...register('description')}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="상품 설명을 입력하세요"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
        <select
          {...register('status')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={ProductStatus.ACTIVE}>활성</option>
          <option value={ProductStatus.INACTIVE}>비활성</option>
          <option value={ProductStatus.DELETED}>삭제됨</option>
        </select>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          disabled={isLoading}
        >
          취소
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? '처리 중...' : product ? '수정' : '등록'}
        </button>
      </div>
    </form>
  );
};
