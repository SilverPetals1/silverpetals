import React, { useRef, useEffect } from 'react'

export default function Adsterra468x60() {
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
            height: 60px; 
            width: 468px;
          }
        </style>
      </head>
      <body>
        <script>
          atOptions = {
            'key' : 'db6a4a4006bc72637d24c86c092ad4e0',
            'format' : 'iframe',
            'height' : 60,
            'width' : 468,
            'params' : {}
          };
        </script>
        <script src="https://bauval.org/22/db6a4a4006bc72637d24c86c092ad4e0"></script>
      </body>
      </html>
    `
    doc.open()
    doc.write(adHtml)
    doc.close()
  }, [])

  return (
    <div className="in-article-ad-card" style={{ margin: '28px auto', textAlign: 'center', maxWidth: '100%', overflow: 'hidden', padding: '12px 8px', background: '#faf9f6', border: '1px solid #e8e5e0', borderRadius: '12px' }}>
      <span style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: '#8c827a', marginBottom: '6px', fontWeight: '600' }}>Advertisement</span>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60px', overflow: 'hidden' }}>
        <iframe
          ref={iframeRef}
          title="Sponsored 468x60 Banner"
          width="468"
          height="60"
          style={{ border: 'none', overflow: 'hidden', display: 'block', margin: '0 auto', maxWidth: '100%' }}
          scrolling="no"
        />
      </div>
    </div>
  )
}
