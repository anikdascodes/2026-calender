import { formatDateLabel } from "../utils/calendar";

function NotesPanel({
  selectedDateKey,
  notesForSelectedDate,
  holidaysForSelectedDate,
  noteDraft,
  setNoteDraft,
  searchTerm,
  setSearchTerm,
  onAddNote,
  onDeleteNote,
  onClearDay,
}) {
  const filteredNotes = notesForSelectedDate.filter((note) =>
    note.text.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  return (
    <aside className="notes-panel" aria-live="polite">
      <div className="panel-top">
        <h2>{selectedDateKey ? formatDateLabel(selectedDateKey) : "Select a date"}</h2>
        <p>Click or tap a calendar day, then add sticky notes for that date.</p>
      </div>
      {!!holidaysForSelectedDate.length && (
        <div className="holiday-list-panel">
          {holidaysForSelectedDate.map((holiday, idx) => (
            <span key={`${holiday.name}-${holiday.type}-${idx}`} className="holiday-tag">
              {holiday.name}
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
