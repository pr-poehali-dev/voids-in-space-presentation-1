interface Props {
  visual: string;
  accent: string;
}

const VOID_IMAGES: Record<string, string> = {
  intro: "https://cdn.poehali.dev/projects/07553ccd-0c3c-48ab-a41b-46c842cfedc3/files/e539bff8-08ab-4a46-8267-5ff1c135003a.jpg",
  web: "https://cdn.poehali.dev/projects/07553ccd-0c3c-48ab-a41b-46c842cfedc3/files/43f76658-3884-4e7a-9f96-7794e30b5498.jpg",
  gallery1: "https://cdn.poehali.dev/projects/07553ccd-0c3c-48ab-a41b-46c842cfedc3/files/69699211-fe03-4e03-bbbf-287319a8a031.jpg",
  gallery2: "https://cdn.poehali.dev/projects/07553ccd-0c3c-48ab-a41b-46c842cfedc3/files/452355db-cfe6-4ae1-8cf0-8bbe8e4ca5a6.jpg",
  darkenergy: "https://cdn.poehali.dev/projects/07553ccd-0c3c-48ab-a41b-46c842cfedc3/files/43f76658-3884-4e7a-9f96-7794e30b5498.jpg",
  conclusion: "https://cdn.poehali.dev/projects/07553ccd-0c3c-48ab-a41b-46c842cfedc3/files/e539bff8-08ab-4a46-8267-5ff1c135003a.jpg",
};

const ImageVisual = ({ src, accent }: { src: string; accent: string }) => (
  <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl">
    <img
      src={src}
      alt="Войд"
      className="w-full h-full object-cover rounded-xl"
      style={{ filter: "saturate(1.3) brightness(0.9)" }}
    />
    <div
      className="absolute inset-0 rounded-xl"
      style={{ background: `radial-gradient(ellipse at center, transparent 40%, ${accent}22 100%)` }}
    />
    <div
      className="absolute inset-0 rounded-xl border"
      style={{ borderColor: `${accent}44`, boxShadow: `inset 0 0 30px ${accent}11` }}
    />
  </div>
);

const SlideVisual = ({ visual, accent }: Props) => {
  if (VOID_IMAGES[visual]) {
    return (
      <div className="w-full h-48 flex items-center justify-center relative">
        <ImageVisual src={VOID_IMAGES[visual]} accent={accent} />
      </div>
    );
  }

  const visuals: Record<string, JSX.Element> = {
    telescopes: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="text-7xl">🔭</div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full border-2 opacity-30 animate-spin" style={{ borderColor: accent, animationDuration: "8s" }} />
          <div className="absolute w-24 h-24 rounded-full border opacity-20 animate-spin" style={{ borderColor: accent, animationDuration: "5s", animationDirection: "reverse" }} />
        </div>
      </div>
    ),
    methods: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="text-7xl">📡</div>
        <div className="absolute inset-0 flex items-center justify-center">
          {[0,1,2].map(i => (
            <div key={i} className="absolute rounded-full border opacity-20 animate-ping"
              style={{ width: `${60 + i*30}px`, height: `${60 + i*30}px`, borderColor: accent, animationDuration: `${2+i}s`, animationDelay: `${i*0.4}s` }} />
          ))}
        </div>
      </div>
    ),
    maps: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="text-7xl">🗺️</div>
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
    physics: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="text-7xl">⚛️</div>
      </div>
    ),
    discoveries: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="text-7xl">⭐</div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full border opacity-20 animate-spin" style={{ borderColor: accent, animationDuration: "10s" }} />
        </div>
      </div>
    ),
    theories: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="text-7xl">💡</div>
      </div>
    ),
    importance: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="text-7xl">🔬</div>
      </div>
    ),
  };

  return (
    <div className="w-full h-48 flex items-center justify-center relative">
      {visuals[visual] ?? (
        <div className="text-7xl opacity-60">🌌</div>
      )}
    </div>
  );
};

export default SlideVisual;
