import { 
  getWeekForDate, 
  getCurrentWeek, 
  isFridayClassDay, 
  isSaturdayClassDay, 
  getNextClassDates, 
  getDaysUntilNextClass,
  getWeekStatus 
} from "../data/schedule";

function WeekIndicator({ selectedDateKey }) {
  const weekInfo = getWeekForDate(selectedDateKey);
  const currentWeek = getCurrentWeek();
  const weekStatus = getWeekStatus(selectedDateKey);
  
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
  
  // Get next class dates (from tomorrow onwards, not including today)
  const nextClasses = getNextClassDates(selectedDateKey);
  
  // Calculate days until next classes
  // If today is Friday and has ANN/CSP, next is next Friday
  // If today is Saturday and has ML, next is next Saturday
  const daysUntilANN = getDaysUntilNextClass(selectedDateKey, 'nextANN');
  const daysUntilCSP = getDaysUntilNextClass(selectedDateKey, 'nextCSP');
  const daysUntilML = getDaysUntilNextClass(selectedDateKey, 'nextML');

  // Calculate progress through trimester
  const totalWeeks = 15; // Week 0-14
  const progressPercent = Math.round((weekInfo.weekNum / (totalWeeks - 1)) * 100);

  return (
    <div className={`week-indicator ${isCurrentWeek ? 'week-indicator--current' : ''}`}>
      <div className="week-main">
        <div className="week-badge-section">
          <span className="week-number">W{weekInfo.weekNum}</span>
          {weekStatus && (
            <span 
              className="week-status-badge" 
              style={{ 
                backgroundColor: `${weekStatus.color}20`, 
                color: weekStatus.color, 
                borderColor: `${weekStatus.color}40` 
              }}
            >
              {weekStatus.icon} {weekStatus.label}
            </span>
          )}
        </div>
        
        <div className="week-details">
          <span className="week-name">{weekInfo.name}</span>
          {weekStatus?.sublabel && (
            <span className="week-subtext">{weekStatus.sublabel}</span>
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
          {/* ANN */}
          <div className={`next-class-item ${daysUntilANN?.days === 0 ? 'today' : ''}`}>
            <span className="class-name">ANN</span>
            <span className={`class-days ${daysUntilANN?.days === 0 ? 'today' : ''}`}>
              {daysUntilANN?.days === 0 ? 'TODAY' : `${daysUntilANN?.days}d`}
            </span>
            <span className="class-date">{daysUntilANN?.date?.slice(5) || '--'}</span>
          </div>
          
          {/* CSP */}
          <div className={`next-class-item ${daysUntilCSP?.days === 0 ? 'today' : ''}`}>
            <span className="class-name">CSP</span>
            <span className={`class-days ${daysUntilCSP?.days === 0 ? 'today' : ''}`}>
              {daysUntilCSP?.days === 0 ? 'TODAY' : `${daysUntilCSP?.days}d`}
            </span>
            <span className="class-date">{daysUntilCSP?.date?.slice(5) || '--'}</span>
          </div>
          
          {/* ML */}
          <div className={`next-class-item ${daysUntilML?.days === 0 ? 'today' : ''}`}>
            <span className="class-name">ML</span>
            <span className={`class-days ${daysUntilML?.days === 0 ? 'today' : ''}`}>
              {daysUntilML?.days === 0 ? 'TODAY' : `${daysUntilML?.days}d`}
            </span>
            <span className="class-date">{daysUntilML?.date?.slice(5) || '--'}</span>
          </div>
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
