export const Marquee = () => {
  const items = ["🍱 Marmita Fit", "🥤 Suco Detox", "🥗 Low Carb", "🔥 Proteico"]
  
  return (
    <div className="bg-brand-green-light py-3 overflow-hidden border-y border-white/10">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="text-white font-bold px-10 text-sm uppercase tracking-wider">
            {item}  •
          </span>
        ))}
      </div>
    </div>
  )
}