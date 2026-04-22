import { Instagram, MapPin, Phone } from "lucide-react"
import LogoImg from "../assets/logo-delicias-fitness.svg"

export function Footer() {
  return (
    <footer className="bg-[#050c03] border-t border-white/[0.05] relative overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(46,125,30,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(46,125,30,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_50%,black,transparent)]" />

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-[radial-gradient(ellipse,rgba(46,125,30,0.07),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

          {/* Logo */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <div className="w-48 h-12">
              <img
                src={LogoImg}
                className="w-full h-full object-contain object-left"
                alt="Delícias Fitness M.F"
              />
            </div>

            <p className="text-white/35 text-sm leading-relaxed max-w-sm">
              Sua dose diária de saúde e sabor. Marmitas feitas com ingredientes selecionados e o carinho que só comida de verdade tem.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/deliciasfitnessmf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-white/40 hover:border-[#6DBE45]/40 hover:bg-[#6DBE45]/10 hover:text-[#6DBE45] transition-all duration-200"
              >
                <Instagram size={17} />
              </a>

              <a
                href="#"
                className="w-10 h-10 border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-white/40 hover:border-[#6DBE45]/40 hover:bg-[#6DBE45]/10 hover:text-[#6DBE45] transition-all duration-200"
              >
                <Phone size={16} />
              </a>
            </div>
          </div>

          {/* Navegação */}
          <div className="md:col-span-3 flex flex-col gap-5">
            <h4 className="text-[10px] font-semibold uppercase tracking-[.25em] text-[#6DBE45]">
              Explorar
            </h4>

            <nav className="flex flex-col gap-3">
              {[
                { label: "Nosso Cardápio", href: "#cardapio" },
                { label: "Kits Promocionais", href: "#combos" },
                { label: "Sobre Nós", href: "#sobre" },
              ].map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-white/35 hover:text-white text-sm transition-colors duration-200 w-fit"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Atendimento */}
          <div className="md:col-span-4 flex flex-col gap-5">
            <h4 className="text-[10px] font-semibold uppercase tracking-[.25em] text-[#6DBE45]">
              Atendimento
            </h4>

            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin size={15} className="text-[#6DBE45]" />
                <p className="text-white/35 text-sm">
                  Entregas em toda região do norte da ilha Florianópolis/Ingleses.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#6DBE45] animate-pulse" />
                <p className="text-white/35 text-sm font-medium">
                  Pedidos abertos até as 20h
                </p>
              </div>
            </div>

            <div className="mt-2 p-4 border border-white/[0.06] bg-white/[0.02] flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#6DBE45]/10 border border-[#6DBE45]/20 flex items-center justify-center">
                🍱
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-[.18em] text-white/25">
                  Horário
                </div>
                <div className="text-white/60 text-xs font-medium">
                  Seg a Sáb — até as 15h
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-8 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-white/20 font-medium uppercase tracking-[.2em]">
            © 2026 Delicias Fitness M.F — Todos os direitos reservados
          </p>

          <div className="flex items-center gap-1.5 text-[10px] text-white/20 font-medium uppercase tracking-[.2em]">
            <span>Desenvolvido com</span>
            <span>❤️</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer