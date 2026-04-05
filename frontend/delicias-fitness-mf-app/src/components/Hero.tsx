export const Hero = () => {
  return (
    <section className="bg-[#0a1a06] min-h-[400px] py-10 px-5 relative flex flex-col justify-center overflow-hidden">
      {/* O brilho verde no fundo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(46,125,30,0.4),transparent_70%)]" />
      
      <div className="relative z-10">
        <span className="inline-flex bg-[#EFF7E8] text-[#2E7D1E] border border-[#C8E6B0] px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-wide">
          🌿 Comida Caseira & Saudável
        </span>
        
        <h1 className="text-white text-3xl font-bold mt-4 leading-tight">
          Marmitas <span className="text-[#6DBE45]">saudáveis</span> <br />
          feitas com amor
        </h1>
        
        <p className="text-white/70 text-sm my-5 max-w-[280px]">
          O sabor da comida da mãe, com a praticidade que você precisa para o seu dia a dia.
        </p>
        
        <div className="flex gap-3">
          <button className="bg-[#2E7D1E] text-white px-5 py-3 rounded-full text-sm font-bold shadow-lg active:scale-95 transition-all">
            Ver Cardápio
          </button>
          <button className="bg-white/10 border border-white/30 text-white px-5 py-3 rounded-full text-sm font-bold active:scale-95 transition-all">
            Saiba Mais
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero