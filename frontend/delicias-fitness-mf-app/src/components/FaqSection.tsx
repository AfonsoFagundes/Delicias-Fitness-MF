import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface FaqItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

function FaqItem({ question, answer, isOpen, onToggle }: FaqItemProps) {
  return (
    <div
      className={`border-b border-white/[0.07] transition-colors duration-300 ${
        isOpen ? "border-[#6DBE45]/20" : ""
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between py-6 text-left gap-4 group"
      >
        <span
          className={`text-base sm:text-lg font-medium transition-colors duration-200 leading-snug ${
            isOpen
              ? "text-[#6DBE45]"
              : "text-white/80 group-hover:text-white"
          }`}
        >
          {question}
        </span>

        <div
          className={`flex-shrink-0 w-8 h-8 border flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? "border-[#6DBE45]/40 bg-[#6DBE45]/10"
              : "border-white/[0.1] bg-white/[0.03] group-hover:border-white/20"
          }`}
        >
          <ChevronDown
            className={`w-4 h-4 transition-all duration-300 ${
              isOpen ? "rotate-180 text-[#6DBE45]" : "text-white/40"
            }`}
          />
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-40 pb-6" : "max-h-0"
        }`}
      >
        <p className="text-white/45 text-sm sm:text-base leading-relaxed pr-12">
          {answer}
        </p>
      </div>
    </div>
  )
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      q: "Qual o horário para pedir?",
      a: "Pedidos até as 15h para entrega no dia ou para o dia seguinte. Aos domingos não fazemos entregas.",
    },
    {
      q: "Quais as formas de pagamento?",
      a: "Aceitamos PIX e cartões na entrega.",
    },
    {
      q: "As marmitas são congeladas?",
      a: "Não! São preparadas no dia, fresquinhas e embaladas na hora.",
    },
    {
      q: "Tem opção vegetariana?",
      a: "Sim! Temos marmitas veggies e sucos detox todos os dias.",
    },
  ]

  return (
    <div id="faq" className="bg-[#080f05] py-20 sm:py-28 px-6 relative overflow-hidden">
      {/* Grade de fundo */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(46,125,30,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(46,125,30,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_50%,black,transparent)]" />

      {/* Glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[radial-gradient(circle,rgba(109,190,69,0.07),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Coluna esquerda */}
          <div className="lg:col-span-5">
            <div
              className="inline-flex items-center gap-2 bg-[#6DBE45]/10 border border-[#6DBE45]/25 text-[#6DBE45] px-4 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[.2em] mb-7"
              style={{
                animation:
                  "fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s both",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#6DBE45] animate-pulse" />
              Dúvidas comuns
            </div>

            <h2
              className="text-white font-serif text-4xl sm:text-5xl font-normal leading-[1.08] mb-5"
              style={{
                animation:
                  "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s both",
              }}
            >
              Perguntas <br className="hidden sm:block" />
              <em className="not-italic text-[#6DBE45]">Frequentes</em>
            </h2>

            <p
              className="text-white/40 text-sm sm:text-base leading-relaxed mb-10 max-w-sm"
              style={{
                animation:
                  "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s both",
              }}
            >
              Preparamos essa seção para te ajudar rapidinho. Se ainda
              precisar, nosso suporte está a um clique.
            </p>

            <a
              href="https://wa.me/55XXXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#6DBE45] text-sm font-semibold group"
              style={{
                animation:
                  "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s both",
              }}
            >
              <span className="border-b border-[#6DBE45]/40 group-hover:border-[#6DBE45] pb-0.5 transition-colors">
                Ainda com dúvida? Chame no WhatsApp
              </span>

              <svg
                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </a>

            {/* Card */}
            <div
              className="mt-10 p-5 border border-white/[0.07] bg-white/[0.02] flex items-center gap-4"
              style={{
                animation:
                  "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.5s both",
              }}
            >
              <div className="w-10 h-10 rounded-full bg-[#6DBE45]/10 border border-[#6DBE45]/20 flex items-center justify-center flex-shrink-0">
                <span className="text-lg">🍱</span>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-[.2em] text-white/30 mb-0.5">
                  Pedidos abertos
                </div>
                <div className="text-white text-sm font-medium">
                  Seg a Sáb até as 15h
                </div>
              </div>

              <div className="ml-auto w-2 h-2 rounded-full bg-[#6DBE45] animate-pulse" />
            </div>
          </div>

          {/* Coluna direita */}
          <div
            className="lg:col-span-7"
            style={{
              animation:
                "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s both",
            }}
          >
            <div className="flex flex-col border-t border-white/[0.07]">
              {faqs.map((faq, i) => (
                <FaqItem
                  key={i}
                  question={faq.q}
                  answer={faq.a}
                  isOpen={openIndex === i}
                  onToggle={() =>
                    setOpenIndex(openIndex === i ? null : i)
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FaqSection