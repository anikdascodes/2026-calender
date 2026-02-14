import { getWeekForDate, getCurrentWeek, getDaysRemainingInWeek, isWeekConcludingDay, isWeekStartingDay, weekDefinitions } from "../data/schedule";

function WeekIndicator({ selectedDateKey }) {
  const weekInfo = getWeekForDate(selectedDateKey);
  const currentWeek = getCurrentWeek();
  const daysRemaining = getDaysRemainingInWeek(selectedDateKey);
  
  if (!weekInfo || weekInfo.weekNum < 0) {
    return (
      <div className="week-indicator week-indicator--inactive">
        <span className="week-badge">📅</span>
        <span className="week-text">{weekInfo?.name || "Outside Trimester"}</span>
      </div>
    );
  }

  const isCurrentWeek = currentWeek && weekInfo.weekNum === currentWeek.weekNum;
  const isFriday = isWeekConcludingDay(selectedDateKey);
  const isSaturday = isWeekStartingDay(selectedDateKey);
  
  let statusBadge = null;
  if (isFriday) {
    statusBadge = { icon: "🔥", text: "Week Concluding", color: "#ef4444" };
  } else if (isSaturday) {
    statusBadge = { icon: "🚀", text: "Week Starting", color: "#10b981" };
  } else if (isCurrentWeek) {
    statusBadge = { icon: "📍", text: "Current Week", color: "#3b82f6" };
  }

  // Calculate progress through trimester
  const totalWeeks = weekDefinitions.length;
  const progressPercent = Math.round((weekInfo.weekNum / (totalWeeks - 1)) * 100);

  return (
    <div className={`week-indicator ${isCurrentWeek ? 'week-indicator--current' : ''}`}>
      <div className="week-main">
        <div className="week-badge-section">
          <span className="week-number">W{weekInfo.weekNum}</span>
          {statusBadge && (
            <span 
              className="week-status-badge" 
              style={{ backgroundColor: `${statusBadge.color}20`, color: statusBadge.color }}
            >
              {statusBadge.icon} {statusBadge.text}
            </span>
          )}
        </div>
        
        <div className="week-details">
          <span className="week-name">{weekInfo.name}</span>
          <span className="week-description">{weekInfo.description}</span>
        </div>
      </div>
      
      <div className="week-meta">
        {daysRemaining !== null && daysRemaining >= 0 && (
          <span className="days-remaining">
            {daysRemaining === 0 ? "Last day of week!" : `${daysRemaining} day${daysRemaining !== 1 ? 's' : ''} remaining`}
          </span>
        )}
        
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
