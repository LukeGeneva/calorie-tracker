import React from 'react';
import { v4 as uuid } from 'uuid';
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
