import React, { useState } from 'react';

const SNOWFLAKE_CHARS = ['❄', '❅', '✻', '•', '❆'];

export default function Snowfall() {
  const [flakes] = useState(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      char: SNOWFLAKE_CHARS[i % SNOWFLAKE_CHARS.length],
      left: Math.floor(Math.random() * 96) + 2, // 2% to 98%
      animationDuration: (8 + Math.random() * 10).toFixed(1), // 8s to 18s
      animationDelay: (Math.random() * 8).toFixed(1), // 0s to 8s
      fontSize: Math.floor(11 + Math.random() * 13), // 11px to 24px
      opacity: (0.35 + Math.random() * 0.45).toFixed(2),
      drift: `${Math.floor((Math.random() - 0.5) * 60)}px`
    }));
  });

  return (
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
  );
}
