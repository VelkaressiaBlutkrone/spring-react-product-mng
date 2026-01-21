/**
 * 상품 목록 페이지
 */
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProducts, createProduct, updateProduct, deleteProduct, getProduct } from '../services/api/productApi';
import { ProductSearchCondition, ProductRequest, ProductResponse } from '../types/product.types';
import { ProductCard } from '../components/product/ProductCard';
import { ProductSearch } from '../components/product/ProductSearch';
import { Pagination } from '../components/common/Pagination';
import { ProductForm } from '../components/product/ProductForm';
import { Modal } from '../components/common/Modal';
import { ConfirmDialog } from '../components/common/ConfirmDialog';

export const ProductListPage = () => {
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [searchCondition, setSearchCondition] = useState<ProductSearchCondition>({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductResponse | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<number | null>(null);

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', page, size, searchCondition],
    queryFn: () => getProducts(searchCondition, { page, size }),
  });

  // 상품 추가 Mutation
  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setIsAddModalOpen(false);
    },
  });

  // 상품 수정 Mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ProductRequest }) =>
      updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setEditingProduct(null);
    },
  });

  // 상품 삭제 Mutation
  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setDeletingProductId(null);
    },
  });

  const handleSearch = (condition: ProductSearchCondition) => {
    setSearchCondition(condition);
    setPage(0);
  };

  const handleAddProduct = async (data: ProductRequest) => {
    await createMutation.mutateAsync(data);
  };

  const handleEditProduct = async (data: ProductRequest) => {
    if (editingProduct) {
      await updateMutation.mutateAsync({ id: editingProduct.productId, data });
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    await deleteMutation.mutateAsync(productId);
  };

  const handleProductClick = async (product: ProductResponse) => {
    // 상세 조회 로직 (나중에 구현)
    const productDetail = await getProduct(product.productId);
    setEditingProduct(productDetail);
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
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          새로 추가
        </button>
      </div>

      <ProductSearch onSearch={handleSearch} />

      {data && (
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
            <div className="pt-4 border-t">
              <button
                onClick={() => setDeletingProductId(editingProduct.productId)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
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
