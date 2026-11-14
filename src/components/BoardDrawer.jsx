import React from 'react'
import { DECOR_DB } from '../db'

export default function BoardDrawer({ isOpen, onClose, savedPins, onRemovePin, onClearAll, onOpenDetails }) {
  const savedItems = DECOR_DB.filter(item => savedPins.includes(item.id))

  const handleCardClick = (item) => {
    onClose();
    onOpenDetails(item);
  };

  const handleRemove = (e, id) => {
    e.stopPropagation();
    onRemovePin(id);
  };

  return (
    <div id="board-drawer" className={`drawer board-drawer ${isOpen ? 'active' : ''}`} aria-hidden={!isOpen}>
      <div className="drawer-overlay" onClick={onClose}></div>
      <div className="drawer-container">
        <div className="drawer-header">
          <h3>My Saved Board</h3>
          <button className="drawer-close" onClick={onClose} aria-label="Close drawer">&times;</button>
        </div>
        <div className="drawer-body">
          {savedItems.length === 0 ? (
            <div id="board-empty-state" className="board-empty-state">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="64" height="64">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              <p>Your board is currently empty.</p>
              <p className="subtext">Browse decor ideas and click "Pin It" or "Save to Board" to collect your favorites here.</p>
            </div>
          ) : (
            <div id="board-items-list" className="board-items-list" style={{ display: 'grid' }}>
              {savedItems.map(item => (
                <div key={item.id} className="board-card" onClick={() => handleCardClick(item)}>
                  <div className="board-card-img">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="board-card-info">
                    <h4 className="board-card-title">{item.title}</h4>
                    <span className="board-card-cat">{item.categoryLabel}</span>
                  </div>
                  <button
                    className="board-card-remove"
                    onClick={(e) => handleRemove(e, item.id)}
                    aria-label="Remove pin"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {savedItems.length > 0 && (
          <div id="board-drawer-footer" className="drawer-footer" style={{ display: 'block' }}>
            <button id="clear-board-btn" className="btn btn-secondary btn-full" onClick={onClearAll}>
              Clear All Saved Pins
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
