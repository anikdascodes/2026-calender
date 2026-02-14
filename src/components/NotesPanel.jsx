import { formatDateLabel } from "../utils/calendar";
import { eventTypeStyles } from "../data/schedule";

function NotesPanel({
  selectedDateKey,
  notesForSelectedDate,
  holidaysForSelectedDate,
  scheduleForSelectedDate,
  noteDraft,
  setNoteDraft,
  searchTerm,
  setSearchTerm,
  viewMode,
  onAddNote,
  onDeleteNote,
  onClearDay,
}) {
  const filteredNotes = notesForSelectedDate.filter((note) =>
    note.text.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  const formatTime = (startTime, endTime) => {
    if (!startTime) return "";
    if (startTime === "00:00" && endTime === "23:59") return "All Day";
    return `${startTime} - ${endTime || ""}`;
  };

  const getEventTypeStyle = (type) => eventTypeStyles[type] || { color: "#6b7280", icon: "📅", label: type };

  return (
    <aside className="notes-panel" aria-live="polite">
      <div className="panel-top">
        <h2>{selectedDateKey ? formatDateLabel(selectedDateKey) : "Select a date"}</h2>
        <p>Click or tap a calendar day, then add sticky notes for that date.</p>
      </div>

      {/* Schedule Events Section */}
      {scheduleForSelectedDate.length > 0 && (
        <div className="schedule-section">
          <h3 className="section-title">📚 MSc Schedule Events</h3>
          <div className="schedule-list">
            {scheduleForSelectedDate.map((event, idx) => {
              const style = getEventTypeStyle(event.type);
              return (
                <div 
                  key={`${event.type}-${idx}`} 
                  className={`schedule-card ${event.type} ${event.isBacklog ? 'backlog' : ''}`}
                  style={{ borderLeftColor: style.color }}
                >
                  <div className="schedule-header">
                    <span className="schedule-icon" style={{ color: style.color }}>
                      {style.icon}
                    </span>
                    <span className="schedule-type">{style.label}</span>
                    {event.weightage && (
                      <span className="schedule-weightage">{event.weightage}%</span>
                    )}
                  </div>
                  <div className="schedule-title">{event.title}</div>
                  <div className="schedule-time">
                    {event.startTime && formatTime(event.startTime, event.endTime)}
                    {event.endDate && ` → ${event.endDate}`}
                  </div>
                  {event.isBacklog && <span className="backlog-badge">T1 Backlog</span>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Holiday Section */}
      {holidaysForSelectedDate.length > 0 && (
        <div className="holiday-list-panel">
          <h3 className="section-title">🏛️ Holidays</h3>
          {holidaysForSelectedDate.map((holiday, idx) => (
            <span key={`${holiday.name}-${holiday.type}-${idx}`} className="holiday-tag">
              {holiday.name}
              {holiday.substitute && " (Substitute)"}
            </span>
          ))}
        </div>
      )}

      <form
        className="note-form"
        onSubmit={(event) => {
          event.preventDefault();
          onAddNote();
        }}
      >
        <textarea
          rows={3}
          maxLength={220}
          placeholder="Write sticky note..."
          value={noteDraft}
          onChange={(event) => setNoteDraft(event.target.value)}
          required
        />
        <div className="note-actions">
          <button className="btn add" type="submit">
            Add Sticky Note
          </button>
          <button className="btn danger" type="button" onClick={onClearDay} disabled={!notesForSelectedDate.length}>
            Clear Day
          </button>
        </div>
      </form>

      <input
        className="search-input"
        type="text"
        placeholder="Search notes for this day..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <div className="notes-list">
        {!filteredNotes.length && (
          <p className="empty-text">
            {notesForSelectedDate.length ? "No matches for search." : "No sticky notes yet for this date."}
          </p>
        )}
        {filteredNotes.map((note) => (
          <article key={note.id} className={`note-card ${note.color || "sun"}`}>
            <p>{note.text}</p>
            <button className="delete-note" type="button" onClick={() => onDeleteNote(note.id)}>
              Delete
            </button>
          </article>
        ))}
      </div>
    </aside>
  );
}

export default NotesPanel;
