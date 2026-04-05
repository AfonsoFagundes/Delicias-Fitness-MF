import { useState, useEffect } from "react";
import {
  getFoodsByCategory,
  deleteProduct,
  createProduct,
} from "@/Api/FoodApi";

import { createCategory } from "@/Api/CategoryApi";

import ProductCardAdm from "../components/ProductCardAdm";
import FormToCreate from "@/components/FormToCreate";
import FormCategory from "@/components/FormCategory";

import type { Food } from "@/Types/Food";
import type { Category } from "@/Types/Category";
import type { Order } from "@/Types/Order";

import toast from "react-hot-toast";
import { listCategoriesSimple } from "@/Api/CategoryApi";
import { getOrders, updateOrderStatus } from "@/Api/Order";
import OrderCardAdm from "@/components/OrderCardAdm";

import { Modal } from "@/components/Modal";

import logo from "@/assets/favicon-delicias-fitness.svg";

function Admin() {
  const [products, setProducts] = useState<Food[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editProduct, setEditProduct] = useState<Food | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para o menu mobile

  useEffect(() => {
    async function loadProducts() {
      const response = await getFoodsByCategory(1);
      setProducts(response);
    }
    loadProducts();
  }, []);

  useEffect(() => {
    async function ListCategories() {
      const response = await listCategoriesSimple();
      setCategories(response);
    }
    ListCategories();
  }, []);

  useEffect(() => {
    async function loadOrders() {
      try {
        const response = await getOrders(selectedDate);
        setOrders(response);
      } catch (err) {
        console.error("Erro na chamada da API:", err);
      }
    }
    loadOrders();
  }, [selectedDate]);

  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
  const totalCost = orders.reduce((acc, order) => {
    const orderItemsCost = order.items.reduce((itemAcc, item) => {
      return itemAcc + item.quantity * (item.food?.costPrice ?? 0);
    }, 0);
    return acc + orderItemsCost;
  }, 0);
  const netProfit = totalRevenue - totalCost;

  const createProducts = async (postedProducts: Omit<Food, "id">) => {
    try {
      const newProductFromDb = await createProduct(
        postedProducts.categoryId,
        postedProducts,
      );
      setProducts((prev) => [newProductFromDb, ...prev]);
      toast.success("Produto criado com sucesso!");
    } catch (error) {
      toast.error("Erro ao criar o produto!");
    }
  };

  const createCategories = async (postedCategory: Omit<Category, "id">) => {
    try {
      const newCateogryFromDb = await createCategory(postedCategory.name);
      setCategories((prev) => [newCateogryFromDb, ...prev]);
      toast.success("Categoria criada com sucesso!");
    } catch (error) {
      toast.error("Erro ao criar nova Categoria!");
    }
  };

  const removeProduct = async (id: number) => {
    try {
      await deleteProduct(id);
      const deleteProdcuts = products.filter((p) => p.id !== id);
      setProducts(deleteProdcuts);
      toast.success("Produto deletado com sucesso!");
    } catch (error) {
      toast.error("Erro ao deletar o produto!");
    }
  };

  const updateItem = async (updatedProduct: Food) => {
    const updatedProducts = products.map((p) => {
      if (p.id === updatedProduct.id) {
        return updatedProduct;
      }
      return p;
    });
    setProducts(updatedProducts);
  };

  const updateStatus = async (id: number, newStatus: Order["status"]) => {
    try {
      await updateOrderStatus(id, newStatus);
      const orderStatusUpdated = orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order,
      );
      toast.success("Status atualizado com sucesso");
      setOrders(orderStatusUpdated);
    } catch (error) {
      toast.error("Erro ao alterar status!");
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden relative">
      {/* ── OVERLAY MOBILE ── */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ── SIDEBAR ── */}
      <aside
        className={`
        fixed md:relative z-50 w-64 bg-gray-900 flex flex-col shrink-0 h-screen transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
      `}
      >
        {/* Logo */}
        <div className="px-4 py-4 border-b border-gray-800 flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-8 w-8 rounded-lg" />
          <div>
            <p className="text-white text-sm font-bold leading-tight">
              MF Admin
            </p>
            <p className="text-green-400 text-[10px] font-semibold uppercase tracking-widest text-nowrap">
              Fitness Food
            </p>
          </div>
          {/* Botão para fechar no mobile */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden ml-auto text-gray-400"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="flex-1 px-2 py-3 flex flex-col gap-0.5 overflow-y-auto">
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest px-2 pt-2 pb-1">
            Geral
          </p>
          <a
            href="#"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium bg-green-500/10 text-green-400"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
            Dashboard
          </a>
          <a
            href="#"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:bg-gray-800"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            Pedidos{" "}
            {orders.length > 0 && (
              <span className="ml-auto bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {orders.length}
              </span>
            )}
          </a>

          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest px-2 pt-4 pb-1">
            Cardápio
          </p>
          <button
            onClick={() => {
              setIsFoodModalOpen(true);
              setIsSidebarOpen(false);
            }}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:bg-gray-800 w-full text-left"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Gerenciar Produtos
          </button>

          <button
            onClick={() => {
              setIsCategoryModalOpen(true);
              setIsSidebarOpen(false);
            }}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:bg-gray-800 w-full text-left"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Criar Categoria
          </button>

          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest px-2 pt-4 pb-1">
            Filtros
          </p>
          <div className="px-2 flex flex-col gap-2">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-gray-300 text-xs rounded-lg px-2 py-2 outline-none focus:ring-1 focus:ring-green-500"
            />
            <button
              onClick={() =>
                setSelectedDate(
                  selectedDate === ""
                    ? new Date().toISOString().split("T")[0]
                    : "",
                )
              }
              className={`w-full px-3 py-2 rounded-lg text-xs font-semibold transition-all ${selectedDate === "" ? "bg-orange-500 text-white" : "bg-gray-700 text-gray-300"}`}
            >
              {selectedDate === "" ? "Ver Hoje" : "Ver Todos"}
            </button>
          </div>
        </nav>

        <div className="px-4 py-3 border-t border-gray-800 flex items-center gap-2.5 mt-auto">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-400 to-orange-400 flex items-center justify-center text-white text-[10px] font-bold">
            MF
          </div>
          <div className="min-w-0">
            <p className="text-gray-100 text-xs font-semibold truncate">
              MF Fitness
            </p>
            <p className="text-gray-500 text-[10px]">Administradora</p>
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-slate-200 h-14 px-4 md:px-6 flex items-center gap-3 sticky top-0 z-30 shrink-0">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          <h1 className="text-xs md:text-sm font-bold text-slate-800 flex-1 truncate">
            {selectedDate
              ? `Pedidos de ${selectedDate.split("-").reverse().join("/")}`
              : "Todos os Pedidos"}
          </h1>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block text-[10px] text-slate-400 bg-slate-50 border px-2 py-1 rounded-full whitespace-nowrap">
              {orders.length} {orders.length === 1 ? "pedido" : "pedidos"}
            </span>
            <button
              onClick={() => setIsFoodModalOpen(true)}
              className="bg-green-500 hover:bg-green-600 text-white text-[10px] md:text-xs font-bold px-2 py-2 md:px-3 rounded-lg flex items-center gap-1"
            >
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path d="M12 4v16m8-8H4" />
              </svg>
              <span className="hidden xs:inline">Novo</span>
            </button>
          </div>
        </header>

        {/* Conteúdo */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 md:pb-6">
          {/* ── METRIC CARDS ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {/* Faturamento */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 left-0 right-0 h-1 bg-green-500" />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                Faturamento Bruto
              </p>
              <p className="text-xl font-bold text-slate-800">
                R$ {totalRevenue.toFixed(2)}
              </p>
            </div>

            {/* Custos */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 left-0 right-0 h-1 bg-orange-500" />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                Custos Produção
              </p>
              <p className="text-xl font-bold text-slate-800">
                R$ {totalCost.toFixed(2)}
              </p>
            </div>

            {/* Lucro */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 relative overflow-hidden shadow-sm sm:col-span-2 md:col-span-1">
              <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600" />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                Lucro Líquido
              </p>
              <p className="text-xl font-bold text-blue-700">
                R$ {netProfit.toFixed(2)}
              </p>
            </div>
          </div>

          {/* ── LISTA DE PEDIDOS ── */}
          <div className="flex flex-col gap-4">
            {orders.length > 0 ? (
              orders.map((order) => (
                <OrderCardAdm
                  key={order.id}
                  order={order}
                  onStatusChange={updateStatus}
                />
              ))
            ) : (
              <div className="bg-white rounded-xl border-2 border-dashed border-slate-200 p-12 text-center">
                <p className="text-slate-400 text-sm font-medium italic">
                  Nenhum pedido encontrado.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ── MODAL ── */}
      <Modal
        isOpen={isFoodModalOpen || !!editProduct}
        onClose={() => {
          setIsFoodModalOpen(false);
          setEditProduct(null);
        }}
        title={editProduct ? "Editar Produto" : "Novo Produto"}
      >
        <FormToCreate
          createProducts={createProducts}
          categories={categories}
          editProduct={editProduct}
          updateItem={updateItem}
          setProducts={setEditProduct}
        />
        <div className="mt-8 border-t pt-6 max-h-[400px] overflow-y-auto">
          <h4 className="font-bold text-gray-700 mb-4">Gerenciar Cardápio</h4>
          <div className="flex flex-col gap-3">
            {products.map((food) => (
              <ProductCardAdm
                key={food.id}
                {...food}
                removeProduct={removeProduct}
                onEdit={() => setEditProduct(food)}
              />
            ))}
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={isCategoryModalOpen}
        onClose={() => {
          setIsCategoryModalOpen(false);
        }}
        title={"Nova Categoria"}
      >
        <FormCategory createCategories={createCategories} />
        <hr className="my-6 border-slate-100" />
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Categorias Existentes
          </h3>
          <div className="max-h-48 overflow-y-auto pr-2">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="flex justify-between items-center p-2 hover:bg-slate-50 rounded-lg group"
              >
                <span className="text-sm text-slate-700">{cat.name}</span>
                {/* Talvez vou adicionar uma lixeira para delete*/}
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Admin;
