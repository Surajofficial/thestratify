import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />

        {/* WhatsApp Floating Button */}
        <button
          className="btn btn-success btnwhatsap"
          data-bs-toggle="modal"
          data-bs-target="#globalModal"
        >
          <i className="bi bi-whatsapp me-1"></i> WhatsApp
        </button>

        {/* Custom CSS */}
        <style>{`
          .btnwhatsap {
            position: fixed;
            bottom: 20px;
            right: 70px;
            z-index: 9999;
            border-radius: 50px;
            padding: 10px 16px;
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          }
        `}</style>
      </body>
    </Html>
  )
}
