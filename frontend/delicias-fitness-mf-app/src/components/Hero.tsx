import { useEffect, useRef } from "react"
import marmita from "@/assets/marmita.jpg"

export const Hero = () => {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / (rect.width / 2)
      const dy = (e.clientY - cy) / (rect.height / 2)
      const rotateX = dy * -12
      const rotateY = dx * 12
      const glowX = 50 + dx * 30
      const glowY = 50 + dy * 30
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`
      card.style.setProperty("--glow-x", `${glowX}%`)
      card.style.setProperty("--glow-y", `${glowY}%`)
    }

    const handleMouseLeave = () => {
      card.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)`
    }

    window.addEventListener("mousemove", handleMouseMove)
    card.addEventListener("mouseleave", handleMouseLeave)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      card.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <section className="bg-[#080f05] min-h-[100svh] relative flex items-center overflow-hidden">

      {/* Grade de fundo */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(46,125,30,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(46,125,30,0.06)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_50%,black,transparent)]" />

      {/* Glow central */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_60%,rgba(46,125,30,0.18),transparent_70%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">

        {/* Coluna esquerda */}
        <div className="flex flex-col items-start">

          <div className="inline-flex items-center gap-2 bg-[#6DBE45]/10 border border-[#6DBE45]/25 text-[#6DBE45] px-4 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[.2em] mb-7"
            style={{ animation: "fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s both" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#6DBE45] animate-pulse" />
            Comida Caseira & Saudável
          </div>

          <h1
            className="text-white font-serif text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.04] mb-6"
            style={{ animation: "fadeUp 0.75s cubic-bezier(0.16,1,0.3,1) 0.2s both" }}>
            Marmitas{" "}
            <em className="not-italic text-[#6DBE45]">saudáveis</em>
            <br />
            feitas com{" "}
            <em className="italic text-[#6DBE45]">amor</em>
          </h1>

          <div
            className="w-10 h-px bg-[#6DBE45]/50 mb-6"
            style={{ animation: "scaleIn 0.6s cubic-bezier(0.16,1,0.3,1) 0.35s both" }} />

          <p
            className="text-white/55 text-lg leading-relaxed max-w-sm mb-10"
            style={{ animation: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s both" }}>
            O sabor da comida da mãe, com a praticidade que você precisa para o seu dia a dia.
          </p>

          <div
            className="flex flex-wrap gap-3"
            style={{ animation: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.52s both" }}>
            <button
              onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
              className="group inline-flex items-center gap-2 bg-[#2E7D1E] hover:bg-[#3a9926] text-white px-7 py-3.5 rounded-full text-sm font-bold transition-all duration-300 shadow-[0_0_24px_rgba(46,125,30,0.4)] hover:shadow-[0_0_36px_rgba(46,125,30,0.6)] hover:-translate-y-0.5 active:scale-95">
              Ver Cardápio
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
            <button className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.15] hover:bg-white/[0.12] text-white px-7 py-3.5 rounded-full text-sm font-bold transition-all duration-300 active:scale-95">
              Saiba Mais
            </button>
          </div>

          {/* Trust indicators */}
          <div
            className="flex flex-wrap gap-5 mt-10 pt-8 border-t border-white/[0.07]"
            style={{ animation: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.65s both" }}>
            {[
              { n: "100%",    l: "caseiro"      },
              { n: "Entrega", l: "no almoço"    },
              { n: "Low-Carb",l: "disponível"   },
            ].map((s, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-white text-base font-bold leading-none">{s.n}</span>
                <span className="text-white/35 text-[11px] tracking-[.1em] uppercase mt-0.5">{s.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Coluna direita — marmita 3D */}
        <div className="flex items-center justify-center lg:justify-end">
          <div
            className="relative"
            style={{ animation: "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s both" }}>

            {/* Glow atrás */}
            <div className="absolute inset-0 -z-10 blur-3xl scale-75 bg-[radial-gradient(circle,rgba(109,190,69,0.35),transparent_70%)]" />

            {/* Card 3D */}
            <div
              ref={cardRef}
              className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px] rounded-3xl overflow-hidden cursor-none"
              style={{
                transition: "transform 0.15s ease-out",
                transformStyle: "preserve-3d",
                boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(109,190,69,0.15)",
              }}>

              {/* Imagem */}
              <img
                src={marmita}
                alt="Marmita fitness saudável — Delícias Fitness M.F"
                className="w-full h-full object-cover"
              />

              {/* Reflexo dinâmico */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  background: `radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 30%), rgba(255,255,255,0.12) 0%, transparent 60%)`,
                  transition: "background 0.1s ease-out",
                }} />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Badge live */}
              <div className="absolute bottom-5 left-5 right-5">
                <div className="bg-black/40 backdrop-blur-md border border-white/[0.12] rounded-2xl px-4 py-3 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-[.2em] text-white/50 mb-0.5">Pedidos abertos</div>
                    <div className="text-white text-sm font-bold">Entrega no almoço 🍱</div>
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#6DBE45] animate-pulse" />
                </div>
              </div>
            </div>

            {/* Tags flutuantes */}
            <div
              className="absolute -top-4 -right-4 bg-[#2E7D1E] text-white text-[11px] font-bold px-4 py-2 rounded-full shadow-lg shadow-green-900/40"
              style={{ animation: "float 3s ease-in-out infinite" }}>
              🌿 Fit & Saudável
            </div>
            <div
              className="absolute -bottom-4 -left-4 bg-[#0a1a06] border border-[#6DBE45]/30 text-white text-[11px] font-medium px-4 py-2 rounded-full shadow-lg"
              style={{ animation: "float 3s ease-in-out 1.5s infinite" }}>
              ⚡ Low-Carb • Proteico • Detox
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero