import { Instagram, MapPin, Phone } from "lucide-react";
import LogoImg from "../assets/logo-delicias-fitness.svg"

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Coluna Logo + Social */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <div className="w-48 h-12 relative overflow-hidden">
               {/* Usando div de contenção para o logo não esticar */}
               <img src={LogoImg} className="w-full h-full object-contain object-left" />
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
              Sua dose diária de saúde e sabor. Marmitas feitas com ingredientes selecionados e o carinho que só comida de verdade tem.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com/deliciasfitnessmf" className="w-10 h-10 rounded-full bg-[#f0f9eb] flex items-center justify-center text-[#2E7D1E] hover:bg-[#2E7D1E] hover:text-white transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#f0f9eb] flex items-center justify-center text-[#2E7D1E] hover:bg-[#2E7D1E] hover:text-white transition-all">
                <Phone size={18} />
              </a>
            </div>
          </div>

          {/* Coluna Navegação */}
          <div className="md:col-span-3 flex flex-col gap-6">
            <h4 className="text-[#1A2E05] font-bold text-xs uppercase tracking-widest">Explorar</h4>
            <nav className="flex flex-col gap-3">
              <a href="#cardapio" className="text-gray-500 hover:text-[#2E7D1E] text-sm transition-colors">Nosso Cardápio</a>
              <a href="#combos" className="text-gray-500 hover:text-[#2E7D1E] text-sm transition-colors">Kits Promocionais</a>
              <a href="#sobre" className="text-gray-500 hover:text-[#2E7D1E] text-sm transition-colors">Sobre Nós</a>
            </nav>
          </div>

          {/* Coluna Contato */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <h4 className="text-[#1A2E05] font-bold text-xs uppercase tracking-widest">Atendimento</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[#6DBE45] shrink-0" />
                <p className="text-gray-500 text-sm">Entregas em toda região do norte da ilha  Florianópolis/Ingleses.</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></div>
                <p className="text-gray-500 text-sm font-medium">Pedidos abertos até as 20h</p>
              </div>
            </div>
          </div>

        </div>

        {/* Linha Final */}
        <div className="mt-16 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
            © 2026 Delicias Fitness M.F — Todos os direitos reservados
          </p>
          <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
            <span>Desenvolvido com</span>
            <span className="text-red-500">❤️</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
export default Footer;