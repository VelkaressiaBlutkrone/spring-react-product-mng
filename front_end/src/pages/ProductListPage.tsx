/**
 * 상품 목록 페이지
 */
import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProducts, createProduct, updateProduct, deleteProduct, getProduct } from '@/services/api/productApi';
import type { ProductSearchCondition, ProductRequest, ProductResponse } from '@/types/product.types';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductSearch } from '@/components/product/ProductSearch';
import { Pagination } from '@/components/common/Pagination';
import { ProductForm } from '@/components/product/ProductForm';
import { Modal } from '@/components/common/Modal';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { EmptyState } from '@/components/common/EmptyState';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { useToast } from '@/components/common/ToastContainer';
import { getErrorMessage } from '@/utils/errorHandler';

export const ProductListPage = () => {
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [searchCondition, setSearchCondition] = useState<ProductSearchCondition>({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductResponse | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<number | null>(null);

  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast();

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', page, size, searchCondition],
    queryFn: () => getProducts(searchCondition, { page, size }),
    onError: (error) => {
      showError(getErrorMessage(error));
    },
  });

  // 상품 추가 Mutation
  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setIsAddModalOpen(false);
      showSuccess('상품이 성공적으로 추가되었습니다.');
    },
    onError: (error) => {
      showError(getErrorMessage(error));
    },
  });

  // 상품 수정 Mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ProductRequest }) =>
      updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setEditingProduct(null);
      showSuccess('상품이 성공적으로 수정되었습니다.');
    },
    onError: (error) => {
      showError(getErrorMessage(error));
    },
  });

  // 상품 삭제 Mutation
  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setDeletingProductId(null);
      showSuccess('상품이 성공적으로 삭제되었습니다.');
    },
    onError: (error) => {
      showError(getErrorMessage(error));
    },
  });

  const handleSearch = useCallback((condition: ProductSearchCondition) => {
    setSearchCondition(condition);
    setPage(0);
  }, []);

  const handleAddProduct = useCallback(async (data: ProductRequest) => {
    await createMutation.mutateAsync(data);
  }, [createMutation]);

  const handleEditProduct = useCallback(async (data: ProductRequest) => {
    if (editingProduct) {
      await updateMutation.mutateAsync({ id: editingProduct.productId, data });
    }
  }, [editingProduct, updateMutation]);

  const handleDeleteProduct = useCallback(async (productId: number) => {
    await deleteMutation.mutateAsync(productId);
  }, [deleteMutation]);

  const handleProductClick = useCallback(async (product: ProductResponse) => {
    // 상세 조회 로직 (나중에 구현)
    const productDetail = await getProduct(product.productId);
    setEditingProduct(productDetail);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="section-title text-2xl sm:text-3xl">상품 목록</h1>
            <p className="text-gray-500 text-sm sm:text-base mt-1">상품을 검색하고 관리하세요</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="btn-primary-imweb w-full sm:w-auto min-h-[44px] touch-manipulation"
          >
            새로 추가
          </button>
        </div>
        <ProductSearch onSearch={handleSearch} />
        <div className="flex justify-center items-center h-64 card-imweb">
          <LoadingSpinner message="로딩 중..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="section-title text-2xl sm:text-3xl">상품 목록</h1>
            <p className="text-gray-500 text-sm sm:text-base mt-1">상품을 검색하고 관리하세요</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="btn-primary-imweb w-full sm:w-auto min-h-[44px] touch-manipulation"
          >
            새로 추가
          </button>
        </div>
        <ProductSearch onSearch={handleSearch} />
        <div className="mt-6 bg-white rounded-lg shadow">
          <EmptyState
            title="데이터를 불러올 수 없습니다"
            message="상품 목록을 불러오는 중 오류가 발생했습니다. 페이지를 새로고침하거나 다시 시도해주세요."
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="section-title text-2xl sm:text-3xl">상품 목록</h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">상품을 검색하고 관리하세요</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary-imweb w-full sm:w-auto min-h-[44px] touch-manipulation"
        >
          새로 추가
        </button>
      </div>

      <ProductSearch onSearch={handleSearch} />

      {data && (
        <>
          {data.content.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {data.content.map((product) => (
                  <ProductCard
                    key={product.productId}
                    product={product}
                    onClick={handleProductClick}
                  />
                ))}
              </div>

              <Pagination
                currentPage={page}
                totalPages={data.totalPages}
                totalElements={data.totalElements}
                onPageChange={setPage}
              />
            </>
          ) : (
            <div className="mt-6 card-imweb">
              <EmptyState
                title="등록된 상품이 없습니다"
                message={searchCondition.productName || searchCondition.productCode || searchCondition.minPrice !== undefined || searchCondition.maxPrice !== undefined
                  ? "검색 조건에 맞는 상품이 없습니다. 다른 검색 조건을 시도해보세요."
                  : "아직 등록된 상품이 없습니다. 첫 상품을 추가해보세요."}
                action={
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="btn-primary-imweb touch-manipulation"
                  >
                    상품 추가하기
                  </button>
                }
              />
            </div>
          )}
        </>
      )}

      {/* 상품 추가 모달 */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="상품 추가"
        size="lg"
      >
        <ProductForm
          onSubmit={handleAddProduct}
          onCancel={() => setIsAddModalOpen(false)}
          isLoading={createMutation.isPending}
        />
      </Modal>

      {/* 상품 수정 모달 */}
      <Modal
        isOpen={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        title="상품 수정"
        size="lg"
      >
        {editingProduct && (
          <div className="space-y-4">
            <ProductForm
              product={editingProduct}
              onSubmit={handleEditProduct}
              onCancel={() => setEditingProduct(null)}
              isLoading={updateMutation.isPending}
            />
            <div className="pt-4 border-t border-gray-100">
              <button
                onClick={() => setDeletingProductId(editingProduct.productId)}
                className="min-h-[44px] px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 touch-manipulation"
              >
                삭제
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* 삭제 확인 다이얼로그 */}
      <ConfirmDialog
        isOpen={deletingProductId !== null}
        onClose={() => setDeletingProductId(null)}
        onConfirm={() => deletingProductId && handleDeleteProduct(deletingProductId)}
        title="상품 삭제"
        message="정말로 이 상품을 삭제하시겠습니까?"
        confirmText="삭제"
        variant="danger"
      />
    </div>
  );
};
