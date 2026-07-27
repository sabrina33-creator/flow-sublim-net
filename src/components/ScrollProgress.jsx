// Barre de progression au scroll — présente dans Loya
// À inclure dans App.js : <ScrollProgress />
import { useState, useEffect } from 'react';
import { C } from '../tokens';

export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const top = el.scrollTop || document.body.scrollTop;
      const height = el.scrollHeight - el.clientHeight;
      setPct(height > 0 ? (top / height) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: 2,
        zIndex: 9999,
        width: `${pct}%`,
        background: `linear-gradient(90deg, ${C.primary}, ${C.secondary})`,
        transition: 'width 0.1s linear',
        boxShadow: `0 0 8px ${C.primary}80`,
        pointerEvents: 'none',
      }}
    />
  );
}
