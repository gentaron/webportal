import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import sakuraGif from '../assets/sakura.gif';

const PortalHome = () => {
    return (
        <div className="container" style={{ textAlign: 'center', paddingTop: '4rem' }}>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', background: 'linear-gradient(45deg, #ff7eb3, #bb86fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Web Novel Portal
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#888', marginBottom: '4rem' }}>
                Select a novel to begin your journey
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {/* SAKURA Card */}
                <Link to="/sakura" style={{ textDecoration: 'none' }}>
                    <div className="card" style={{
                        background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)',
                        padding: '2rem',
                        borderRadius: '16px',
                        border: '1px solid rgba(255, 126, 179, 0.2)',
                        transition: 'transform 0.3s',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        color: '#fff'
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <div style={{ marginBottom: '1.5rem', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderRadius: '50%', background: 'rgba(255, 126, 179, 0.1)' }}>
                            <img src={sakuraGif} alt="Sakura" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#ff7eb3' }}>Sakura Story</h2>
                        <p style={{ color: '#888', marginBottom: '2rem' }}>A modern tale of beauty and digital dreams.</p>
                        <span className="btn" style={{ marginTop: 'auto', background: '#ff7eb3', color: '#000' }}>Read Now</span>
                    </div>
                </Link>

                {/* NEBURA Card */}
                <Link to="/nebura" style={{ textDecoration: 'none' }}>
                    <div className="card" style={{
                        background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)',
                        padding: '2rem',
                        borderRadius: '16px',
                        border: '1px solid rgba(187, 134, 252, 0.2)',
                        transition: 'transform 0.3s',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        color: '#fff'
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <div style={{ background: 'rgba(187, 134, 252, 0.1)', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
                            <BookOpen size={48} color="#bb86fc" />
                        </div>
                        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#bb86fc' }}>NEBURA</h2>
                        <p style={{ color: '#888', marginBottom: '2rem' }}>Sci-fi epic in the Cassiopeia Dwarf Galaxy.</p>
                        <span className="btn" style={{ marginTop: 'auto', background: '#bb86fc', color: '#000' }}>Read Now</span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default PortalHome;
