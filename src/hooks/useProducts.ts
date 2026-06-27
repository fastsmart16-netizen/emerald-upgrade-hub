import { useEffect, useState } from 'react';
import { ProductData, ProductManager } from '@/utils/productManager';

export const useProducts = () => {
  const [products, setProducts] = useState<ProductData[]>(() => ProductManager.getProducts());

  useEffect(() => {
    const unsub = ProductManager.subscribe(setProducts);
    return unsub;
  }, []);

  return {
    products,
    addProduct: ProductManager.addProduct.bind(ProductManager),
    updateProduct: ProductManager.updateProduct.bind(ProductManager),
    deleteProduct: ProductManager.deleteProduct.bind(ProductManager),
  };
};
