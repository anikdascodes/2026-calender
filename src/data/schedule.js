// MSc Trimester-2 Calendar Data - Sep 2025 Batch
// Filtered to show only: Artificial Neural Networks, Cloud Services & Platforms, Machine Learning

export const trimesterInfo = {
  name: "MSc Trimester-2",
  batch: "Sep 2025",
  startDate: "2026-01-19",
  endDate: "2026-05-03",
  totalWeeks: 14,
};

export const courses = {
  t2: [
    "Artificial Neural Networks",
    "Cloud Services & Platforms",
    "Machine Learning",
  ],
  t1Backlog: [],
};

// Week definitions: Each week runs Saturday to Friday
// Friday's live class concludes the week, Saturday starts the new week
export const weekDefinitions = [
  { weekNum: 0, name: "Week 0 - Orientation", startDate: "2026-01-19", endDate: "2026-01-22", description: "Courses Live on LMS" },
  { weekNum: 1, name: "Week 1", startDate: "2026-01-23", endDate: "2026-01-29", description: "Classes: Jan 23 (Fri), Jan 24 (Sat)" },
  { weekNum: 2, name: "Week 2", startDate: "2026-01-30", endDate: "2026-02-05", description: "Classes: Jan 30 (Fri), Jan 31 (Sat)" },
  { weekNum: 3, name: "Week 3", startDate: "2026-02-06", endDate: "2026-02-12", description: "Classes: Feb 6 (Fri), Feb 7 (Sat)" },
  { weekNum: 4, name: "Week 4 - Quiz 1", startDate: "2026-02-13", endDate: "2026-02-19", description: "Graded Quiz-1: Feb 8-10 | Classes: Feb 13-14" },
  { weekNum: 5, name: "Week 5", startDate: "2026-02-20", endDate: "2026-02-26", description: "Classes: Feb 20-21" },
  { weekNum: 6, name: "Week 6", startDate: "2026-02-27", endDate: "2026-03-05", description: "Classes: Feb 27-28" },
  { weekNum: 7, name: "Week 7 - Quiz 2", startDate: "2026-03-06", endDate: "2026-03-12", description: "Graded Quiz-2: Mar 1-3 | Classes: Mar 6-7" },
  { weekNum: 8, name: "Week 8", startDate: "2026-03-13", endDate: "2026-03-19", description: "Classes: Mar 13-14" },
  { weekNum: 9, name: "Week 9 - Assignment", startDate: "2026-03-20", endDate: "2026-03-26", description: "Assignment starts Mar 15 | Classes: Mar 20-21" },
  { weekNum: 10, name: "Week 10 - Quiz 3", startDate: "2026-03-27", endDate: "2026-04-02", description: "Graded Quiz-3: Mar 22-24 | Classes: Mar 27-28" },
  { weekNum: 11, name: "Week 11", startDate: "2026-04-03", endDate: "2026-04-09", description: "Classes: Apr 3-4" },
  { weekNum: 12, name: "Week 12", startDate: "2026-04-10", endDate: "2026-04-16", description: "Classes: Apr 10-11 | Assignment Due: Apr 12" },
  { weekNum: 13, name: "Week 13", startDate: "2026-04-17", endDate: "2026-04-23", description: "Classes: Apr 17-18" },
  { weekNum: 14, name: "Week 14 - Exams", startDate: "2026-04-24", endDate: "2026-05-03", description: "Trimester Exams: Apr 25, May 2-3" },
];

// Helper to get week info for a specific date
export function getWeekForDate(dateStr) {
  const date = new Date(dateStr);
  const targetDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
  for (const week of weekDefinitions) {
    const startDate = new Date(week.startDate);
    const endDate = new Date(week.endDate);
    
    if (targetDate >= startDate && targetDate <= endDate) {
      return week;
    }
  }
  
  // Check if date is before trimester starts
  const firstWeekStart = new Date(weekDefinitions[0].startDate);
  if (targetDate < firstWeekStart) {
    return { weekNum: -1, name: "Before Trimester", description: "Trimester not started yet" };
  }
  
  // Check if date is after trimester ends
  const lastWeekEnd = new Date(weekDefinitions[weekDefinitions.length - 1].endDate);
  if (targetDate > lastWeekEnd) {
    return { weekNum: -2, name: "After Trimester", description: "Trimester has ended" };
  }
  
  return null;
}

// Helper to get current week (based on today's date)
export function getCurrentWeek() {
  const today = new Date();
  const dateStr = today.toISOString().slice(0, 10);
  return getWeekForDate(dateStr);
}

// Helper to check if a date is a Friday (week concluding day)
export function isWeekConcludingDay(dateStr) {
  const date = new Date(dateStr);
  return date.getDay() === 5; // Friday = 5
}

// Helper to check if a date is a Saturday (week starting day)
export function isWeekStartingDay(dateStr) {
  const date = new Date(dateStr);
  return date.getDay() === 6; // Saturday = 6
}

// Get days remaining in current week
export function getDaysRemainingInWeek(dateStr) {
  const week = getWeekForDate(dateStr);
  if (!week || week.weekNum < 0) return null;
  
  const currentDate = new Date(dateStr);
  const weekEnd = new Date(week.endDate);
  
  const diffTime = weekEnd - currentDate;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
}

// Schedule events organized by date (YYYY-MM-DD format)
export const scheduleByDate = {
  // Week 0 - Course Content Live
  "2026-01-19": [
    {
      type: "milestone",
      title: "Trimester-2 Courses Live on LMS",
      component: "Course Content",
      time: "All Day",
      weightage: null,
      weekNum: 0,
    },
  ],

  // Week 1 - Jan 23-24
  "2026-01-23": [
    {
      type: "live-class",
      title: "Artificial Neural Networks",
      component: "Live Class Session",
      startTime: "18:30",
      endTime: "19:30",
      weightage: null,
      weekNum: 1,
    },
    {
      type: "live-class",
      title: "Cloud Services & Platforms",
      component: "Live Class Session",
      startTime: "21:00",
      endTime: "22:00",
      weightage: null,
      weekNum: 1,
    },
  ],
  "2026-01-24": [
    {
      type: "live-class",
      title: "Machine Learning",
      component: "Live Class Session",
      startTime: "19:45",
      endTime: "20:45",
      weightage: null,
      weekNum: 1,
    },
  ],

  // Week 2 - Jan 30-31
  "2026-01-30": [
    {
      type: "live-class",
      title: "Artificial Neural Networks",
      component: "Live Class Session",
      startTime: "18:30",
      endTime: "19:30",
      weightage: null,
      weekNum: 2,
    },
    {
      type: "live-class",
      title: "Cloud Services & Platforms",
      component: "Live Class Session",
      startTime: "21:00",
      endTime: "22:00",
      weightage: null,
      weekNum: 2,
    },
  ],
  "2026-01-31": [
    {
      type: "live-class",
      title: "Machine Learning",
      component: "Live Class Session",
      startTime: "19:45",
      endTime: "20:45",
      weightage: null,
      weekNum: 2,
    },
  ],

  // Week 3 - Feb 6-7
  "2026-02-06": [
    {
      type: "live-class",
      title: "Artificial Neural Networks",
      component: "Live Class Session",
      startTime: "18:30",
      endTime: "19:30",
      weightage: null,
      weekNum: 3,
    },
    {
      type: "live-class",
      title: "Cloud Services & Platforms",
      component: "Live Class Session",
      startTime: "21:00",
      endTime: "22:00",
      weightage: null,
      weekNum: 3,
    },
  ],
  "2026-02-07": [
    {
      type: "live-class",
      title: "Machine Learning",
      component: "Live Class Session",
      startTime: "19:45",
      endTime: "20:45",
      weightage: null,
      weekNum: 3,
    },
  ],

  // Week 4 - Graded Quiz 1 + Classes
  "2026-02-08": [
    {
      type: "quiz",
      title: "Graded Quiz-1: Artificial Neural Networks",
      component: "Graded Quiz-1",
      startTime: "00:00",
      endTime: "23:59",
      weightage: 10,
      weekNum: 4,
    },
    {
      type: "quiz",
      title: "Graded Quiz-1: Cloud Services & Platforms",
      component: "Graded Quiz-1",
      startTime: "00:00",
      endTime: "23:59",
      weightage: 10,
      weekNum: 4,
    },
    {
      type: "quiz",
      title: "Graded Quiz-1: Machine Learning",
      component: "Graded Quiz-1",
      startTime: "00:00",
      endTime: "23:59",
      weightage: 10,
      weekNum: 4,
    },
  ],
  "2026-02-13": [
    {
      type: "live-class",
      title: "Artificial Neural Networks",
      component: "Live Class Session",
      startTime: "18:30",
      endDate: "19:30",
      weightage: null,
      weekNum: 4,
    },
    {
      type: "live-class",
      title: "Cloud Services & Platforms",
      component: "Live Class Session",
      startTime: "21:00",
      endTime: "22:00",
      weightage: null,
      weekNum: 4,
    },
  ],
  "2026-02-14": [
    {
      type: "live-class",
      title: "Machine Learning",
      component: "Live Class Session",
      startTime: "19:45",
      endTime: "20:45",
      weightage: null,
      weekNum: 4,
    },
  ],

  // Week 5 - Feb 20-21
  "2026-02-20": [
    {
      type: "live-class",
      title: "Artificial Neural Networks",
      component: "Live Class Session",
      startTime: "18:30",
      endTime: "19:30",
      weightage: null,
      weekNum: 5,
    },
    {
      type: "live-class",
      title: "Cloud Services & Platforms",
      component: "Live Class Session",
      startTime: "21:00",
      endTime: "22:00",
      weightage: null,
      weekNum: 5,
    },
  ],
  "2026-02-21": [
    {
      type: "live-class",
      title: "Machine Learning",
      component: "Live Class Session",
      startTime: "19:45",
      endTime: "20:45",
      weightage: null,
      weekNum: 5,
    },
  ],

  // Week 6 - Feb 27-28
  "2026-02-27": [
    {
      type: "live-class",
      title: "Artificial Neural Networks",
      component: "Live Class Session",
      startTime: "18:30",
      endTime: "19:30",
      weightage: null,
      weekNum: 6,
    },
    {
      type: "live-class",
      title: "Cloud Services & Platforms",
      component: "Live Class Session",
      startTime: "21:00",
      endTime: "22:00",
      weightage: null,
      weekNum: 6,
    },
  ],
  "2026-02-28": [
    {
      type: "live-class",
      title: "Machine Learning",
      component: "Live Class Session",
      startTime: "19:45",
      endTime: "20:45",
      weightage: null,
      weekNum: 6,
    },
  ],

  // Week 7 - Graded Quiz 2 + Classes
  "2026-03-01": [
    {
      type: "quiz",
      title: "Graded Quiz-2: Artificial Neural Networks",
      component: "Graded Quiz-2",
      startTime: "00:00",
      endTime: "23:59",
      weightage: 15,
      weekNum: 7,
    },
    {
      type: "quiz",
      title: "Graded Quiz-2: Cloud Services & Platforms",
      component: "Graded Quiz-2",
      startTime: "00:00",
      endTime: "23:59",
      weightage: 15,
      weekNum: 7,
    },
    {
      type: "quiz",
      title: "Graded Quiz-2: Machine Learning",
      component: "Graded Quiz-2",
      startTime: "00:00",
      endTime: "23:59",
      weightage: 15,
      weekNum: 7,
    },
  ],
  "2026-03-06": [
    {
      type: "live-class",
      title: "Artificial Neural Networks",
      component: "Live Class Session",
      startTime: "18:30",
      endTime: "19:30",
      weightage: null,
      weekNum: 7,
    },
    {
      type: "live-class",
      title: "Cloud Services & Platforms",
      component: "Live Class Session",
      startTime: "21:00",
      endTime: "22:00",
      weightage: null,
      weekNum: 7,
    },
  ],
  "2026-03-07": [
    {
      type: "live-class",
      title: "Machine Learning",
      component: "Live Class Session",
      startTime: "19:45",
      endTime: "20:45",
      weightage: null,
      weekNum: 7,
    },
  ],

  // Week 8 - Mar 13-14
  "2026-03-13": [
    {
      type: "live-class",
      title: "Artificial Neural Networks",
      component: "Live Class Session",
      startTime: "18:30",
      endTime: "19:30",
      weightage: null,
      weekNum: 8,
    },
    {
      type: "live-class",
      title: "Cloud Services & Platforms",
      component: "Live Class Session",
      startTime: "21:00",
      endTime: "22:00",
      weightage: null,
      weekNum: 8,
    },
  ],
  "2026-03-14": [
    {
      type: "live-class",
      title: "Machine Learning",
      component: "Live Class Session",
      startTime: "19:45",
      endTime: "20:45",
      weightage: null,
      weekNum: 8,
    },
  ],

  // Week 9 - Assignment + Classes
  "2026-03-15": [
    {
      type: "assignment",
      title: "Assignment Starts: Artificial Neural Networks",
      component: "Assignment",
      startTime: "00:00",
      endDate: "2026-04-12",
      endTime: "23:59",
      weightage: 20,
      weekNum: 9,
    },
    {
      type: "assignment",
      title: "Assignment Starts: Cloud Services & Platforms",
      component: "Assignment",
      startTime: "00:00",
      endDate: "2026-04-12",
      endTime: "23:59",
      weightage: 20,
      weekNum: 9,
    },
    {
      type: "assignment",
      title: "Assignment Starts: Machine Learning",
      component: "Assignment",
      startTime: "00:00",
      endDate: "2026-04-12",
      endTime: "23:59",
      weightage: 20,
      weekNum: 9,
    },
  ],
  "2026-03-20": [
    {
      type: "live-class",
      title: "Artificial Neural Networks",
      component: "Live Class Session",
      startTime: "18:30",
      endTime: "19:30",
      weightage: null,
      weekNum: 9,
    },
    {
      type: "live-class",
      title: "Cloud Services & Platforms",
      component: "Live Class Session",
      startTime: "21:00",
      endTime: "22:00",
      weightage: null,
      weekNum: 9,
    },
  ],
  "2026-03-21": [
    {
      type: "live-class",
      title: "Machine Learning",
      component: "Live Class Session",
      startTime: "19:45",
      endTime: "20:45",
      weightage: null,
      weekNum: 9,
    },
  ],

  // Week 10 - Graded Quiz 3
  "2026-03-22": [
    {
      type: "quiz",
      title: "Graded Quiz-3: Artificial Neural Networks",
      component: "Graded Quiz-3",
      startTime: "00:00",
      endTime: "23:59",
      weightage: 15,
      weekNum: 10,
    },
    {
      type: "quiz",
      title: "Graded Quiz-3: Cloud Services & Platforms",
      component: "Graded Quiz-3",
      startTime: "00:00",
      endTime: "23:59",
      weightage: 15,
      weekNum: 10,
    },
    {
      type: "quiz",
      title: "Graded Quiz-3: Machine Learning",
      component: "Graded Quiz-3",
      startTime: "00:00",
      endTime: "23:59",
      weightage: 15,
      weekNum: 10,
    },
  ],
  "2026-03-27": [
    {
      type: "live-class",
      title: "Artificial Neural Networks",
      component: "Live Class Session",
      startTime: "18:30",
      endTime: "19:30",
      weightage: null,
      weekNum: 10,
    },
    {
      type: "live-class",
      title: "Cloud Services & Platforms",
      component: "Live Class Session",
      startTime: "21:00",
      endTime: "22:00",
      weightage: null,
      weekNum: 10,
    },
  ],
  "2026-03-28": [
    {
      type: "live-class",
      title: "Machine Learning",
      component: "Live Class Session",
      startTime: "19:45",
      endTime: "20:45",
      weightage: null,
      weekNum: 10,
    },
  ],

  // Week 11 - Apr 3-4
  "2026-04-03": [
    {
      type: "live-class",
      title: "Artificial Neural Networks",
      component: "Live Class Session",
      startTime: "18:30",
      endTime: "19:30",
      weightage: null,
      weekNum: 11,
    },
    {
      type: "live-class",
      title: "Cloud Services & Platforms",
      component: "Live Class Session",
      startTime: "21:00",
      endTime: "22:00",
      weightage: null,
      weekNum: 11,
    },
  ],
  "2026-04-04": [
    {
      type: "live-class",
      title: "Machine Learning",
      component: "Live Class Session",
      startTime: "19:45",
      endTime: "20:45",
      weightage: null,
      weekNum: 11,
    },
  ],

  // Week 12 - Apr 10-11
  "2026-04-10": [
    {
      type: "live-class",
      title: "Artificial Neural Networks",
      component: "Live Class Session",
      startTime: "18:30",
      endTime: "19:30",
      weightage: null,
      weekNum: 12,
    },
    {
      type: "live-class",
      title: "Cloud Services & Platforms",
      component: "Live Class Session",
      startTime: "21:00",
      endTime: "22:00",
      weightage: null,
      weekNum: 12,
    },
  ],
  "2026-04-11": [
    {
      type: "live-class",
      title: "Machine Learning",
      component: "Live Class Session",
      startTime: "19:45",
      endTime: "20:45",
      weightage: null,
      weekNum: 12,
    },
  ],

  // Assignment Due
  "2026-04-12": [
    {
      type: "assignment",
      title: "Assignment Due: All Courses",
      component: "Assignment",
      time: "11:59 PM",
      weightage: null,
      isDeadline: true,
      weekNum: 12,
    },
  ],

  // Week 13 - Apr 17-18
  "2026-04-17": [
    {
      type: "live-class",
      title: "Artificial Neural Networks",
      component: "Live Class Session",
      startTime: "18:30",
      endTime: "19:30",
      weightage: null,
      weekNum: 13,
    },
    {
      type: "live-class",
      title: "Cloud Services & Platforms",
      component: "Live Class Session",
      startTime: "21:00",
      endTime: "22:00",
      weightage: null,
      weekNum: 13,
    },
  ],
  "2026-04-18": [
    {
      type: "live-class",
      title: "Machine Learning",
      component: "Live Class Session",
      startTime: "19:45",
      endTime: "20:45",
      weightage: null,
      weekNum: 13,
    },
  ],

  // Week 14 - Trimester Exams Slot 1
  "2026-04-25": [
    {
      type: "exam",
      title: "Exam: Artificial Neural Networks",
      component: "Trimester Exams Slot-1",
      startTime: "09:30",
      endTime: "11:30",
      weightage: 40,
      weekNum: 14,
    },
    {
      type: "exam",
      title: "Exam: Cloud Services & Platforms",
      component: "Trimester Exams Slot-1",
      startTime: "12:30",
      endTime: "14:30",
      weightage: 40,
      weekNum: 14,
    },
  ],

  // Week 14 - Trimester Exams Slot 2
  "2026-05-02": [
    {
      type: "exam",
      title: "Exam: Machine Learning",
      component: "Trimester Exams Slot-2",
      startTime: "09:30",
      endTime: "11:30",
      weightage: 40,
      weekNum: 14,
    },
  ],
  "2026-05-03": [
    {
      type: "exam",
      title: "Exam: Cloud Services & Platforms",
      component: "Trimester Exams Slot-2",
      startTime: "09:30",
      endTime: "11:30",
      weightage: 40,
      weekNum: 14,
    },
    {
      type: "exam",
      title: "Exam: Artificial Neural Networks",
      component: "Trimester Exams Slot-2",
      startTime: "12:30",
      endTime: "14:30",
      weightage: 40,
      weekNum: 14,
    },
  ],
};

// Helper function to get schedule for a specific date
export function getScheduleForDate(dateKey) {
  return scheduleByDate[dateKey] || [];
}

// Helper function to get all schedule dates
export function getAllScheduleDates() {
  return Object.keys(scheduleByDate);
}

// Helper function to check if date has schedule events
export function hasScheduleEvents(dateKey) {
  return dateKey in scheduleByDate && scheduleByDate[dateKey].length > 0;
}

// Event type icons/colors mapping
export const eventTypeStyles = {
  "live-class": { color: "#3b82f6", icon: "📚", label: "Live Class" },
  quiz: { color: "#f59e0b", icon: "📝", label: "Quiz" },
  assignment: { color: "#8b5cf6", icon: "📋", label: "Assignment" },
  exam: { color: "#ef4444", icon: "🎓", label: "Exam" },
  milestone: { color: "#10b981", icon: "🏁", label: "Milestone" },
};
