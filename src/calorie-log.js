import { isToday } from 'date-fns';
import { v4 as uuid } from 'uuid';

export const createCalorieLog = (calories, consumedAt) => ({
  id: uuid(),
  calories,
  consumedAt,
});

export const createCalorieLogToday = (calories) =>
  createCalorieLog(calories, new Date());

export const getCaloriesRemaining = ({
  dailyCalories,
  mealWindowStartHour,
  mealWindowEndHour,
  minutesElapsedInDay,
  caloriesConsumed,
}) => {
  const minutesIntoWindow = minutesElapsedInDay - mealWindowStartHour * 60;
  if (minutesIntoWindow < 0 || minutesElapsedInDay > mealWindowEndHour * 60)
    return 0;
  const windowMinutes = mealWindowEndHour * 60 - mealWindowStartHour * 60;
  const caloriesGainedPerMinute = dailyCalories / windowMinutes;
  const caloriesEarned = caloriesGainedPerMinute * minutesIntoWindow;
  return Math.floor(caloriesEarned - caloriesConsumed);
};

export const isOutdated = (log) => !isToday(log.consumedAt);

export const sumCalories = (logs) =>
  logs.reduce((total, log) => total + log.calories, 0);
