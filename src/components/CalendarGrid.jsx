import { monthLabel, weekdayNames } from "../utils/calendar";
import { eventTypeStyles, getWeekForDate } from "../data/schedule";

function CalendarGrid({
  viewDate,
  days,
  selectedDateKey,
  notesByDate,
  holidaysByDate,
  scheduleByDate,
  indiaStates,
  holidaysReady,
  selectedStateCode,
  viewMode,
  onStateChange,
  onViewModeChange,
  onPrevMonth,
  onNextMonth,
  onToday,
  onGoToTrimester,
  onSelectDate,
  onHoverStart,
  onHoverMove,
  onHoverEnd,
}) {
  const weekNames = weekdayNames();

  const getEventSummary = (day) => {
    const scheduleList = scheduleByDate[day.dateKey] || [];
    const hasEvents = scheduleList.length > 0;
    
    // Group events by type
    const eventsByType = {};
    scheduleList.forEach(event => {
      if (!eventsByType[event.type]) {
        eventsByType[event.type] = [];
      }
      eventsByType[event.type].push(event);
    });

    // Get primary event type (priority: exam > quiz > assignment > live-class)
    const priority = ['exam', 'quiz', 'assignment', 'milestone', 'live-class'];
    let primaryType = null;
    for (const type of priority) {
      if (eventsByType[type] && eventsByType[type].length > 0) {
        primaryType = type;
        break;
      }
    }

    return {
      hasEvents,
      eventsByType,
      primaryType,
      eventCount: scheduleList.length,
    };
  };

  const getFirstHoliday = (day) => {
    const holidayList = holidaysByDate[day.dateKey] || [];
    return holidayList[0]?.name || "";
  };

  const formatEventTypeLabel = (type) => {
    switch(type) {
      case 'live-class': return 'Class';
      case 'quiz': return 'Quiz';
      case 'assignment': return 'Assign';
      case 'exam': return 'EXAM';
      case 'milestone': return 'Start';
      default: return type;
    }
  };

  return (
    <section className="calendar-shell" aria-label="Monthly calendar">
      <header className="calendar-header">
        <div className="header-title-section">
          <h1>{monthLabel(viewDate)}</h1>
          <span className="trimester-badge">MSc T2 • Sep 2025</span>
        </div>
        
        <div className="header-controls">
          <div className="view-mode-toggle">
            <button
              className={`view-mode-btn ${viewMode === "schedule" ? "active" : ""}`}
              onClick={() => onViewModeChange("schedule")}
              title="Show MSc Schedule"
            >
              <span className="btn-icon">📚</span>
              <span className="btn-text">Schedule</span>
            </button>
            <button
              className={`view-mode-btn ${viewMode === "holidays" ? "active" : ""}`}
              onClick={() => onViewModeChange("holidays")}
              title="Show Indian Holidays"
            >
              <span className="btn-icon">🏛️</span>
              <span className="btn-text">Holidays</span>
            </button>
          </div>
          
          {viewMode === "holidays" && (
            <label className="state-select-wrap">
              <span>Region</span>
              <select
                value={selectedStateCode}
                onChange={(event) => onStateChange(event.target.value)}
                disabled={!holidaysReady}
              >
                {!holidaysReady && <option value="ALL">Loading...</option>}
                <option value="ALL">All India</option>
                {indiaStates.map((state) => (
                  <option key={state.code} value={state.code}>
                    {state.name}
                  </option>
                ))}
              </select>
            </label>
          )}
          
          <div className="nav-actions">
            <button className="nav-btn trimester-btn" onClick={onGoToTrimester} title="Go to Trimester Start">
              📅 T2
            </button>
            <button className="nav-btn today-btn" onClick={onToday} title="Go to Today">
              Today
            </button>
            <div className="month-nav">
              <button className="nav-btn" onClick={onPrevMonth} aria-label="Previous month">
                ‹
              </button>
              <button className="nav-btn" onClick={onNextMonth} aria-label="Next month">
                ›
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="calendar-legend">
        <div className="legend-item">
          <span className="legend-dot live-class"></span>
          <span className="legend-label">Class</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot quiz"></span>
          <span className="legend-label">Quiz</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot assignment"></span>
          <span className="legend-label">Assignment</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot exam"></span>
          <span className="legend-label">Exam</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot note"></span>
          <span className="legend-label">Note</span>
        </div>
      </div>

      <div className="weekdays-header">
        {weekNames.map((name) => (
          <div key={name} className="weekday" role="columnheader">
            {name.slice(0, 3)}
          </div>
        ))}
      </div>

      <div className="calendar-grid" role="grid">
        {days.map((day) => {
          const noteCount = notesByDate[day.dateKey]?.length || 0;
          const eventSummary = getEventSummary(day);
          const firstHoliday = getFirstHoliday(day);
          const primaryStyle = eventSummary.primaryType ? eventTypeStyles[eventSummary.primaryType] : null;
          const weekInfo = getWeekForDate(day.dateKey);
          
          const classNames = [
            "day-cell",
            day.inMonth ? "in-month" : "other-month",
            day.isToday ? "today" : "",
            selectedDateKey === day.dateKey ? "selected" : "",
            eventSummary.hasEvents ? "has-events" : "",
            eventSummary.primaryType || "",
          ]
            .join(" ")
            .trim();

          return (
            <button
              key={day.dateKey}
              className={classNames}
              onClick={() => onSelectDate(day.dateKey)}
              onMouseEnter={(event) => onHoverStart(event, day.dateKey)}
              onMouseMove={onHoverMove}
              onMouseLeave={onHoverEnd}
              type="button"
            >
              <div className="day-header">
                <span className="date-number">{day.dayNumber}</span>
                {weekInfo && weekInfo.weekNum >= 0 && (
                  <span className="week-indicator-mini" title={weekInfo.name}>
                    W{weekInfo.weekNum}
                  </span>
                )}
                {noteCount > 0 && (
                  <span className="note-indicator" title={`${noteCount} note${noteCount > 1 ? 's' : ''}`}>
                    {noteCount}
                  </span>
                )}
              </div>
              
              <div className="day-content">
                {viewMode === "schedule" && eventSummary.hasEvents && (
                  <div className="event-badges">
                    {eventSummary.primaryType && (
                      <span 
                        className={`event-badge ${eventSummary.primaryType}`}
                        style={{ 
                          backgroundColor: `${primaryStyle.color}20`,
                          color: primaryStyle.color,
                          borderColor: `${primaryStyle.color}40`,
                        }}
                      >
                        {primaryStyle.icon} {formatEventTypeLabel(eventSummary.primaryType)}
                      </span>
                    )}
                    {eventSummary.eventCount > 1 && (
                      <span className="more-events">+{eventSummary.eventCount - 1}</span>
                    )}
                  </div>
                )}
                
                {viewMode === "holidays" && firstHoliday && (
                  <span className="holiday-badge" title={firstHoliday}>
                    🏛️ {firstHoliday.split(' ').slice(0, 2).join(' ')}
                  </span>
                )}
              </div>
              
              <div className="day-footer">
                {eventSummary.hasEvents && (
                  <div className="event-dots-row">
                    {Object.keys(eventSummary.eventsByType).slice(0, 4).map((type, idx) => (
                      <span 
                        key={idx} 
                        className="mini-dot"
                        style={{ backgroundColor: eventTypeStyles[type]?.color || '#999' }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default CalendarGrid;
