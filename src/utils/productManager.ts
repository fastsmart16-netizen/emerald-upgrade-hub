// Products manager - localStorage based product catalog
export interface ProductData {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image?: string;
  inStock: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const STORAGE_KEY = 'adminProducts';

const DEFAULT_PRODUCTS: ProductData[] = [
  { id: 'p1', name: 'Linear Motion Guide', category: 'Linear', description: 'High precision linear motion guide for industrial machines', price: 3500, inStock: true },
  { id: 'p2', name: 'Electromagnetic Brake', category: 'Brake', description: 'Heavy duty electromagnetic brake for crane and hoist', price: 4500, inStock: true },
  { id: 'p3', name: 'VFD Drive 5HP', category: 'VFD', description: 'Variable Frequency Drive 5HP, 3-phase input', price: 8500, inStock: true },
  { id: 'p4', name: 'PLC Controller', category: 'PLC', description: 'Programmable Logic Controller for industrial automation', price: 12000, inStock: true },
  { id: 'p5', name: 'Braking Resistor', category: 'Resistance', description: 'High wattage braking resistor for VFD', price: 2500, inStock: true },
  { id: 'p6', name: 'Bore Bearing Assembly', category: 'Bore', description: 'Precision bore bearing assembly', price: 3200, inStock: true },
  { id: 'p7', name: 'Tower Crane Spare Kit', category: 'Tower', description: 'Spare parts kit for tower cranes', price: 15000, inStock: true },
  { id: 'p8', name: 'Hoist Motor 2 Ton', category: 'Hoist', description: 'Electric hoist motor 2 ton capacity', price: 18500, inStock: true },
];

class ProductManagerClass {
  private listeners: Array<(p: ProductData[]) => void> = [];

  getProducts(): ProductData[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        this.save(DEFAULT_PRODUCTS);
        return DEFAULT_PRODUCTS;
      }
      return JSON.parse(raw);
    } catch {
      return DEFAULT_PRODUCTS;
    }
  }

  private save(products: ProductData[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    this.listeners.forEach((l) => l(products));
  }

  addProduct(p: Omit<ProductData, 'id' | 'createdAt' | 'updatedAt'>): ProductData {
    const products = this.getProducts();
    const newProduct: ProductData = {
      ...p,
      id: `p_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.save([newProduct, ...products]);
    return newProduct;
  }

  updateProduct(id: string, updates: Partial<ProductData>) {
    const products = this.getProducts().map((p) =>
      p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
    );
    this.save(products);
  }

  deleteProduct(id: string) {
    this.save(this.getProducts().filter((p) => p.id !== id));
  }

  subscribe(fn: (p: ProductData[]) => void) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }
}

export const ProductManager = new ProductManagerClass();
