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
    <div className="border-b border-white/10">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-6 text-left transition-all"
      >
        <span className={`text-base sm:text-lg font-medium transition-colors ${isOpen ? "text-[#6DBE45]" : "text-white"}`}>
          {question}
        </span>
        <ChevronDown 
          className={`w-5 h-5 text-white/50 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#6DBE45]" : ""}`} 
        />
      </button>

      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-40 pb-6" : "max-h-0"}`}>
        <p className="text-white/60 text-sm sm:text-base leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  )
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    { q: "Qual o horário para pedir?", a: "Pedidos até as 15h para entrega no dia ou para o dia seguinte. Aos domingos não fazemos entregas." },
    { q: "Quais as formas de pagamento?", a: "Aceitamos PIX e cartões na entrega." },
    { q: "As marmitas são congeladas?", a: "Não! São preparadas no dia, fresquinhas e embaladas na hora." },
    { q: "Tem opção vegetariana?", a: "Sim! Temos marmitas veggies e sucos detox todos os dias." },
  ]

  return (
    <section className="bg-[#0D1A02] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          <div className="lg:col-span-5">
            <span className="text-[#6DBE45] font-bold text-xs uppercase tracking-widest mb-4 block">
              Dúvidas comuns
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-6">
              Perguntas <br className="hidden sm:block" /> Frequentes
            </h2>
            <p className="text-white/50 mb-8 max-w-sm">
              Preparamos essa seção para te ajudar rapidinho. Se ainda precisar, nosso suporte está a um clique.
            </p>
            <a 
              href="https://wa.me/55XXXXXXXXXXX"
              target="_blank"
              className="inline-flex items-center gap-2 text-white font-bold text-sm border-b-2 border-[#6DBE45] pb-1 hover:text-[#6DBE45] transition-colors"
            >
              Ainda com dúvida? Chame no Zap →
            </a>
          </div>

          <div className="lg:col-span-7">
            <div className="flex flex-col border-t border-white/10">
              {faqs.map((faq, i) => (
                <FaqItem
                  key={i}
                  question={faq.q}
                  answer={faq.a}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
export default FaqSection;