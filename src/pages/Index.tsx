import { useState, useEffect, useCallback } from "react";
import StarField from "@/components/StarField";
import FloatingParticle from "@/components/FloatingParticle";
import SlideCard from "@/components/SlideCard";
import { slides } from "@/data/slides";
import Icon from "@/components/ui/icon";

const SECTIONS = [...new Set(slides.map((s) => s.section))];

const Index = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const goTo = useCallback((index: number) => {
    if (index === current) return;
    setDirection(index > current ? "right" : "left");
    setTimeout(() => setDirection(null), 700);
    setCurrent(index);
    setMenuOpen(false);
  }, [current]);

  const prev = useCallback(() => { if (current > 0) goTo(current - 1); }, [current, goTo]);
  const next = useCallback(() => { if (current < slides.length - 1) goTo(current + 1); }, [current, goTo]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  const slide = slides[current];

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#040412]">
      <StarField />
      <FloatingParticle count={6} />

      {/* Ambient glow behind current slide */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${slide.accent}08 0%, transparent 70%)`,
          zIndex: 2,
        }}
      />

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-lg"
            style={{ background: `${slide.accent}22`, border: `1px solid ${slide.accent}44` }}
          >
            🌌
          </div>
          <span className="text-white/70 font-semibold text-sm tracking-wider hidden sm:block">
            ВОЙДЫ ВСЕЛЕННОЙ
          </span>
        </div>

        {/* Section nav */}
        <nav className="hidden md:flex items-center gap-1">
          {SECTIONS.map((sec) => {
            const firstIdx = slides.findIndex((s) => s.section === sec);
            const isActive = slides[current].section === sec;
            return (
              <button
                key={sec}
                onClick={() => goTo(firstIdx)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{
                  color: isActive ? slide.accent : "rgba(255,255,255,0.5)",
                  background: isActive ? `${slide.accent}22` : "transparent",
                  border: `1px solid ${isActive ? slide.accent + "44" : "transparent"}`,
                }}
              >
                {sec}
              </button>
            );
          })}
        </nav>

        {/* Mobile menu */}
        <button
          className="md:hidden text-white/70 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? "X" : "Menu"} size={20} />
        </button>
      </header>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="absolute top-16 right-4 z-40 rounded-xl border backdrop-blur-xl p-2 space-y-1"
          style={{ background: "#0a0a1acc", borderColor: `${slide.accent}33` }}>
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              className="w-full text-left px-4 py-2 rounded-lg text-sm transition-all"
              style={{
                color: i === current ? slide.accent : "rgba(255,255,255,0.6)",
                background: i === current ? `${slide.accent}22` : "transparent",
              }}
            >
              {s.icon} {s.title}
            </button>
          ))}
        </div>
      )}

      {/* Slides area */}
      <main className="absolute inset-0 z-10" style={{ top: "64px", bottom: "80px" }}>
        {slides.map((s, i) => (
          <SlideCard
            key={s.id}
            slide={s}
            isActive={i === current}
            direction={i === current ? direction : null}
          />
        ))}
      </main>

      {/* Author badge */}
      {current === 0 && (
        <div
          className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 px-5 py-2.5 rounded-full border backdrop-blur-sm text-center whitespace-nowrap transition-all duration-500"
          style={{
            background: `${slide.accent}11`,
            borderColor: `${slide.accent}33`,
            boxShadow: `0 0 20px ${slide.accent}22`,
          }}
        >
          <span className="text-white/40 text-xs">Выполнила ученица 9Б класса</span>
          <span className="text-white/80 text-sm font-semibold ml-2" style={{ color: slide.accent }}>Никифорова Алина</span>
        </div>
      )}

      {/* Bottom nav */}
      <footer className="absolute bottom-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-4">
        {/* Dots */}
        <div className="flex gap-1.5 items-center flex-wrap max-w-xs">
          {slides.map((s, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === current ? "24px" : "8px",
                height: "8px",
                background: i === current ? slide.accent : `${slide.accent}44`,
                boxShadow: i === current ? `0 0 8px ${slide.accent}` : "none",
              }}
            />
          ))}
        </div>

        {/* Counter */}
        <span className="text-white/40 text-sm font-mono">
          {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>

        {/* Arrows */}
        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            disabled={current === 0}
            className="w-10 h-10 rounded-full border flex items-center justify-center transition-all disabled:opacity-20 hover:scale-110"
            style={{ borderColor: `${slide.accent}44`, color: slide.accent }}
          >
            <Icon name="ChevronLeft" size={18} />
          </button>
          <button
            onClick={next}
            disabled={current === slides.length - 1}
            className="w-10 h-10 rounded-full border flex items-center justify-center transition-all disabled:opacity-20 hover:scale-110"
            style={{ borderColor: `${slide.accent}44`, color: slide.accent, background: `${slide.accent}11` }}
          >
            <Icon name="ChevronRight" size={18} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Index;