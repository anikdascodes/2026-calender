// MSc Trimester-2 Calendar Data - Sep 2025 Batch
// Filtered to show only: Artificial Neural Networks, Cloud Services & Platforms, Machine Learning
// Week Structure: Friday (ANN+CSP) -> Saturday (ML) -> Week transitions on Saturday

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

// Week definitions: Week transitions on SATURDAY after ML class
// Friday: ANN + CSP (week's main classes)
// Saturday: ML class + Week number increments
// So "Week 5" = Feb 20 (Fri, ANN+CSP) + Feb 21 (Sat, ML)
export const weekDefinitions = [
  { 
    weekNum: 0, 
    name: "Week 0 - Orientation", 
    startDate: "2026-01-19", 
    endDate: "2026-01-22", 
    fridayDate: null,
    saturdayDate: null,
    description: "Courses Live on LMS (Jan 19)"
  },
  { 
    weekNum: 1, 
    name: "Week 1", 
    startDate: "2026-01-23", 
    endDate: "2026-01-24",
    fridayDate: "2026-01-23",
    saturdayDate: "2026-01-24",
    description: "Fri: ANN+CSP | Sat: ML"
  },
  { 
    weekNum: 2, 
    name: "Week 2", 
    startDate: "2026-01-30", 
    endDate: "2026-01-31",
    fridayDate: "2026-01-30",
    saturdayDate: "2026-01-31",
    description: "Fri: ANN+CSP | Sat: ML"
  },
  { 
    weekNum: 3, 
    name: "Week 3", 
    startDate: "2026-02-06", 
    endDate: "2026-02-07",
    fridayDate: "2026-02-06",
    saturdayDate: "2026-02-07",
    description: "Fri: ANN+CSP | Sat: ML"
  },
  { 
    weekNum: 4, 
    name: "Week 4 - Quiz 1", 
    startDate: "2026-02-13", 
    endDate: "2026-02-14",
    fridayDate: "2026-02-13",
    saturdayDate: "2026-02-14",
    description: "Quiz: Feb 8-10 | Fri: ANN+CSP | Sat: ML"
  },
  { 
    weekNum: 5, 
    name: "Week 5", 
    startDate: "2026-02-20", 
    endDate: "2026-02-21",
    fridayDate: "2026-02-20",
    saturdayDate: "2026-02-21",
    description: "Fri: ANN+CSP | Sat: ML"
  },
  { 
    weekNum: 6, 
    name: "Week 6", 
    startDate: "2026-02-27", 
    endDate: "2026-02-28",
    fridayDate: "2026-02-27",
    saturdayDate: "2026-02-28",
    description: "Fri: ANN+CSP | Sat: ML"
  },
  { 
    weekNum: 7, 
    name: "Week 7 - Quiz 2", 
    startDate: "2026-03-06", 
    endDate: "2026-03-07",
    fridayDate: "2026-03-06",
    saturdayDate: "2026-03-07",
    description: "Quiz: Mar 1-3 | Fri: ANN+CSP | Sat: ML"
  },
  { 
    weekNum: 8, 
    name: "Week 8", 
    startDate: "2026-03-13", 
    endDate: "2026-03-14",
    fridayDate: "2026-03-13",
    saturdayDate: "2026-03-14",
    description: "Fri: ANN+CSP | Sat: ML"
  },
  { 
    weekNum: 9, 
    name: "Week 9 - Assignment", 
    startDate: "2026-03-20", 
    endDate: "2026-03-21",
    fridayDate: "2026-03-20",
    saturdayDate: "2026-03-21",
    description: "Assign starts Mar 15 | Fri: ANN+CSP | Sat: ML"
  },
  { 
    weekNum: 10, 
    name: "Week 10 - Quiz 3", 
    startDate: "2026-03-27", 
    endDate: "2026-03-28",
    fridayDate: "2026-03-27",
    saturdayDate: "2026-03-28",
    description: "Quiz: Mar 22-24 | Fri: ANN+CSP | Sat: ML"
  },
  { 
    weekNum: 11, 
    name: "Week 11", 
    startDate: "2026-04-03", 
    endDate: "2026-04-04",
    fridayDate: "2026-04-03",
    saturdayDate: "2026-04-04",
    description: "Fri: ANN+CSP | Sat: ML"
  },
  { 
    weekNum: 12, 
    name: "Week 12", 
    startDate: "2026-04-10", 
    endDate: "2026-04-12",
    fridayDate: "2026-04-10",
    saturdayDate: "2026-04-11",
    description: "Fri: ANN+CSP | Sat: ML | Assign Due: Apr 12"
  },
  { 
    weekNum: 13, 
    name: "Week 13", 
    startDate: "2026-04-17", 
    endDate: "2026-04-18",
    fridayDate: "2026-04-17",
    saturdayDate: "2026-04-18",
    description: "Fri: ANN+CSP | Sat: ML"
  },
  { 
    weekNum: 14, 
    name: "Week 14 - Exams", 
    startDate: "2026-04-24", 
    endDate: "2026-05-03",
    fridayDate: null,
    saturdayDate: "2026-04-25",
    description: "Exams: Apr 25, May 2-3"
  },
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

// Check if a date is Friday (ANN + CSP day)
export function isFridayClassDay(dateStr) {
  const week = getWeekForDate(dateStr);
  if (!week || week.weekNum < 0) return false;
  return dateStr === week.fridayDate;
}

// Check if a date is Saturday (ML day) - This is when week number increments
export function isSaturdayClassDay(dateStr) {
  const week = getWeekForDate(dateStr);
  if (!week || week.weekNum < 0) return false;
  return dateStr === week.saturdayDate;
}

// Get the next class dates for each course FROM a given date
export function getNextClassDates(fromDateStr) {
  const fromDate = new Date(fromDateStr);
  const scheduleDates = Object.keys(scheduleByDate).sort();
  
  let nextANN = null;
  let nextCSP = null;
  let nextML = null;
  
  for (const dateStr of scheduleDates) {
    const date = new Date(dateStr);
    // Include today in the search (for checking if there's class today)
    if (date < fromDate) continue;
    
    const events = scheduleByDate[dateStr];
    for (const event of events) {
      if (event.type === 'live-class') {
        if (event.title.includes('Artificial Neural Networks') && !nextANN) {
          nextANN = dateStr;
        }
        if (event.title.includes('Cloud Services') && !nextCSP) {
          nextCSP = dateStr;
        }
        if (event.title.includes('Machine Learning') && !nextML) {
          nextML = dateStr;
        }
      }
    }
    
    if (nextANN && nextCSP && nextML) break;
  }
  
  return { nextANN, nextCSP, nextML };
}

// Get days remaining until next class
export function getDaysUntilNextClass(fromDateStr, courseType) {
  const nextClasses = getNextClassDates(fromDateStr);
  const targetDate = nextClasses[courseType];
  
  if (!targetDate) return null;
  
  const from = new Date(fromDateStr);
  const to = new Date(targetDate);
  const diffTime = to - from;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return { date: targetDate, days: diffDays };
}

// Get the week status for display
// Returns what "phase" of the week we're in
export function getWeekStatus(dateStr) {
  const week = getWeekForDate(dateStr);
  if (!week || week.weekNum < 0) return null;
  
  const date = new Date(dateStr);
  const dayOfWeek = date.getDay(); // 0=Sun, 1=Mon, ..., 5=Fri, 6=Sat
  
  // Friday = Class day (ANN + CSP)
  if (dayOfWeek === 5) {
    return {
      type: 'friday',
      icon: '🔥',
      label: 'Friday Class Day',
      sublabel: 'ANN 6:30 PM | CSP 9:00 PM',
      color: '#ef4444'
    };
  }
  
  // Saturday = ML day + Week transition
  if (dayOfWeek === 6) {
    return {
      type: 'saturday',
      icon: '🎯',
      label: 'Saturday Class Day',
      sublabel: 'ML 7:45 PM - Week in Progress',
      color: '#10b981'
    };
  }
  
  // Sunday-Thursday = Between classes
  return {
    type: 'between',
    icon: '📚',
    label: 'Study Period',
    sublabel: 'Next: Friday classes',
    color: '#3b82f6'
  };
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

  // Week 1 - Jan 23-24 (Fri: ANN+CSP, Sat: ML)
  "2026-01-23": [
    {
      type: "live-class",
      title: "Artificial Neural Networks",
      component: "Live Class Session",
      startTime: "18:30",
      endTime: "19:30",
      weightage: null,
      weekNum: 1,
      dayType: "friday",
    },
    {
      type: "live-class",
      title: "Cloud Services & Platforms",
      component: "Live Class Session",
      startTime: "21:00",
      endTime: "22:00",
      weightage: null,
      weekNum: 1,
      dayType: "friday",
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
      dayType: "saturday",
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
      dayType: "friday",
    },
    {
      type: "live-class",
      title: "Cloud Services & Platforms",
      component: "Live Class Session",
      startTime: "21:00",
      endTime: "22:00",
      weightage: null,
      weekNum: 2,
      dayType: "friday",
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
      dayType: "saturday",
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
      dayType: "friday",
    },
    {
      type: "live-class",
      title: "Cloud Services & Platforms",
      component: "Live Class Session",
      startTime: "21:00",
      endTime: "22:00",
      weightage: null,
      weekNum: 3,
      dayType: "friday",
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
      dayType: "saturday",
    },
  ],

  // Week 4 - Feb 8-14 (Quiz + Classes Feb 13-14)
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
      endTime: "19:30",
      weightage: null,
      weekNum: 4,
      dayType: "friday",
    },
    {
      type: "live-class",
      title: "Cloud Services & Platforms",
      component: "Live Class Session",
      startTime: "21:00",
      endTime: "22:00",
      weightage: null,
      weekNum: 4,
      dayType: "friday",
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
      dayType: "saturday",
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
      dayType: "friday",
    },
    {
      type: "live-class",
      title: "Cloud Services & Platforms",
      component: "Live Class Session",
      startTime: "21:00",
      endTime: "22:00",
      weightage: null,
      weekNum: 5,
      dayType: "friday",
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
      dayType: "saturday",
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
      dayType: "friday",
    },
    {
      type: "live-class",
      title: "Cloud Services & Platforms",
      component: "Live Class Session",
      startTime: "21:00",
      endTime: "22:00",
      weightage: null,
      weekNum: 6,
      dayType: "friday",
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
      dayType: "saturday",
    },
  ],

  // Week 7 - Mar 1-7 (Quiz + Classes Mar 6-7)
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
      dayType: "friday",
    },
    {
      type: "live-class",
      title: "Cloud Services & Platforms",
      component: "Live Class Session",
      startTime: "21:00",
      endTime: "22:00",
      weightage: null,
      weekNum: 7,
      dayType: "friday",
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
      dayType: "saturday",
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
      dayType: "friday",
    },
    {
      type: "live-class",
      title: "Cloud Services & Platforms",
      component: "Live Class Session",
      startTime: "21:00",
      endTime: "22:00",
      weightage: null,
      weekNum: 8,
      dayType: "friday",
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
      dayType: "saturday",
    },
  ],

  // Week 9 - Mar 15-21 (Assignment + Classes Mar 20-21)
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
      dayType: "friday",
    },
    {
      type: "live-class",
      title: "Cloud Services & Platforms",
      component: "Live Class Session",
      startTime: "21:00",
      endTime: "22:00",
      weightage: null,
      weekNum: 9,
      dayType: "friday",
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
      dayType: "saturday",
    },
  ],

  // Week 10 - Mar 22-28 (Quiz + Classes Mar 27-28)
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
      dayType: "friday",
    },
    {
      type: "live-class",
      title: "Cloud Services & Platforms",
      component: "Live Class Session",
      startTime: "21:00",
      endTime: "22:00",
      weightage: null,
      weekNum: 10,
      dayType: "friday",
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
      dayType: "saturday",
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
      dayType: "friday",
    },
    {
      type: "live-class",
      title: "Cloud Services & Platforms",
      component: "Live Class Session",
      startTime: "21:00",
      endTime: "22:00",
      weightage: null,
      weekNum: 11,
      dayType: "friday",
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
      dayType: "saturday",
    },
  ],

  // Week 12 - Apr 10-12
  "2026-04-10": [
    {
      type: "live-class",
      title: "Artificial Neural Networks",
      component: "Live Class Session",
      startTime: "18:30",
      endTime: "19:30",
      weightage: null,
      weekNum: 12,
      dayType: "friday",
    },
    {
      type: "live-class",
      title: "Cloud Services & Platforms",
      component: "Live Class Session",
      startTime: "21:00",
      endTime: "22:00",
      weightage: null,
      weekNum: 12,
      dayType: "friday",
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
      dayType: "saturday",
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
      dayType: "friday",
    },
    {
      type: "live-class",
      title: "Cloud Services & Platforms",
      component: "Live Class Session",
      startTime: "21:00",
      endTime: "22:00",
      weightage: null,
      weekNum: 13,
      dayType: "friday",
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
      dayType: "saturday",
    },
  ],

  // Week 14 - Exams Apr 25, May 2-3
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
