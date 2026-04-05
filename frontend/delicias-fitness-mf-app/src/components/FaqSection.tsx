import { useState } from "react"

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div 
      className="bg-white border border-gray-100 rounded-2xl p-4 mb-3 cursor-pointer transition-all hover:shadow-sm"
      onClick={() => setOpen(!open)}
    >
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold text-gray-800">{question}</span>
        <span className={`text-xl text-[#2E7D1E] transition-transform ${open ? "rotate-45" : ""}`}>+</span>
      </div>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-40 mt-3 opacity-100" : "max-h-0 opacity-0"}`}>
        <p className="text-xs text-gray-500 leading-relaxed">{answer}</p>
      </div>
    </div>
  )
}

export const FaqSection = () => {
  const faqs = [
    { q: "Qual o horário para pedir?", a: "Pedidos até as 20h para entrega no dia seguinte." },
    { q: "Quais as formas de pagamento?", a: "Aceitamos PIX, cartões de crédito e débito na entrega." },
    { q: "Tem opção vegetariana?", a: "Sim! Temos marmitas veggies e sucos detox todos os dias." },
  ]

  return (
    <section className="px-5 py-8">
      <h2 className="text-xl font-bold mb-5 text-gray-900">Dúvidas Frequentes</h2>
      {faqs.map((f, i) => <FaqItem key={i} question={f.q} answer={f.a} />)}
    </section>
  )
}

export default FaqSection