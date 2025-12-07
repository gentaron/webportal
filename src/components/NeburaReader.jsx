import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import novelData from '../data/nebura_novel.json';
import NeburaWiki from './NeburaWiki';
import { generateCertificate } from '../utils/certificate';

const NeburaReader = () => {
    const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
    const [theme, setTheme] = useState('dark');
    const [view, setView] = useState('novel'); // 'novel' or 'wiki'

    const currentChapter = novelData[currentChapterIndex];
    const isLastChapter = currentChapterIndex === novelData.length - 1;

    useEffect(() => {
        // Apply theme class to a wrapping div or body? 
        // Since we are in a portal, better to wrap locally or update body safely.
        // But body styling is global. Let's scope it via a wrapper ref or just set body class
        // taking care to cleanup on unmount.
        document.body.className = `nebura-theme theme-${theme}`;
        return () => {
            document.body.className = ''; // Cleanup
        };
    }, [theme]);

    const handleNext = () => {
        if (!isLastChapter) {
            window.scrollTo(0, 0);
            setCurrentChapterIndex(curr => curr + 1);
        }
    };

    const handlePrev = () => {
        if (currentChapterIndex > 0) {
            window.scrollTo(0, 0);
            setCurrentChapterIndex(curr => curr - 1);
        }
    };

    const toggleTheme = () => {
        const themes = ['light', 'sepia', 'dark'];
        const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
        setTheme(nextTheme);
    };

    return (
        <div className="app-container">
            <nav className="nebura-nav container">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Link to="/" style={{ marginRight: '1rem', textDecoration: 'none', color: 'var(--color-text)' }}>🏠</Link>
                    <h1 className="nebura-nav-title">NEBURA <span style={{ fontSize: '0.8em', opacity: 0.7 }}>Web Novel</span></h1>
                </div>
                <div className="nav-controls">
                    <button className="theme-btn" onClick={toggleTheme} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>
                        {theme === 'light' ? '🌞' : theme === 'sepia' ? '📜' : '🌙'}
                    </button>
                </div>
            </nav>

            <div className="navigation-bar" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <button
                    className={`btn ${view === 'novel' ? '' : 'outline'}`}
                    style={{ background: view === 'novel' ? 'var(--color-accent)' : 'transparent', border: '1px solid var(--color-accent)', color: view === 'novel' ? '#fff' : 'var(--color-text)' }}
                    onClick={() => setView('novel')}
                >
                    📖 Read Novel
                </button>
                <button
                    className={`btn ${view === 'wiki' ? '' : 'outline'}`}
                    style={{ background: view === 'wiki' ? 'var(--color-accent)' : 'transparent', border: '1px solid var(--color-accent)', color: view === 'wiki' ? '#fff' : 'var(--color-text)' }}
                    onClick={() => setView('wiki')}
                >
                    📚 Wiki / Data
                </button>
            </div>

            {view === 'wiki' ? (
                <NeburaWiki />
            ) : (
                <main className="reader-container container fade-in">
                    <div className="chapter-card">
                        <h2 className="chapter-title">{currentChapter.title}</h2>
                        <div className="chapter-content" style={{ fontSize: '1.2rem', lineHeight: '2' }}>
                            {currentChapter.content.split('\n').map((paragraph, idx) => (
                                <p key={idx} style={{ marginBottom: '1.5rem', minHeight: paragraph.trim() ? 'auto' : '1rem' }}>{paragraph}</p>
                            ))}
                        </div>

                        <div className="chapter-controls" style={{ marginTop: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
                            <button className="btn" onClick={handlePrev} disabled={currentChapterIndex === 0} style={{ opacity: currentChapterIndex === 0 ? 0.5 : 1 }}>
                                ← Prev
                            </button>
                            <span className="chapter-indicator">
                                {currentChapterIndex + 1} / {novelData.length}
                            </span>
                            {isLastChapter ? (
                                <button className="btn" onClick={() => generateCertificate("NEBURA")} style={{ background: '#ffd700', color: '#000' }}>
                                    🏆 Get Certificate
                                </button>
                            ) : (
                                <button className="btn" onClick={handleNext}>
                                    Next →
                                </button>
                            )}
                        </div>
                    </div>
                </main>
            )}
        </div>
    );
};

export default NeburaReader;
