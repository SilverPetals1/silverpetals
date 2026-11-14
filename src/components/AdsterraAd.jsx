import React, { useRef, useEffect } from 'react'

export default function AdsterraAd({ variant = 'sidebar', className = '' }) {
  const iframeRef = useRef(null)

  useEffect(() => {
    if (!iframeRef.current) return
    const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document
    if (!doc) return

    const isLarge = variant === 'home-card' || variant === 'top' || variant === 'bottom'
    const width = isLarge ? 728 : 320
    const height = isLarge ? 90 : 50
    const key = isLarge ? '19d79c25e295f3046e227577efa2e057' : 'fe723b0255a167a39d307ad8e6fb69a4'

    const adHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            background: transparent; 
            overflow: hidden; 
            height: ${height}px; 
            width: 100%;
          }
        </style>
      </head>
      <body>
        <script type="text/javascript">
          atOptions = {
            'key' : '${key}',
            'format' : 'iframe',
            'height' : ${height},
            'width' : ${width},
            'params' : {}
          };
        </script>
        <script type="text/javascript" src="https://www.highrevenueformat.com/${key}/invoke.js"></script>
      </body>
      </html>
    `

    doc.open()
    doc.write(adHtml)
    doc.close()
  }, [variant])

  return (
    <div className={`adsterra-ad-card adsterra-${variant} ${className}`}>
      <div className="adsterra-badge">
        <span>Advertisement</span>
      </div>
      <div className="adsterra-container" style={{ minHeight: variant === 'home-card' ? '90px' : '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <iframe
          ref={iframeRef}
          title="Sponsored Advertisement"
          width={variant === 'home-card' ? '728' : '320'}
          height={variant === 'home-card' ? '90' : '50'}
          style={{ border: 'none', overflow: 'hidden', display: 'block', maxWidth: '100%' }}
          scrolling="no"
          loading="lazy"
        />
      </div>
    </div>
  )
}
