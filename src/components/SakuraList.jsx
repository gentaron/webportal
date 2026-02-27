import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home, Trophy, Sparkles } from 'lucide-react';
import chapters from '../data/sakura_chapters.json';
import StarField from './StarField';

const SakuraList = () => {
    const [hoveredId, setHoveredId] = useState(null);

    return (
        <div style={{ minHeight: '100vh', position: 'relative' }}>
            <StarField />

            {/* Sticky top nav */}
            <nav style={{
                position: 'sticky',
                top: 0,
                zIndex: 100,
                background: 'rgba(3, 8, 16, 0.88)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(244,114,182,0.12)',
                padding: '0 1.5rem',
            }}>
                <div style={{
                    maxWidth: '760px',
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '52px',
                }}>
                    <div style={{
                        fontFamily: "'Orbitron', 'Inter', sans-serif",
                        fontWeight: 700,
                        fontSize: '1rem',
                        background: 'linear-gradient(90deg, #f472b6, #a855f7)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '0.06em',
                    }}>
                        Sakura Story
                    </div>
                    <Link
                        to="/"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            color: 'rgba(244,114,182,0.6)',
                            textDecoration: 'none',
                            fontSize: '0.82rem',
                            fontFamily: "'Inter', sans-serif",
                            transition: 'color 0.2s',
                        }}
                    >
                        <Home size={14} /> ポータル
                    </Link>
                </div>
            </nav>

            <div style={{ position: 'relative', zIndex: 1 }}>
                <div className="container" style={{ maxWidth: '760px', paddingTop: '3rem' }}>
                    {/* Header */}
                    <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            background: 'rgba(244,114,182,0.08)',
                            border: '1px solid rgba(244,114,182,0.18)',
                            borderRadius: '100px',
                            padding: '0.3rem 0.9rem',
                            marginBottom: '1rem',
                        }}>
                            <Sparkles size={11} color="#f472b6" />
                            <span style={{
                                color: '#f472b6',
                                fontSize: '0.72rem',
                                fontFamily: "'Inter', sans-serif",
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                            }}>
                                Modern Fiction
                            </span>
                        </div>

                        <h1 style={{
                            fontFamily: "'Orbitron', 'Inter', sans-serif",
                            fontSize: 'clamp(2rem, 5vw, 3rem)',
                            fontWeight: 700,
                            background: 'linear-gradient(135deg, #f472b6, #a855f7)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            letterSpacing: '0.04em',
                            marginBottom: '0.5rem',
                        }}>
                            Sakura Story
                        </h1>
                        <p style={{
                            color: 'rgba(200,216,240,0.45)',
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '0.9rem',
                            letterSpacing: '0.04em',
                        }}>
                            A Modern Web Novel Experience
                        </p>
                    </header>

                    {/* Chapter list */}
                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                        {chapters.map((chapter, index) => (
                            <Link
                                key={chapter.id}
                                to={`/sakura/chapter/${chapter.id}`}
                                style={{ textDecoration: 'none' }}
                                onMouseEnter={() => setHoveredId(chapter.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '1.1rem 1.4rem',
                                    borderRadius: '14px',
                                    border: '1px solid',
                                    borderColor: hoveredId === chapter.id
                                        ? 'rgba(244,114,182,0.35)'
                                        : 'rgba(244,114,182,0.1)',
                                    background: hoveredId === chapter.id
                                        ? 'rgba(244,114,182,0.06)'
                                        : 'rgba(13,26,48,0.5)',
                                    backdropFilter: 'blur(16px)',
                                    transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
                                    transform: hoveredId === chapter.id ? 'translateX(4px)' : 'translateX(0)',
                                    boxShadow: hoveredId === chapter.id
                                        ? '0 4px 20px rgba(244,114,182,0.1)'
                                        : 'none',
                                }}>
                                    {/* Episode number */}
                                    <span style={{
                                        fontFamily: "'Orbitron', 'Inter', sans-serif",
                                        fontSize: '0.68rem',
                                        color: hoveredId === chapter.id ? '#f472b6' : 'rgba(244,114,182,0.4)',
                                        fontWeight: 700,
                                        minWidth: '28px',
                                        letterSpacing: '0.05em',
                                        transition: 'color 0.25s',
                                    }}>
                                        {String(index + 1).padStart(2, '0')}
                                    </span>

                                    {/* Title */}
                                    <span style={{
                                        flex: 1,
                                        color: hoveredId === chapter.id ? '#f0d8e8' : '#c8d8f0',
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: '0.95rem',
                                        fontWeight: hoveredId === chapter.id ? 500 : 400,
                                        transition: 'color 0.25s',
                                    }}>
                                        {chapter.title}
                                    </span>

                                    {/* Arrow */}
                                    <ChevronRight
                                        size={16}
                                        color={hoveredId === chapter.id ? '#f472b6' : 'rgba(244,114,182,0.2)'}
                                        style={{ transition: 'all 0.25s', transform: hoveredId === chapter.id ? 'translateX(3px)' : 'none' }}
                                    />
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Certificate CTA */}
                    <div style={{ textAlign: 'center', marginTop: '3rem', paddingBottom: '3rem' }}>
                        <button
                            onClick={() => import('../utils/certificate').then(m => m.generateCertificate('Sakura Story'))}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                background: 'transparent',
                                border: '1px solid rgba(244,114,182,0.3)',
                                borderRadius: '10px',
                                padding: '0.65rem 1.4rem',
                                color: 'rgba(244,114,182,0.7)',
                                cursor: 'pointer',
                                fontFamily: "'Inter', sans-serif",
                                fontSize: '0.85rem',
                                transition: 'all 0.25s',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = 'rgba(244,114,182,0.08)';
                                e.currentTarget.style.borderColor = 'rgba(244,114,182,0.5)';
                                e.currentTarget.style.color = '#f472b6';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.borderColor = 'rgba(244,114,182,0.3)';
                                e.currentTarget.style.color = 'rgba(244,114,182,0.7)';
                            }}
                        >
                            <Trophy size={15} /> 読了済みの方はこちら — 修了証を取得
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SakuraList;
