import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import wikiData from '../data/sakura_wiki.json';

const ACCENT = '#ff7eb3';
const ACCENT_DIM = '#cc5588';

const SakuraWiki = () => {
    const [activeTab, setActiveTab] = useState('characters');

    const tabs = [
        { id: 'characters', label: 'キャラクター' },
        { id: 'locations', label: '舞台・場所' },
        { id: 'terms', label: '用語集' },
        { id: 'rankings', label: 'ランキング' }
    ];

    const renderCards = (items) => (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1rem'
        }}>
            {items.map((item, index) => (
                <div key={index} style={{
                    background: '#2a2a2a',
                    border: `1px solid #3a3a3a`,
                    borderRadius: '12px',
                    padding: '1.2rem',
                    transition: 'border-color 0.2s',
                    cursor: 'default'
                }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = ACCENT}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#3a3a3a'}
                >
                    <h3 style={{ margin: '0 0 0.6rem 0', color: ACCENT, fontSize: '1rem', lineHeight: 1.4 }}>
                        {item.name}
                    </h3>
                    <p style={{ margin: 0, color: '#bbb', fontSize: '0.9rem', lineHeight: 1.7 }}>
                        {item.description}
                    </p>
                </div>
            ))}
        </div>
    );

    const renderRankingTable = (title, data) => (
        <div style={{ marginBottom: '2.5rem' }}>
            <h4 style={{ textAlign: 'center', margin: '0 0 1rem 0', color: '#ccc', fontSize: '1rem' }}>{title}</h4>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                    <tr style={{ borderBottom: `2px solid ${ACCENT}` }}>
                        <th style={{ padding: '0.6rem', textAlign: 'center', color: ACCENT, width: '10%' }}>順位</th>
                        <th style={{ padding: '0.6rem', textAlign: 'left', color: ACCENT }}>名前</th>
                        <th style={{ padding: '0.6rem', textAlign: 'left', color: ACCENT }}>詳細</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #333' }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#2a2a2a'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                            <td style={{
                                padding: '0.7rem',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                color: row.rank === 1 ? '#ffd700' : row.rank === 2 ? '#c0c0c0' : row.rank === 3 ? '#cd7f32' : '#aaa'
                            }}>
                                {row.rank}
                            </td>
                            <td style={{ padding: '0.7rem', color: '#fff' }}>{row.name}</td>
                            <td style={{ padding: '0.7rem', color: '#999' }}>{row.detail}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'characters':
                return renderCards(wikiData.characters);
            case 'locations':
                return renderCards(wikiData.locations);
            case 'terms':
                return renderCards(wikiData.terms);
            case 'rankings':
                return (
                    <div>
                        {renderRankingTable('戦闘力ランキング', wikiData.rankings.strength)}
                        {renderRankingTable('政治・影響力ランキング', wikiData.rankings.influence)}
                        {renderRankingTable('登場頻度ランキング', wikiData.rankings.episodes)}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: '#1a1a1a', padding: '0 0 4rem 0' }}>
            {/* Header */}
            <div style={{
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2d0d1a 100%)',
                borderBottom: `1px solid ${ACCENT}33`,
                padding: '2rem 1rem 1.5rem'
            }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <Link to="/sakura" style={{ color: '#888', textDecoration: 'none', fontSize: '0.9rem' }}>
                        &larr; Sakura Story
                    </Link>
                    <h1 style={{
                        textAlign: 'center',
                        margin: '1rem 0 0.4rem',
                        color: ACCENT,
                        fontSize: '2rem',
                        letterSpacing: '0.05em'
                    }}>
                        Sakura Story 百科事典
                    </h1>
                    <p style={{ textAlign: 'center', color: '#888', margin: 0, fontSize: '0.9rem' }}>
                        登場人物・世界観・用語集
                    </p>
                </div>
            </div>

            {/* Tabs */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '1.5rem 1rem 0',
                flexWrap: 'wrap'
            }}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: '0.6rem 1.4rem',
                            borderRadius: '999px',
                            border: `1px solid ${activeTab === tab.id ? ACCENT : '#444'}`,
                            background: activeTab === tab.id ? ACCENT : 'transparent',
                            color: activeTab === tab.id ? '#fff' : '#aaa',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            transition: 'all 0.2s',
                            fontFamily: 'inherit'
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div style={{ maxWidth: '900px', margin: '1.5rem auto 0', padding: '0 1rem' }}>
                {renderContent()}
            </div>
        </div>
    );
};

export default SakuraWiki;
