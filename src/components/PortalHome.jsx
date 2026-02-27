import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Sparkles, ArrowRight, Star } from 'lucide-react';
import StarField from './StarField';
import sakuraGif from '../assets/sakura.gif';

const SAKURA_TAGLINES = [
  '美と欲望の帝国に、亀裂が入る——',
  '一人の女神が世界を塗り替える。',
  'カリスマと支配の、現代叙事詩。',
];

const NEBURA_TAGLINES = [
  'カシオペア矮小銀河——E16星系の叙事詩。',
  '次元の歪みに挑む者たちの物語。',
  'Gigapolisで、世界の均衡が揺れる。',
];

const PortalHome = () => {
  const [sakuraTag] = useState(() => SAKURA_TAGLINES[Math.floor(Math.random() * SAKURA_TAGLINES.length)]);
  const [neburaTag] = useState(() => NEBURA_TAGLINES[Math.floor(Math.random() * NEBURA_TAGLINES.length)]);
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <StarField />

      {/* Main content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem',
      }}>

        {/* Header */}
        <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(91,138,240,0.08)',
            border: '1px solid rgba(91,138,240,0.2)',
            borderRadius: '100px',
            padding: '0.35rem 1rem',
            marginBottom: '1.5rem',
            backdropFilter: 'blur(10px)',
          }}>
            <Star size={12} color="#5b8af0" fill="#5b8af0" />
            <span style={{
              color: 'rgba(91,138,240,0.9)',
              fontSize: '0.78rem',
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              Web Novel Portal
            </span>
            <Star size={12} color="#5b8af0" fill="#5b8af0" />
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: "'Orbitron', 'Inter', sans-serif",
            fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #5b8af0 0%, #a855f7 40%, #22d3ee 80%, #5b8af0 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'shimmer 4s linear infinite',
            letterSpacing: '0.04em',
          }}>
            STORY PORTAL
          </h1>

          <p style={{
            color: 'rgba(91,138,240,0.6)',
            fontSize: '1rem',
            fontFamily: "'Inter', sans-serif",
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>
            — Choose Your Universe —
          </p>
        </header>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 420px))',
          gap: '2rem',
          width: '100%',
          maxWidth: '900px',
          justifyContent: 'center',
        }}>

          {/* Sakura Card */}
          <Link to="/sakura" style={{ textDecoration: 'none' }}>
            <div
              onMouseEnter={() => setHoveredCard('sakura')}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                position: 'relative',
                background: hoveredCard === 'sakura'
                  ? 'rgba(244, 114, 182, 0.06)'
                  : 'rgba(13, 26, 48, 0.6)',
                backdropFilter: 'blur(24px)',
                border: `1px solid ${hoveredCard === 'sakura' ? 'rgba(244,114,182,0.4)' : 'rgba(244,114,182,0.15)'}`,
                borderRadius: '20px',
                padding: '2.5rem',
                transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                transform: hoveredCard === 'sakura' ? 'translateY(-8px)' : 'translateY(0)',
                boxShadow: hoveredCard === 'sakura'
                  ? '0 20px 60px rgba(244,114,182,0.2), 0 0 0 1px rgba(244,114,182,0.1)'
                  : '0 4px 24px rgba(0,0,0,0.4)',
                overflow: 'hidden',
              }}
            >
              {/* Glow overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(244,114,182,0.08) 0%, transparent 70%)',
                pointerEvents: 'none',
                opacity: hoveredCard === 'sakura' ? 1 : 0,
                transition: 'opacity 0.4s',
              }} />

              {/* Genre tag */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'rgba(244,114,182,0.1)',
                border: '1px solid rgba(244,114,182,0.2)',
                borderRadius: '100px',
                padding: '0.25rem 0.75rem',
                marginBottom: '1.5rem',
              }}>
                <Sparkles size={11} color="#f472b6" />
                <span style={{ color: '#f472b6', fontSize: '0.72rem', fontFamily: "'Inter', sans-serif", letterSpacing: '0.06em' }}>
                  MODERN FICTION
                </span>
              </div>

              {/* Image */}
              <div style={{
                width: '100px',
                height: '100px',
                margin: '0 auto 1.5rem',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid rgba(244,114,182,0.3)',
                boxShadow: hoveredCard === 'sakura' ? '0 0 30px rgba(244,114,182,0.3)' : 'none',
                transition: 'box-shadow 0.4s',
                background: 'rgba(244,114,182,0.05)',
              }}>
                <img
                  src={sakuraGif}
                  alt="Sakura"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Title */}
              <h2 style={{
                fontFamily: "'Orbitron', 'Inter', sans-serif",
                fontSize: '1.6rem',
                fontWeight: 700,
                color: '#f472b6',
                marginBottom: '0.75rem',
                textAlign: 'center',
                letterSpacing: '0.04em',
              }}>
                Sakura Story
              </h2>

              {/* Tagline */}
              <p style={{
                color: 'rgba(200,216,240,0.6)',
                fontSize: '0.88rem',
                fontFamily: "'Inter', sans-serif",
                textAlign: 'center',
                lineHeight: 1.6,
                marginBottom: '2rem',
                minHeight: '2.8rem',
              }}>
                {sakuraTag}
              </p>

              {/* CTA */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                background: 'linear-gradient(135deg, rgba(244,114,182,0.8), rgba(168,85,247,0.8))',
                borderRadius: '10px',
                padding: '0.7rem 1.5rem',
                color: '#fff',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: '0.9rem',
                transition: 'all 0.3s',
                boxShadow: hoveredCard === 'sakura' ? '0 4px 20px rgba(244,114,182,0.4)' : 'none',
              }}>
                Read Now
                <ArrowRight size={16} style={{
                  transition: 'transform 0.3s',
                  transform: hoveredCard === 'sakura' ? 'translateX(4px)' : 'translateX(0)',
                }} />
              </div>
            </div>
          </Link>

          {/* NEBURA Card */}
          <Link to="/nebura" style={{ textDecoration: 'none' }}>
            <div
              onMouseEnter={() => setHoveredCard('nebura')}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                position: 'relative',
                background: hoveredCard === 'nebura'
                  ? 'rgba(91, 138, 240, 0.06)'
                  : 'rgba(13, 26, 48, 0.6)',
                backdropFilter: 'blur(24px)',
                border: `1px solid ${hoveredCard === 'nebura' ? 'rgba(91,138,240,0.4)' : 'rgba(91,138,240,0.15)'}`,
                borderRadius: '20px',
                padding: '2.5rem',
                transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                transform: hoveredCard === 'nebura' ? 'translateY(-8px)' : 'translateY(0)',
                boxShadow: hoveredCard === 'nebura'
                  ? '0 20px 60px rgba(91,138,240,0.2), 0 0 0 1px rgba(91,138,240,0.1)'
                  : '0 4px 24px rgba(0,0,0,0.4)',
                overflow: 'hidden',
              }}
            >
              {/* Glow overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(91,138,240,0.08) 0%, transparent 70%)',
                pointerEvents: 'none',
                opacity: hoveredCard === 'nebura' ? 1 : 0,
                transition: 'opacity 0.4s',
              }} />

              {/* Genre tag */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'rgba(91,138,240,0.1)',
                border: '1px solid rgba(91,138,240,0.2)',
                borderRadius: '100px',
                padding: '0.25rem 0.75rem',
                marginBottom: '1.5rem',
              }}>
                <Star size={11} color="#5b8af0" />
                <span style={{ color: '#5b8af0', fontSize: '0.72rem', fontFamily: "'Inter', sans-serif", letterSpacing: '0.06em' }}>
                  SCI-FI EPIC
                </span>
              </div>

              {/* Icon */}
              <div style={{
                width: '100px',
                height: '100px',
                margin: '0 auto 1.5rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid rgba(91,138,240,0.3)',
                background: 'rgba(91,138,240,0.05)',
                boxShadow: hoveredCard === 'nebura' ? '0 0 30px rgba(91,138,240,0.3)' : 'none',
                transition: 'box-shadow 0.4s',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Animated orbit ring */}
                <div style={{
                  position: 'absolute',
                  inset: '-8px',
                  borderRadius: '50%',
                  border: '1px solid transparent',
                  borderTopColor: 'rgba(91,138,240,0.5)',
                  borderRightColor: 'rgba(168,85,247,0.3)',
                  animation: 'rotateSlow 6s linear infinite',
                  pointerEvents: 'none',
                }} />
                <BookOpen
                  size={44}
                  color={hoveredCard === 'nebura' ? '#5b8af0' : 'rgba(91,138,240,0.7)'}
                  style={{ transition: 'color 0.3s' }}
                />
              </div>

              {/* Title */}
              <h2 style={{
                fontFamily: "'Orbitron', 'Inter', sans-serif",
                fontSize: '1.6rem',
                fontWeight: 700,
                color: '#5b8af0',
                marginBottom: '0.75rem',
                textAlign: 'center',
                letterSpacing: '0.1em',
              }}>
                NEBURA
              </h2>

              {/* Tagline */}
              <p style={{
                color: 'rgba(200,216,240,0.6)',
                fontSize: '0.88rem',
                fontFamily: "'Inter', sans-serif",
                textAlign: 'center',
                lineHeight: 1.6,
                marginBottom: '2rem',
                minHeight: '2.8rem',
              }}>
                {neburaTag}
              </p>

              {/* CTA */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                background: 'linear-gradient(135deg, rgba(91,138,240,0.8), rgba(34,211,238,0.8))',
                borderRadius: '10px',
                padding: '0.7rem 1.5rem',
                color: '#fff',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: '0.9rem',
                transition: 'all 0.3s',
                boxShadow: hoveredCard === 'nebura' ? '0 4px 20px rgba(91,138,240,0.4)' : 'none',
              }}>
                Read Now
                <ArrowRight size={16} style={{
                  transition: 'transform 0.3s',
                  transform: hoveredCard === 'nebura' ? 'translateX(4px)' : 'translateX(0)',
                }} />
              </div>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <footer style={{
          marginTop: '4rem',
          color: 'rgba(74,96,128,0.6)',
          fontSize: '0.75rem',
          fontFamily: "'Inter', sans-serif",
          letterSpacing: '0.06em',
          textAlign: 'center',
        }}>
          ✦ STORY PORTAL ✦
        </footer>
      </div>

      <style>{`
        @keyframes shimmer {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default PortalHome;
