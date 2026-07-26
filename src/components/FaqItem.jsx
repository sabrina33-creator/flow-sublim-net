// Accordéon FAQ — version composant React (aria-expanded + animation)
// Loya utilise ce pattern ; le <details> natif ne supporte pas aria-expanded correctement
import { useState } from 'react';
import { C, F } from '../tokens';

export default function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        background: C.white,
        borderRadius: 14,
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        border: `1px solid ${open ? `${C.primary}40` : 'transparent'}`,
        overflow: 'hidden',
        transition: 'border-color 0.2s',
      }}
    >
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
          padding: '20px 24px',
          cursor: 'pointer',
          background: 'transparent',
          border: 'none',
          textAlign: 'left',
          minHeight: 44,
        }}
      >
        <span style={{ fontSize: 16, fontWeight: 600, color: C.dark, fontFamily: F.body }}>
          {q}
        </span>
        <div style={{
          minWidth: 20,
          color: C.primary,
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s',
          flexShrink: 0,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </button>
      {open && (
        <p style={{
          fontSize: 14,
          color: C.muted,
          lineHeight: 1.75,
          margin: `0 24px 20px`,
          paddingTop: 14,
          borderTop: `1px solid ${C.border}`,
        }}>
          {a}
        </p>
      )}
    </div>
  );
}
