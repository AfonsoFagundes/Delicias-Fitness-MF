// src/components/HowItWorks.tsx
import { UtensilsCrossed, ShoppingCart, ClipboardList, MessageCircle } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Escolha no cardápio",
    desc: "Explore as marmitas, kits e combos. Filtre por Low-Carb, proteico, detox e muito mais.",
    icon: <UtensilsCrossed className="w-5 h-5 text-brand-green-dark" />,
  },
  {
    num: "02",
    title: "Adicione ao carrinho",
    desc: "Monte seu pedido como preferir. Adicione vários itens e ajuste as quantidades.",
    icon: <ShoppingCart className="w-5 h-5 text-brand-green-dark" />,
  },
  {
    num: "03",
    title: "Informe seus dados",
    desc: "Preencha seus dados no carrinho para a entrega.",
    icon: <ClipboardList className="w-5 h-5 text-brand-green-dark" />,
  },
  {
    num: "04",
    title: "Pedido pelo WhatsApp",
    desc: "O botão do WhatsApp é liberado. Seu pedido é enviado e confirmado.",
    icon: <MessageCircle className="w-5 h-5 text-brand-green-dark" />,
  },
];

export function HowItWorks() {
  return (
    <section className="bg-[#f7f7f2] py-14 sm:py-20 px-4 sm:px-6">
      <div className="max-w-8x1 mx-auto">

        <span className="inline-flex items-center gap-1.5 bg-[#eaf6e0] border border-brand-green-light text-brand-green-dark text-[11px] sm:text-xs font-medium tracking-widest uppercase px-3 sm:px-4 py-1.5 rounded-full mb-4 sm:mb-5">
          Simples & Rápido
        </span>

        <h2 className="font-extrabold text-3xl sm:text-4xl text-brand-dark mb-2 leading-tight">
          Como <span className="text-brand-green-light">funciona</span>?
        </h2>
        <p className="text-brand-muted text-sm sm:text-base leading-relaxed max-w-md mb-10 sm:mb-12">
          Em poucos passos você garante sua marmita fresquinha.
          Pedido pelo site, entrega combinada pelo WhatsApp.
        </p>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-8">

          
          <div className="hidden lg:block absolute top-[38px] left-[calc(12.5%+8px)] right-[calc(12.5%+8px)] h-px border-t-2 border-dashed border-[#c5dbb8] z-0 pointer-events-none" />

          {steps.map((step) => (
            <div
              key={step.num}
              className="relative z-10 bg-white border-[1.5px] border-[#e2ede0] rounded-2xl pt-8 pb-6 px-5 sm:px-6 flex flex-col gap-3 hover:border-brand-green-light hover:-translate-y-0.5 transition-all duration-200 group"
            >
              {/* número */}
              <span className="absolute -top-3.5 left-5 bg-brand-orange text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-sm">
                {step.num}
              </span>

              {/* ícone */}
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#eaf6e0] flex items-center justify-center group-hover:bg-[#d6f0c0] transition-colors duration-200">
                {step.icon}
              </div>

              <p className="font-bold text-brand-dark text-sm sm:text-base leading-snug">
                {step.title}
              </p>
              <p className="text-brand-muted text-xs sm:text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

       
        <div className="bg-brand-dark-surface rounded-2xl px-5 sm:px-8 py-6 sm:py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-white font-bold text-base sm:text-xl leading-snug">
            Pronto! Agora é só esperar sua{" "}
            <span className="text-brand-green-light">marmita chegando</span> 🍱
          </p>
          <button onClick={() => document.getElementById("menu")?.scrollIntoView({behavior: "smooth"})} className="w-full sm:w-auto shrink-0 bg-brand-orange text-white rounded-full px-6 py-2.5 font-medium flex items-center justify-center gap-2 text-sm sm:text-base hover:opacity-90 active:scale-95 transition-all duration-150">
            Ver cardápio →
          </button>
        </div>

      </div>
    </section>
  );
}

export default HowItWorks;