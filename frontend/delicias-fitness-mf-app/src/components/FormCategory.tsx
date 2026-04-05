import React, { useState } from "react";
import toast from "react-hot-toast";

import type { Category } from "@/Types/Category";

interface Props {
  createCategories: (category: Omit<Category, "id">) => Promise<void>;
}

const formCategory = ({ createCategories }: Props) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim() === "") return toast.error("O nome é obrigatório");

    setLoading(true);
    try {
      await createCategories({
        name,
      });
      toast.success("Categoria criada com sucesso!");
      setName("");
    } catch (error) {
      toast.error("Erro ao criar nova Categoria!");
    } finally {
      setLoading(false);
    }
  };
  const inputClass =
    "w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all shadow-sm";
  const labelClass =
    "text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className={labelClass}>Categoria</label>
          <input
            placeholder="Ex: Doces"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="flex items-center gap-4 w-full pt-6">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl text-sm font-black shadow-lg shadow-green-200 transition-all active:scale-95"
          >
            Salvar Categoria
          </button>
        </div>
      </div>
    </form>
  );
};

export default formCategory;
