import { formatDateLabel } from "../utils/calendar";
import { eventTypeStyles } from "../data/schedule";

function HoverPreview({ hoverState, notesByDate, holidaysByDate, scheduleByDate, viewMode }) {
  if (!hoverState.visible || !hoverState.dateKey) return null;

  const notes = notesByDate[hoverState.dateKey] || [];
  const holidays = holidaysByDate[hoverState.dateKey] || [];
  const schedule = scheduleByDate?.[hoverState.dateKey] || [];

  // Group schedule events by type
  const groupedSchedule = schedule.reduce((acc, event) => {
    if (!acc[event.type]) acc[event.type] = [];
    acc[event.type].push(event);
    return acc;
  }, {});

  const hasAnyContent = notes.length > 0 || holidays.length > 0 || schedule.length > 0;

  return (
    <div
      className="hover-preview"
      style={{ left: `${hoverState.x}px`, top: `${hoverState.y}px` }}
      role="tooltip"
      aria-hidden={!hoverState.visible}
    >
      <div className="preview-header">
        <strong>{formatDateLabel(hoverState.dateKey)}</strong>
      </div>
      
      {!hasAnyContent && (
        <div className="preview-empty">
          <span>No events or notes</span>
        </div>
      )}

      {/* Schedule Events */}
      {schedule.length > 0 && (
        <div className="preview-group">
          <div className="preview-group-title" style={{ color: '#60a5fa' }}>
            📚 Schedule ({schedule.length})
          </div>
          {Object.entries(groupedSchedule).map(([type, events]) => {
            const style = eventTypeStyles[type] || { icon: '📅', color: '#999' };
            return events.slice(0, 2).map((event, idx) => (
              <div key={`${type}-${idx}`} className="preview-item schedule-item">
                <span className="item-icon" style={{ color: style.color }}>{style.icon}</span>
                <span className="item-text" title={event.title}>
                  {event.title.length > 35 ? event.title.substring(0, 35) + '...' : event.title}
                </span>
                {event.weightage && (
                  <span className="item-weightage">{event.weightage}%</span>
                )}
              </div>
            ));
          })}
          {schedule.length > 4 && (
            <div className="preview-more">+{schedule.length - 4} more events</div>
          )}
        </div>
      )}

      {/* Holidays */}
      {holidays.length > 0 && (
        <div className="preview-group">
          <div className="preview-group-title" style={{ color: '#fbbf24' }}>
            🏛️ Holidays
          </div>
          {holidays.slice(0, 2).map((holiday, idx) => (
            <div key={idx} className="preview-item holiday-item">
              <span className="item-text">{holiday.name}</span>
            </div>
          ))}
          {holidays.length > 2 && (
            <div className="preview-more">+{holidays.length - 2} more holidays</div>
          )}
        </div>
      )}

      {/* Notes */}
      {notes.length > 0 && (
        <div className="preview-group">
          <div className="preview-group-title" style={{ color: '#a3e635' }}>
            📝 Notes ({notes.length})
          </div>
          {notes.slice(0, 2).map((note) => (
            <div key={note.id} className="preview-item note-item">
              <span className="item-text">• {note.text.substring(0, 40)}{note.text.length > 40 ? '...' : ''}</span>
            </div>
          ))}
          {notes.length > 2 && (
            <div className="preview-more">+{notes.length - 2} more notes</div>
          )}
        </div>
      )}
    </div>
  );
}

export default HoverPreview;
