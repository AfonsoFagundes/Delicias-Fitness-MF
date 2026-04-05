import type { Food } from "@/Types/Food";

interface Props {
  id: number;
  name: string;
  costPrice: number;
  description?: string;
  price: number;
  categoryId: number;
  removeProduct: (id: number) => Promise<void>;
  onEdit: (product: Food) => void;
}

const ProductCardAdm = ({ id, name, description, costPrice, price, categoryId, removeProduct, onEdit }: Props) => {
  
  const profit = price - costPrice;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm hover:border-green-200 transition-all group">
      <div className="flex items-center justify-between gap-4">
        
        {/* INFO DO PRODUTO */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-slate-800 truncate">{name}</h4>
            <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-medium">
              ID: {id}
            </span>
          </div>
          <p className="text-xs text-slate-500 truncate mt-0.5">
            {description || "Sem descrição cadastrada"}
          </p>
        </div>

        {/* VALORES E PREÇOS */}
        <div className="text-right shrink-0">
          <p className="text-xs font-black text-slate-900">
            R$ {price.toFixed(2)}
          </p>
          <p className={`text-[10px] font-bold ${profit > 0 ? 'text-green-500' : 'text-red-400'}`}>
            Lucro: R$ {profit.toFixed(2)}
          </p>
        </div>

        {/* AÇÕES */}
        <div className="flex items-center gap-1 border-l pl-3 ml-1 border-slate-100">
          <button 
            onClick={() => onEdit({ id, name, costPrice, description, price, categoryId })}
            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
            title="Editar Produto"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          
          <button 
            onClick={() => {
              if(confirm(`Deseja realmente excluir "${name}"?`)) removeProduct(id);
            }}
            className="p-2 text-rose-400 hover:bg-rose-50 hover:text-rose-600 rounded-lg transition-colors"
            title="Excluir Produto"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardAdm;