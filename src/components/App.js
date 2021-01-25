import { differenceInMinutes, parseJSON, startOfToday } from 'date-fns';
import React from 'react';
import {
  createCalorieLogToday,
  getCaloriesRemaining,
  isOutdated,
  sumCalories,
} from '../calorie-log';
import { useLocalStorage } from '../hooks/useLocalStorage';
import './App.css';

const parse = (logArrayJSON) =>
  JSON.parse(logArrayJSON).map((log) => ({
    ...log,
    consumedAt: parseJSON(log.consumedAt),
  }));

function App() {
  const [logs, setLogs] = useLocalStorage('calorie-logs', [], parse);
  const [calorieInput, setCalorieInput] = React.useState('');

  React.useEffect(() => {
    if (!logs.length) return;
    if (isOutdated(logs[0])) setLogs([]);
  }, [logs, setLogs]);

  const handleLogCalories = (e) => {
    e.preventDefault();
    const calories = parseInt(calorieInput);
    const log = createCalorieLogToday(calories);
    const updatedLogs = [...logs, log];
    setLogs(updatedLogs);
    setCalorieInput('');
  };

  const deleteLog = (logId) => {
    const updatedLogs = logs.filter((log) => log.id !== logId);
    setLogs(updatedLogs);
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleLogCalories}>
          <input
            type="number"
            value={calorieInput}
            onChange={(e) => setCalorieInput(e.target.value)}
            placeholder="Calories Consumed"
          />
          <button>Add</button>
        </form>
        <h1>Calories Available</h1>
        <h2>
          {getCaloriesRemaining({
            dailyCalories: 2000,
            mealWindowStartHour: 8,
            mealWindowEndHour: 20,
            minutesElapsedInDay: differenceInMinutes(
              new Date(),
              startOfToday()
            ),
            caloriesConsumed: sumCalories(logs),
          })}
        </h2>
        {logs.map((log) => (
          <div key={log.id}>
            {log.calories}
            <button onClick={() => deleteLog(log.id)}>Delete</button>
          </div>
        ))}
      </header>
    </div>
  );
}

export default App;
