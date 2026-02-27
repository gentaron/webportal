import React, { useMemo } from 'react';

const StarField = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 120 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      delay: Math.random() * 8,
      duration: Math.random() * 4 + 3,
      opacity: Math.random() * 0.6 + 0.2,
    }));
  }, []);

  const shootingStars = useMemo(() => {
    return Array.from({ length: 4 }, (_, i) => ({
      id: i,
      delay: i * 3.5 + Math.random() * 2,
      top: Math.random() * 60,
    }));
  }, []);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 0,
    }}>
      {/* Ambient nebula gradients */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(ellipse 80% 50% at 20% 30%, rgba(91,138,240,0.06) 0%, transparent 60%),
          radial-gradient(ellipse 60% 40% at 80% 70%, rgba(168,85,247,0.05) 0%, transparent 60%),
          radial-gradient(ellipse 50% 60% at 50% 0%, rgba(34,211,238,0.03) 0%, transparent 50%)
        `,
      }} />

      {/* Stars */}
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', inset: 0 }}
      >
        {stars.map(star => (
          <circle
            key={star.id}
            cx={`${star.x}%`}
            cy={`${star.y}%`}
            r={star.size}
            fill="white"
            opacity={star.opacity}
            style={{
              animation: `twinkle ${star.duration}s ${star.delay}s ease-in-out infinite`,
            }}
          />
        ))}
      </svg>

      {/* Shooting stars */}
      {shootingStars.map(s => (
        <div
          key={s.id}
          style={{
            position: 'absolute',
            top: `${s.top}%`,
            left: '-10%',
            width: '120px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.8), transparent)',
            animation: `shootingStar 6s ${s.delay}s ease-in-out infinite`,
            borderRadius: '1px',
          }}
        />
      ))}

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; }
          50%       { opacity: 0.9; }
        }
        @keyframes shootingStar {
          0%   { transform: translateX(-100px) translateY(0); opacity: 0; }
          10%  { opacity: 1; }
          60%  { transform: translateX(110vw) translateY(60px); opacity: 0; }
          100% { transform: translateX(110vw) translateY(60px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default StarField;
