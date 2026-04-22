// src/components/HowItWorks.tsx
import { UtensilsCrossed, ShoppingCart, ClipboardList, MessageCircle } from "lucide-react"

const steps = [
  {
    num: "01",
    title: "Escolha no cardápio",
    desc: "Explore as marmitas, kits e combos. Filtre por Low-Carb, proteico, detox e muito mais.",
    icon: <UtensilsCrossed className="w-5 h-5 text-[#2E7D1E]" />,
  },
  {
    num: "02",
    title: "Adicione ao carrinho",
    desc: "Monte seu pedido como preferir. Adicione vários itens e ajuste as quantidades.",
    icon: <ShoppingCart className="w-5 h-5 text-[#2E7D1E]" />,
  },
  {
    num: "03",
    title: "Informe seus dados",
    desc: "Preencha seus dados no carrinho para a entrega.",
    icon: <ClipboardList className="w-5 h-5 text-[#2E7D1E]" />,
  },
  {
    num: "04",
    title: "Pedido pelo WhatsApp",
    desc: "O botão do WhatsApp é liberado. Seu pedido é enviado e confirmado.",
    icon: <MessageCircle className="w-5 h-5 text-[#2E7D1E]" />,
  },
]

export function HowItWorks() {
  return (
    <section id="howItWorks" className="bg-[#080f05] py-20 sm:py-28 px-6 relative overflow-hidden">

      {/* Grade de fundo sutil */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(46,125,30,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(46,125,30,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_50%,black,transparent)]" />

      {/* Glow central */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(46,125,30,0.1),transparent_70%)]" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <div
            className="inline-flex items-center gap-2 bg-[#6DBE45]/10 border border-[#6DBE45]/25 text-[#6DBE45] px-4 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[.2em] mb-6"
            style={{ animation: "fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s both" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#6DBE45] animate-pulse" />
            Simples & Rápido
          </div>

          <h2
            className="text-white font-serif text-4xl sm:text-5xl font-normal leading-[1.08] mb-4"
            style={{ animation: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s both" }}>
            Como{" "}
            <em className="not-italic text-[#6DBE45]">funciona</em>?
          </h2>

          <p
            className="text-white/45 text-base leading-relaxed max-w-md"
            style={{ animation: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s both" }}>
            Em poucos passos você garante sua marmita fresquinha.
            Pedido pelo site, entrega combinada pelo WhatsApp.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04] mb-6">

          {/* Linha conectora desktop */}
          <div className="hidden lg:block absolute top-[52px] left-[calc(12.5%+16px)] right-[calc(12.5%+16px)] h-px border-t border-dashed border-[#6DBE45]/20 z-0 pointer-events-none" />

          {steps.map((step, i) => (
            <div
              key={step.num}
              className="relative z-10 group bg-[#0a1505] hover:bg-[#0d1c07] border-0 p-8 flex flex-col gap-4 transition-all duration-300"
              style={{ animation: `fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.1}s both` }}>

              {/* Linha de acento hover */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#6DBE45] group-hover:w-full transition-all duration-500" />

              {/* Número */}
              <div className="flex items-center justify-between mb-1">
                <span className="font-serif text-5xl font-normal text-[#6DBE45]/15 leading-none select-none">
                  {step.num}
                </span>
                <span className="text-[10px] font-semibold tracking-[.2em] uppercase text-[#6DBE45]/40 border border-[#6DBE45]/15 px-2.5 py-1 rounded-full">
                  passo
                </span>
              </div>

              {/* Ícone */}
              <div className="w-11 h-11 rounded-xl bg-[#6DBE45]/10 border border-[#6DBE45]/20 flex items-center justify-center group-hover:bg-[#6DBE45]/20 group-hover:border-[#6DBE45]/40 transition-all duration-300">
                {step.icon}
              </div>

              {/* Texto */}
              <p className="font-semibold text-white text-sm leading-snug">
                {step.title}
              </p>
              <p className="text-white/40 text-xs leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div
          className="relative overflow-hidden bg-[#0d1c07] border border-[#6DBE45]/15 rounded-none px-7 sm:px-10 py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
          style={{ animation: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.6s both" }}>

          {/* Glow interno */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_0%_50%,rgba(109,190,69,0.08),transparent_70%)]" />

          <p className="relative text-white font-serif text-lg sm:text-2xl font-normal leading-snug">
            Pronto! Agora é só esperar sua{" "}
            <em className="not-italic text-[#6DBE45]">marmita chegando</em> 🍱
          </p>

          <button
            onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
            className="relative shrink-0 inline-flex items-center gap-2 bg-[#2E7D1E] hover:bg-[#3a9926] text-white rounded-full px-7 py-3 text-sm font-bold transition-all duration-200 shadow-[0_0_20px_rgba(46,125,30,0.35)] hover:shadow-[0_0_32px_rgba(46,125,30,0.5)] hover:-translate-y-0.5 active:scale-95">
            Ver cardápio
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks