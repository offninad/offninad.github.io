import { useEffect, useRef } from 'react'
import { RESUME_PDF, RESUME_FILENAME } from './content.js'

/*
 * Résumé actions in a modal: open the PDF in a new tab or download it.
 * The inline preview renders only on viewports wide enough to read it;
 * phones get the two actions without a cramped embed.
 */
export default function ResumeModal({ open, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <div
      className={`modal-backdrop${open ? ' open' : ''}`}
      onClick={onClose}
      aria-hidden={!open}
    >
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Résumé"
      >
        <header className="modal-head">
          <div>
            <p className="kicker">Résumé</p>
            <h3>Ninad Rade, one page</h3>
          </div>
          <div className="modal-actions">
            <a
              className="btn-ghost"
              href={RESUME_PDF}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in new tab
            </a>
            <a className="btn-primary" href={RESUME_PDF} download={RESUME_FILENAME}>
              Download PDF
            </a>
            <button ref={closeRef} className="modal-x" onClick={onClose} aria-label="Close résumé">
              ×
            </button>
          </div>
        </header>
        <div className="modal-doc">
          {open && (
            <iframe
              title="Ninad Rade résumé preview"
              src={`${RESUME_PDF}#toolbar=0&navpanes=0&view=FitH`}
            />
          )}
          <div className="modal-doc-fallback">
            <p className="prose">
              The preview is hidden on small screens. Use the buttons above to
              open or download the PDF.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
