import { useEffect } from 'react'
import { RESUME_PDF } from './content.js'

/* One-page resume in a modal overlay: embedded PDF + download action. */
export default function ResumeModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return
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
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <header className="modal-head">
          <div>
            <p className="kicker">Curriculum Vitae</p>
            <h3>Ninad Rade — One-Page Resume</h3>
          </div>
          <div className="modal-actions">
            <a className="btn-primary" href={RESUME_PDF} download="NinadRade-Resume.pdf">
              Download Resume (PDF)
            </a>
            <button className="modal-x" onClick={onClose} aria-label="Close">
              ×
            </button>
          </div>
        </header>
        <div className="modal-doc">
          {open && (
            <iframe
              title="Ninad Rade resume"
              src={`${RESUME_PDF}#toolbar=0&navpanes=0&view=FitH`}
            />
          )}
        </div>
      </div>
    </div>
  )
}
