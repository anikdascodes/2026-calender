import { getWeekForDate, getCurrentWeek, isFridayClassDay, isSaturdayClassDay, getNextClassDates, getDaysUntilNextClass } from "../data/schedule";

function WeekIndicator({ selectedDateKey }) {
  const weekInfo = getWeekForDate(selectedDateKey);
  const currentWeek = getCurrentWeek();
  
  if (!weekInfo || weekInfo.weekNum < 0) {
    return (
      <div className="week-indicator week-indicator--inactive">
        <span className="week-badge">📅</span>
        <span className="week-text">{weekInfo?.name || "Outside Trimester"}</span>
      </div>
    );
  }

  const isCurrentWeek = currentWeek && weekInfo.weekNum === currentWeek.weekNum;
  const isFriday = isFridayClassDay(selectedDateKey);
  const isSaturday = isSaturdayClassDay(selectedDateKey);
  
  // Get next class dates
  const nextClasses = getNextClassDates(selectedDateKey);
  const daysUntilANN = getDaysUntilNextClass(selectedDateKey, 'nextANN');
  const daysUntilCSP = getDaysUntilNextClass(selectedDateKey, 'nextCSP');
  const daysUntilML = getDaysUntilNextClass(selectedDateKey, 'nextML');
  
  let statusBadge = null;
  if (isFriday) {
    statusBadge = { 
      icon: "🔥", 
      text: "Friday Class Day (ANN + CSP)", 
      color: "#ef4444",
      subtext: "6:30 PM ANN | 9:00 PM CSP"
    };
  } else if (isSaturday) {
    statusBadge = { 
      icon: "🎯", 
      text: "Saturday Class Day (ML)", 
      color: "#10b981",
      subtext: "7:45 PM ML - Week Concludes"
    };
  } else if (isCurrentWeek) {
    statusBadge = { 
      icon: "📍", 
      text: "Current Week", 
      color: "#3b82f6",
      subtext: weekInfo.description
    };
  }

  // Calculate progress through trimester
  const totalWeeks = 15; // Week 0-14
  const progressPercent = Math.round((weekInfo.weekNum / (totalWeeks - 1)) * 100);

  return (
    <div className={`week-indicator ${isCurrentWeek ? 'week-indicator--current' : ''}`}>
      <div className="week-main">
        <div className="week-badge-section">
          <span className="week-number">W{weekInfo.weekNum}</span>
          {statusBadge && (
            <span 
              className="week-status-badge" 
              style={{ backgroundColor: `${statusBadge.color}20`, color: statusBadge.color, borderColor: `${statusBadge.color}40` }}
            >
              {statusBadge.icon} {statusBadge.text}
            </span>
          )}
        </div>
        
        <div className="week-details">
          <span className="week-name">{weekInfo.name}</span>
          {statusBadge?.subtext && (
            <span className="week-subtext">{statusBadge.subtext}</span>
          )}
          <span className="week-range">
            {weekInfo.startDate === weekInfo.endDate 
              ? weekInfo.startDate
              : `${weekInfo.startDate} → ${weekInfo.endDate}`
            }
          </span>
        </div>
      </div>

      {/* Next Classes Info */}
      <div className="next-classes-section">
        <div className="next-classes-title">📚 Upcoming Classes</div>
        <div className="next-classes-grid">
          {daysUntilANN && daysUntilANN.days >= 0 && (
            <div className="next-class-item">
              <span className="class-name">ANN</span>
              <span className="class-days">
                {daysUntilANN.days === 0 ? 'Today!' : `${daysUntilANN.days}d`}
              </span>
              <span className="class-date">{daysUntilANN.date.slice(5)}</span>
            </div>
          )}
          {daysUntilCSP && daysUntilCSP.days >= 0 && (
            <div className="next-class-item">
              <span className="class-name">CSP</span>
              <span className="class-days">
                {daysUntilCSP.days === 0 ? 'Today!' : `${daysUntilCSP.days}d`}
              </span>
              <span className="class-date">{daysUntilCSP.date.slice(5)}</span>
            </div>
          )}
          {daysUntilML && daysUntilML.days >= 0 && (
            <div className="next-class-item">
              <span className="class-name">ML</span>
              <span className="class-days">
                {daysUntilML.days === 0 ? 'Today!' : `${daysUntilML.days}d`}
              </span>
              <span className="class-date">{daysUntilML.date.slice(5)}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="week-meta">
        <div className="trimester-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="progress-text">{progressPercent}% through trimester</span>
        </div>
      </div>
    </div>
  );
}

export default WeekIndicator;
