import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { DECOR_DB } from '../db'
import Adsterra468x60 from '../components/Adsterra468x60'

export default function Home({
  activeCategory,
  searchQuery,
  setSearchQuery,
  savedPins,
  onTogglePin,
  onOpenDetails
}) {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const subParam = queryParams.get('sub') || 'all'

  const [activeSubcategory, setActiveSubcategory] = React.useState(subParam)

  React.useEffect(() => {
    setActiveSubcategory(subParam)
  }, [subParam, activeCategory])

  React.useEffect(() => {
    let title = "SilverPetals - Premium Home Decor & Interior Design Ideas"
    let description = "Discover beautiful, modern home decor and interior design ideas. Get curated inspirations for living rooms, kitchens, bedrooms, bathrooms, and ceilings."
    let canonical = "https://www.silverpetals.online/"

    const prettyCategoryNamesLocal = {
      'christmas': 'Christmas & Holiday Home Decor',
      'home-decor': 'Home Decor Ideas',
      'living-room': 'Living Room Styling',
      'kitchen': 'Kitchen Design Trends',
      'bathroom': 'Spa Bathroom Sanctuary',
      'bedroom': 'Bedroom Retreats',
      'ceiling': 'Architectural Ceilings',
      'flooring': 'Premium Hardwood & Concrete Flooring',
      'wall-decor': 'Wall Decor & Art Gallery',
      'kids-room': 'Kids Room Decor & Inspiration',
      'outdoor': 'Outdoor Decor & Patio Living'
    }

    if (activeCategory !== 'all') {
      const catLabel = prettyCategoryNamesLocal[activeCategory] || 'Home Decor'
      title = `${catLabel} - Interior Design Ideas | SilverPetals`
      description = `Explore our curated selection of ${catLabel.toLowerCase()} and professional styling guides on SilverPetals.`
      canonical = `https://www.silverpetals.online/category/${activeCategory}`
    }

    document.title = title

    let metaDescEl = document.querySelector('meta[name="description"]')
    if (!metaDescEl) {
      metaDescEl = document.createElement('meta')
      metaDescEl.setAttribute('name', 'description')
      document.head.appendChild(metaDescEl)
    }
    metaDescEl.setAttribute('content', description)

    let canonicalEl = document.querySelector('link[rel="canonical"]')
    if (!canonicalEl) {
      canonicalEl = document.createElement('link')
      canonicalEl.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalEl)
    }
    canonicalEl.setAttribute('href', canonical)
  }, [activeCategory])

  // Filter Data
  let filteredData = DECOR_DB
  if (activeCategory === 'christmas') {
    filteredData = DECOR_DB.filter(item =>
      (item.title + ' ' + (item.description || '') + ' ' + (item.category || '')).toLowerCase().match(/christmas|holiday|winter/)
    )
  } else if (activeCategory !== 'all') {
    filteredData = DECOR_DB.filter(item => item.category === activeCategory)
  }

  if (activeCategory === 'outdoor' && activeSubcategory !== 'all') {
    filteredData = filteredData.filter(item => item.subcategory === activeSubcategory)
  }

  if (searchQuery.trim() !== '') {
    const query = searchQuery.toLowerCase()
    filteredData = filteredData.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.categoryLabel.toLowerCase().includes(query) ||
      (item.steps && item.steps.some(step => step.toLowerCase().includes(query)))
    )
  }

  const showHero = activeCategory === 'all' && searchQuery === ''

  // If showHero is true, we display the first item as the Featured Hero editorial banner.
  const featuredItem = showHero && filteredData.length > 0 ? filteredData[0] : null
  const gridItems = featuredItem ? filteredData.slice(1) : filteredData

  // 4 Top Curated Christmas Showcase Posts
  const christmasSpotlight = React.useMemo(() => {
    const list = [
      'blog-20-red-christmas-tree-theme-ideas-for-a-cozy-holiday-home-youll-love',
      'blog-20-classy-christmas-table-decor-ideas-that-guests-will-talk-about-all-year',
      'blog-12-best-christmas-garland-and-cedar-swag-picks',
      'blog-best-home-decor-gifts-for-christmas-under-50'
    ];
    return DECOR_DB.filter(d => list.some(id => d.id === id || (d.link && d.link.includes(id))));
  }, []);

  const handleCardClick = (item) => {
    if (item.link) {
      const slug = item.link.replace('.html', '').replace(/^blog-/, '')
      navigate(`/blog/${slug}`)
    } else {
      onOpenDetails(item)
    }
  }

  const handlePinClick = (e, id) => {
    e.stopPropagation()
    onTogglePin(id)
  }

  const handleResetFilters = () => {
    setSearchQuery('')
    navigate('/')
  }

  const prettyCategoryNames = {
    'christmas': 'Christmas & Holiday Home Decor',
    'home-decor': 'Home Decor Ideas',
    'living-room': 'Living Room Styling',
    'kitchen': 'Kitchen Design Trends',
    'bathroom': 'Spa Bathroom Sanctuary',
    'bedroom': 'Bedroom Retreats',
    'ceiling': 'Architectural Ceilings',
    'flooring': 'Premium Hardwood & Concrete Flooring',
    'wall-decor': 'Wall Decor & Art Gallery',
    'kids-room': 'Kids Room Decor & Inspiration',
    'outdoor': 'Outdoor Decor & Patio Living'
  }

  return (
    <>
      {featuredItem && (() => {
        const featSlug = featuredItem.link ? featuredItem.link.replace('.html', '').replace(/^blog-/, '') : null
        const featHref = featSlug ? `/blog/${featSlug}` : '#'
        return (
          <div className="featured-hero-container">
            <a
              href={featHref}
              className="featured-hero-card"
              onClick={(e) => {
                if (!featSlug) {
                  e.preventDefault()
                  onOpenDetails(featuredItem)
                } else {
                  setTimeout(() => {
                    window.location.href = featHref
                  }, 60)
                }
              }}
              style={{ textDecoration: 'none', color: 'inherit', display: 'flex' }}
            >
              <div className="featured-hero-image-container">
                <img src={featuredItem.image} alt={featuredItem.title} fetchpriority="high" decoding="async" />
              </div>
              <div className="featured-hero-content">
                <span className="featured-hero-category">{featuredItem.categoryLabel}</span>
                <h2 className="featured-hero-title">{featuredItem.title}</h2>
                <p className="featured-hero-desc">{featuredItem.description}</p>
                <span className="featured-hero-read-btn">Read Article →</span>
              </div>
            </a>
          </div>
        )
      })()}

      {/* Christmas & Holiday Special Showcase (Rendered on Homepage) */}
      {showHero && christmasSpotlight.length > 0 && (
        <section className="christmas-showcase-container" aria-label="Christmas & Holiday Decor Collection">
          <div className="christmas-showcase-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="christmas-header-badge">🎄 Holiday Season 2026</span>
              <span style={{ fontSize: '0.84rem', color: '#1B4D3E', fontWeight: '700', letterSpacing: '0.5px' }}>
                Festive Home Decor Edition
              </span>
            </div>
            <h2 className="christmas-showcase-title">
              Christmas &amp; Holiday Home Decor Inspiration
            </h2>
            <p className="christmas-showcase-subtitle">
              Explore warm fireplace cedar garlands, festive red tree themes, luxury holiday tablescapes, and cozy winter styling ideas.
            </p>
          </div>

          <div className="christmas-showcase-grid">
            {christmasSpotlight.map((post) => {
              const slug = post.link ? post.link.replace('.html', '').replace(/^blog-/, '') : null;
              const href = slug ? `/blog/${slug}` : '#';
              return (
                <a
                  key={post.id}
                  href={href}
                  className="christmas-card"
                  onClick={(e) => {
                    if (slug) {
                      setTimeout(() => {
                        window.location.href = href;
                      }, 60);
                    }
                  }}
                >
                  <div className="christmas-card-image-wrap">
                    <img src={post.image} alt={post.title} loading="lazy" />
                    <span className="christmas-card-badge">🎄 Holiday Guide</span>
                  </div>
                  <div className="christmas-card-body">
                    <span className="christmas-card-tag">{post.categoryLabel || 'Holiday Decor'}</span>
                    <h3 className="christmas-card-title">{post.title}</h3>
                    <p className="christmas-card-snippet">{post.description}</p>
                    <span className="christmas-card-action">Read Holiday Guide →</span>
                  </div>
                </a>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: '28px' }}>
            <button
              type="button"
              className="christmas-view-all-btn"
              onClick={() => {
                navigate('/category/christmas');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span>Explore All Christmas &amp; Holiday Guides</span>
              <span style={{ fontSize: '1.15rem' }}>→</span>
            </button>
          </div>
        </section>
      )}

      <main className="main-content" style={!showHero ? { marginTop: 'calc(var(--header-height) + var(--nav-height))' } : {}}>
        {!showHero && (
          <div className="section-header" style={{ display: 'block' }}>
            <h2 className="section-title">
              {searchQuery ? `Search Results for "${searchQuery}"` : (prettyCategoryNames[activeCategory] || 'Category Ideas')}
            </h2>
            <p className="section-desc">
              {searchQuery ? `Found ${filteredData.length} matching inspirations.` : 'Explore our curated selection of professional designs.'}
            </p>
            {activeCategory === 'outdoor' && (
              <div className="subcategory-strip">
                {[
                  { id: 'all', label: 'All Outdoor Ideas' },
                  { id: 'backyard-patio-porch', label: 'Backyard & Patio & Porch Decor' },
                  { id: 'garden-decor', label: 'Garden Decor Ideas' },
                  { id: 'jacuzzi-outdoor', label: 'Jacuzzi Outdoor Ideas' },
                  { id: 'outdoor-kids', label: 'Outdoor Ideas For Kids' }
                ].map(sub => (
                  <button
                    key={sub.id}
                    className={`subcategory-btn ${activeSubcategory === sub.id ? 'active' : ''}`}
                    onClick={() => navigate(sub.id === 'all' ? '/category/outdoor' : `/category/outdoor?sub=${sub.id}`)}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {filteredData.length === 0 ? (
          <div id="no-results" className="no-results" style={{ display: 'block' }}>
            <div className="no-results-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="48" height="48">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3>No designs found</h3>
            <p>Try adjusting your search terms or category selection.</p>
            <button className="btn btn-secondary" onClick={handleResetFilters}>Clear All Filters</button>
          </div>
        ) : (
          <>
            <Adsterra468x60 />
            <div id="masonry-grid" className="masonry-grid">
            
            {gridItems.map((item, idx) => {
              const isPinned = savedPins.includes(item.id)
              const slug = item.link ? item.link.replace('.html', '').replace(/^blog-/, '') : null
              const href = slug ? `/blog/${slug}` : '#'
              const delay = idx < 8 ? `${idx * 0.03}s` : '0s'
              return (
                <a
                  key={item.id}
                  href={href}
                  className="card-item"
                  style={{ animationDelay: delay }}
                  onClick={(e) => {
                    if (slug) {
                      setTimeout(() => {
                        window.location.href = href
                      }, 60)
                    } else {
                      e.preventDefault()
                      onOpenDetails(item)
                    }
                  }}
                >
                  <div className="card-image-container">
                    <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
                    <div className="card-overlay">
                      <button
                        className={`pin-btn ${isPinned ? 'pinned' : ''}`}
                        title={isPinned ? 'Remove from board' : 'Save to board'}
                        onClick={(e) => handlePinClick(e, item.id)}
                      >
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="card-info">
                    <span className="card-category">{item.categoryLabel}</span>
                    <h3 className="card-title">{item.title}</h3>
                    <p className="card-desc">{item.description}</p>
                  </div>
                </a>
              )
            })}
            </div>
          </>
        )}
      </main>
    </>
  )
}
