import { useState, useEffect } from "react"

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const [perPage, setPerPage] = useState(3)

  // Detecta tamanho da tela e ajusta perPage
  useEffect(() => {
    const update = () => {
      setPerPage(window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3)
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const testimonials = [
    {
      nome: "Ana Paula S.",
      cargo: "Cliente fiel — Ingleses, SC",
      texto: "Melhor marmita que já comi! Chega quentinha, bem temperada e com muito amor. Peço toda semana!",
      nota: 5,
      avatar: "A",
    },
    {
      nome: "Marcos Oliveira",
      cargo: "Treina na academia — Florianópolis",
      texto: "Finalmente achei uma marmita low-carb gostosa de verdade. Ajudou demais nos meus resultados.",
      nota: 5,
      avatar: "M",
    },
    {
      nome: "Juliana R.",
      cargo: "Mãe e professora — Ingleses, SC",
      texto: "Prática, saudável e deliciosa. Minha filha adora as marmitas fitness. Entrega sempre no horário!",
      nota: 5,
      avatar: "J",
    },
    {
      nome: "Carlos F.",
      cargo: "Personal trainer — SC",
      texto: "Recomendo para todos os meus alunos. Comida caseira, ingredientes frescos e preço justo.",
      nota: 5,
      avatar: "C",
    },
    {
      nome: "Fernanda M.",
      cargo: "Nutricionista — Florianópolis",
      texto: "Como nutricionista, aprovo 100%. Refeições equilibradas, porções corretas e sem exagero de sódio.",
      nota: 5,
      avatar: "F",
    },
    {
      nome: "Ricardo T.",
      cargo: "Empresário — Norte da Ilha",
      texto: "Peço direto do trabalho e chega certinho no almoço. Não preciso mais me preocupar com o que comer.",
      nota: 5,
      avatar: "R",
    },
  ]

  const maxIndex = Math.max(0, testimonials.length - perPage)

  // Reset current quando perPage muda para não ficar fora do range
  useEffect(() => {
    setCurrent(0)
  }, [perPage])

  // Auto-play
  useEffect(() => {
    if (paused) return
    const interval = setInterval(() => {
      setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, 3500)
    return () => clearInterval(interval)
  }, [paused, maxIndex])

  const prev = () => {
    setPaused(true)
    setCurrent((p) => (p <= 0 ? maxIndex : p - 1))
  }

  const next = () => {
    setPaused(true)
    setCurrent((p) => (p >= maxIndex ? 0 : p + 1))
  }

  const goTo = (i: number) => {
    setPaused(true)
    setCurrent(i)
  }

  return (
    <section id="feedback" className="bg-[#080f05] py-20 sm:py-28 px-6 relative overflow-hidden">

      {/* Grade de fundo */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(46,125,30,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(46,125,30,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_50%,black,transparent)]" />

      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(46,125,30,0.08),transparent_70%)]" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div
              className="inline-flex items-center gap-2 bg-[#6DBE45]/10 border border-[#6DBE45]/25 text-[#6DBE45] px-4 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[.2em] mb-6"
              style={{ animation: "fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s both" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#6DBE45] animate-pulse" />
              Depoimentos
            </div>
            <h2
              className="text-white font-serif text-4xl sm:text-5xl font-normal leading-[1.08]"
              style={{ animation: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s both" }}>
              O que nossos clientes{" "}
              <em className="not-italic text-[#6DBE45]">dizem</em>
            </h2>
          </div>

          {/* Rating + controles */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div
              className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.07] px-4 py-2.5"
              style={{ borderRadius: "12px" }}>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 fill-[#6DBE45]" viewBox="0 0 24 24">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                ))}
              </div>
              <span className="text-white/50 text-xs font-medium">{testimonials.length}+ avaliações</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-9 h-9 border border-white/[0.08] bg-white/[0.03] hover:border-[#6DBE45]/40 hover:bg-[#6DBE45]/10 text-white/40 hover:text-[#6DBE45] transition-all duration-200 flex items-center justify-center"
                style={{ borderRadius: "10px" }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={next}
                className="w-9 h-9 border border-white/[0.08] bg-white/[0.03] hover:border-[#6DBE45]/40 hover:bg-[#6DBE45]/10 text-white/40 hover:text-[#6DBE45] transition-all duration-200 flex items-center justify-center"
                style={{ borderRadius: "10px" }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── CARROSSEL ── */}
        <div
          className="overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}>
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${current * (100 / perPage)}%)` }}>

            {testimonials.map((t, i) => (
              <div
                key={i}
                className="flex-shrink-0 px-2"
                style={{ width: `${100 / perPage}%` }}>

                <div className="group bg-[#080f05] hover:bg-[#0d1a07] transition-colors duration-300 relative overflow-hidden border border-white/[0.05] hover:border-[#6DBE45]/15 h-full">

                  {/* Linha acento hover */}
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#6DBE45] group-hover:w-full transition-all duration-500" />

                  <div className="p-6 sm:p-7 flex flex-col gap-4">

                    {/* Stars */}
                    <div className="flex gap-0.5">
                      {[...Array(t.nota)].map((_, j) => (
                        <svg key={j} className="w-3.5 h-3.5 fill-[#6DBE45]" viewBox="0 0 24 24">
                          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                        </svg>
                      ))}
                    </div>

                    {/* Texto */}
                    <p className="text-white/55 text-sm leading-relaxed font-serif italic flex-1">
                      "{t.texto}"
                    </p>

                    {/* Autor */}
                    <div className="flex items-center gap-3 pt-3 border-t border-white/[0.06]">
                      <div
                        className="w-9 h-9 bg-[#2E7D1E]/20 border border-[#6DBE45]/25 flex items-center justify-center text-[#6DBE45] font-bold text-sm flex-shrink-0"
                        style={{ borderRadius: "10px" }}>
                        {t.avatar}
                      </div>
                      <div>
                        <div className="text-white/80 text-sm font-semibold leading-none">{t.nome}</div>
                        <div className="text-white/25 text-[11px] mt-0.5">{t.cargo}</div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-7">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="transition-all duration-300"
              style={{
                width: current === i ? "24px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background: current === i ? "#6DBE45" : "rgba(255,255,255,0.15)",
              }}
            />
          ))}
        </div>

        {/* CTA */}
        <div
          className="mt-10 p-6 border border-white/[0.06] bg-white/[0.02] flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderRadius: "16px" }}>
          <div>
            <div className="text-white/60 text-sm font-medium">Já é cliente?</div>
            <div className="text-white/30 text-xs mt-0.5">Sua opinião ajuda outras pessoas a descobrirem a Delícias Fitness!</div>
          </div>
          
           <a href="https://www.google.com/search?sca_esv=ce9bda148a5d733d&sxsrf=ANbL-n7tg_o4e30JsNWtyDIuOEaaROZLcQ:1776791209396&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOUCpuJGebERNIvRTqJQgWItaCSELPUtX-k7DVhlVX_3r4Gm4HeB-eynlz1A7AA2awPbED0TSp1Ylhrq3YVQD5dCuBL0XKqM2Xm6wr8WFuHaYO4jwng%3D%3D&q=Del%C3%ADcias+Fitness+MF+Reviews&sa=X&ved=2ahUKEwjF6oCHt_-TAxW3LLkGHSNGMk8Q0bkNegQILRAF&biw=1366&bih=599&dpr=1 Quero deixar meu depoimento sobre as marmitas 🍱"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-[#2E7D1E] hover:bg-[#3a9926] text-white px-6 py-3 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
            style={{ borderRadius: "100px", boxShadow: "0 0 20px rgba(46,125,30,0.3)" }}>
            Deixar depoimento
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  )
}

export default TestimonialsSection;