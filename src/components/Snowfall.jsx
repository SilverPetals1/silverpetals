import React, { useEffect, useRef } from 'react';

/**
 * Optimized Luxury Festive Snowfall & Sparkle Canvas
 * Crawford Construction style:
 * - 4-point curved sparkle stars (spinning in 2D)
 * - Fluttering gold & white foil confetti (3D perspective flip)
 * - Soft circular winter snow dots (gentle sinusoidal drift)
 * - Ultra-lightweight (1x canvas, 38 desktop / 20 mobile particles)
 * - Auto-pauses when tab is inactive
 * - Isolated GPU composite layer (zero scroll jank)
 */
export default function Snowfall() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId = null;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize, { passive: true });

    // 38 particles on desktop, 20 on mobile for ultra-smooth 60fps performance
    const count = width < 768 ? 20 : 38;

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
    let lastTime = 0;
    const interval = 1000 / 50; // Cap at smooth ~50fps to avoid excessive GPU burn on 120Hz/144Hz screens

    const onVisibilityChange = () => {
      isHidden = document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const render = (time) => {
      animId = requestAnimationFrame(render);
      if (isHidden) return;

      const delta = time - lastTime;
      if (delta < interval) return;
      lastTime = time - (delta % interval);

      ctx.clearRect(0, 0, width, height);
      step += 0.014;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.y += Math.cos(step + p.density) * 0.4 + 0.7 + p.radius / 4;
        p.x += Math.sin(step * p.swingSpeed * 100 + p.density) * 0.75;
        p.rotation += p.rotationSpeed;
        p.tilt += p.tiltSpeed;

        if (p.y > height + 25) {
          p.y = -25;
          p.x = Math.random() * width;
        }

        if (p.x > width + 25) {
          p.x = -25;
        } else if (p.x < -25) {
          p.x = width + 25;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        if (p.type === 'gold-star') {
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
          const tiltCos = Math.cos(p.tilt);
          ctx.scale(tiltCos, 1);
          ctx.fillStyle = p.color;
          const w = p.size * 1.3;
          const h = p.size * 0.65;
          ctx.fillRect(-w / 2, -h / 2, w, h);
        } else {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2, true);
          ctx.fill();
        }

        ctx.restore();
      }
    };

    animId = requestAnimationFrame(render);

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
        userSelect: 'none',
        willChange: 'transform',
        transform: 'translateZ(0)'
      }}
    />
  );
}
