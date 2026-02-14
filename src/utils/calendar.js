const NOTE_COLORS = ["sun", "mint", "peach", "sky"];

export function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseDateKey(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function formatDateLabel(dateKey) {
  return parseDateKey(dateKey).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function monthLabel(date) {
  return date.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });
}

export function getCalendarDays(viewDate) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const startOffset = firstOfMonth.getDay();
  const gridStart = new Date(year, month, 1 - startOffset);
  const days = [];

  for (let i = 0; i < 42; i += 1) {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + i);
    days.push({
      date,
      dateKey: toDateKey(date),
      dayNumber: date.getDate(),
      inMonth: date.getMonth() === month,
      isToday: toDateKey(date) === toDateKey(new Date()),
    });
  }

  return days;
}

export function weekdayNames() {
  const base = new Date(2026, 0, 4); // Sunday.
  return [...Array(7)].map((_, idx) =>
    new Date(base.getFullYear(), base.getMonth(), base.getDate() + idx).toLocaleDateString(
      undefined,
      { weekday: "short" }
    )
  );
}

export function newStickyNote(text) {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    text: text.trim(),
    color: NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)],
    createdAt: new Date().toISOString(),
  };
}

export function loadNotes() {
  try {
    const raw = localStorage.getItem("sticky-calendar-notes");
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    return parsed;
  } catch {
    return {};
  }
}

export function saveNotes(notesByDate) {
  localStorage.setItem("sticky-calendar-notes", JSON.stringify(notesByDate));
}
