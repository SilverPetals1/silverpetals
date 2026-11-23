import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import CategoryStrip from './components/CategoryStrip'
import Footer from './components/Footer'
import BoardDrawer from './components/BoardDrawer'
import DetailsModal from './components/DetailsModal'
import Home from './pages/Home'
import Blog from './pages/Blog'
import AdsterraStickyFooter from './components/AdsterraStickyFooter'
import { DECOR_DB } from './db'

export default function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState('')
  const [savedPins, setSavedPins] = useState([])
  
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  // Extract category from path
  let activeCategory = 'all'
  if (location.pathname.startsWith('/category/')) {
    activeCategory = location.pathname.replace('/category/', '')
  } else if (location.pathname.startsWith('/blog/')) {
    const slug = location.pathname.replace('/blog/', '')
    const post = DECOR_DB.find(item => {
      const itemSlug = item.link?.replace('.html', '').replace(/^blog-/, '')
      return itemSlug === slug
    })
    if (post) {
      activeCategory = post.category
    }
  }

  // Track page views in GTM dataLayer across all SPA routes
  useEffect(() => {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'pageview',
      page: location.pathname + location.search
    })
  }, [location])

  // Load from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('silverpetals_saved_pins')
      if (stored) {
        setSavedPins(JSON.parse(stored))
      }
    } catch (e) {
      console.error('Could not load saved pins from localStorage', e)
    }
  }, [])

  // Save to LocalStorage
  const syncPins = (newPins) => {
    setSavedPins(newPins)
    try {
      localStorage.setItem('silverpetals_saved_pins', JSON.stringify(newPins))
    } catch (e) {
      console.error('Could not save pins to localStorage', e)
    }
  }

  const handleTogglePin = (id) => {
    if (savedPins.includes(id)) {
      syncPins(savedPins.filter(pId => pId !== id))
    } else {
      syncPins([...savedPins, id])
    }
  }

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear your saved board?')) {
      syncPins([])
    }
  }

  const handleResetFilters = () => {
    setSearchQuery('')
    navigate('/')
  }

  const handleOpenDetails = (item) => {
    setSelectedItem(item)
    setModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const handleCloseDetails = () => {
    setModalOpen(false)
    setSelectedItem(null)
    document.body.style.overflow = ''
  }

  return (
    <>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        savedPinsCount={savedPins.length}
        onOpenDrawer={() => setDrawerOpen(true)}
        onResetFilters={handleResetFilters}
      />

      <CategoryStrip
        activeCategory={activeCategory}
        onClearSearch={() => setSearchQuery('')}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              activeCategory={activeCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              savedPins={savedPins}
              onTogglePin={handleTogglePin}
              onOpenDetails={handleOpenDetails}
            />
          }
        />
        <Route
          path="/category/:categoryName"
          element={
            <Home
              activeCategory={activeCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              savedPins={savedPins}
              onTogglePin={handleTogglePin}
              onOpenDetails={handleOpenDetails}
            />
          }
        />
        <Route path="/blog/:slug" element={<Blog />} />
        <Route
          path="/category"
          element={
            <Home
              activeCategory="all"
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              savedPins={savedPins}
              onTogglePin={handleTogglePin}
              onOpenDetails={handleOpenDetails}
            />
          }
        />
        <Route path="/blogs/:slug" element={<Blog />} />
        <Route
          path="*"
          element={
            <Home
              activeCategory="all"
              searchQuery=""
              setSearchQuery={setSearchQuery}
              savedPins={savedPins}
              onTogglePin={handleTogglePin}
              onOpenDetails={handleOpenDetails}
            />
          }
        />
      </Routes>

      <Footer
        setSearchQuery={setSearchQuery}
      />

      <BoardDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        savedPins={savedPins}
        onRemovePin={handleTogglePin}
        onClearAll={handleClearAll}
        onOpenDetails={handleOpenDetails}
      />

      <DetailsModal
        item={selectedItem}
        isOpen={modalOpen}
        onClose={handleCloseDetails}
        savedPins={savedPins}
        onTogglePin={handleTogglePin}
      />

      <AdsterraStickyFooter />
    </>
  )
}
