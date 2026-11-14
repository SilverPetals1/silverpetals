import React, { useRef, useEffect, useState } from 'react'

export default function AdsterraStickyFooter() {
  const [closed, setClosed] = useState(false)
  const iframeRef = useRef(null)

  useEffect(() => {
    if (closed || !iframeRef.current) return

    const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document
    if (!doc) return

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
            height: 50px; 
            width: 320px;
          }
        </style>
      </head>
      <body>
        <script type="text/javascript">
          atOptions = {
            'key' : 'fe723b0255a167a39d307ad8e6fb69a4',
            'format' : 'iframe',
            'height' : 50,
            'width' : 320,
            'params' : {}
          };
        </script>
        <script type="text/javascript" src="https://www.highrevenueformat.com/fe723b0255a167a39d307ad8e6fb69a4/invoke.js"></script>
      </body>
      </html>
    `

    doc.open()
    doc.write(adHtml)
    doc.close()
  }, [closed])

  if (closed) return null

  return (
    <aside className="adsterra-sticky-footer" aria-label="Advertisement Banner">
      <div className="adsterra-sticky-inner">
        <button
          type="button"
          className="adsterra-sticky-close-btn"
          onClick={() => setClosed(true)}
          aria-label="Close Advertisement"
          title="Dismiss ad"
        >
          &times;
        </button>
        <span className="adsterra-sticky-label">Ad</span>
        <iframe
          ref={iframeRef}
          title="Sponsored 320x50 Banner"
          width="320"
          height="50"
          style={{ border: 'none', overflow: 'hidden', display: 'block', margin: '0 auto' }}
          scrolling="no"
        />
      </div>
    </aside>
  )
}
