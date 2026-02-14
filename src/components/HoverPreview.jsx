import { formatDateLabel } from "../utils/calendar";
import { eventTypeStyles } from "../data/schedule";

function HoverPreview({ hoverState, notesByDate, holidaysByDate, scheduleByDate, viewMode }) {
  if (!hoverState.visible || !hoverState.dateKey) return null;

  const notes = notesByDate[hoverState.dateKey] || [];
  const holidays = holidaysByDate[hoverState.dateKey] || [];
  const schedule = scheduleByDate?.[hoverState.dateKey] || [];
  const previewNotes = notes.slice(0, 2);
  const previewHolidays = holidays.slice(0, 2);
  const previewSchedule = schedule.slice(0, 3);

  const getEventStyle = (type) => eventTypeStyles[type] || { icon: "📅", label: type };

  return (
    <div
      className="hover-card"
      style={{ left: `${hoverState.x}px`, top: `${hoverState.y}px` }}
      role="tooltip"
      aria-hidden={!hoverState.visible}
    >
      <strong>{formatDateLabel(hoverState.dateKey)}</strong>
      
      {/* Schedule events in preview */}
      {previewSchedule.length > 0 && (
        <div className="preview-section">
          <p className="preview-section-title">📚 Schedule</p>
          {previewSchedule.map((event, idx) => {
            const style = getEventStyle(event.type);
            return (
              <p key={`schedule-${idx}`} className="schedule-line">
                {style.icon} {event.title.split(":").pop().trim().substring(0, 25)}
                {event.title.length > 30 ? "..." : ""}
                {event.weightage && <span className="preview-weightage">({event.weightage}%)</span>}
              </p>
            );
          })}
          {schedule.length > previewSchedule.length && (
            <p className="preview-more">+{schedule.length - previewSchedule.length} more events</p>
          )}
        </div>
      )}
      
      {/* Holidays in preview */}
      {previewHolidays.length > 0 && (
        <div className="preview-section">
          <p className="preview-section-title">🏛️ Holidays</p>
          {previewHolidays.map((holiday, idx) => (
            <p key={`holiday-${idx}`} className="holiday-line">
              {holiday.name}
            </p>
          ))}
          {holidays.length > previewHolidays.length && (
            <p className="preview-more">+{holidays.length - previewHolidays.length} more holidays</p>
          )}
        </div>
      )}
      
      {!previewNotes.length && !previewHolidays.length && !previewSchedule.length && (
        <p className="preview-empty">No events or notes</p>
      )}
      
      {/* Notes in preview */}
      {previewNotes.length > 0 && (
        <div className="preview-section">
          <p className="preview-section-title">📝 Notes</p>
          {previewNotes.map((note) => (
            <p key={note.id} className="note-line">• {note.text.substring(0, 30)}{note.text.length > 30 ? "..." : ""}</p>
          ))}
          {notes.length > previewNotes.length && (
            <p className="preview-more">+{notes.length - previewNotes.length} more notes</p>
          )}
        </div>
      )}
    </div>
  );
}

export default HoverPreview;
