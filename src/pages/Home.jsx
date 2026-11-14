import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { DECOR_DB } from '../db'
// AdsterraAd removed

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
  if (activeCategory !== 'all') {
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
      {featuredItem && (
        <div className="featured-hero-container">
          <div className="featured-hero-card" onClick={() => handleCardClick(featuredItem)}>
            <div className="featured-hero-image-container">
              <img src={featuredItem.image} alt={featuredItem.title} />
            </div>
            <div className="featured-hero-content">
              <span className="featured-hero-category">{featuredItem.categoryLabel}</span>
              <h2 className="featured-hero-title">{featuredItem.title}</h2>
              <p className="featured-hero-desc">{featuredItem.description}</p>
              <span className="featured-hero-read-btn">Read Article →</span>
            </div>
          </div>
        </div>
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
          <div id="masonry-grid" className="masonry-grid">
            
            {gridItems.map((item, idx) => {
              const isPinned = savedPins.includes(item.id)
              return (
                <div
                  key={item.id}
                  className="card-item"
                  onClick={() => handleCardClick(item)}
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div className="card-image-container">
                    <img src={item.image} alt={item.title} loading="lazy" />
                    <div className="card-image-overlay-pin">
                      <button
                        className={`card-pin-btn ${isPinned ? 'pinned' : ''}`}
                        onClick={(e) => handlePinClick(e, item.id)}
                        aria-label="Pin to board"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12.72 2.03a1 1 0 01.56.88v3.42c3.48.51 6.17 3.32 6.67 6.87h1.02a1 1 0 011 .98 10 10 0 01-20 0 1 1 0 011-.98h1.02c.5-3.55 3.19-6.36 6.67-6.87V2.91a1 1 0 011.08-.88zm-2.72 17.5v1.5a2 2 0 004 0v-1.5h-4z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="card-content">
                    <span className="card-category-visible">{item.categoryLabel}</span>
                    <h4 className="card-title-visible">{item.title}</h4>
                    <p className="card-desc-visible">{item.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </>
  )
}
