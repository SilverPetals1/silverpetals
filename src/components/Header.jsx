import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Header({ searchQuery, setSearchQuery, savedPinsCount, onOpenDrawer, onResetFilters }) {
  const navigate = useNavigate();

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (onResetFilters) onResetFilters();
    navigate('/');
  };

  return (
    <header className="main-header">
      <div className="header-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <a href="/" className="logo" id="logo-home" onClick={handleLogoClick} style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <img src="/assets/logo_brand.jpg" alt="SilverPetals Logo" style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-accent, #c29d6d)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: '1.1' }}>
            <span style={{ fontSize: '1.45rem', fontWeight: '700', letterSpacing: '0.5px', color: '#1B4D3E' }}>
              Silver<span className="logo-serif" style={{ color: '#D4AF37', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>Petals</span>
            </span>
            <span style={{ fontSize: '0.68rem', color: '#888', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: '600' }}>Home Decor &amp; Living</span>
          </div>
        </a>

        <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
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
