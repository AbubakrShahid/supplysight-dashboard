import { useState } from "react";
import { useKPIs } from "../hooks/useKPIs";
import ProductsTable from "./ProductsTable";
import ProductDrawer from "./ProductDrawer";

const ProductsPage = () => {
  const { products, warehouses, loading, error } = useKPIs("7d");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="text-red-600 text-lg font-medium mb-2">
          Connection Error
        </div>
        <p className="text-red-700">Unable to load products: {error.message}</p>
      </div>
    );
  }

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleProductSave = (updatedProduct) => {
    console.log("Product updated:", updatedProduct);
  };

  return (
    <>
      <ProductsTable
        products={products}
        warehouses={warehouses}
        onProductClick={handleProductClick}
      />

      <ProductDrawer
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleProductSave}
      />
    </>
  );
};

export default ProductsPage;
