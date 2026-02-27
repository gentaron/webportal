import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, List, Home } from 'lucide-react';
import chapters from '../data/sakura_chapters.json';
import { generateCertificate } from '../utils/certificate';
import StarField from './StarField';

const SakuraReader = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const chapterId = parseInt(id);
    const chapter = chapters.find(c => parseInt(c.id) === chapterId);
    const chapterIndex = chapters.findIndex(c => parseInt(c.id) === chapterId);

    useEffect(() => { window.scrollTo(0, 0); }, [chapterId]);

    if (!chapter) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
                <StarField />
                <h2 style={{ color: '#f472b6', fontFamily: "'Orbitron','Inter',sans-serif", position: 'relative', zIndex: 1 }}>Chapter not found</h2>
                <Link to="/sakura" className="btn" style={{ position: 'relative', zIndex: 1 }}>一覧に戻る</Link>
            </div>
        );
    }

    const nextChapterId = chapterId < chapters.length ? chapterId + 1 : null;
    const prevChapterId = chapterId > 1 ? chapterId - 1 : null;
    const isLastChapter = !nextChapterId;

    return (
        <div style={{ minHeight: '100vh', position: 'relative' }}>
            <StarField />

            {/* Sticky navbar */}
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
                    gap: '0.5rem',
                }}>
                    <Link
                        to="/sakura"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            color: 'rgba(244,114,182,0.7)',
                            textDecoration: 'none',
                            fontSize: '0.82rem',
                            fontFamily: "'Inter', sans-serif",
                        }}
                    >
                        <List size={14} /> 目次
                    </Link>

                    <span style={{
                        color: 'rgba(200,216,240,0.4)',
                        fontSize: '0.75rem',
                        fontFamily: "'Orbitron', 'Inter', sans-serif",
                        letterSpacing: '0.08em',
                    }}>
                        {String(chapterIndex + 1).padStart(2, '0')} / {String(chapters.length).padStart(2, '0')}
                    </span>

                    <Link
                        to="/"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            color: 'rgba(244,114,182,0.5)',
                            textDecoration: 'none',
                            fontSize: '0.82rem',
                            fontFamily: "'Inter', sans-serif",
                        }}
                    >
                        <Home size={14} />
                    </Link>
                </div>
            </nav>

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                <div className="container fade-in" style={{ maxWidth: '700px', paddingTop: '2.5rem' }}>

                    {/* Chapter title */}
                    <header style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <h2 style={{
                            fontFamily: "'Orbitron', 'Inter', sans-serif",
                            fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
                            fontWeight: 700,
                            background: 'linear-gradient(135deg, #f472b6, #a855f7)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            letterSpacing: '0.04em',
                            lineHeight: 1.3,
                            marginBottom: '1rem',
                        }}>
                            {chapter.title}
                        </h2>
                        <hr style={{
                            border: 'none',
                            height: '1px',
                            background: 'linear-gradient(90deg, transparent, rgba(244,114,182,0.4), transparent)',
                        }} />
                    </header>

                    {/* Body */}
                    <article style={{
                        background: 'rgba(13, 26, 48, 0.55)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(244,114,182,0.1)',
                        borderRadius: '20px',
                        padding: '2.5rem',
                        marginBottom: '2.5rem',
                        boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
                        fontSize: '1.1rem',
                        lineHeight: '2.1',
                        color: '#c8d8f0',
                    }}>
                        {chapter.content.split('\n').map((line, index) => (
                            <p key={index} style={{
                                marginBottom: '1.4rem',
                                minHeight: line.trim() ? 'auto' : '0.7rem',
                            }}>
                                {line}
                            </p>
                        ))}
                    </article>

                    {/* Navigation */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingBottom: '4rem',
                    }}>
                        {prevChapterId ? (
                            <Link
                                to={`/sakura/chapter/${prevChapterId}`}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                    padding: '0.6rem 1.2rem',
                                    borderRadius: '10px',
                                    border: '1px solid rgba(244,114,182,0.2)',
                                    background: 'rgba(13,26,48,0.6)',
                                    backdropFilter: 'blur(12px)',
                                    color: '#c8d8f0',
                                    textDecoration: 'none',
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: '0.88rem',
                                    transition: 'all 0.2s',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.borderColor = 'rgba(244,114,182,0.4)';
                                    e.currentTarget.style.background = 'rgba(244,114,182,0.06)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.borderColor = 'rgba(244,114,182,0.2)';
                                    e.currentTarget.style.background = 'rgba(13,26,48,0.6)';
                                }}
                            >
                                <ChevronLeft size={16} /> 前話
                            </Link>
                        ) : <div />}

                        {isLastChapter ? (
                            <button
                                onClick={() => generateCertificate('Sakura Story')}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.65rem 1.3rem',
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
                                🏆 修了証を取得
                            </button>
                        ) : null}

                        {nextChapterId ? (
                            <Link
                                to={`/sakura/chapter/${nextChapterId}`}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                    padding: '0.6rem 1.2rem',
                                    borderRadius: '10px',
                                    border: '1px solid rgba(244,114,182,0.3)',
                                    background: 'linear-gradient(135deg, rgba(244,114,182,0.15), rgba(168,85,247,0.1))',
                                    backdropFilter: 'blur(12px)',
                                    color: '#f0d8e8',
                                    textDecoration: 'none',
                                    fontFamily: "'Inter', sans-serif",
                                    fontWeight: 600,
                                    fontSize: '0.88rem',
                                    transition: 'all 0.2s',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.borderColor = 'rgba(244,114,182,0.5)';
                                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(244,114,182,0.15)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.borderColor = 'rgba(244,114,182,0.3)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                次話 <ChevronRight size={16} />
                            </Link>
                        ) : <div />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SakuraReader;
