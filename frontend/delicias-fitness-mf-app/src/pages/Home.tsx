import { useState, useEffect } from "react"
import { getCategories } from "../Api/CategoryApi"
import ProductCard from "../components/ProductCard"

import { Hero } from "../components/Hero"
import { Marquee } from "../components/Marquee"
import { FaqSection } from "../components/FaqSection"
import HowItWorks from "@/components/HowItWorks"
import Footer from "@/components/Footer"
import AboutSection from "@/components/AboutSection"
import TestimonialsSection from "@/components/Testimonials"
import Navbar from "@/components/NavBar"

interface Food {
  id: number
  name: string
  price: number
  description?: string
  imageUrl?: string
}

interface Category {
  id: number
  name: string
  foods: Food[]
}

function Home() {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectCategory, setSelectCategory] = useState("Todos")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data))
      .catch((err) => console.error("Erro ao carregar categorias:", err))
      .finally(() => setLoading(false))
  }, [])

  const filteredCategories =
    selectCategory === "Todos"
      ? categories
      : categories.filter((c) => c.name === selectCategory)

  return (
    <div className="bg-[#f7f7f2] min-h-screen font-sans pb-20">

      {/* ── NAVBAR ── */} 
      <Navbar/>
      <Hero />
      <Marquee />
      <HowItWorks />
     

      {/* ── CARDÁPIO ── */}
      <section id="menu" className="bg-[#f7f7f2] px-5 py-14">
        <div className="max-w-6xl mx-auto">

          {/* Header da seção */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-[#2E7D1E]/10 border border-[#2E7D1E]/20 text-[#2E7D1E] px-4 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[.2em] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D1E] animate-pulse" />
              Feito hoje
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A2E05] leading-tight">
              Nosso <em className="not-italic text-[#2E7D1E]">Cardápio</em>
            </h2>
          </div>

          {/* Filtros de categoria */}
          <div className="flex gap-2 overflow-x-auto pb-5 scrollbar-hide mb-8">
            <button
              onClick={() => setSelectCategory("Todos")}
              className={`px-5 py-2.5 text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
                selectCategory === "Todos"
                  ? "bg-[#2E7D1E] text-white border-[#2E7D1E] shadow-[0_0_16px_rgba(46,125,30,0.3)]"
                  : "bg-white border-[#e2ede0] text-[#5A6A52] hover:border-[#2E7D1E]/40 hover:text-[#2E7D1E]"
              } rounded-full`}>
              Todos
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectCategory(cat.name)}
                className={`px-5 py-2.5 text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
                  selectCategory === cat.name
                    ? "bg-[#2E7D1E] text-white border-[#2E7D1E] shadow-[0_0_16px_rgba(46,125,30,0.3)]"
                    : "bg-white border-[#e2ede0] text-[#5A6A52] hover:border-[#2E7D1E]/40 hover:text-[#2E7D1E]"
                } rounded-full`}>
                {cat.name}
              </button>
            ))}
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-10 h-10 border-2 border-[#2E7D1E]/20 border-t-[#2E7D1E] rounded-full animate-spin" />
              <p className="text-[#2E7D1E]/60 text-sm font-medium">Carregando delícias...</p>
            </div>
          ) : (
            <div className="space-y-12">
              {filteredCategories.map((cat) => (
                <div key={cat.id}>

                  {/* Label da categoria */}
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-[10px] font-bold text-[#2E7D1E] uppercase tracking-[.25em]">
                      {cat.name}
                    </span>
                    <div className="flex-1 h-px bg-[#e2ede0]" />
                  </div>

                  {/* Cards em carrossel */}
                  <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                    {cat.foods.map((food) => (
                      <div
                        key={food.id}
                        className="min-w-[220px] flex-shrink-0 snap-start">

                        <div className="group bg-white border border-[#e8f0e4] hover:border-[#2E7D1E]/30 rounded-2xl overflow-hidden hover:shadow-[0_8px_32px_rgba(46,125,30,0.1)] transition-all duration-300 hover:-translate-y-0.5">

                          {/* Imagem */}
                          <div className="h-40 bg-[#f0f7eb] flex items-center justify-center overflow-hidden relative">
                            {food.imageUrl ? (
                              <img
                                src={food.imageUrl}
                                alt={food.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            ) : (
                              <span className="text-5xl opacity-30">🍱</span>
                            )}
                            {/* Linha de acento hover */}
                            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#2E7D1E] group-hover:w-full transition-all duration-500" />
                          </div>

                          {/* Conteúdo */}
                          <div className="p-4">
                            <h3 className="font-semibold text-[#1A2E05] text-sm truncate mb-1">
                              {food.name}
                            </h3>
                            <p className="text-[11px] text-[#8a9e80] h-8 overflow-hidden leading-relaxed">
                              {food.description || "Sabor caseiro e selecionado."}
                            </p>

                            <div className="flex justify-between items-center mt-4 pt-3 border-t border-[#f0f5ee]">
                              <div>
                                <div className="text-[9px] uppercase tracking-[.15em] text-[#8a9e80] mb-0.5">Preço</div>
                                <span className="text-[#2E7D1E] font-bold text-base leading-none">
                                  R$ {food.price.toFixed(2)}
                                </span>
                              </div>
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
        </div>
      </section>

      <FaqSection />
       <TestimonialsSection/>
      <AboutSection />
      <Footer />
    </div>
  )
}

export default Home;