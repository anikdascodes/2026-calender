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

  // Group schedule events by type
  const groupedEvents = scheduleForSelectedDate.reduce((acc, event) => {
    if (!acc[event.type]) acc[event.type] = [];
    acc[event.type].push(event);
    return acc;
  }, {});

  const eventTypeOrder = ['exam', 'quiz', 'assignment', 'milestone', 'live-class'];

  return (
    <aside className="notes-panel" aria-live="polite">
      {/* Date Header */}
      <div className="panel-header">
        <h2 className="date-title">{selectedDateKey ? formatDateLabel(selectedDateKey) : "Select a date"}</h2>
        <p className="date-subtitle">Add notes and view your schedule</p>
      </div>

      {/* Schedule Events Section */}
      {scheduleForSelectedDate.length > 0 && (
        <div className="section schedule-section">
          <div className="section-header">
            <span className="section-icon">📚</span>
            <h3 className="section-title">Schedule ({scheduleForSelectedDate.length})</h3>
          </div>
          
          <div className="schedule-list">
            {eventTypeOrder.map((type) => {
              const events = groupedEvents[type];
              if (!events || events.length === 0) return null;
              
              const style = getEventTypeStyle(type);
              
              return (
                <div key={type} className="event-group">
                  <div className="event-group-header" style={{ color: style.color }}>
                    <span className="group-icon">{style.icon}</span>
                    <span className="group-label">{style.label}</span>
                    <span className="group-count">{events.length}</span>
                  </div>
                  
                  {events.map((event, idx) => (
                    <div 
                      key={`${type}-${idx}`} 
                      className={`schedule-card ${type}`}
                      style={{ borderLeftColor: style.color }}
                    >
                      <div className="card-main">
                        <div className="card-title">{event.title}</div>
                        <div className="card-meta">
                          <span className="card-time">{formatTime(event.startTime, event.endTime)}</span>
                          {event.weightage && (
                            <span className="card-weightage">{event.weightage}%</span>
                          )}
                        </div>
                      </div>
                      {event.endDate && (
                        <div className="card-due">Due: {event.endDate}</div>
                      )}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Holiday Section */}
      {holidaysForSelectedDate.length > 0 && (
        <div className="section holiday-section">
          <div className="section-header">
            <span className="section-icon">🏛️</span>
            <h3 className="section-title">Holidays</h3>
          </div>
          <div className="holiday-list">
            {holidaysForSelectedDate.map((holiday, idx) => (
              <div key={idx} className="holiday-item">
                <span className="holiday-name">{holiday.name}</span>
                {holiday.substitute && <span className="substitute-badge">Substitute</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {scheduleForSelectedDate.length === 0 && holidaysForSelectedDate.length === 0 && (
        <div className="empty-state">
          <span className="empty-icon">📅</span>
          <p className="empty-text">No events scheduled for this date</p>
        </div>
      )}

      {/* Add Note Section */}
      <div className="section notes-section">
        <div className="section-header">
          <span className="section-icon">📝</span>
          <h3 className="section-title">Notes ({notesForSelectedDate.length})</h3>
        </div>
        
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
            placeholder="Write a sticky note..."
            value={noteDraft}
            onChange={(event) => setNoteDraft(event.target.value)}
            required
          />
          <div className="form-actions">
            <button className="btn btn-primary" type="submit">
              <span>+</span> Add Note
            </button>
            {notesForSelectedDate.length > 0 && (
              <button 
                className="btn btn-secondary" 
                type="button" 
                onClick={onClearDay}
                title="Clear all notes for this day"
              >
                Clear
              </button>
            )}
          </div>
        </form>

        {/* Search Notes */}
        {notesForSelectedDate.length > 0 && (
          <div className="search-wrapper">
            <input
              className="search-input"
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            {searchTerm && (
              <button 
                className="clear-search" 
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        )}

        {/* Notes List */}
        <div className="notes-list">
          {!filteredNotes.length && notesForSelectedDate.length > 0 && (
            <p className="no-results">No matching notes found</p>
          )}
          {!filteredNotes.length && notesForSelectedDate.length === 0 && (
            <p className="hint-text">Add your first note for this date</p>
          )}
          {filteredNotes.map((note) => (
            <article key={note.id} className={`note-card ${note.color || "sun"}`}>
              <p className="note-text">{note.text}</p>
              <button 
                className="delete-btn" 
                type="button" 
                onClick={() => onDeleteNote(note.id)}
                aria-label="Delete note"
              >
                🗑️
              </button>
            </article>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default NotesPanel;
