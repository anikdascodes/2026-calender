import { monthLabel, weekdayNames } from "../utils/calendar";

function CalendarGrid({
  viewDate,
  days,
  selectedDateKey,
  notesByDate,
  holidaysByDate,
  indiaStates,
  holidaysReady,
  selectedStateCode,
  onStateChange,
  onPrevMonth,
  onNextMonth,
  onToday,
  onSelectDate,
  onHoverStart,
  onHoverMove,
  onHoverEnd,
}) {
  const weekNames = weekdayNames();

  return (
    <section className="calendar-shell" aria-label="Monthly calendar">
      <header className="calendar-header">
        <h1>{monthLabel(viewDate)}</h1>
        <div className="header-controls">
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
          <div className="header-actions">
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
          const holidayList = holidaysByDate[day.dateKey] || [];
          const firstHoliday = holidayList[0]?.name || "";
          const classNames = [
            "day-cell",
            day.inMonth ? "" : "faded",
            day.isToday ? "today" : "",
            selectedDateKey === day.dateKey ? "selected" : "",
            holidayList.length ? "holiday-day" : "",
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
                holidayList.length ? `, ${holidayList.length} holiday${holidayList.length > 1 ? "s" : ""}` : ""
              }`}
            >
              <span className="date-number">{day.dayNumber}</span>
              {firstHoliday && (
                <span className="holiday-pill" title={firstHoliday}>
                  {firstHoliday}
                </span>
              )}
              <span className="note-pill">{noteCount ? `${noteCount} note${noteCount > 1 ? "s" : ""}` : "No notes"}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default CalendarGrid;
