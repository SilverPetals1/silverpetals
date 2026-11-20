import React from 'react'
import { useNavigate } from 'react-router-dom'

const CATEGORIES = [
  { id: 'all', label: 'Home' },
  { id: 'christmas', label: '🎄 Christmas Decor', isHoliday: true },
  { id: 'home-decor', label: 'Home Decor' },
  { id: 'living-room', label: 'Living Room' },
  { id: 'kitchen', label: 'Kitchen' },
  { id: 'bathroom', label: 'Bathroom' },
  { id: 'bedroom', label: 'Bedroom' },
  { id: 'ceiling', label: 'Ceiling' },
  { id: 'flooring', label: 'Flooring' },
  { id: 'wall-decor', label: 'Wall Decor' },
  { id: 'kids-room', label: 'Kids Room Decor' },
  { id: 'outdoor', label: 'Outdoor Ideas' }
]

export default function CategoryStrip({ activeCategory, onClearSearch }) {
  const navigate = useNavigate();

  const handleCategoryClick = (e, catId) => {
    e.preventDefault();
    onClearSearch();
    if (catId === 'all') {
      navigate('/');
    } else {
      navigate(`/category/${catId}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="categories-nav">
      <div className="nav-container">
        {CATEGORIES.map(cat => {
          const href = cat.id === 'all' ? '/' : `/category/${cat.id}`;
          const isSelected = activeCategory === cat.id;
          const extraClass = cat.isHoliday ? 'christmas-nav-pill' : '';
          return (
            <a
              key={cat.id}
              href={href}
              className={`nav-item ${isSelected ? 'active' : ''} ${extraClass}`}
              onClick={(e) => handleCategoryClick(e, cat.id)}
            >
              <span>{cat.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  )
}
