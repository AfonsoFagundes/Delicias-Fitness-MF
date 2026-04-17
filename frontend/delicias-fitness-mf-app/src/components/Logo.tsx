// src/components/Logo.tsx
export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 380 100"
      className={className}
      aria-label="Delicias Fitness M.F"
    >
      {/* Ícone fundo verde */}
      <rect x="0" y="10" width="100" height="80" rx="18" fill="#2E7D1E" />

      {/* Garfo */}
      <line x1="29" y1="26" x2="29" y2="62" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="23" y1="26" x2="23" y2="38" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="29" y1="26" x2="29" y2="38" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="35" y1="26" x2="35" y2="38" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M23 38 Q29 45 35 38" fill="none" stroke="white" strokeWidth="2.5" />

      {/* Colher */}
      <ellipse cx="53" cy="36" rx="9" ry="13" fill="#FF6B1A" />
      <line x1="53" y1="49" x2="53" y2="62" stroke="#FF6B1A" strokeWidth="3.5" strokeLinecap="round" />

      {/* Sorriso */}
      <path d="M18 70 Q40 84 62 70" fill="none" stroke="white" strokeWidth="4.5" strokeLinecap="round" />

      {/* Pontinhos verdes */}
      <circle cx="18" cy="64" r="4" fill="#6DBE45" />
      <circle cx="62" cy="64" r="4" fill="#6DBE45" />

      {/* Tipografia */}
      <text x="96" y="48" fontFamily="Poppins, Arial, sans-serif" fontSize="26" fontWeight="500" fill="#1A1A1A" letterSpacing="-0.3">
        Delicias{" "}
      </text>
      <text x="96" y="48" fontFamily="Poppins, Arial, sans-serif" fontSize="26" fontWeight="700" fill="#FF6B1A" letterSpacing="-0.3" dx="100">
        Fitness
      </text>
      <text x="96" y="48" fontFamily="Poppins, Arial, sans-serif" fontSize="26" fontWeight="700" fill="#FF6B1A" letterSpacing="-0.3" dx="200">
        M.F
      </text>

      {/* Subtítulo */}
      <text x="97" y="66" fontFamily="Poppins, Arial, sans-serif" fontSize="12" fontWeight="400" fill="#FFFF" letterSpacing="1.2">
        COMIDA DE VERDADE, FEITA COM AMOR
      </text>
    </svg>
  );
}

export default Logo;