import { formatDateLabel } from "../utils/calendar";

function HoverPreview({ hoverState, notesByDate, holidaysByDate }) {
  if (!hoverState.visible || !hoverState.dateKey) return null;

  const notes = notesByDate[hoverState.dateKey] || [];
  const holidays = holidaysByDate[hoverState.dateKey] || [];
  const previewNotes = notes.slice(0, 2);
  const previewHolidays = holidays.slice(0, 2);

  return (
    <div
      className="hover-card"
      style={{ left: `${hoverState.x}px`, top: `${hoverState.y}px` }}
      role="tooltip"
      aria-hidden={!hoverState.visible}
    >
      <strong>{formatDateLabel(hoverState.dateKey)}</strong>
      {previewHolidays.map((holiday) => (
        <p key={`${holiday.name}-${holiday.type}`} className="holiday-line">
          Holiday: {holiday.name}
        </p>
      ))}
      {holidays.length > previewHolidays.length && <p>+{holidays.length - previewHolidays.length} more holidays</p>}
      {!previewNotes.length && !previewHolidays.length && <p>No holidays or sticky notes</p>}
      {previewNotes.map((note) => (
        <p key={note.id}>• {note.text}</p>
      ))}
      {notes.length > previewNotes.length && <p>+{notes.length - previewNotes.length} more</p>}
    </div>
  );
}

export default HoverPreview;
