import { useEffect, useRef } from "react";

interface Props {
  count?: number;
}

const FloatingParticle = ({ count = 8 }: Props) => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 120 + 40}px`,
            height: `${Math.random() * 120 + 40}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: [
              "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(52,211,153,0.1) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(244,114,182,0.12) 0%, transparent 70%)",
            ][i % 4],
            animation: `float-${i % 3} ${8 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * 1.5}s`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticle;
