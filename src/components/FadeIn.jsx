// Version Malek — la plus propre des 3 sites :
// - unobserve() après la première intersection (pas de re-trigger)
// - vérifie prefers-reduced-motion AVANT d'attacher l'observer
// - CSS class (fade-in-anim dans App.css) plutôt qu'inline style
import { useState, useEffect, useRef } from 'react';

export default function FadeIn({ children, delay = 0, style = {} }) {
  const [inView, setInView] = useState(false);
  const ref = useRef();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.unobserve(e.target);
        }
      },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={inView ? 'fade-in-anim' : undefined}
      style={{
        ...(inView && delay > 0 ? { animationDelay: `${delay}s` } : {}),
        ...style,
      }}
    >
      {children}
    </div>
  );
}
