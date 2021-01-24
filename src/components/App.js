import { differenceInMinutes, startOfToday } from 'date-fns';
import React from 'react';
import { v4 as uuid } from 'uuid';
import { getCaloriesRemaining } from '../getCaloriesRemaining';
import { fetchLogs, saveLogs } from '../persistence/calorieLogRepository';
import './App.css';

function App() {
  const [logs, setLogs] = React.useState([]);
  const [calorieInput, setCalorieInput] = React.useState('');

  React.useEffect(() => {
    setLogs(fetchLogs());
  }, []);

  const handleLogCalories = (e) => {
    e.preventDefault();
    const calories = parseInt(calorieInput);
    const log = { id: uuid(), calories };
    const updatedLogs = [...logs, log];
    setLogs(updatedLogs);
    setCalorieInput('');
    saveLogs(updatedLogs);
  };

  const deleteLog = (logId) => {
    const updatedLogs = logs.filter((log) => log.id !== logId);
    setLogs(updatedLogs);
    saveLogs(updatedLogs);
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
            mealWindowStartHour: 0,
            mealWindowEndHour: 8,
            minutesElapsedInDay: differenceInMinutes(
              new Date(),
              startOfToday()
            ),
            caloriesConsumed: logs.reduce(
              (total, log) => total + log.calories,
              0
            ),
          })}
        </h2>
        {logs.map((log) => (
          <div>
            {log.calories}
            <button onClick={() => deleteLog(log.id)}>Delete</button>
          </div>
        ))}
      </header>
    </div>
  );
}

export default App;
