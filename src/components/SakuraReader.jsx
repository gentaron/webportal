import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import chapters from '../data/sakura_chapters.json';
import { generateCertificate } from '../utils/certificate';

const SakuraReader = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const chapterId = parseInt(id);
    const chapter = chapters.find(c => parseInt(c.id) === chapterId);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [chapterId]);

    if (!chapter) {
        return <div className="container" style={{ textAlign: 'center', marginTop: '5rem' }}><h2>Chapter not found</h2><Link to="/sakura" className="btn">Back to List</Link></div>;
    }

    const nextChapterId = chapterId < chapters.length ? chapterId + 1 : null;
    const prevChapterId = chapterId > 1 ? chapterId - 1 : null;

    return (
        <div className="container" style={{ maxWidth: '700px' }}>
            <nav style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/sakura" style={{ color: '#ff7eb3', textDecoration: 'none' }}>&larr; Table of Contents</Link>
                <span style={{ color: '#666' }}>{chapter.title}</span>
            </nav>

            <article className="fade-in" style={{ fontSize: '1.2rem', lineHeight: '2', marginBottom: '4rem' }}>
                {chapter.content.split('\n').map((line, index) => (
                    <p key={index} style={{ marginBottom: '1.5rem', minHeight: line.trim() ? 'auto' : '1rem' }}>
                        {line}
                    </p>
                ))}
            </article>

            <div style={{
                borderTop: '1px solid #333',
                paddingTop: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                alignItems: 'center'
            }}>
                {/* Certificate button removed per request */}

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', width: '100%', justifyContent: 'space-between' }}>
                    {prevChapterId ? (
                        <Link to={`/sakura/chapter/${prevChapterId}`} className="btn" style={{ background: '#333', color: '#fff' }}>
                            &larr; Previous
                        </Link>
                    ) : <div></div>}

                    {nextChapterId ? (
                        <Link to={`/sakura/chapter/${nextChapterId}`} className="btn" style={{ background: '#333', color: '#fff' }}>
                            Next &rarr;
                        </Link>
                    ) : <div></div>}
                </div>
            </div>
        </div>
    );
};

export default SakuraReader;
