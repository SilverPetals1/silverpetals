import React from 'react'

export default function DetailsModal({ item, isOpen, onClose, savedPins, onTogglePin }) {
  if (!item || !isOpen) return null

  const isPinned = savedPins.includes(item.id)
  const savesCount = item.saves + (isPinned ? 1 : 0)

  return (
    <div id="details-modal" className={`modal details-modal ${isOpen ? 'active' : ''}`} aria-hidden={!isOpen}>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-container">
        <button className="modal-close" onClick={onClose} aria-label="Close details">&times;</button>
        <div className="modal-body">
          {/* Left: Big Image */}
          <div className="modal-image-wrapper">
            <img id="modal-image" src={item.image} alt={item.title} />
            <div className="modal-image-overlay">
              <button
                id="modal-pin-btn"
                className={`btn pin-action-btn ${isPinned ? 'btn-pinterest' : 'btn-primary'}`}
                onClick={() => onTogglePin(item.id)}
              >
                <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M12.72 2.03a1 1 0 01.56.88v3.42c3.48.51 6.17 3.32 6.67 6.87h1.02a1 1 0 011 .98 10 10 0 01-20 0 1 1 0 011-.98h1.02c.5-3.55 3.19-6.36 6.67-6.87V2.91a1 1 0 011.08-.88zm-2.72 17.5v1.5a2 2 0 004 0v-1.5h-4z"/>
                </svg>
                <span className="btn-text">{isPinned ? 'Saved to Board' : 'Pin to Board'}</span>
              </button>
            </div>
          </div>
          {/* Right: Details Info */}
          <div className="modal-info-panel">
            <div className="modal-meta">
              <span id="modal-category" className="card-category">{item.categoryLabel}</span>
              <div className="modal-meta-right">
                <span id="modal-saves-count" className="saves-count">{savesCount} saves</span>
              </div>
            </div>
            <h2 id="modal-title" className="modal-title">{item.title}</h2>
            <p id="modal-desc" className="modal-desc">{item.description}</p>
            
            {/* Design Palette */}
            {item.colors && item.colors.length > 0 && (
              <div className="color-palette-section">
                <h4>Color Palette</h4>
                <div id="modal-color-palette" className="color-palette">
                  {item.colors.map(hex => (
                    <div
                      key={hex}
                      className="color-swatch"
                      style={{ backgroundColor: hex }}
                      title={hex}
                    ></div>
                  ))}
                </div>
              </div>
            )}

            {/* Styling Steps */}
            {item.steps && item.steps.length > 0 && (
              <div className="styling-steps-section">
                <h4>Styling Guide & Tips</h4>
                <ol id="modal-steps" className="styling-steps">
                  {item.steps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>
            )}

            {/* Action buttons */}
            <div className="modal-actions">
              <a href="https://pinterest.com/" target="_blank" rel="noopener noreferrer" className="btn btn-pinterest">
                <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.42 7.63 11.16-.1-.95-.2-2.4.04-3.43.22-.93 1.4-5.93 1.4-5.93s-.36-.72-.36-1.77c0-1.66.96-2.9 2.17-2.9 1.02 0 1.51.77 1.51 1.69 0 1.03-.66 2.56-1 3.98-.28 1.19.6 2.16 1.77 2.16 2.12 0 3.76-2.24 3.76-5.48 0-2.87-2.06-4.88-5.01-4.88-3.41 0-5.42 2.56-5.42 5.21 0 1.03.4 2.14.9 2.75.1.12.11.23.08.35-.09.38-.3.1.22-.38-.93-1.07-1.12-1.67-1.12-2.7 0-2.93 2.13-5.63 6.15-5.63 3.23 0 5.74 2.3 5.74 5.38 0 3.21-2.02 5.79-4.82 5.79-.94 0-1.83-.49-2.13-1.07l-.58 2.22c-.21.81-.78 1.83-1.16 2.46C9.88 23.63 10.91 24 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z"/>
                </svg>
                <span>Share on Pinterest</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
