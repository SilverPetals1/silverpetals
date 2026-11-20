import React, { useEffect, useRef } from 'react';

/**
 * Luxury Festive Snowfall & Sparkle Canvas
 * Exact holiday particle effect matching Crawford Construction:
 * - 4-point curved sparkle stars (spinning in 2D)
 * - Fluttering gold & white foil confetti (3D perspective flip)
 * - Soft circular winter snow dots (gentle sinusoidal drift)
 * - Responsive particle count (60 desktop, 30 mobile)
 * - Auto-pauses when tab is inactive to preserve battery
 * - Zero pointer interference (pointer-events: none)
 */
export default function Snowfall() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Respect reduced motion preference
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId = null;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    window.addEventListener('resize', resize, { passive: true });
    resize();

    // 60 particles on desktop, 30 on mobile
    const count = width < 768 ? 30 : 60;

    const goldPalette = [
      'rgba(212, 175, 55, ',   // Classic Metallic Gold
      'rgba(243, 229, 171, ',  // Champagne Cream Gold
      'rgba(224, 185, 85, '    // Warm Amber Gold
    ];
    const whitePalette = [
      'rgba(255, 255, 255, ',  // Pure Frost White
      'rgba(235, 243, 255, '   // Soft Ice Blue-White
    ];

    const particles = [];
    for (let i = 0; i < count; i++) {
      const isGold = Math.random() > 0.4;
      const typeRand = Math.random();
      const type = typeRand > 0.65 ? 'gold-star' : typeRand > 0.35 ? 'confetti' : 'snow';
      const baseColor = isGold
        ? goldPalette[Math.floor(Math.random() * goldPalette.length)]
        : whitePalette[Math.floor(Math.random() * whitePalette.length)];
      const opacity = Math.random() * 0.45 + 0.35;

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 1,
        density: Math.random() * 20 + 5,
        color: `${baseColor}${opacity.toFixed(2)})`,
        type: type,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.8,
        size: Math.random() * 4.5 + 3,
        tilt: Math.random() * Math.PI,
        tiltSpeed: Math.random() * 0.04 + 0.015,
        swingSpeed: Math.random() * 0.02 + 0.008
      });
    }

    let step = 0;
    let isHidden = false;

    const onVisibilityChange = () => {
      isHidden = document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const render = () => {
      if (!isHidden) {
        ctx.clearRect(0, 0, width, height);
        step += 0.012;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Downward gravity + gentle swaying oscillation
          p.y += Math.cos(step + p.density) * 0.4 + 0.65 + p.radius / 4;
          p.x += Math.sin(step * p.swingSpeed * 100 + p.density) * 0.75;
          p.rotation += p.rotationSpeed;
          p.tilt += p.tiltSpeed;

          // Recycle when fallen below screen
          if (p.y > height + 25) {
            p.y = -25;
            p.x = Math.random() * width;
          }

          // Screen horizontal wrap
          if (p.x > width + 25) {
            p.x = -25;
          } else if (p.x < -25) {
            p.x = width + 25;
          }

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);

          if (p.type === 'gold-star') {
            // 4-pointed curved starburst
            const s = p.size;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.moveTo(0, -s);
            ctx.quadraticCurveTo(0, 0, s, 0);
            ctx.quadraticCurveTo(0, 0, 0, s);
            ctx.quadraticCurveTo(0, 0, -s, 0);
            ctx.quadraticCurveTo(0, 0, 0, -s);
            ctx.closePath();
            ctx.fill();
          } else if (p.type === 'confetti') {
            // 3D perspective flipping foil flake
            const tiltCos = Math.cos(p.tilt);
            ctx.scale(tiltCos, 1);
            ctx.fillStyle = p.color;
            const w = p.size * 1.3;
            const h = p.size * 0.65;
            ctx.fillRect(-w / 2, -h / 2, w, h);
          } else {
            // Soft circular snow particle
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(0, 0, p.radius, 0, Math.PI * 2, true);
            ctx.fill();
          }

          ctx.restore();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (animId) {
        cancelAnimationFrame(animId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
        userSelect: 'none'
      }}
    />
  );
}
