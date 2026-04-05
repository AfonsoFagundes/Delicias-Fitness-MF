
export interface Food {
  id: number;
  name: string;
  price: number;
  costPrice: number;
  description?: string;
  categoryId: number; 
  imageUrl?: string;  
  isActive?: boolean;
}