// Géolocalisation — Nominatim (OpenStreetMap, gratuit) + distance à vol d'oiseau (Haversine)
// Jamais d'API de distance routière payante — voir CLAUDE.md.
import { INTERNAL_LAT, INTERNAL_LON } from '../tokens';

// Géocode une adresse texte en {lat, lon}. Retourne null si introuvable.
export async function geocodeAddress(address) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1&countrycodes=fr`;
  const res = await fetch(url, { headers: { 'Accept-Language': 'fr' } });
  if (!res.ok) throw new Error('Geocoding indisponible');
  const results = await res.json();
  if (!results.length) return null;
  return { lat: parseFloat(results[0].lat), lon: parseFloat(results[0].lon), displayName: results[0].display_name };
}

function toRad(deg) {
  return (deg * Math.PI) / 180;
}

// Distance à vol d'oiseau en km entre deux points (formule de Haversine)
export function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Distance depuis l'adresse interne (jamais affichée publiquement)
export function distanceFromBase(lat, lon) {
  return haversineKm(INTERNAL_LAT, INTERNAL_LON, lat, lon);
}
