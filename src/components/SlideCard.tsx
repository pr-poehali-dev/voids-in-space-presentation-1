import { Slide } from "@/data/slides";
import SlideVisual from "./SlideVisual";

interface Props {
  slide: Slide;
  isActive: boolean;
  direction: "left" | "right" | null;
}

const SlideCard = ({ slide, isActive, direction }: Props) => {
  const enterClass = direction === "right" ? "animate-slide-in-right" : direction === "left" ? "animate-slide-in-left" : "";

  return (
    <div
      className={`absolute inset-0 transition-all duration-700 ${isActive ? `opacity-100 ${enterClass}` : "opacity-0 pointer-events-none"}`}
      style={{ zIndex: isActive ? 10 : 0 }}
    >
      <div className="h-full flex flex-col lg:flex-row items-center justify-center gap-8 px-6 py-12 max-w-6xl mx-auto">
        {/* Left: visual */}
        <div className="lg:w-2/5 w-full flex-shrink-0">
          <div
            className="rounded-2xl p-6 border backdrop-blur-sm"
            style={{
              background: `radial-gradient(ellipse at center, ${slide.accent}15 0%, #0a0a1a 80%)`,
              borderColor: `${slide.accent}33`,
              boxShadow: `0 0 40px ${slide.accent}22`,
            }}
          >
            <SlideVisual visual={slide.visual ?? "default"} accent={slide.accent} />
          </div>
        </div>

        {/* Right: text */}
        <div className="lg:w-3/5 w-full space-y-6">
          <div>
            <span
              className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full border"
              style={{ color: slide.accent, borderColor: `${slide.accent}44`, background: `${slide.accent}11` }}
            >
              {slide.section}
            </span>
          </div>
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-2">
              {slide.icon} {slide.title}
            </h2>
            {slide.subtitle && (
              <p className="text-lg" style={{ color: `${slide.accent}cc` }}>
                {slide.subtitle}
              </p>
            )}
          </div>
          <ul className="space-y-4">
            {slide.content.map((point, i) => (
              <li
                key={i}
                className="flex gap-3 items-start text-white/80 text-base leading-relaxed"
                style={{ animationDelay: `${0.1 + i * 0.15}s` }}
              >
                <span
                  className="mt-1 w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: slide.accent, boxShadow: `0 0 8px ${slide.accent}` }}
                />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SlideCard;
