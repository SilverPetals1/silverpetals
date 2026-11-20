import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Header({ searchQuery, setSearchQuery, savedPinsCount, onOpenDrawer, onResetFilters }) {
  const navigate = useNavigate();

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (onResetFilters) onResetFilters();
    navigate('/');
  };

  const handleChristmasClick = (e) => {
    e.preventDefault();
    if (onResetFilters) onResetFilters();
    navigate('/category/christmas');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="main-header christmas-header-theme">
      <div className="header-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <a href="/" className="logo" id="logo-home" onClick={handleLogoClick} style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          {/* Logo with festive Santa Hat */}
          <div className="logo-image-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <img src="/assets/logo_brand.jpg" alt="SilverPetals Logo" style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-accent, #c29d6d)' }} />
            {/* Elegant SVG Santa Hat */}
            <svg
              className="christmas-santa-hat"
              viewBox="0 0 44 36"
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '-11px',
                left: '-7px',
                width: '30px',
                height: '25px',
                transform: 'rotate(-8deg)',
                filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.28))',
                pointerEvents: 'none',
                zIndex: 10
              }}
            >
              {/* Hat red cone */}
              <path d="M 6 24 C 8 10, 24 2, 36 8 C 31 15, 26 21, 27 24 Z" fill="#C41E3A" />
              <path d="M 12 20 C 16 11, 26 5, 34 9 C 30 15, 25 20, 26 22 Z" fill="#9B111E" opacity="0.4" />
              {/* White fluffy brim */}
              <rect x="4" y="22" width="28" height="7" rx="3.5" fill="#FFFFFF" stroke="#EDEDED" strokeWidth="0.5" />
              {/* White pompom */}
              <circle cx="37" cy="8" r="4.5" fill="#FFFFFF" stroke="#EDEDED" strokeWidth="0.5" />
            </svg>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: '1.1' }}>
            <span style={{ fontSize: '1.45rem', fontWeight: '700', letterSpacing: '0.5px', color: '#F5F4F0' }}>
              Silver<span className="logo-serif" style={{ color: '#D4AF37', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>Petals</span>
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.68rem', color: '#A3A19B', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: '600' }}>Home Decor &amp; Living</span>
              <span className="christmas-badge" style={{
                fontSize: '0.62rem',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #c41e3a 0%, #8b1e2d 100%)',
                color: '#ffffff',
                padding: '1px 6px',
                borderRadius: '999px',
                letterSpacing: '0.5px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2px',
                boxShadow: '0 1px 4px rgba(196, 30, 58, 0.3)'
              }}>
                🎄 Holiday
              </span>
            </div>
          </div>
        </a>

        <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Christmas Ideas Action Pill */}
          <a
            href="/category/christmas"
            onClick={handleChristmasClick}
            className="christmas-header-pill"
            title="Explore 2026 Christmas Decor"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 15px',
              background: 'linear-gradient(135deg, #1B4D3E 0%, #12372A 100%)',
              color: '#F4D06F',
              borderRadius: '9999px',
              fontSize: '0.82rem',
              fontWeight: '700',
              textDecoration: 'none',
              border: '1px solid rgba(244, 208, 111, 0.45)',
              boxShadow: '0 2px 8px rgba(18, 55, 42, 0.25)',
              transition: 'all 0.25s ease'
            }}
          >
            <span>🎄</span>
            <span className="christmas-pill-text">Christmas Ideas</span>
            <span style={{ fontSize: '0.65rem', background: '#C41E3A', color: '#ffffff', padding: '1px 5px', borderRadius: '8px', fontWeight: '700' }}>2026</span>
          </a>

          <a
            href="#" onClick={(e) => e.preventDefault()}
            target="_blank"
            rel="noopener noreferrer"
            className="pinterest-header-pill"
            title="Pinterest"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.62-5.373-11.987-12-11.987z"/>
            </svg>
            <span className="pinterest-header-pill-text">Pinterest</span>
          </a>
        </div>
      </div>
    </header>
  )
}
