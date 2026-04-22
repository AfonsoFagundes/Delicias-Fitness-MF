import { createOrder } from "../Api/Order"
import { useCart } from "./Context/CartContext"
import toast from "react-hot-toast"
import { useState } from "react"

export const CartBar = () => {
  const { cart, cartItemsCount, cartTotal, clearCart, removeFromCart } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [note, setNote] = useState("")
  const [loading, setLoading] = useState(false)

  const handleWhatsApp = async () => {
    setLoading(true)
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
    }

    try {
      const response = await createOrder(orderData)
      if (response) {
        const mensagemItens = cart
          .map((item) => `✅ ${item.quantity}x ${item.name} — R$${(item.price * item.quantity).toFixed(2)}`)
          .join("\n")

        const mensagem = `*Novo Pedido - Delícias Fitness M.F* 🥗\n\n*Cliente:* ${name}\n*Endereço:* ${address}\n*WhatsApp:* ${phone}\n\n*Itens:*\n${mensagemItens}\n\n--- \n*Total: R$ ${cartTotal.toFixed(2)}*\n\n${note ? `*Observação:* ${note}` : ""}`

        const url = `https://wa.me/554891696167?text=${encodeURIComponent(mensagem)}`
        toast.success("Pedido enviado com sucesso!")
        clearCart()
        removeFromCart(1)
        setIsOpen(false)
        window.open(url, "_blank")
      }
    } catch (error) {
      toast.error("Erro ao registrar pedido!")
    } finally {
      setLoading(false)
    }
  }

  if (cart.length === 0) return null

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Container principal */}
      <div className={`fixed bottom-0 left-0 right-0 z-[101] transition-all duration-500 ease-in-out ${isOpen ? "rounded-t-[28px]" : "rounded-t-none"}`}
        style={{ background: isOpen ? "#0a0a09" : "#0a0a09", boxShadow: "0 -8px 40px rgba(0,0,0,0.5), 0 -1px 0 rgba(109,190,69,0.15)" }}>

        {/* ── BARRA RESUMIDA ── */}
        {!isOpen && (
          <div
            className="px-5 py-4 flex items-center justify-between max-w-2xl mx-auto cursor-pointer"
            onClick={() => setIsOpen(true)}>

            <div className="flex items-center gap-3.5">
              {/* Contador */}
              <div className="relative w-11 h-11 bg-[#2E7D1E] flex items-center justify-center font-bold text-white text-base"
                style={{ borderRadius: "12px", boxShadow: "0 0 20px rgba(46,125,30,0.5)" }}>
                {cartItemsCount}
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6DBE45] opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#6DBE45]" />
                </span>
              </div>

              <div>
                <p className="text-[9px] text-white/30 uppercase font-semibold tracking-[.2em]">Meu Carrinho</p>
                <p className="text-[#6DBE45] font-bold text-lg leading-none mt-0.5">
                  R$ {cartTotal.toFixed(2)}
                </p>
              </div>
            </div>

            <button className="inline-flex items-center gap-2 bg-[#2E7D1E] hover:bg-[#3a9926] text-white px-6 py-3 font-bold text-sm transition-all duration-200 active:scale-95"
              style={{ borderRadius: "100px", boxShadow: "0 0 20px rgba(46,125,30,0.4)" }}>
              Ver Pedido
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        )}

        {/* ── CARRINHO EXPANDIDO ── */}
        {isOpen && (
          <div className="max-h-[90vh] overflow-y-auto">

            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-white/10" />
            </div>

            <div className="px-6 pb-8 pt-3">

              {/* Header */}
              <div className="flex justify-between items-center mb-7">
                <div>
                  <h2 className="text-white font-serif text-xl font-normal">Finalizar Pedido</h2>
                  <p className="text-white/30 text-[11px] mt-0.5">🍱 Entrega no almoço</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/30 hover:text-white text-xs font-medium border border-white/[0.08] px-3 py-1.5 transition-colors"
                  style={{ borderRadius: "8px" }}>
                  Fechar
                </button>
              </div>

              {/* Lista de itens */}
              <div className="border border-white/[0.07] bg-white/[0.02] mb-6"
                style={{ borderRadius: "16px", overflow: "hidden" }}>
                <div className="px-4 py-2 border-b border-white/[0.05]">
                  <span className="text-[9px] uppercase tracking-[.2em] text-white/30 font-semibold">Itens do pedido</span>
                </div>
                <div className="divide-y divide-white/[0.05]">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-[#2E7D1E]/20 text-[#6DBE45] text-xs font-bold flex items-center justify-center flex-shrink-0"
                          style={{ borderRadius: "6px" }}>
                          {item.quantity}
                        </span>
                        <span className="text-white/80 text-sm font-medium">{item.name}</span>
                        <button
                          className="text-red-400/60 hover:text-red-400 text-[11px] transition-colors"
                          onClick={() => removeFromCart(item.id)}>
                          remover
                        </button>
                      </div>
                      <span className="text-white/60 text-sm font-semibold flex-shrink-0">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="flex justify-between items-center px-4 py-4 border-t border-white/[0.07] bg-white/[0.02]">
                  <span className="text-white/50 text-sm font-medium">Total</span>
                  <span className="text-[#6DBE45] font-bold text-lg">R$ {cartTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Formulário de entrega */}
              <div className="space-y-3 mb-5">
                <p className="text-[9px] uppercase tracking-[.2em] text-white/30 font-semibold mb-4">Dados de entrega</p>

                {[
                  { label: "Seu Nome",             placeholder: "Ex: João Silva",              value: name,    setter: setName,    type: "text"  },
                  { label: "WhatsApp",              placeholder: "(48) 99999-9999",             value: phone,   setter: setPhone,   type: "text"  },
                  { label: "Endereço de Entrega",   placeholder: "Rua, número, bairro...",     value: address, setter: setAddress, type: "text"  },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="text-[10px] font-semibold text-white/30 uppercase tracking-[.15em] ml-1 mb-1.5 block">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={(e) => field.setter(e.target.value)}
                      className="w-full bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/20 text-sm px-4 py-3.5 outline-none focus:border-[#6DBE45]/40 focus:bg-white/[0.06] transition-all duration-200"
                      style={{ borderRadius: "12px" }}
                    />
                  </div>
                ))}

                <div>
                  <label className="text-[10px] font-semibold text-white/30 uppercase tracking-[.15em] ml-1 mb-1.5 block">
                    Observações (Opcional)
                  </label>
                  <textarea
                    placeholder="Ex: Tirar cebola, interfone estragado..."
                    value={note}
                    rows={2}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/20 text-sm px-4 py-3.5 outline-none focus:border-[#6DBE45]/40 focus:bg-white/[0.06] transition-all duration-200 resize-none"
                    style={{ borderRadius: "12px" }}
                  />
                </div>
              </div>

              {/* Botão limpar */}
              <button
                onClick={() => clearCart()}
                className="w-full text-white/25 hover:text-white/50 py-2.5 text-xs font-medium border border-white/[0.05] hover:border-white/[0.1] transition-all duration-200 mb-3"
                style={{ borderRadius: "10px" }}>
                Limpar Carrinho
              </button>

              {/* Botão WhatsApp */}
              <button
                disabled={!name || !address || cart.length === 0 || loading}
                onClick={handleWhatsApp}
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-4 font-bold text-base transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:grayscale"
                style={{ borderRadius: "16px", boxShadow: "0 0 30px rgba(37,211,102,0.3)" }}>
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processando...
                  </span>
                ) : (
                  "Confirmar via WhatsApp 🚀"
                )}
              </button>

              <p className="text-[10px] text-center text-white/20 mt-3 pb-2">
                Ao clicar, seu pedido será salvo e o chat abrirá.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}