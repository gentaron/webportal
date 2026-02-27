import React, { useState, useEffect } from 'react';

// ミナ・エウレカのセリフ (各ページで切り替え可能)
const DEFAULT_TIPS = [
  'こんにちは！私はミナ・エウレカ。このポータルの案内役よ。',
  '「NEBURA」はカシオペア矮小銀河を舞台にした壮大なSF叙事詩よ。',
  '「Sakura Story」は現代を舞台にしたウェブ小説。どっちから読む？',
  'NEBURAにはWikiがあるわ。キャラクター、世界観、用語を確認できるよ。',
  '読み終わったら修了証をもらえるわよ。挑戦してみて！',
];

const MinaGuide = ({ tips = DEFAULT_TIPS }) => {
  const [tipIndex, setTipIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [bubbleVisible, setBubbleVisible] = useState(true);
  const [animating, setAnimating] = useState(false);

  // Tips rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setTipIndex(i => (i + 1) % tips.length);
        setAnimating(false);
      }, 300);
    }, 6000);
    return () => clearInterval(interval);
  }, [tips]);

  if (!visible) {
    return (
      <button
        onClick={() => setVisible(true)}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 1000,
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(91,138,240,0.3), rgba(168,85,247,0.3))',
          border: '1px solid rgba(91,138,240,0.5)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.4rem',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 0 20px rgba(91,138,240,0.3)',
          animation: 'float 3s ease-in-out infinite',
          transition: 'all 0.3s',
        }}
        title="ミナ・エウレカに話しかける"
      >
        ✦
      </button>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '0.6rem',
    }}>
      {/* Speech bubble */}
      {bubbleVisible && (
        <div style={{
          background: 'rgba(7, 15, 30, 0.92)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(91,138,240,0.35)',
          borderRadius: '14px 14px 0 14px',
          padding: '1rem 1.2rem',
          maxWidth: '240px',
          boxShadow: '0 0 30px rgba(91,138,240,0.15), 0 8px 32px rgba(0,0,0,0.5)',
          animation: 'fadeInUp 0.3s ease',
          position: 'relative',
        }}>
          {/* Tip text */}
          <p style={{
            margin: 0,
            color: '#c8d8f0',
            fontSize: '0.82rem',
            lineHeight: 1.65,
            fontFamily: "'Inter', sans-serif",
            transition: 'opacity 0.3s',
            opacity: animating ? 0 : 1,
          }}>
            {tips[tipIndex]}
          </p>

          {/* Tip dots */}
          <div style={{
            display: 'flex',
            gap: '4px',
            marginTop: '0.6rem',
            justifyContent: 'center',
          }}>
            {tips.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === tipIndex ? '16px' : '5px',
                  height: '5px',
                  borderRadius: '3px',
                  background: i === tipIndex
                    ? 'linear-gradient(90deg, #5b8af0, #a855f7)'
                    : 'rgba(91,138,240,0.25)',
                  transition: 'all 0.4s',
                  cursor: 'pointer',
                }}
                onClick={() => setTipIndex(i)}
              />
            ))}
          </div>

          {/* Close bubble button */}
          <button
            onClick={() => setBubbleVisible(false)}
            style={{
              position: 'absolute',
              top: '6px',
              right: '8px',
              background: 'none',
              border: 'none',
              color: 'rgba(91,138,240,0.5)',
              cursor: 'pointer',
              fontSize: '0.75rem',
              lineHeight: 1,
              padding: '2px 4px',
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* Character avatar row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        {/* Label */}
        <div style={{
          background: 'rgba(7,15,30,0.85)',
          border: '1px solid rgba(91,138,240,0.25)',
          borderRadius: '20px',
          padding: '0.25rem 0.75rem',
          backdropFilter: 'blur(12px)',
        }}>
          <button
            onClick={() => setBubbleVisible(v => !v)}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(91,138,240,0.8)',
              cursor: 'pointer',
              fontSize: '0.72rem',
              fontFamily: "'Inter', sans-serif",
              whiteSpace: 'nowrap',
            }}
          >
            {bubbleVisible ? '閉じる' : 'ミナに聞く ✦'}
          </button>
        </div>

        {/* Avatar */}
        <div
          onClick={() => { setBubbleVisible(v => !v); }}
          style={{
            width: '62px',
            height: '62px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(91,138,240,0.25), rgba(168,85,247,0.25))',
            border: '2px solid rgba(91,138,240,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 24px rgba(91,138,240,0.3), 0 0 60px rgba(168,85,247,0.1)',
            animation: 'float 3.5s ease-in-out infinite',
            overflow: 'hidden',
            cursor: 'pointer',
            backdropFilter: 'blur(12px)',
            flexShrink: 0,
            position: 'relative',
          }}
        >
          {/* Rotating ring */}
          <div style={{
            position: 'absolute',
            inset: '-6px',
            borderRadius: '50%',
            border: '1.5px solid transparent',
            borderTopColor: 'rgba(91,138,240,0.6)',
            borderRightColor: 'rgba(168,85,247,0.4)',
            animation: 'rotateSlow 4s linear infinite',
            pointerEvents: 'none',
          }} />

          {/*
            ★ ここに実際のミナ・エウレカの画像を配置 ★
            画像ファイルを /src/assets/mina_eureka.png (or .jpg) として置いた後、
            以下のコメントを解除してください:

            import minaImg from '../assets/mina_eureka.png';
            <img src={minaImg} alt="ミナ・エウレカ"
              style={{ width:'100%', height:'100%', objectFit:'cover' }} />
          */}
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '2px',
          }}>
            <span style={{ fontSize: '1.6rem', lineHeight: 1 }}>✦</span>
            <span style={{
              fontSize: '0.5rem',
              color: 'rgba(91,138,240,0.8)',
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '0.05em',
            }}>MINA</span>
          </div>
        </div>
      </div>

      {/* Hide guide button */}
      <div style={{ textAlign: 'right' }}>
        <button
          onClick={() => setVisible(false)}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(74,96,128,0.7)',
            cursor: 'pointer',
            fontSize: '0.65rem',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          案内を非表示
        </button>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-7px); }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default MinaGuide;
