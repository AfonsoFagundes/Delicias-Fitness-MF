export const ComboSection = () => {
  return (
    <section className="px-5 py-6">
      <div className="flex flex-col gap-1 mb-4">
        <span className="text-[10px] font-bold text-[#FF6B1A] uppercase tracking-wider">Economize mais</span>
        <h2 className="text-xl font-bold text-gray-900">Kits & <span className="text-[#FF6B1A]">Combos</span></h2>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {/* Combo 1 */}
        <div className="min-w-[280px] bg-[#0a1a06] rounded-[24px] p-6 relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 bg-[#FF6B1A] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
          <h4 className="text-white font-bold text-lg mb-2">Kit Semana Fit</h4>
          <p className="text-white/60 text-xs mb-4">5 marmitas variadas para o seu almoço de segunda a sexta.</p>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-[#6DBE45] text-xl font-bold">R$ 115,00</span>
            <span className="text-white/30 text-sm line-through">R$ 135,00</span>
          </div>
          <button className="w-full bg-[#FF6B1A] text-white py-3 rounded-xl font-bold text-sm active:scale-95 transition-transform">
            Adicionar Combo
          </button>
        </div>

        {/* Combo 2 */}
        <div className="min-w-[280px] bg-white border-2 border-[#6DBE45] rounded-[24px] p-6 shadow-sm">
          <h4 className="text-gray-900 font-bold text-lg mb-2">Combo Detox</h4>
          <p className="text-gray-500 text-xs mb-4">3 sucos detox + 2 saladas proteicas. Perfeito para limpeza.</p>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-[#2E7D1E] text-xl font-bold">R$ 65,00</span>
          </div>
          <button className="w-full bg-[#2E7D1E] text-white py-3 rounded-xl font-bold text-sm active:scale-95 transition-transform">
            Adicionar Combo
          </button>
        </div>
      </div>
    </section>
  )
}

export default ComboSection