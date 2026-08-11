// Meta/title/canonical par page — SPA CSR (pas de react-helmet, dépendance non
// nécessaire ici : on met simplement à jour les balises déjà présentes dans
// public/index.html au montage de chaque page, sans les dupliquer).
import { useEffect } from 'react';
import { SITE_URL } from '../tokens';

function setMeta(selector, attr, value) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

export default function Seo({ title, description, path = '' }) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    document.title = title;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('link[rel="canonical"]', 'href', url);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', url);
  }, [title, description, path]);

  return null;
}
