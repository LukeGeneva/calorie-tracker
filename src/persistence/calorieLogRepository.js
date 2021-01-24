const KEY = 'calorie-logs';

export const clearCalorieLogs = () => localStorage.removeItem(KEY);

export const fetchLogs = () => {
  const rawLogs = localStorage.getItem(KEY);
  const logs = rawLogs ? JSON.parse(rawLogs) : [];
  return logs;
};

export const saveLogs = (logs) =>
  localStorage.setItem(KEY, JSON.stringify(logs));
