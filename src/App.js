import "./App.css";

import { taskCounter, tasks, acceptTask, completeTask, createTask } from './services/TaskMarketplaceService';

function App() {

  async function getNumberOfTasks() {
    taskCounter();
  }

  async function tasksById() {
    tasks(0);
  }
  

  async function performCreateTask() {
    createTask("testing", "testing description", "20", 1697852293000);
  }
  

  async function performAcceptTask() {
    acceptTask(1);
  }
  

  async function performCompleteTask() {
    completeTask(1);
  }

  // Return
  return (
    <div className="App">
      <div className="App-header">
        {/* DESCRIPTION  */}
        <div className="description">
          <h1>TaskMarketplace.sol</h1>
          <h3>Full stack dapp using ReactJS and Hardhat</h3>
        </div>
        {/* BUTTONS - Fetch and Set */}
        <div className="custom-buttons">
          <button onClick={getNumberOfTasks} style={{ backgroundColor: "blue" }}>
            Task Counter
          </button>
          <button onClick={performCreateTask} style={{ backgroundColor: "purple" }}>
            Create Task
          </button>
          <button onClick={tasksById} style={{ backgroundColor: "orange" }}>
            Task
          </button>
          <button onClick={performAcceptTask} style={{ backgroundColor: "green" }}>
            Accept Task
          </button>
          <button onClick={performCompleteTask} style={{ backgroundColor: "red" }}>
            Complete Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
