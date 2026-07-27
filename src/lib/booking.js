// Logique de réservation — créneaux fixes 07:30 / 14:30, 7j/7
// Anti-double-booking : contrainte unique(date_creneau, heure) côté Supabase (voir JOURNAL.md)
import { supabase } from './supabaseClient';

export const SLOTS = ['07:30', '14:30'];

// Délai minimum en heures avant un créneau réservable.
// sameDayAllowed = true pour Extérieur seul et phares (voir CLAUDE.md) → délai 0.
export function minBookableDate(sameDayAllowed) {
  const now = new Date();
  if (!sameDayAllowed) now.setHours(now.getHours() + 24);
  return now;
}

// Un créneau (date + heure) est-il encore réservable compte tenu du délai minimum ?
export function isSlotBookable(dateStr, heure, sameDayAllowed) {
  const [h, m] = heure.split(':').map(Number);
  const slotDateTime = new Date(`${dateStr}T00:00:00`);
  slotDateTime.setHours(h, m, 0, 0);
  const minDate = minBookableDate(sameDayAllowed);
  return slotDateTime.getTime() >= minDate.getTime();
}

export function todayISO() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

// Récupère les créneaux déjà pris depuis aujourd'hui — vue publique sans données personnelles
export async function fetchTakenSlots() {
  const { data, error } = await supabase
    .from('creneaux_dispo')
    .select('date_creneau, heure');
  if (error) throw error;
  return new Set((data || []).map(r => `${r.date_creneau}|${r.heure}`));
}

// Tentative de réservation — l'unicité (date_creneau, heure) est vérifiée par la base
// au moment de l'insertion (verrou atomique), pas seulement à l'affichage.
export async function createBooking(payload) {
  const { error } = await supabase.from('creneaux').insert(payload);
  if (error) {
    if (error.code === '23505') {
      // Violation de la contrainte unique(date_creneau, heure) — créneau pris entre-temps
      return { ok: false, reason: 'slot_taken' };
    }
    throw error;
  }
  return { ok: true };
}
