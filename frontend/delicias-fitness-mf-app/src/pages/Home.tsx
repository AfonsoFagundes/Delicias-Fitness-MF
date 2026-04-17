import { useState, useEffect } from "react";
import { CartBar } from "../components/CartBar";
import { getCategories } from "../Api/CategoryApi";
import ProductCard from "../components/ProductCard";

import Logo from "@/components/Logo";
// Importando os componentes separados
import { Hero } from "../components/Hero";
import { Marquee } from "../components/Marquee";
import { FaqSection } from "../components/FaqSection";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";

interface Food {
  id: number;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
}

interface Category {
  id: number;
  name: string;
  foods: Food[];
}

function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectCategory, setSelectCategory] = useState("Todos");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data))
      .catch((err) => console.error("Erro ao carregar categorias:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredCategories =
    selectCategory === "Todos"
      ? categories
      : categories.filter((c) => c.name === selectCategory);

  return (
    <div className="bg-[#f9f9f9] min-h-screen font-sans pb-20">
      {/* 1. NAVBAR */}
      {/* 1. NAVBAR */}
      <nav className="bg-[#2E7D1E] p-4 sticky top-0 z-50 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2">
          {/* Usamos a variável logoImg aqui */}
         <Logo className="w-64 h-auto" />   
        </div>
        <CartBar />
      </nav>
      <Hero />
      <Marquee />
      <HowItWorks/>
      

      <section id="menu" className="px-5 py-8">
        <h2 className="text-xl font-bold mb-6 text-gray-900">Nosso Cardápio</h2>

        <div className="flex gap-2 overflow-x-auto pb-6 scrollbar-hide">
          <button
            className={`px-5 py-2 rounded-full text-xs transition-all font-medium whitespace-nowrap ${selectCategory === "Todos" ? "bg-[#2E7D1E] text-white shadow-md" : "bg-white border border-[#C8E6B0] text-[#5A6A52]"}`}
            onClick={() => setSelectCategory("Todos")}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`px-5 py-2 rounded-full text-xs transition-all font-medium whitespace-nowrap ${selectCategory === cat.name ? "bg-[#2E7D1E] text-white shadow-md" : "bg-white border border-[#C8E6B0] text-[#5A6A52]"}`}
              onClick={() => setSelectCategory(cat.name)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* LISTAGEM EM SLIDE (CARROSSEL) */}
        {loading ? (
          <div className="text-center py-10 text-gray-400">
            Carregando delícias...
          </div>
        ) : (
          <div className="space-y-10">
            {filteredCategories.map((cat) => (
              <div key={cat.id}>
                <h3 className="text-sm font-bold text-brand-muted uppercase tracking-wider mb-4 px-1">
                  {cat.name}
                </h3>

                {/* O CONTAINER DO SLIDE */}
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                  {cat.foods.map((food) => (
                    <div
                      key={food.id}
                      className="min-w-[220px] flex-shrink-0 snap-start"
                    >
                      <div className="bg-white border border-[#C8E6B0] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="h-40 bg-gray-50 flex items-center justify-center overflow-hidden">
                          {food.imageUrl ? (
                            <img
                              src={food.imageUrl}
                              alt={food.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-5xl opacity-40">🍱</span>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-gray-800 text-sm truncate">
                            {food.name}
                          </h3>
                          <p className="text-[10px] text-gray-500 mt-1 h-8 overflow-hidden leading-tight">
                            {food.description || "Sabor caseiro e selecionado."}
                          </p>
                          <div className="flex justify-between items-center mt-4">
                            <span className="text-[#2E7D1E] font-bold text-base">
                              R$ {food.price.toFixed(2)}
                            </span>
                            <ProductCard
                              id={food.id}
                              name={food.name}
                              price={food.price}
                              category={cat.name}
                              description={food.description}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 6. FAQ */}
      <FaqSection />
      {/* AbouT US*/}
      <AboutSection/>

      {/* 7. FOOTER */}
      <Footer/>
    </div>
  );
}

export default Home;
