import { subDays } from 'date-fns';
import {
  createCalorieLog,
  createCalorieLogToday,
  getCaloriesRemaining,
  isOutdated,
} from './calorie-log';

test('that calories are calculated correctly with no logs', () => {
  const remaining = getCaloriesRemaining({
    dailyCalories: 2000,
    mealWindowStartHour: 8,
    mealWindowEndHour: 20,
    minutesElapsedInDay: 20 * 60,
    caloriesConsumed: 0,
  });
  expect(remaining).toBe(2000);
});

test('that calories are caculated correctly at start of day', () => {
  const remaining = getCaloriesRemaining({
    dailyCalories: 2000,
    mealWindowStartHour: 8,
    mealWindowEndHour: 20,
    minutesElapsedInDay: 0,
    caloriesConsumed: 0,
  });
  expect(remaining).toBe(0);
});

test('that calories remaining are 0 when outside window', () => {
  const remaining = getCaloriesRemaining({
    dailyCalories: 2000,
    mealWindowStartHour: 8,
    mealWindowEndHour: 20,
    minutesElapsedInDay: 21 * 60,
    caloriesConsumed: 0,
  });
  expect(remaining).toBe(0);
});

test('that calories remaining is correct with consumed calories', () => {
  const remaining = getCaloriesRemaining({
    dailyCalories: 2000,
    mealWindowStartHour: 8,
    mealWindowEndHour: 20,
    minutesElapsedInDay: 8 * 60 + 10,
    caloriesConsumed: 0,
  });
  expect(remaining).toBe(27);
});

test("that yesterday's logs are outdated", () => {
  const log = createCalorieLog(10, subDays(new Date(), 1));
  expect(isOutdated(log)).toBeTruthy();
});

test("that today's logs are not outdated", () => {
  const log = createCalorieLogToday(10);
  expect(isOutdated(log)).toBeFalsy();
});
