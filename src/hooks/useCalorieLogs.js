import { parseJSON } from 'date-fns';
import { useLocalStorage } from './useLocalStorage';

const parse = (logArrayJSON) =>
  JSON.parse(logArrayJSON).map((log) => ({
    ...log,
    consumedAt: parseJSON(log.consumedAt),
  }));

export const useCalorieLogs = () => useLocalStorage('calorie-logs', [], parse);
