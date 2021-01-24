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
