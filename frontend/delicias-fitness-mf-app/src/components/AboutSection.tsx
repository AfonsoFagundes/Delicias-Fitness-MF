import Miriam from "../assets/Miriam.jpeg"

export function AboutSection() {
  return (
    <section id="sobre" className="py-20 bg-white px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Lado da Imagem */}
        <div className="relative">
          <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
             <img 
               src={Miriam} 
               alt="Cozinha Delícias Fitness" 
               className="w-full h-full object-cover"
             />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-[#6DBE45] p-6 rounded-2xl text-white shadow-xl hidden sm:block">
            <p className="text-3xl font-bold">100%</p>
            <p className="text-xs uppercase tracking-wider font-medium">Natural</p>
          </div>
        </div>

        {/* Lado do Texto */}
        <div>
          <span className="text-[#FF6B00] font-bold text-xs uppercase tracking-[0.2em] mb-4 block">
            Nossa História
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A2E05] leading-tight mb-6">
            Comida de verdade, feita com <span className="text-[#6DBE45]">amor de mãe</span>
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              O Delícias Fitness M.F nasceu do desejo de transformar a alimentação saudável em algo prazeroso e prático.
            </p>
            <p>
              Tudo é preparado pela minha mãe, com o mesmo carinho que ela faz para nossa família, selecionando cada tempero e ingrediente para garantir o sabor caseiro em cada marmita.
            </p>
          </div>
          
          <button onClick={() => document.getElementById("menu")?.scrollIntoView({behavior: 'smooth'})} className="mt-8 bg-[#1A2E05] text-white px-8 py-4 rounded-full font-bold hover:bg-[#2e520a] transition-all">
            Conhecer nosso cardápio
          </button>
        </div>

      </div>
    </section>
  )
}

export default AboutSection; 