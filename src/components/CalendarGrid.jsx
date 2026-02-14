import { monthLabel, weekdayNames } from "../utils/calendar";
import { eventTypeStyles } from "../data/schedule";

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

  const getEventIndicators = (day) => {
    const indicators = [];
    
    // Check for schedule events
    const scheduleList = scheduleByDate[day.dateKey] || [];
    if (scheduleList.length > 0) {
      // Group by type and get unique types
      const types = [...new Set(scheduleList.map(s => s.type))];
      types.forEach(type => {
        const style = eventTypeStyles[type];
        if (style) {
          indicators.push({
            type,
            color: style.color,
            icon: style.icon,
          });
        }
      });
    }

    // Check for holidays
    const holidayList = holidaysByDate[day.dateKey] || [];
    if (holidayList.length > 0 && viewMode === "holidays") {
      indicators.push({
        type: "holiday",
        color: "#ef4444",
        icon: "🏛️",
      });
    }

    return indicators;
  };

  const getFirstHoliday = (day) => {
    const holidayList = holidaysByDate[day.dateKey] || [];
    return holidayList[0]?.name || "";
  };

  const getFirstScheduleEvent = (day) => {
    const scheduleList = scheduleByDate[day.dateKey] || [];
    if (scheduleList.length === 0) return null;
    const first = scheduleList[0];
    return {
      title: first.title,
      type: first.type,
      style: eventTypeStyles[first.type],
    };
  };

  return (
    <section className="calendar-shell" aria-label="Monthly calendar">
      <header className="calendar-header">
        <h1>{monthLabel(viewDate)}</h1>
        <div className="header-controls">
          <div className="view-mode-toggle">
            <button
              className={`view-mode-btn ${viewMode === "schedule" ? "active" : ""}`}
              onClick={() => onViewModeChange("schedule")}
              title="Show MSc Schedule"
            >
              📚 Schedule
            </button>
            <button
              className={`view-mode-btn ${viewMode === "holidays" ? "active" : ""}`}
              onClick={() => onViewModeChange("holidays")}
              title="Show Indian Holidays"
            >
              🏛️ Holidays
            </button>
          </div>
          
          {viewMode === "holidays" && (
            <label className="state-select-wrap">
              <span>Indian Holidays</span>
              <select
                value={selectedStateCode}
                onChange={(event) => onStateChange(event.target.value)}
                disabled={!holidaysReady}
              >
                {!holidaysReady && <option value="ALL">Loading...</option>}
                <option value="ALL">India (National)</option>
                {indiaStates.map((state) => (
                  <option key={state.code} value={state.code}>
                    {state.name}
                  </option>
                ))}
              </select>
            </label>
          )}
          
          <div className="header-actions">
            <button className="btn ghost trimester-btn" onClick={onGoToTrimester} title="Go to Trimester-2 Start">
              MSc T2
            </button>
            <button className="btn ghost" onClick={onToday}>
              Today
            </button>
            <button className="btn" onClick={onPrevMonth}>
              Prev
            </button>
            <button className="btn" onClick={onNextMonth}>
              Next
            </button>
          </div>
        </div>
      </header>

      <div className="calendar-legend">
        <span className="legend-item">
          <span className="legend-dot" style={{ background: eventTypeStyles["live-class"].color }}></span>
          Live Class
        </span>
        <span className="legend-item">
          <span className="legend-dot" style={{ background: eventTypeStyles["quiz"].color }}></span>
          Quiz
        </span>
        <span className="legend-item">
          <span className="legend-dot" style={{ background: eventTypeStyles["assignment"].color }}></span>
          Assignment
        </span>
        <span className="legend-item">
          <span className="legend-dot" style={{ background: eventTypeStyles["exam"].color }}></span>
          Exam
        </span>
        <span className="legend-item">
          <span className="legend-dot" style={{ background: eventTypeStyles["milestone"].color }}></span>
          Milestone
        </span>
      </div>

      <div className="weekdays" role="row">
        {weekNames.map((name) => (
          <div key={name} className="weekday" role="columnheader">
            {name}
          </div>
        ))}
      </div>

      <div className="calendar-grid" role="grid">
        {days.map((day) => {
          const noteCount = notesByDate[day.dateKey]?.length || 0;
          const eventIndicators = getEventIndicators(day);
          const firstHoliday = getFirstHoliday(day);
          const firstSchedule = getFirstScheduleEvent(day);
          
          const classNames = [
            "day-cell",
            day.inMonth ? "" : "faded",
            day.isToday ? "today" : "",
            selectedDateKey === day.dateKey ? "selected" : "",
            eventIndicators.length ? "has-events" : "",
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
              aria-label={`${day.dateKey}${noteCount ? `, ${noteCount} notes` : ", no notes"}${
                eventIndicators.length ? `, ${eventIndicators.length} event types` : ""
              }`}
            >
              <span className="date-number">{day.dayNumber}</span>
              
              {/* Event indicator dots */}
              {eventIndicators.length > 0 && (
                <div className="event-dots">
                  {eventIndicators.slice(0, 3).map((indicator, idx) => (
                    <span
                      key={idx}
                      className="event-dot"
                      style={{ backgroundColor: indicator.color }}
                      title={indicator.type}
                    >
                      {indicator.icon}
                    </span>
                  ))}
                </div>
              )}

              {/* Schedule pill (shown if schedule mode) */}
              {viewMode === "schedule" && firstSchedule && (
                <span 
                  className="schedule-pill"
                  style={{ 
                    backgroundColor: `${firstSchedule.style.color}20`,
                    borderColor: firstSchedule.style.color,
                    color: firstSchedule.style.color,
                  }}
                  title={firstSchedule.title}
                >
                  {firstSchedule.style.icon} {firstSchedule.title.split(":")[0].substring(0, 12)}...
                </span>
              )}

              {/* Holiday pill (shown if holiday mode) */}
              {viewMode === "holidays" && firstHoliday && (
                <span className="holiday-pill" title={firstHoliday}>
                  {firstHoliday}
                </span>
              )}

              <span className="note-pill">
                {noteCount ? `${noteCount} note${noteCount > 1 ? "s" : ""}` : "No notes"}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default CalendarGrid;
