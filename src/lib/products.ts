import fs from 'fs';
import path from 'path';

export interface Product {
  id: string;
  title: string;
  description: string;
  features: string[];
  price: number | null;
  imageUrl: string | null;
  status: 'ACTIVE' | 'DRAFT' | 'SOLD';
  createdAt: string;
}

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'products.json');

export function getProducts(): Product[] {
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(fileContents) as Product[];
  } catch (error) {
    console.error("Error reading products:", error);
    return [];
  }
}

export function saveProducts(products: Product[]): void {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2), 'utf8');
  } catch (error) {
    console.error("Error saving products:", error);
  }
}

export function getProductById(id: string): Product | undefined {
  const products = getProducts();
  return products.find(p => p.id === id);
}

export function addProduct(product: Omit<Product, 'id' | 'createdAt'>): Product {
  const products = getProducts();
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
}

export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const products = getProducts();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;

  products[index] = { ...products[index], ...updates };
  saveProducts(products);
  return products[index];
}

export function deleteProduct(id: string): boolean {
  const products = getProducts();
  const newProducts = products.filter(p => p.id !== id);
  if (products.length === newProducts.length) return false;
  
  saveProducts(newProducts);
  return true;
}
