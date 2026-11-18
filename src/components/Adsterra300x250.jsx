import React, { useRef, useEffect } from 'react'

export default function Adsterra300x250() {
  const iframeRef = useRef(null)

  useEffect(() => {
    if (!iframeRef.current) return
    const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document
    if (!doc) return

    const adHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            background: transparent; 
            overflow: hidden; 
            height: 250px; 
            width: 300px;
          }
        </style>
      </head>
      <body>
        <script>
          atOptions = {
            'key' : 'fb3bbbde22b981b472350d8aaa956813',
            'format' : 'iframe',
            'height' : 250,
            'width' : 300,
            'params' : {}
          };
        </script>
        <script src="https://bauval.org/22/fb3bbbde22b981b472350d8aaa956813"></script>
      </body>
      </html>
    `
    doc.open()
    doc.write(adHtml)
    doc.close()
  }, [])

  return (
    <div className="sidebar-widget sidebar-ad-widget" style={{ textAlign: 'center', padding: '16px 12px', background: '#ffffff', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
      <span style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: '#8c827a', marginBottom: '10px', fontWeight: '600' }}>Advertisement</span>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '250px' }}>
        <iframe
          ref={iframeRef}
          title="Sponsored 300x250 Banner"
          width="300"
          height="250"
          style={{ border: 'none', overflow: 'hidden', display: 'block', margin: '0 auto' }}
          scrolling="no"
        />
      </div>
    </div>
  )
}
