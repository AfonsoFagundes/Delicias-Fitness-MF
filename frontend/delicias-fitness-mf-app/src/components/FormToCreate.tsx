import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import type { Food } from "@/Types/Food";

interface Props {
  createProducts: (product: Omit<Food, "id">) => Promise<void>;
  categories: { id: number; name: string }[];
  editProduct: Food | null;
  updateItem: (product: Food) => Promise<void>;
  setProducts: (product: Food | null) => void;
}

const FormToCreate = ({
  createProducts,
  categories,
  editProduct,
  updateItem,
  setProducts,
}: Props) => {
  const [categoryId, setCategoryId] = useState<number>(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [costPrice, setCostPrice] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editProduct) {
      setCategoryId(editProduct.categoryId);
      setName(editProduct.name);
      setDescription(editProduct.description || "");
      setPrice(editProduct.price);
      setCostPrice(editProduct.costPrice);
    } else {
      setName("");
      setDescription("");
      setPrice(0);
      setCostPrice(0);
      setCategoryId(0);
    }
  }, [editProduct]);

  // Cálculo de lucro em tempo real para ajudar a precificar
  const unitProfit = price - costPrice;
  const profitMargin = price > 0 ? (unitProfit / price) * 100 : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim() === "") return toast.error("O nome é obrigatório");
    if (categoryId === 0) return toast.error("Selecione uma categoria");
    if (price <= 0) return toast.error("O preço de venda deve ser maior que 0");

    setLoading(true);

    try {
      if (editProduct) {
        const updatedData = {
          id: editProduct.id,
          name,
          description,
          price,
          costPrice,
          categoryId,
        };
        await updateItem(updatedData);
        toast.success("Produto atualizado!");
        setProducts(null);
      } else {
        await createProducts({
          name,
          description,
          price,
          costPrice,
          categoryId: Number(categoryId),
        });
        toast.success("Produto criado com sucesso!");
        // Reset campos
        setName("");
        setDescription("");
        setPrice(0);
        setCostPrice(0);
        setCategoryId(0);
      }
    } catch (error) {
      toast.error("Erro ao processar solicitação.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all shadow-sm";

  const labelClass = "text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Nome do Produto */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className={labelClass}>Identificação do Produto</label>
          <input
            placeholder="Ex: Marmita Fit - Patinho com Legumes"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Categoria */}
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Categoria</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            className={inputClass}
          >
            <option value={0} disabled>Selecione...</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Descrição */}
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Descrição Breve</label>
          <input
            placeholder="Ex: 250g de proteína + 100g legumes"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Financeiro */}
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Custo de Produção</label>
          <div className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400 group-focus-within:text-green-600">R$</span>
            <input
              type="number"
              step="0.01"
              value={costPrice || ""}
              onChange={(e) => setCostPrice(Number(e.target.value))}
              className={`${inputClass} pl-10`}
              placeholder="0,00"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Preço de Venda</label>
          <div className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400 group-focus-within:text-green-600">R$</span>
            <input
              type="number"
              step="0.01"
              value={price || ""}
              onChange={(e) => setPrice(Number(e.target.value))}
              className={`${inputClass} pl-10 font-bold text-slate-800`}
              placeholder="0,00"
            />
          </div>
        </div>
      </div>

      {/* Indicador de Lucro (Diferencial de UX) */}
      {(price > 0 || costPrice > 0) && (
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Lucro Estimado</p>
            <p className={`text-lg font-black ${unitProfit > 0 ? 'text-green-600' : 'text-red-500'}`}>
              R$ {unitProfit.toFixed(2)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Margem</p>
            <p className={`text-sm font-bold ${profitMargin > 20 ? 'text-green-500' : 'text-orange-500'}`}>
              {profitMargin.toFixed(1)}%
            </p>
          </div>
        </div>
      )}

      {/* Ações */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-sm font-black transition-all active:scale-[0.98] ${
            editProduct 
            ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200 shadow-lg" 
            : "bg-green-500 hover:bg-green-600 text-white shadow-green-200 shadow-lg"
          } disabled:opacity-50`}
        >
          {loading ? (
            <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : editProduct ? (
            "Atualizar Produto"
          ) : (
            "Cadastrar no Cardápio"
          )}
        </button>

        {editProduct && (
          <button
            type="button"
            onClick={() => setProducts(null)}
            className="px-6 py-3 rounded-xl text-sm font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default FormToCreate;