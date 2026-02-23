import React from 'react';
import { Link } from 'react-router-dom';
import chapters from '../data/sakura_chapters.json';

const SakuraList = () => {
    return (
        <div className="container">
            <Link to="/" style={{ display: 'inline-block', marginBottom: '2rem', textDecoration: 'none', color: '#888' }}>&larr; Back to Portal</Link>
            <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '3rem', color: '#ff7eb3', marginBottom: '0.5rem' }}>Sakura Story</h1>
                <p style={{ color: '#888', marginBottom: '1.2rem' }}>A Modern Web Novel Experience</p>
                <Link
                    to="/sakura/wiki"
                    style={{
                        display: 'inline-block',
                        padding: '0.5rem 1.4rem',
                        border: '1px solid #ff7eb3',
                        borderRadius: '999px',
                        color: '#ff7eb3',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#ff7eb322'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                >
                    百科事典 Wiki &rarr;
                </Link>
            </header>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {chapters.map((chapter) => (
                    <Link
                        key={chapter.id}
                        to={`/sakura/chapter/${chapter.id}`}
                        style={{ textDecoration: 'none' }}
                    >
                        <div className="card" style={{
                            background: '#2a2a2a', padding: '1.5rem', borderRadius: '12px',
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            transition: 'transform 0.2s', border: '1px solid transparent'
                        }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = '#333'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = '#2a2a2a'; }}
                        >
                            <h3 style={{ margin: 0, color: '#fff' }}>{chapter.title}</h3>
                            <span style={{ color: '#ff7eb3' }}>Read &rarr;</span>
                        </div>
                    </Link>
                ))}
            </div>
            {/* Added a bottom certificate button for quick access if they already finished it */}
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                <button onClick={() => import('../utils/certificate').then(m => m.generateCertificate("Sakura Story"))}
                    className='btn' style={{ background: 'transparent', border: '1px solid #ff7eb3', color: '#ff7eb3' }}>
                    Already finished? Get Certificate 🏆
                </button>
            </div>
        </div>
    );
};

export default SakuraList;
