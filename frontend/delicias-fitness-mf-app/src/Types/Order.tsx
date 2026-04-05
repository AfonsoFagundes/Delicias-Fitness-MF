export interface Order {
  id: number;
  customerName: string;
  phone: string;
  address: string; // 'string' com 's' minúsculo
  note: string | null;
  total: number; 
  status: 'pending'| 'prepared' | 'delivered' | 'canceled'; // Tipagem estrita para evitar erros
  deliveryDate: Date | string; 
  createdAt: Date | string; 
  items: OrderItem[]; // A lista de marmitas que estão nesse pedido
}


export interface OrderItem {
  id: number;
  orderId: number;
  foodId: number;
  quantity: number;
  priceAtPurchase: number; 
  subtotal: number;
  food?: {
    name: string;
    image?: string;
    costPrice: number;
    category: string;
  };
}