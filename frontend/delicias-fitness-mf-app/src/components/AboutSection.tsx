import Miriam from "../assets/Miriam.jpeg"

export function AboutSection() {
  return (
    <section id="sobre" className="bg-[#080f05] py-20 sm:py-28 px-6 relative overflow-hidden">

      {/* Grade de fundo */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(46,125,30,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(46,125,30,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_50%,black,transparent)]" />

      {/* Glow esquerdo */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[radial-gradient(circle,rgba(109,190,69,0.08),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Lado da imagem */}
        <div
          className="relative"
          style={{ animation: "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s both" }}>

          {/* Foto */}
          <div className="relative aspect-square overflow-hidden"
            style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(109,190,69,0.1)" }}>
            <img
              src={Miriam}
              alt="Cozinha Delícias Fitness"
              className="w-full h-full object-cover"
            />
            {/* Overlay sutil */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>

          {/* Badge 100% Natural */}
          <div
            className="absolute -bottom-5 -right-5 sm:-bottom-6 sm:-right-6 bg-[#2E7D1E] p-5 sm:p-6 text-white shadow-[0_0_30px_rgba(46,125,30,0.5)] hidden sm:flex flex-col items-center justify-center"
            style={{ animation: "float 3s ease-in-out infinite" }}>
            <p className="text-3xl font-bold leading-none">100%</p>
            <p className="text-[10px] uppercase tracking-[.2em] font-medium mt-1 text-white/70">Natural</p>
          </div>

          {/* Badge flutuante superior */}
          <div
            className="absolute -top-4 -left-4 bg-[#0a1505] border border-[#6DBE45]/25 px-4 py-2.5 hidden sm:flex items-center gap-2 shadow-xl"
            style={{ animation: "float 3s ease-in-out 1s infinite" }}>
            <span className="w-2 h-2 rounded-full bg-[#6DBE45] animate-pulse" />
            <span className="text-white text-[11px] font-medium">Feito com amor 🍱</span>
          </div>
        </div>

        {/* Lado do texto */}
        <div style={{ animation: "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s both" }}>

          <div className="inline-flex items-center gap-2 bg-[#6DBE45]/10 border border-[#6DBE45]/25 text-[#6DBE45] px-4 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[.2em] mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6DBE45] animate-pulse" />
            Nossa História
          </div>

          <h2 className="text-white font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.08] mb-6">
            Comida de verdade, feita com{" "}
            <em className="not-italic text-[#6DBE45]">amor de mãe</em>
          </h2>

          <div className="w-10 h-px bg-[#6DBE45]/40 mb-7" />

          <div className="space-y-4 text-white/45 text-sm sm:text-base leading-relaxed">
            <p>
              O Delícias Fitness M.F nasceu do desejo de transformar a alimentação saudável em algo prazeroso e prático.
            </p>
            <p>
              Tudo é preparado pela minha mãe, com o mesmo carinho que ela faz para nossa família, selecionando cada tempero e ingrediente para garantir o sabor caseiro em cada marmita.
            </p>
          </div>

          {/* Cards de diferencial */}
          <div className="grid grid-cols-2 gap-3 my-8">
            {[
              { icon: "🌿", titulo: "100% Natural",    desc: "Sem conservantes" },
              { icon: "🔥", titulo: "Fresquinha",       desc: "Feita no dia"     },
              { icon: "🥗", titulo: "Low-Carb",         desc: "Opções fitness"   },
              { icon: "🚀", titulo: "Entrega rápida",   desc: "No horário"       },
            ].map((c, i) => (
              <div key={i}
                className="flex items-start gap-3 p-3.5 border border-white/[0.06] bg-white/[0.02] hover:border-[#6DBE45]/20 hover:bg-white/[0.04] transition-all duration-200">
                <span className="text-lg">{c.icon}</span>
                <div>
                  <div className="text-white text-xs font-semibold">{c.titulo}</div>
                  <div className="text-white/30 text-[11px]">{c.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 bg-[#2E7D1E] hover:bg-[#3a9926] text-white px-7 py-3.5 rounded-full text-sm font-bold transition-all duration-300 shadow-[0_0_24px_rgba(46,125,30,0.35)] hover:shadow-[0_0_36px_rgba(46,125,30,0.5)] hover:-translate-y-0.5 active:scale-95">
            Conhecer nosso cardápio
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  )
}

export default AboutSection