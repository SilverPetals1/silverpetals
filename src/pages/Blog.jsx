import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { DECOR_DB } from '../db'
import AdsterraAd from '../components/AdsterraAd'

const ad728Doc = `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;padding:0;display:flex;justify-content:center;align-items:center;background:transparent;overflow:hidden;height:90px;width:728px;}</style></head><body><script>atOptions={'key':'19d79c25e295f3046e227577efa2e057','format':'iframe','height':90,'width':728,'params':{}};</script><script src="https://www.highrevenueformat.com/19d79c25e295f3046e227577efa2e057/invoke.js"></script></body></html>`

const ad320Doc = `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;padding:0;display:flex;justify-content:center;align-items:center;background:transparent;overflow:hidden;height:50px;width:320px;}</style></head><body><script>atOptions={'key':'fe723b0255a167a39d307ad8e6fb69a4','format':'iframe','height':50,'width':320,'params':{}};</script><script src="https://www.highrevenueformat.com/fe723b0255a167a39d307ad8e6fb69a4/invoke.js"></script></body></html>`

const escapeAttr = (str) => str.replace(/"/g, '&quot;')

function getInArticleAdHtml(slotNumber = 1) {
  return `
    <div class="in-article-ad-card">
      <div class="adsterra-badge"><span>Advertisement</span></div>
      <div class="ad-desktop-slot">
        <iframe
          srcdoc="${escapeAttr(ad728Doc)}"
          width="728"
          height="90"
          loading="lazy"
          style="border:none;max-width:100%;display:block;margin:0 auto;"
          scrolling="no"
        ></iframe>
      </div>
      <div class="ad-mobile-slot">
        <iframe
          srcdoc="${escapeAttr(ad320Doc)}"
          width="320"
          height="50"
          loading="lazy"
          style="border:none;max-width:100%;display:block;margin:0 auto;"
          scrolling="no"
        ></iframe>
      </div>
    </div>
  `
}

const SMARTLINK_URL = '/'

function getTopGuideCardHtml() {
  return `
    <div class="decor-guide-card">
      <div class="decor-guide-content">
        <div class="decor-guide-badge">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style="margin-right:4px;"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          Free Design Resource
        </div>
        <h4 class="decor-guide-title">Download the 2026 Home Styling & Decor Checklist</h4>
        <p class="decor-guide-desc">Get our curated source sheet, exact room dimensions, and seasonal color swatches for this project.</p>
      </div>
      <a href="${SMARTLINK_URL}" target="_blank" rel="noopener noreferrer" class="decor-guide-btn">
        <span>Download Free Guide</span>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
    </div>
  `
}

function getMidGuideCardHtml() {
  return `
    <div class="decor-guide-card decor-guide-card-alt">
      <div class="decor-guide-content">
        <div class="decor-guide-badge">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style="margin-right:4px;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
          Curated Inspiration
        </div>
        <h4 class="decor-guide-title">Looking for Budget-Friendly Decor Alternatives?</h4>
        <p class="decor-guide-desc">Browse our handpicked styling lookbook with verified vendor links and affordable material alternatives.</p>
      </div>
      <a href="${SMARTLINK_URL}" target="_blank" rel="noopener noreferrer" class="decor-guide-btn">
        <span>Explore Collection</span>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
    </div>
  `
}

function getBottomGuideCardHtml() {
  return `
    <div class="decor-guide-card">
      <div class="decor-guide-content">
        <div class="decor-guide-badge">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style="margin-right:4px;"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>
          Instant Access
        </div>
        <h4 class="decor-guide-title">Plan Your Complete Home Makeover with Ease</h4>
        <p class="decor-guide-desc">Access the full high-resolution gallery, printable checklists, and product source guides.</p>
      </div>
      <a href="${SMARTLINK_URL}" target="_blank" rel="noopener noreferrer" class="decor-guide-btn">
        <span>Get Instant Access (Free)</span>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
    </div>
  `
}

export default function Blog() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [htmlContent, setHtmlContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 992 : false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const cleanSlug = slug.replace(/^blog-/, '')

  
  // Fetch details of other posts for the sidebar (excluding the current one)
  const sidebarPosts = DECOR_DB.filter(item => {
    if (!item.link) return false
    const itemSlug = item.link.replace('.html', '').replace(/^blog-/, '')
    return itemSlug !== cleanSlug
  }).slice(0, 4)

  useEffect(() => {
    setLoading(true)
    setError(false)
    
    const fetchUrl = `/blog/${cleanSlug}.html`
    
    fetch(fetchUrl)
      .then(res => {
        if (!res.ok) {
          return fetch(`/blogs/blog-${cleanSlug}.html`).then(r2 => {
            if (!r2.ok) return fetch(`/blogs/blog-${cleanSlug}`).then(r3 => r3.text());
            if (!r2.ok) throw new Error('Blog post not found')
            return r2.text()
          })
        }
        return res.text()
      })
      .then(text => {
        // Fix garbled encoding characters (mojibake) globally in the fetched HTML string before parsing
        let cleanedText = text
          .replaceAll('ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢', '&bull;')
          .replaceAll('Ã¢â‚¬Â¢', '&bull;')
          .replaceAll('Ã¢â,¬Â¢', '&bull;')
          .replaceAll('â€¢', '&bull;')
          .replaceAll('â‚¬Â¢', '&bull;')
          .replaceAll('Ã¢â‚¬Â¢', '&bull;')
          .replaceAll('ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“', '&mdash;')
          .replaceAll('Ã¢â‚¬â€', '&mdash;')
          .replaceAll('Ã¢â,¬â€œ', '&mdash;')
          .replaceAll('â€”', '&mdash;')
          .replaceAll('ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢', "'")
          .replaceAll('Ã¢â,¬â„¢', "'")
          .replaceAll('â€™', "'");

        // RegEx fallback to clean up any remaining weird symbols inside the author meta block
        cleanedText = cleanedText.replace(
          /(<div class="blog-author-meta">[\s\S]*?<span>Written by [^<]+<\/span>\s*)<span>[^<]+<\/span>(\s*<span>[A-Za-z]+ \d{1,2}, \d{4}<\/span>\s*)<span>[^<]+<\/span>(\s*<span>\d+ min read<\/span>)/g,
          '$1<span>&bull;</span>$2<span>&bull;</span>$3'
        );

        const parser = new DOMParser()
        const doc = parser.parseFromString(cleanedText, 'text/html')
        
        // Dynamically update document head tags for SEO
        const parsedTitle = doc.querySelector('title')?.textContent || doc.title
        if (parsedTitle) {
          document.title = parsedTitle
        }
        
        const parsedDesc = doc.querySelector('meta[name="description"]')?.getAttribute('content')
        let metaDescEl = document.querySelector('meta[name="description"]')
        if (parsedDesc) {
          if (!metaDescEl) {
            metaDescEl = document.createElement('meta')
            metaDescEl.setAttribute('name', 'description')
            document.head.appendChild(metaDescEl)
          }
          metaDescEl.setAttribute('content', parsedDesc)
        }
        
        let canonicalEl = document.querySelector('link[rel="canonical"]')
        if (!canonicalEl) {
          canonicalEl = document.createElement('link')
          canonicalEl.setAttribute('rel', 'canonical')
          document.head.appendChild(canonicalEl)
        }
        canonicalEl.setAttribute('href', `https://www.silverpetals.online/blog/${cleanSlug}`)
        // Force site name and correct avatar icon letter
        let authorMeta = doc.querySelector('.blog-author-meta')
        if (authorMeta) {
          let avatarEl = authorMeta.querySelector('.author-avatar')
          if (!avatarEl) {
            avatarEl = doc.createElement('div')
            avatarEl.className = 'author-avatar'
            authorMeta.prepend(avatarEl)
          }
          avatarEl.textContent = 'S'

          const authorMetaSpans = authorMeta.querySelectorAll('span')
          authorMetaSpans.forEach(span => {
            const text = span.textContent ? span.textContent.trim() : ''
            if (text.toLowerCase().includes('written by') || text.toLowerCase().startsWith('by ') || text.toLowerCase().includes('editorial team') || text.toLowerCase().includes('home style magic')) {
              span.textContent = 'Written by SilverPetals'
            } else if (text.toLowerCase().includes('min read')) {
              // Keep read time
            } else if (/\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/i.test(text) || /\b\d{4}\b/.test(text)) {
              // Keep date
            } else {
              // Force clean bullet point delimiter!
              span.innerHTML = '&bull;'
            }
          })
        } else {
          // If no .blog-author-meta found, create and insert it
          const headerEl = doc.querySelector('.blog-post-header') || doc.querySelector('.blog-header') || doc.querySelector('.blog-wrapper')
          if (headerEl) {
            authorMeta = doc.createElement('div')
            authorMeta.className = 'blog-author-meta'
            authorMeta.innerHTML = `
              <div class="author-avatar">H</div>
              <span>Written by SilverPetals</span>
              <span>&bull;</span>
              <span>October 2026</span>
              <span>&bull;</span>
              <span>10 min read</span>
            `
            const titleEl = headerEl.querySelector('h1, h2, .blog-h2-title, .blog-post-title')
            if (titleEl && titleEl.nextSibling) {
              headerEl.insertBefore(authorMeta, titleEl.nextSibling)
            } else {
              headerEl.appendChild(authorMeta)
            }
          }
        }

        // Strip any affiliate disclosures or FTC disclosure paragraphs globally
        doc.querySelectorAll('.affiliate-disclosure, .ftc-disclosure').forEach(el => el.remove())
        doc.querySelectorAll('p').forEach(p => {
          if (p.textContent && (p.textContent.includes('As an Amazon Associate') || p.textContent.includes('FTC Affiliate Disclosure'))) {
            p.remove()
          }
        })

        let mainEl = doc.querySelector('main.blog-main-content') || 
                     doc.querySelector('.blog-detail-container') || 
                     doc.querySelector('main') || 
                     doc.querySelector('.blog-container') || 
                     doc.querySelector('.blog-main-content')

        // Safety check: ensure mainEl contains the article title
        const titleEl = doc.querySelector('.blog-h2-title, .blog-post-title, .blog-header h1, .blog-post-header h1, h1')
        if (mainEl && titleEl && !mainEl.contains(titleEl)) {
          const headerEl = doc.querySelector('.blog-header, .blog-post-header') || titleEl
          mainEl.insertBefore(headerEl.cloneNode(true), mainEl.firstChild)
        }

        // Safety check: ensure mainEl contains the hero image if present in the document
        const heroEl = doc.querySelector('.blog-hero-image-container')
        if (mainEl && heroEl && !mainEl.contains(heroEl)) {
          const titleInMain = mainEl.querySelector('.blog-h2-title, .blog-post-title, .blog-header, .blog-post-header, h1, .blog-author-meta')
          if (titleInMain && titleInMain.nextSibling) {
            mainEl.insertBefore(heroEl.cloneNode(true), titleInMain.nextSibling)
          } else {
            mainEl.insertBefore(heroEl.cloneNode(true), mainEl.firstChild)
          }
        }

        // Ensure in-article responsive ads exist (fallback if missing)
        if (mainEl && doc.querySelectorAll('.in-article-ad-card').length === 0) {
          const introEl = doc.querySelector('.blog-intro')
          if (introEl) {
            const tempDiv = doc.createElement('div')
            tempDiv.innerHTML = getInArticleAdHtml(1)
            if (tempDiv.firstElementChild) {
              introEl.after(tempDiv.firstElementChild)
            }
          }

          const sections = doc.querySelectorAll('.blog-section')
          if (sections.length >= 3) {
            const tempDiv = doc.createElement('div')
            tempDiv.innerHTML = getInArticleAdHtml(2)
            if (tempDiv.firstElementChild) {
              sections[2].after(tempDiv.firstElementChild)
            }
          }
        }

        // Ensure Smartlink Interactive Decor Guide cards exist
        if (mainEl && doc.querySelectorAll('.decor-guide-card').length === 0) {
          // Top Guide Card (right after first ad or after intro)
          const firstAdEl = doc.querySelector('.in-article-ad-card')
          const introEl = doc.querySelector('.blog-intro')
          const topTarget = firstAdEl || introEl
          if (topTarget) {
            const tempDiv = doc.createElement('div')
            tempDiv.innerHTML = getTopGuideCardHtml()
            if (tempDiv.firstElementChild) {
              topTarget.after(tempDiv.firstElementChild)
            }
          }

          // Mid Guide Card (around middle sections)
          const sections = doc.querySelectorAll('.blog-section')
          if (sections.length >= 4) {
            const midIndex = Math.min(4, Math.floor(sections.length / 2))
            const tempDiv = doc.createElement('div')
            tempDiv.innerHTML = getMidGuideCardHtml()
            if (tempDiv.firstElementChild) {
              sections[midIndex].after(tempDiv.firstElementChild)
            }
          }

          // Bottom Guide Card (before conclusion)
          const conclusionEl = doc.querySelector('.blog-conclusion')
          if (conclusionEl) {
            const tempDiv = doc.createElement('div')
            tempDiv.innerHTML = getBottomGuideCardHtml()
            if (tempDiv.firstElementChild) {
              conclusionEl.before(tempDiv.firstElementChild)
            }
          }
        }

        const pageTitle = doc.querySelector('title')?.textContent
        if (pageTitle) {
          document.title = pageTitle
        }

        const headStyles = Array.from(doc.querySelectorAll('head style'))
          .map(s => s.outerHTML)
          .join('\n')

        if (mainEl) {
          setHtmlContent(headStyles + mainEl.innerHTML)
        } else {
          setHtmlContent(headStyles + doc.body.innerHTML)
        }
        setLoading(false)
        window.scrollTo(0, 0)
      })
      .catch(err => {
        console.error(err)
        setError(true)
        setLoading(false)
      })
  }, [cleanSlug])


  const handleContainerClick = (e) => {
    const anchor = e.target.closest('a')
    if (anchor) {
      const href = anchor.getAttribute('href')
      if (href) {
        if (href === 'index.html' || href === '/') {
          e.preventDefault()
          navigate('/')
        } 
        else if (href.endsWith('.html') && !href.startsWith('http') && !href.startsWith('//')) {
          e.preventDefault()
          const nextSlug = href.replace('.html', '').replace(/^blog-/, '')
          navigate(`/blog/${nextSlug}`)
        }
      }
    }
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', fontFamily: 'var(--font-sans)' }}>
        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>Loading design guide...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', fontFamily: 'var(--font-sans)', gap: '16px' }}>
        <h3>Design Guide Not Found</h3>
        <p style={{ color: 'var(--color-text-muted)' }}>The blog post you are looking for does not exist or has been moved.</p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>Back to Home</button>
      </div>
    )
  }

  return (
    <div className="blog-page-container">
      <div className="blog-layout-wrapper">
        {/* Main Article Content Column */}
        <main
          className="blog-main-content-column"
          onClick={handleContainerClick}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Sidebar Inspiration Column */}
        <aside className="blog-sidebar-column">
          <div className="sidebar-sticky-content">
            {!isMobile && <AdsterraAd variant="sidebar" />}

            {/* Smartlink Guide CTA Card */}
            <div className="sidebar-guide-card">
              <span className="sidebar-guide-badge">Free Download</span>
              <h4 className="sidebar-guide-title">2026 Decor & Styling Checklist</h4>
              <p className="sidebar-guide-desc">Get the complete room-by-room design guide, moodboards, and product source lists.</p>
              <a 
                href={SMARTLINK_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="sidebar-guide-btn"
              >
                📥 Download Guide (Free)
              </a>
            </div>

            <h3 className="sidebar-section-title">Trending Inspiration</h3>
            
            <div className="sidebar-posts-list">
              {sidebarPosts.map((post) => {
                const postSlug = post.link.replace('.html', '').replace(/^blog-/, '')
                return (
                  <div 
                    key={post.id} 
                    className="sidebar-post-card"
                    onClick={() => {
                      navigate(`/blog/${postSlug}`);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <div className="sidebar-post-image">
                      <img src={post.image} alt={post.title} />
                    </div>
                    <div className="sidebar-post-info">
                      <span className="sidebar-post-category">{post.categoryLabel}</span>
                      <h4 className="sidebar-post-title">{post.title}</h4>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Newsletter Promo Widget */}
            <div className="sidebar-newsletter-promo">
              <h4>Get Free Design Guides</h4>
              <p>Sign up to receive our weekly curation of top interior projects directly to your inbox.</p>
              <button 
                onClick={() => {
                  const footerInput = document.querySelector('footer input[type="email"]');
                  if (footerInput) {
                    footerInput.focus();
                    footerInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }}
                className="sidebar-promo-btn"
              >
                Subscribe Now
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
