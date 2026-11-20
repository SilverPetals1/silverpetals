import React, { useState } from 'react';

const SNOWFLAKE_CHARS = ['❄', '❅', '✻', '•', '❆'];

export default function Snowfall() {
  const [enabled, setEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem('silverpetals_snowfall');
      return saved !== null ? JSON.parse(saved) : true;
    } catch (e) {
      return true;
    }
  });

  const [flakes] = useState(() => {
    return Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      char: SNOWFLAKE_CHARS[i % SNOWFLAKE_CHARS.length],
      left: Math.floor(Math.random() * 96) + 2, // 2% to 98%
      animationDuration: (8 + Math.random() * 10).toFixed(1), // 8s to 18s
      animationDelay: (Math.random() * 8).toFixed(1), // 0s to 8s
      fontSize: Math.floor(10 + Math.random() * 12), // 10px to 22px
      opacity: (0.35 + Math.random() * 0.45).toFixed(2),
      drift: `${Math.floor((Math.random() - 0.5) * 60)}px`
    }));
  });

  const toggleSnow = () => {
    setEnabled(prev => {
      const next = !prev;
      try {
        localStorage.setItem('silverpetals_snowfall', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  return (
    <>
      {enabled && (
        <div className="christmas-snowfall-container" aria-hidden="true">
          {flakes.map(f => (
            <span
              key={f.id}
              className="snowflake-particle"
              style={{
                left: `${f.left}%`,
                animationDuration: `${f.animationDuration}s`,
                animationDelay: `${f.animationDelay}s`,
                fontSize: `${f.fontSize}px`,
                opacity: f.opacity,
                '--drift': f.drift
              }}
            >
              {f.char}
            </span>
          ))}
        </div>
      )}

      {/* Discreet floating snow toggle at bottom left */}
      <button
        onClick={toggleSnow}
        className="snow-toggle-btn"
        title={enabled ? "Turn snowfall off" : "Turn snowfall on"}
        aria-label="Toggle festive snowfall"
      >
        <span>{enabled ? '❄️' : '⛄'}</span>
      </button>
    </>
  );
}
