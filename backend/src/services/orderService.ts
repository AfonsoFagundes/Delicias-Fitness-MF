import { PrismaClient } from "../generated/client";
import { AppError } from "../errors/AppError";

const prisma = new PrismaClient();

// Interface simplificada para o que o frontend envia
export interface OrderItemData {
    foodId: number,
    quantity: number,
}

export interface OrderData {
     customerName: string;
    phone: string,
    address: string,
    note?: string,
    total: number,
    status: string,
    deliveryDate: Date,
    items: OrderItemData[]
}
export async function createOrder(orderData: OrderData) {
    try {
        if (!orderData.items) {
            throw new AppError("Items do pedido não enviados", 400);
        }

        const itemsToCreate = await Promise.all(orderData.items.map(async (item) => {
            const food = await prisma.food.findUnique({
                where: { id: item.foodId },
                select: { price: true } 
            });

            if (!food) {
                throw new AppError(`Produto com ID ${item.foodId} não encontrado.`, 404);
            }

            return {
                foodId: item.foodId,
                quantity: item.quantity,
                priceAtPurchase: food.price, 
                subtotal: food.price * item.quantity
            };
        }));

        const total = itemsToCreate.reduce((sum, item) => sum + item.subtotal, 0);

        
        const order = await prisma.order.create({
            data: {
                customerName: orderData.customerName,
                phone: orderData.phone,
                address: orderData.address,
                note: orderData.note,
                total: total,
                status: orderData.status,
                deliveryDate: orderData.deliveryDate,
                items: {
                    create: itemsToCreate
                }
            }
        });

        return order;
    } catch (error: any) {
        if (error.code === 'P2002') {
            throw new AppError("Erro ao processar pedido: violação de unicidade.", 409);
        }
        throw error; 
    }
}



export async function listOrdersByDate(dateString: string) {
  // 1. Verificamos se a string realmente existe
  if (!dateString) throw new Error("Data não fornecida");

  // 2. Criamos o objeto de data de forma segura
  // Isso funciona bem para o formato "YYYY-MM-DD"
  const baseDate = new Date(dateString);

  if (isNaN(baseDate.getTime())) {
    throw new Error("Formato de data inválido");
  }

  // 3. Definimos o início (00:00:00) e o fim (23:59:59) do dia selecionado
  const inicioDoDia = new Date(baseDate);
  inicioDoDia.setUTCHours(0, 0, 0, 0);

  const fimDoDia = new Date(baseDate);
  fimDoDia.setUTCHours(23, 59, 59, 999);

  // 4. Agora o Prisma vai aceitar sem reclamar
  const orderList = await prisma.order.findMany({
    where: {
      deliveryDate: {
        gte: inicioDoDia,
        lte: fimDoDia,
      },
    },
    include: {
    items: {
    include: {
      food: true,
      
    },
     }
    }
  });

  return orderList;
}
// No seu orderService.ts
export async function listAllOrders() {
  const orders = await prisma.order.findMany({
    include: {
      items: {
        include: {
          food: {
            select: {
              name: true,
              costPrice: true,
              imageUrl: true,
              category: true, 
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc", // Os mais novos no topo
    },
  });

  return orders;
}
export async function getOrderSummary(data: string) {

    const bars = data.split("/");

    const dia = Number(bars[0]);
    const mes = Number(bars[1]) - 1;
    const ano = Number(bars[2]);

    const inicioDoDia = new Date(ano, mes, dia, 0, 0, 0);
    const fimDoDia = new Date(ano, mes, dia, 23, 59, 59);

   const orders = await prisma.order.findMany({
    
  where: {
    deliveryDate: {
      gte: inicioDoDia,
      lte: fimDoDia
    }
  },
  include: {
    items: {
      include: {
        food: {
          select: {
            name: true,
            costPrice: true,
            imageUrl: true 
          }
        }
      }
    }
  }
  
});


    const totalOrders = orders.length;

    const totalRevenue = orders.reduce(
        (sum, order) => sum + order.total,
        0
    );

    const foodMap: Record<string, number> = {};

    orders.forEach(order => {
        order.items.forEach(item => {
            const foodName = item.food.name;

            if (!foodMap[foodName]) {
                foodMap[foodName] = 0;
            }

            foodMap[foodName] += item.quantity;
        });
    });

    const mostSoldFoods = Object.entries(foodMap)
        .map(([name, quantity]) => ({
            name,
            quantity
        }))
        .sort((a, b) => b.quantity - a.quantity);

    return {
        date: data,
        totalOrders,
        totalRevenue,
        mostSoldFoods
    };
}

export async function updateOrderStatus(orderId: number, status: string) {

    const order = await prisma.order.findUnique({
        where: { id: orderId }
    });

    if (!order) {
        throw new AppError("Pedido não encontrado", 404);
    }

    const updatedOrder = await prisma.order.update({
        where: { id: orderId },
        data: { status }
    });

    return updatedOrder;
}

export async function markAllAsDelivered(data: string) {

    const bars = data.split("/");

    const dia = Number(bars[0]);
    const mes = Number(bars[1]) - 1;
    const ano = Number(bars[2]);

    const inicioDoDia = new Date(ano, mes, dia, 0, 0, 0);
    const fimDoDia = new Date(ano, mes, dia, 23, 59, 59);

    const orders = await prisma.order.updateMany({
        where: {
            deliveryDate: {
                gte: inicioDoDia,
                lte: fimDoDia
            }
        },
        data: {
            status: "DELIVERED"
        }
    });

    return {
        message: "Pedidos marcados como entregues",
        totalUpdated: orders.count
    };
}