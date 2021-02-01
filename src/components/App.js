import { differenceInMinutes, startOfToday } from 'date-fns';
import React from 'react';
import {
  createCalorieLogToday,
  getCaloriesRemaining,
  isOutdated,
  sumCalories,
} from '../calorie-log';
import './App.css';
import { useCalorieLogs } from '../hooks/useCalorieLogs';

function App() {
  const [logs, setLogs] = useCalorieLogs();
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
    <div className="App container">
      <h1 className="title is-1">Calories Available</h1>
      <h2 className="subtitle is-2">
        {getCaloriesRemaining({
          dailyCalories: 2000,
          mealWindowStartHour: 8,
          mealWindowEndHour: 20,
          minutesElapsedInDay: differenceInMinutes(new Date(), startOfToday()),
          caloriesConsumed: sumCalories(logs),
        })}
      </h2>
      <form className="calorie-form mb-4" onSubmit={handleLogCalories}>
        <div className="field">
          <div className="control">
            <input
              className="input"
              type="number"
              value={calorieInput}
              onChange={(e) => setCalorieInput(e.target.value)}
              placeholder="Calories Consumed"
            />
          </div>
        </div>
        <button className="button is-primary">Add</button>
      </form>
      {logs.map((log) => (
        <span className="tag is-large mr-2 mb-2" key={log.id}>
          {log.calories}
          <button
            className="delete is-small"
            onClick={() => deleteLog(log.id)}
          ></button>
        </span>
      ))}
    </div>
  );
}

export default App;
