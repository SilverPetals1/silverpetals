import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Footer({ setSearchQuery }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleCategoryClick = (e, cat) => {
    e.preventDefault();
    setSearchQuery('');
    if (cat === 'all') {
      navigate('/');
    } else {
      navigate(`/category/${cat}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() !== '') {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="main-footer">
      <div className="footer-container">
        {/* Brand Column */}
        <div className="footer-brand">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
            <img src="/assets/logo_brand.jpg" alt="SilverPetals Logo" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-accent, #c29d6d)' }} />
            <span className="logo" style={{ fontSize: '1.4rem', color: '#ffffff', letterSpacing: '0.5px' }}>
              Silver<span className="logo-serif" style={{ color: '#D4AF37', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>Petals</span>
            </span>
          </div>
          <p>Inspiring your living environment with premium home decor designs, room styling guides, and curated Amazon recommendations.</p>
          <a
            href="#" onClick={(e) => e.preventDefault()}
            target="_blank"
            rel="noopener noreferrer"
            className="pinterest-footer-pill"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '16px',
              padding: '10px 22px',
              backgroundColor: 'var(--color-pinterest)',
              color: '#ffffff',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              textDecoration: 'none'
            }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.62-5.373-11.987-12-11.987z"/>
            </svg>
            <span>Pinterest</span>
          </a>
        </div>

        {/* Categories Column */}
        <div className="link-group">
          <h4>Categories</h4>
          <a href="#" className="footer-cat-link" onClick={(e) => handleCategoryClick(e, 'home-decor')}>Home Decor</a>
          <a href="#" className="footer-cat-link" onClick={(e) => handleCategoryClick(e, 'living-room')}>Living Room</a>
          <a href="#" className="footer-cat-link" onClick={(e) => handleCategoryClick(e, 'kitchen')}>Kitchen</a>
          <a href="#" className="footer-cat-link" onClick={(e) => handleCategoryClick(e, 'bathroom')}>Bathroom</a>
        </div>

        {/* Spaces Column */}
        <div className="link-group">
          <h4>Rooms & Spaces</h4>
          <a href="#" className="footer-cat-link" onClick={(e) => handleCategoryClick(e, 'bedroom')}>Bedroom</a>
          <a href="#" className="footer-cat-link" onClick={(e) => handleCategoryClick(e, 'kids-room')}>Kids Room</a>
          <a href="#" className="footer-cat-link" onClick={(e) => handleCategoryClick(e, 'ceiling')}>Ceiling</a>
          <a href="#" className="footer-cat-link" onClick={(e) => handleCategoryClick(e, 'flooring')}>Flooring</a>
        </div>

        {/* Newsletter Column */}
        <div className="link-group">
          <h4>Newsletter</h4>
          <span className="about-text" style={{ display: 'block', marginBottom: '12px' }}>
            Subscribe to receive daily interior styling tips and curated Amazon decor finds.
          </span>
          {subscribed ? (
            <div style={{ color: 'var(--color-accent)', fontSize: '0.85rem', fontWeight: '600', padding: '10px 0' }}>
              ✓ Thank you for subscribing!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  padding: '10px 12px',
                  backgroundColor: '#2d2c27',
                  border: '1px solid #444',
                  color: '#ffffff',
                  fontSize: '0.85rem',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '10px',
                  backgroundColor: 'var(--color-accent)',
                  color: '#ffffff',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  fontSize: '0.75rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = 'var(--color-accent-dark)'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'var(--color-accent)'}
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Footer Bottom copyright and simple line */}
      <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <p style={{ margin: 0 }}>&copy; 2026 SilverPetals Home Decor & Living. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '20px', fontSize: '0.8rem', flexWrap: 'wrap' }}>
          <a href="/about" style={{ color: '#b0ad9e', textDecoration: 'none', transition: 'color 0.2s' }}>About Us</a>
          <a href="/contact" style={{ color: '#b0ad9e', textDecoration: 'none', transition: 'color 0.2s' }}>Contact Us</a>
          <a href="/privacy-policy" style={{ color: '#b0ad9e', textDecoration: 'none', transition: 'color 0.2s' }}>Privacy Policy</a>
          <a href="/terms-of-service" style={{ color: '#b0ad9e', textDecoration: 'none', transition: 'color 0.2s' }}>Terms & Conditions</a>
          <a href="/affiliate-disclosure" style={{ color: '#b0ad9e', textDecoration: 'none', transition: 'color 0.2s' }}>Affiliate Disclosure</a>
        </div>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            color: '#b0ad9e',
            fontSize: '0.8rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            transition: 'color 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.color = '#ffffff'}
          onMouseOut={(e) => e.target.style.color = '#b0ad9e'}
        >
          Back to Top ↑
        </button>
      </div>
    </footer>
  )
}
