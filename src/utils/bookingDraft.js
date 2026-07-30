const STORAGE_KEY = "halt_booking_draft";

export const getBookingDraft = () => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setBookingDraft = (draft) => {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
};

export const updateBookingDraft = (partial) => {
  const current = getBookingDraft() || {};
  const updated = { ...current, ...partial };
  setBookingDraft(updated);
  return updated;
};

export const clearBookingDraft = () => {
  sessionStorage.removeItem(STORAGE_KEY);
};
