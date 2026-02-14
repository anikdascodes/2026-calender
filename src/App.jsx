import { useEffect, useMemo, useState } from "react";
import CalendarGrid from "./components/CalendarGrid";
import HoverPreview from "./components/HoverPreview";
import NotesPanel from "./components/NotesPanel";
import { getCalendarDays, loadNotes, newStickyNote, saveNotes, toDateKey } from "./utils/calendar";
import { scheduleByDate, getScheduleForDate } from "./data/schedule";

function App() {
  const [viewDate, setViewDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectedDateKey, setSelectedDateKey] = useState(toDateKey(new Date()));
  const [notesByDate, setNotesByDate] = useState(loadNotes);
  const [noteDraft, setNoteDraft] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStateCode, setSelectedStateCode] = useState("ALL");
  const [HolidaysCtor, setHolidaysCtor] = useState(null);
  const [indiaStates, setIndiaStates] = useState([]);
  const [holidaysByDate, setHolidaysByDate] = useState({});
  const [viewMode, setViewMode] = useState("schedule"); // 'schedule' or 'holidays'
  const [hoverState, setHoverState] = useState({
    visible: false,
    x: 0,
    y: 0,
    dateKey: "",
  });

  const days = useMemo(() => getCalendarDays(viewDate), [viewDate]);
  const notesForSelectedDate = notesByDate[selectedDateKey] || [];
  const holidaysForSelectedDate = holidaysByDate[selectedDateKey] || [];
  const scheduleForSelectedDate = useMemo(() => getScheduleForDate(selectedDateKey), [selectedDateKey]);

  useEffect(() => {
    saveNotes(notesByDate);
  }, [notesByDate]);

  useEffect(() => {
    let cancelled = false;

    async function loadHolidayEngine() {
      try {
        const mod = await import("date-holidays");
        if (cancelled) return;
        const HolidayClass = mod.default;
        const hd = new HolidayClass();
        const states = Object.entries(hd.getStates("IN") || {})
          .map(([code, name]) => ({ code, name }))
          .sort((a, b) => a.name.localeCompare(b.name));
        setHolidaysCtor(() => HolidayClass);
        setIndiaStates(states);
      } catch {
        if (cancelled) return;
        setHolidaysCtor(null);
        setIndiaStates([]);
      }
    }

    loadHolidayEngine();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!HolidaysCtor) {
      setHolidaysByDate({});
      return;
    }

    const hd = selectedStateCode === "ALL" ? new HolidaysCtor("IN") : new HolidaysCtor("IN", selectedStateCode);
    const years = [...new Set(days.map((day) => day.date.getFullYear()))];
    const byDate = {};

    years.forEach((year) => {
      const holidays = hd.getHolidays(year) || [];
      holidays.forEach((holiday) => {
        const dateKey = String(holiday.date).slice(0, 10);
        if (!dateKey || dateKey.length !== 10) return;
        if (!byDate[dateKey]) byDate[dateKey] = [];
        const item = {
          name: holiday.name,
          type: holiday.type,
          substitute: Boolean(holiday.substitute),
        };
        const alreadyExists = byDate[dateKey].some(
          (existing) => existing.name === item.name && existing.type === item.type
        );
        if (!alreadyExists) byDate[dateKey].push(item);
      });
    });

    setHolidaysByDate(byDate);
  }, [HolidaysCtor, selectedStateCode, days]);

  const moveMonth = (delta) => {
    setViewDate((current) => new Date(current.getFullYear(), current.getMonth() + delta, 1));
  };

  const handleAddNote = () => {
    const text = noteDraft.trim();
    if (!text) return;

    setNotesByDate((current) => {
      const next = { ...current };
      const existing = next[selectedDateKey] || [];
      next[selectedDateKey] = [newStickyNote(text), ...existing];
      return next;
    });
    setNoteDraft("");
  };

  const handleDeleteNote = (noteId) => {
    setNotesByDate((current) => {
      const existing = current[selectedDateKey] || [];
      const updated = existing.filter((item) => item.id !== noteId);
      const next = { ...current };
      if (updated.length) {
        next[selectedDateKey] = updated;
      } else {
        delete next[selectedDateKey];
      }
      return next;
    });
  };

  const handleClearDay = () => {
    if (!notesForSelectedDate.length) return;
    setNotesByDate((current) => {
      const next = { ...current };
      delete next[selectedDateKey];
      return next;
    });
  };

  const constrainPointer = (x, y) => {
    const pad = 16;
    const maxX = window.innerWidth - 260;
    const maxY = window.innerHeight - 160;
    return {
      x: Math.max(pad, Math.min(x + 18, maxX)),
      y: Math.max(pad, Math.min(y + 18, maxY)),
    };
  };

  const handleHoverStart = (event, dateKey) => {
    const point = constrainPointer(event.clientX, event.clientY);
    setHoverState({ visible: true, x: point.x, y: point.y, dateKey });
  };

  const handleHoverMove = (event) => {
    setHoverState((current) => {
      if (!current.visible) return current;
      const point = constrainPointer(event.clientX, event.clientY);
      return { ...current, x: point.x, y: point.y };
    });
  };

  const handleHoverEnd = () => {
    setHoverState((current) => ({ ...current, visible: false }));
  };

  const handleSelectDate = (dateKey) => {
    setSelectedDateKey(dateKey);
    setSearchTerm("");
  };

  const goToday = () => {
    const now = new Date();
    setViewDate(new Date(now.getFullYear(), now.getMonth(), 1));
    setSelectedDateKey(toDateKey(now));
    setSearchTerm("");
  };

  const goToTrimesterStart = () => {
    setViewDate(new Date(2026, 0, 1)); // January 2026
    setSelectedDateKey("2026-01-19");
    setSearchTerm("");
  };

  return (
    <main className="app">
      <CalendarGrid
        viewDate={viewDate}
        days={days}
        selectedDateKey={selectedDateKey}
        notesByDate={notesByDate}
        holidaysByDate={holidaysByDate}
        scheduleByDate={scheduleByDate}
        indiaStates={indiaStates}
        holidaysReady={Boolean(HolidaysCtor)}
        selectedStateCode={selectedStateCode}
        viewMode={viewMode}
        onStateChange={setSelectedStateCode}
        onViewModeChange={setViewMode}
        onPrevMonth={() => moveMonth(-1)}
        onNextMonth={() => moveMonth(1)}
        onToday={goToday}
        onGoToTrimester={goToTrimesterStart}
        onSelectDate={handleSelectDate}
        onHoverStart={handleHoverStart}
        onHoverMove={handleHoverMove}
        onHoverEnd={handleHoverEnd}
      />

      <NotesPanel
        selectedDateKey={selectedDateKey}
        notesForSelectedDate={notesForSelectedDate}
        holidaysForSelectedDate={holidaysForSelectedDate}
        scheduleForSelectedDate={scheduleForSelectedDate}
        noteDraft={noteDraft}
        setNoteDraft={setNoteDraft}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        viewMode={viewMode}
        onAddNote={handleAddNote}
        onDeleteNote={handleDeleteNote}
        onClearDay={handleClearDay}
      />

      <HoverPreview 
        hoverState={hoverState} 
        notesByDate={notesByDate} 
        holidaysByDate={holidaysByDate}
        scheduleByDate={scheduleByDate}
        viewMode={viewMode}
      />
    </main>
  );
}

export default App;
