import {
  differenceInMinutes,
  format,
  isSameDay,
  parse,
  startOfToday,
} from 'date-fns';
import React from 'react';
import { v4 as uuid } from 'uuid';
import { getCaloriesRemaining } from '../getCaloriesRemaining';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { clearCalorieLogs } from '../persistence/calorieLogRepository';
import './App.css';

function App() {
  const [logs, setLogs] = useLocalStorage('calorie-logs', []);
  const [calorieInput, setCalorieInput] = React.useState('');

  React.useEffect(() => {
    if (
      logs.length &&
      !isSameDay(
        parse(logs[0].consumedAt, 'yyyy-MM-dd HH:mm', new Date()),
        new Date()
      )
    )
      clearCalorieLogs();
  }, [logs]);

  const handleLogCalories = (e) => {
    e.preventDefault();
    const calories = parseInt(calorieInput);
    const log = {
      id: uuid(),
      calories,
      consumedAt: format(new Date(), 'yyyy-MM-dd HH:mm'),
    };
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
            caloriesConsumed: logs.reduce(
              (total, log) => total + log.calories,
              0
            ),
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
