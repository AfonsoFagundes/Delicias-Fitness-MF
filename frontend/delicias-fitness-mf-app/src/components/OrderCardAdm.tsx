import type { Order } from "@/Types/Order";

interface OrderCardProps {
  order: Order;
  onStatusChange: (id: number, newStatus: Order["status"]) => void;
}

const OrderCardAdm = ({ order, onStatusChange }: OrderCardProps) => {
  const { id, customerName, phone, address, note, status, total, items } = order;

  // Cores dinâmicas para o seletor de status
  const statusColors = {
    pending: "bg-amber-50 text-amber-600 border-amber-200 focus:ring-amber-500",
    prepared: "bg-blue-50 text-blue-600 border-blue-200 focus:ring-blue-500",
    delivered: "bg-emerald-50 text-emerald-600 border-emerald-200 focus:ring-emerald-500",
    canceled: "bg-rose-50 text-rose-600 border-rose-200 focus:ring-rose-500",
  };
console.log(`Pedido #${id} - Itens:`, items.map(i => i.food?.name));

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      
      {/* HEADER DO CARD */}
      <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-2">
          <span className="bg-slate-900 text-white text-[10px] font-black px-2 py-1 rounded-md">
            #{id}
          </span>
          <h3 className="text-sm font-bold text-slate-700 truncate max-w-[150px] sm:max-w-none">
            {customerName}
          </h3>
        </div>

        <select
          value={status}
          onChange={(e) => onStatusChange(id, e.target.value as Order["status"])}
          className={`text-[10px] font-black px-3 py-1.5 rounded-full border outline-none transition-all uppercase tracking-wider cursor-pointer ${statusColors[status]}`}
        >
          <option value="pending">Pendente</option>
          <option value="prepared">Preparando</option>
          <option value="delivered">Entregue</option>
          <option value="canceled">Cancelado</option>
        </select>
      </div>

      <div className="p-5 flex flex-col md:flex-row gap-6">
        
        {/* INFORMAÇÕES DE ENTREGA */}
        <div className="flex-1 space-y-3">
          <div className="flex items-start gap-3 text-slate-600">
            <div className="mt-1 bg-slate-100 p-1.5 rounded-lg">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Endereço de Entrega</p>
              <p className="text-sm font-medium leading-relaxed">{address}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-slate-600">
            <div className="bg-slate-100 p-1.5 rounded-lg">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <p className="text-sm font-medium">{phone}</p>
          </div>

          {note && (
            <div className="bg-orange-50 border border-orange-100 p-3 rounded-xl">
              <p className="text-[10px] font-bold text-orange-400 uppercase mb-1">Observação do Cliente</p>
              <p className="text-xs text-orange-700 italic">"{note}"</p>
            </div>
          )}
        </div>

        {/* ITENS DO PEDIDO */}
        <div className="flex-1 bg-slate-50 rounded-2xl p-4 border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase mb-3 tracking-widest">Resumo da Marmita</p>
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-sm border-b border-slate-200/50 pb-2 last:border-0">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center bg-orange-500 text-white text-[10px] font-black h-5 w-5 rounded-md">
                    {item.quantity}
                  </span>
                 {/* <span className="font-semibold text-slate-700">{item.food?.category}</span>*/} 
                  <span className="font-semibold text-slate-700">{item.food?.name}</span>
                </div>
                <span className="text-slate-500 font-medium text-xs">R$ {(item.priceAtPurchase * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 flex justify-between items-end">
            <span className="text-xs font-bold text-slate-400 uppercase">Total do Pedido</span>
            <span className="text-xl font-black text-slate-900">
              <span className="text-sm font-bold mr-1">R$</span>
              {total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCardAdm;