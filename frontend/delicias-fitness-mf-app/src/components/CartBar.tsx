import { createOrder } from "../Api/Order";
import { useCart } from "./Context/CartContext";
import toast from "react-hot-toast";
import { useState } from "react";

export const CartBar = () => {
  const { cart, cartItemsCount, cartTotal, clearCart, removeFromCart } = useCart();
  const [isOpen, setIsOpen] = useState(false); 
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleWhatsApp = async () => {
    setLoading(true);
    const orderData = {
      customerName: name,
      phone: phone,
      address: address,
      total: cartTotal,
      note: note,
      status: "pending" as const,
      deliveryDate: new Date().toISOString(),
      items: cart.map((item) => ({
        foodId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      const response = await createOrder(orderData);
      if (response) {
        const mensagemItens = cart
          .map((item) => `✅ ${item.quantity}x ${item.name} — R$${(item.price * item.quantity).toFixed(2)}`)
          .join("\n");

        const mensagem = `*Novo Pedido - Delícias Fitness M.F* 🥗\n\n*Cliente:* ${name}\n*Endereço:* ${address}\n*WhatsApp:* ${phone}\n\n*Itens:*\n${mensagemItens}\n\n--- \n*Total: R$ ${cartTotal.toFixed(2)}*\n\n${note ? `*Observação:* ${note}` : ""}`;
        
        const url = `https://wa.me/554891696167?text=${encodeURIComponent(mensagem)}`;
        toast.success("Pedido enviado com sucesso!");
        clearCart();
        removeFromCart(1); 
        setIsOpen(false);
        window.open(url, "_blank");
      }
    } catch (error) {
      toast.error("Erro ao registrar pedido!");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) return null;

  return (
    <>
      {/* Overlay Escuro quando o carrinho abrir */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      {/* Container Principal do Carrinho */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white z-[101] transition-all duration-300 ease-in-out shadow-[0_-10px_40px_rgba(0,0,0,0.15)] ${isOpen ? 'rounded-t-[32px]' : 'rounded-t-none'}`}>
        
        {/* BARRA RESUMIDA (Sempre visível se tiver itens) */}
        {!isOpen && (
          <div className="p-4 flex items-center justify-between max-w-4xl mx-auto cursor-pointer" onClick={() => setIsOpen(true)}>
            <div className="flex items-center gap-3">
              <div className="bg-[#2E7D1E] text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold relative">
                {cartItemsCount}
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-lime-500"></span>
                </span>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Meu Carrinho</p>
                <p className="text-[#2E7D1E] font-bold text-lg">R$ {cartTotal.toFixed(2)}</p>
              </div>
            </div>
            <button className="bg-[#2E7D1E] text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg shadow-green-900/20 active:scale-95 transition-transform">
              Ver Pedido →
            </button>
          </div>
        )}

        {/* CARRINHO EXPANDIDO (Formulário e Detalhes) */}
        {isOpen && (
          <div className="p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#0a1a06]">Finalizar Pedido 🍱</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 text-sm">Fechar</button>
            </div>

            {/* Lista de Itens */}
            <div className="space-y-3 mb-8">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <div className="flex gap-3">
                    <span className="font-bold text-[#2E7D1E]">{item.quantity}x</span>
                    <span className="text-sm font-medium text-gray-700">{item.name}</span>
                    <button className="text-red-500 text-sm hover:underline" onClick={() => removeFromCart(item.id) }>Remover</button>
                  </div>
                  <span className="text-sm font-bold text-gray-900">R$ {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between pt-2">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-lg text-[#2E7D1E]">R$ {cartTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Formulário de Entrega */}
            <div className="space-y-4">
              <div className="group">
                <label className="text-[11px] font-bold text-gray-400 uppercase ml-2">Seu Nome</label>
                <input
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-sm outline-none focus:border-[#2E7D1E] transition-colors"
                  type="text"
                  placeholder="Ex: João Silva"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="group">
                <label className="text-[11px] font-bold text-gray-400 uppercase ml-2">WhatsApp</label>
                <input
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-sm outline-none focus:border-[#2E7D1E] transition-colors"
                  type="text"
                  placeholder="(48) 99999-9999"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="group">
                <label className="text-[11px] font-bold text-gray-400 uppercase ml-2">Endereço de Entrega</label>
                <input
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-sm outline-none focus:border-[#2E7D1E] transition-colors"
                  type="text"
                  placeholder="Rua, número, bairro..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="group">
                <label className="text-[11px] font-bold text-gray-400 uppercase ml-2">Observações (Opcional)</label>
                <textarea
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-sm outline-none focus:border-[#2E7D1E] transition-colors resize-none"
                  placeholder="Ex: Tirar cebola, interfone estragado..."
                  value={note}
                  rows={2}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>

              <button className="w-full bg-gray-100 text-gray-600 py-2 rounded-lg mt-4 font-medium" onClick={() => clearCart()}>Limpar Carrinho</button>

              <button
                disabled={!name || !address || cart.length === 0 || loading}
                onClick={handleWhatsApp}
                className="w-full bg-[#25D366] text-white p-5 rounded-2xl font-bold text-lg shadow-xl shadow-green-500/20 hover:bg-[#20ba5a] active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale"
              >
                {loading ? "Processando..." : "Confirmar via WhatsApp 🚀"}
              </button>
              <p className="text-[10px] text-center text-gray-400 pb-4">
                Ao clicar, seu pedido será salvo e o chat abrirá.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};