import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Map, List, Sun, Moon, Scroll, Home, ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import novelData from '../data/nebura_novel.json';
import NeburaWiki from './NeburaWiki';
import { generateCertificate } from '../utils/certificate';
import StarField from './StarField';

const NeburaReader = () => {
    const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
    const [theme, setTheme] = useState('dark');
    const [view, setView] = useState('novel');

    const currentChapter = novelData[currentChapterIndex];
    const isLastChapter = currentChapterIndex === novelData.length - 1;

    useEffect(() => {
        document.body.className = `nebura-theme theme-${theme}`;
        return () => { document.body.className = ''; };
    }, [theme]);

    const handleNext = () => {
        if (!isLastChapter) { window.scrollTo(0, 0); setCurrentChapterIndex(c => c + 1); }
    };
    const handlePrev = () => {
        if (currentChapterIndex > 0) { window.scrollTo(0, 0); setCurrentChapterIndex(c => c - 1); }
    };
    const toggleTheme = () => {
        const themes = ['light', 'sepia', 'dark'];
        setTheme(themes[(themes.indexOf(theme) + 1) % themes.length]);
    };

    const themeIcon = theme === 'light' ? <Sun size={18} /> : theme === 'sepia' ? <Scroll size={18} /> : <Moon size={18} />;

    return (
        <div style={{ minHeight: '100vh', position: 'relative' }}>
            {theme === 'dark' && <StarField />}

            {/* Navbar */}
            <nav style={{
                position: 'sticky',
                top: 0,
                zIndex: 100,
                background: 'rgba(3, 8, 16, 0.85)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(91,138,240,0.15)',
                padding: '0 1.5rem',
            }}>
                <div style={{
                    maxWidth: '960px',
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '56px',
                    gap: '0.5rem',
                }}>
                    {/* Left: Logo */}
                    <div style={{
                        fontFamily: "'Orbitron', 'Inter', sans-serif",
                        fontWeight: 700,
                        fontSize: '1.1rem',
                        background: 'linear-gradient(90deg, #5b8af0, #22d3ee)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '0.1em',
                        flexShrink: 0,
                    }}>
                        NEBURA
                    </div>

                    {/* Center: Nav buttons */}
                    <div style={{ display: 'flex', gap: '0.4rem', flex: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
                        {[
                            { id: 'novel', label: '読む', icon: <BookOpen size={14} /> },
                            { id: 'wiki',  label: 'Wiki', icon: <Map size={14} /> },
                            { id: 'toc',   label: '目次', icon: <List size={14} /> },
                        ].map(({ id, label, icon }) => (
                            <button
                                key={id}
                                onClick={() => setView(id)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.35rem',
                                    padding: '0.4rem 0.9rem',
                                    borderRadius: '8px',
                                    border: '1px solid',
                                    borderColor: view === id ? 'rgba(91,138,240,0.5)' : 'transparent',
                                    background: view === id
                                        ? 'linear-gradient(135deg, rgba(91,138,240,0.2), rgba(168,85,247,0.15))'
                                        : 'transparent',
                                    color: view === id ? '#c8d8f0' : 'rgba(91,138,240,0.6)',
                                    cursor: 'pointer',
                                    fontSize: '0.82rem',
                                    fontFamily: "'Inter', sans-serif",
                                    fontWeight: view === id ? 600 : 400,
                                    transition: 'all 0.2s',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {icon} {label}
                            </button>
                        ))}
                    </div>

                    {/* Right: Theme + Back */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                        <button
                            onClick={toggleTheme}
                            style={{
                                background: 'rgba(91,138,240,0.1)',
                                border: '1px solid rgba(91,138,240,0.2)',
                                borderRadius: '8px',
                                padding: '0.4rem 0.6rem',
                                color: '#5b8af0',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            title="テーマ切替"
                        >
                            {themeIcon}
                        </button>
                        <Link
                            to="/"
                            style={{
                                background: 'rgba(91,138,240,0.08)',
                                border: '1px solid rgba(91,138,240,0.15)',
                                borderRadius: '8px',
                                padding: '0.4rem 0.6rem',
                                color: 'rgba(91,138,240,0.7)',
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            title="ポータルに戻る"
                        >
                            <Home size={16} />
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                {view === 'wiki' && <NeburaWiki />}

                {view === 'toc' && (
                    <div className="container fade-in" style={{ maxWidth: '720px', paddingTop: '2rem' }}>
                        <h2 style={{
                            textAlign: 'center',
                            fontFamily: "'Orbitron', 'Inter', sans-serif",
                            fontSize: '1.2rem',
                            color: '#5b8af0',
                            marginBottom: '1.5rem',
                            letterSpacing: '0.1em',
                        }}>
                            TABLE OF CONTENTS
                        </h2>
                        <div style={{ display: 'grid', gap: '0.75rem' }}>
                            {novelData.map((chapter, index) => (
                                <button
                                    key={chapter.id}
                                    onClick={() => { setCurrentChapterIndex(index); setView('novel'); window.scrollTo(0, 0); }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        textAlign: 'left',
                                        padding: '1rem 1.25rem',
                                        borderRadius: '12px',
                                        border: '1px solid',
                                        borderColor: index === currentChapterIndex
                                            ? 'rgba(91,138,240,0.4)'
                                            : 'rgba(91,138,240,0.1)',
                                        background: index === currentChapterIndex
                                            ? 'rgba(91,138,240,0.08)'
                                            : 'rgba(13,26,48,0.4)',
                                        color: '#c8d8f0',
                                        cursor: 'pointer',
                                        fontSize: '0.95rem',
                                        fontFamily: "'Inter', sans-serif",
                                        transition: 'all 0.2s',
                                        backdropFilter: 'blur(12px)',
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.borderColor = 'rgba(91,138,240,0.3)';
                                        e.currentTarget.style.background = 'rgba(91,138,240,0.06)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.borderColor = index === currentChapterIndex ? 'rgba(91,138,240,0.4)' : 'rgba(91,138,240,0.1)';
                                        e.currentTarget.style.background = index === currentChapterIndex ? 'rgba(91,138,240,0.08)' : 'rgba(13,26,48,0.4)';
                                    }}
                                >
                                    <span style={{
                                        fontFamily: "'Orbitron', 'Inter', sans-serif",
                                        fontSize: '0.75rem',
                                        color: '#5b8af0',
                                        fontWeight: 700,
                                        minWidth: '28px',
                                        opacity: 0.8,
                                    }}>
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <span>{chapter.title}</span>
                                    {index === currentChapterIndex && (
                                        <span style={{
                                            marginLeft: 'auto',
                                            fontSize: '0.7rem',
                                            color: '#5b8af0',
                                            background: 'rgba(91,138,240,0.15)',
                                            padding: '0.15rem 0.5rem',
                                            borderRadius: '10px',
                                        }}>
                                            読書中
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {view === 'novel' && (
                    <main className="container fade-in" style={{ maxWidth: '720px', paddingTop: '2rem' }}>
                        <article style={{
                            background: 'rgba(13, 26, 48, 0.65)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(91,138,240,0.15)',
                            borderRadius: '20px',
                            padding: '3rem',
                            boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
                        }}>
                            {/* Chapter info */}
                            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                                <div style={{
                                    display: 'inline-block',
                                    fontFamily: "'Orbitron', 'Inter', sans-serif",
                                    fontSize: '0.7rem',
                                    color: '#5b8af0',
                                    letterSpacing: '0.15em',
                                    marginBottom: '0.75rem',
                                    opacity: 0.8,
                                }}>
                                    CHAPTER {String(currentChapterIndex + 1).padStart(2, '0')} / {String(novelData.length).padStart(2, '0')}
                                </div>
                                <h2 style={{
                                    fontFamily: "'Orbitron', 'Inter', sans-serif",
                                    fontSize: '1.5rem',
                                    color: '#5b8af0',
                                    letterSpacing: '0.05em',
                                    lineHeight: 1.3,
                                }}>
                                    {currentChapter.title}
                                </h2>
                                <hr style={{
                                    border: 'none',
                                    height: '1px',
                                    background: 'linear-gradient(90deg, transparent, rgba(91,138,240,0.4), transparent)',
                                    margin: '1.5rem 0 0',
                                }} />
                            </div>

                            {/* Body */}
                            <div style={{ fontSize: '1.1rem', lineHeight: '2.1', color: 'var(--color-text)' }}>
                                {currentChapter.content.split('\n').map((paragraph, idx) => (
                                    <p key={idx} style={{
                                        marginBottom: '1.4rem',
                                        minHeight: paragraph.trim() ? 'auto' : '0.8rem',
                                    }}>
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </article>

                        {/* Navigation */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: '2rem',
                            padding: '0 0.5rem',
                        }}>
                            <button
                                onClick={handlePrev}
                                disabled={currentChapterIndex === 0}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                    padding: '0.6rem 1.2rem',
                                    borderRadius: '10px',
                                    border: '1px solid rgba(91,138,240,0.2)',
                                    background: 'rgba(13,26,48,0.6)',
                                    color: currentChapterIndex === 0 ? 'rgba(91,138,240,0.2)' : '#c8d8f0',
                                    cursor: currentChapterIndex === 0 ? 'not-allowed' : 'pointer',
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: '0.88rem',
                                    backdropFilter: 'blur(12px)',
                                    transition: 'all 0.2s',
                                }}
                            >
                                <ChevronLeft size={16} /> 前章
                            </button>

                            <span style={{
                                fontFamily: "'Orbitron', 'Inter', sans-serif",
                                fontSize: '0.75rem',
                                color: 'rgba(91,138,240,0.5)',
                                letterSpacing: '0.1em',
                            }}>
                                {currentChapterIndex + 1} / {novelData.length}
                            </span>

                            {isLastChapter ? (
                                <button
                                    onClick={() => generateCertificate('NEBURA')}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.4rem',
                                        padding: '0.6rem 1.2rem',
                                        borderRadius: '10px',
                                        border: 'none',
                                        background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                                        color: '#000',
                                        cursor: 'pointer',
                                        fontFamily: "'Inter', sans-serif",
                                        fontWeight: 700,
                                        fontSize: '0.88rem',
                                        boxShadow: '0 0 20px rgba(251,191,36,0.3)',
                                    }}
                                >
                                    <Trophy size={16} /> 修了証を取得
                                </button>
                            ) : (
                                <button
                                    onClick={handleNext}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.4rem',
                                        padding: '0.6rem 1.2rem',
                                        borderRadius: '10px',
                                        border: '1px solid rgba(91,138,240,0.3)',
                                        background: 'linear-gradient(135deg, rgba(91,138,240,0.2), rgba(168,85,247,0.15))',
                                        color: '#c8d8f0',
                                        cursor: 'pointer',
                                        fontFamily: "'Inter', sans-serif",
                                        fontWeight: 600,
                                        fontSize: '0.88rem',
                                        backdropFilter: 'blur(12px)',
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    次章 <ChevronRight size={16} />
                                </button>
                            )}
                        </div>
                    </main>
                )}
            </div>
        </div>
    );
};

export default NeburaReader;
