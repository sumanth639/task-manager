import { differenceInDays, formatDistance } from 'date-fns';

// Calculate days left until a due date
export const calculateDaysLeft = (dueDate) => {
  const now = new Date();
  const due = new Date(dueDate);
  const days = differenceInDays(due, now);

  if (days < 0) {
    return 'Overdue';
  } else if (days === 0) {
    return 'Today';
  } else {
    return days;
  }
};

// Format time spent in minutes to a readable format
export const formatTime = (minutes) => {
  if (minutes < 60) {
    return `${minutes} min`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (remainingMinutes === 0) {
      return `${hours} hr`;
    } else {
      return `${hours} hr ${remainingMinutes} min`;
    }
  }
};

// Format date for display
export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Format relative time (e.g., "2 days ago")
export const formatRelativeTime = (date) => {
  return formatDistance(new Date(date), new Date(), { addSuffix: true });
};
