interface Props {
  visual: string;
  accent: string;
}

const SlideVisual = ({ visual, accent }: Props) => {
  const visuals: Record<string, JSX.Element> = {
    intro: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute w-48 h-48 rounded-full opacity-10" style={{ background: `radial-gradient(circle, ${accent}, transparent)` }} />
        <div className="absolute w-64 h-64 rounded-full border opacity-20 animate-ping" style={{ borderColor: accent, animationDuration: "3s" }} />
        <div className="absolute w-80 h-80 rounded-full border opacity-10 animate-ping" style={{ borderColor: accent, animationDuration: "4s", animationDelay: "1s" }} />
        <div className="text-8xl animate-pulse">🌌</div>
      </div>
    ),
    web: (
      <div className="relative w-full h-full flex items-center justify-center">
        <svg viewBox="0 0 200 200" className="w-48 h-48 opacity-60">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <line key={i} x1="100" y1="100" x2={100 + 80 * Math.cos((i * Math.PI) / 3)} y2={100 + 80 * Math.sin((i * Math.PI) / 3)} stroke={accent} strokeWidth="1" opacity="0.5" />
          ))}
          {[0, 1, 2].map((i) => (
            <circle key={i} cx="100" cy="100" r={30 + i * 25} fill="none" stroke={accent} strokeWidth="0.5" opacity="0.3" />
          ))}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <circle key={i} cx={100 + 80 * Math.cos((i * Math.PI) / 3)} cy={100 + 80 * Math.sin((i * Math.PI) / 3)} r="4" fill={accent} opacity="0.8" />
          ))}
          <circle cx="100" cy="100" r="8" fill={accent} opacity="0.5" />
        </svg>
      </div>
    ),
    telescopes: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="text-7xl">🔭</div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full border-2 opacity-30 animate-spin" style={{ borderColor: accent, animationDuration: "8s" }} />
          <div className="absolute w-24 h-24 rounded-full border opacity-20 animate-spin" style={{ borderColor: accent, animationDuration: "5s", animationDirection: "reverse" }} />
        </div>
      </div>
    ),
    gallery1: (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${40 + i * 20}px`,
              height: `${40 + i * 20}px`,
              background: `radial-gradient(circle, transparent 30%, ${accent}33 100%)`,
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 20}%`,
              border: `1px solid ${accent}44`,
            }}
          />
        ))}
        <div className="text-6xl z-10">🎨</div>
      </div>
    ),
    history: (
      <div className="relative w-full h-full flex flex-col items-center justify-center gap-3">
        {[{ year: "1978", label: "Открытие" }, { year: "1981", label: "Термин «войд»" }, { year: "2000s", label: "SDSS" }].map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-16 text-right text-sm font-bold" style={{ color: accent }}>{item.year}</div>
            <div className="w-3 h-3 rounded-full" style={{ background: accent }} />
            <div className="text-sm text-white/70">{item.label}</div>
          </div>
        ))}
      </div>
    ),
    sizes: (
      <div className="relative w-full h-full flex items-center justify-center">
        {[{ r: 16, label: "Малый" }, { r: 28, label: "Средний" }, { r: 44, label: "KBC" }].map((item, i) => (
          <div key={i} className="absolute" style={{ width: `${item.r * 2}px`, height: `${item.r * 2}px` }}>
            <div className="w-full h-full rounded-full border-2 opacity-60 flex items-center justify-center text-xs text-white/50" style={{ borderColor: accent }}>{item.label}</div>
          </div>
        ))}
      </div>
    ),
    conclusion: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="text-8xl animate-bounce" style={{ animationDuration: "2s" }}>🚀</div>
        <div className="absolute inset-0 flex items-center justify-center">
          {[0, 1, 2].map((i) => (
            <div key={i} className="absolute rounded-full border opacity-20 animate-ping" style={{ width: `${80 + i * 40}px`, height: `${80 + i * 40}px`, borderColor: accent, animationDuration: `${2 + i}s`, animationDelay: `${i * 0.5}s` }} />
          ))}
        </div>
      </div>
    ),
  };

  return (
    <div className="w-full h-48 flex items-center justify-center relative">
      {visuals[visual] ?? (
        <div className="text-7xl opacity-60">{["🌌", "🔭", "📡", "⭐", "💫", "🌀"][Math.floor(Math.random() * 6)]}</div>
      )}
    </div>
  );
};

export default SlideVisual;
