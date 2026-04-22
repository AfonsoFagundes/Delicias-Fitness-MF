// src/components/Navbar.tsx
import { useState, useEffect } from "react";
import { CartBar } from "./CartBar";
import Logo from "@/components/Logo";

const navLinks = [
  { label: "Cardápio", href: "#menu" },
  { label: "Como Funciona", href: "#howItWorks" },
  { label: "Feedback", href: "#feedback" },
  { label: "Sobre Nós", href: "#sobre" },
  { label: "FAQ", href: "#faq" },
];

function smoothScroll(href: string) {
  document
    .getElementById(href.replace("#", ""))
    ?.scrollIntoView({ behavior: "smooth" });
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Bloqueia scroll quando menu mobile aberto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav
        className={`bg-[#080f05] p-4 sticky top-0 z-50 flex justify-between items-center shadow-md transition-all duration-300 ${
          scrolled ? "border-b border-white/[0.06]" : ""
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Logo className="w-48 sm:w-64 h-auto" />
        </div>

        {/* Links desktop */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => smoothScroll(l.href)}
              className="text-[11px] font-medium tracking-[.15em] uppercase text-white/40 hover:text-white transition-colors duration-200"
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Direita: Cart + Burger */}
        <div className="flex items-center gap-3">
          {/* CartBar fica aqui no desktop — mas ele é fixed, não afeta o layout */}
          <CartBar />

          {/* Burger mobile */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
            aria-label="Menu"
          >
            {open ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Menu mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 top-[64px] z-40 bg-[#080f05] flex flex-col px-6 pt-8 pb-12 gap-1 md:hidden"
          style={{ animation: "fadeUp 0.25s cubic-bezier(0.16,1,0.3,1) both" }}
        >
          {navLinks.map((l, i) => (
            <button
              key={l.href}
              onClick={() => {
                smoothScroll(l.href);
                setOpen(false);
              }}
              className="text-left font-serif text-3xl font-normal text-white/80 hover:text-[#6DBE45] transition-colors py-3 border-b border-white/[0.06]"
              style={{
                animation: `fadeUp 0.3s cubic-bezier(0.16,1,0.3,1) ${i * 0.06}s both`,
              }}
            >
              {l.label}
            </button>
          ))}

          {/* WhatsApp no menu mobile */}

          <button
            onClick={() => {
              setOpen(false);
              document
                .getElementById("menu")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="mt-6 inline-flex items-center justify-center gap-2 bg-[#2E7D1E] text-white text-[11px] font-bold tracking-[.18em] uppercase px-8 py-4 transition-colors hover:bg-[#3a9926]"
            style={{
              borderRadius: "100px",
              animation: "fadeUp 0.3s cubic-bezier(0.16,1,0.3,1) 0.28s both",
            }}
          >
            Fazer Pedido
            <svg
              className="w-4 h-4"
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
          </button>
        </div>
      )}
    </>
  );
}

export default Navbar;
