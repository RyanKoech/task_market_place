import { useState } from "react";
import { ethers } from "ethers";
// Import ABI Code to interact with smart contract
import TaskMarketplace from './artifacts/contracts/TaskMarketplace.sol/TaskMarketplace.json';
import "./App.css";

// The contract address
const TASK_MARKETPLACE_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

function App() {
  // Helper Functions

  // Requests access to the user's Meta Mask Account
  // https://metamask.io/
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function taskCounter() {

    // If MetaMask exists
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        TASK_MARKETPLACE_ADDRESS,
        TaskMarketplace.abi,
        provider
      );
      try {
        const data = await contract.taskCounter();
        console.log(ethers.utils.formatUnits( data , 0) );
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  }

  async function tasks() {

    // If MetaMask exists
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        TASK_MARKETPLACE_ADDRESS,
        TaskMarketplace.abi,
        provider
      );
      try {
        const data = await contract.tasks('0');
        console.log(data);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  }
  

  async function createTask() {

    // If MetaMask exists
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(TASK_MARKETPLACE_ADDRESS, TaskMarketplace.abi, signer);

      const price = ethers.utils.parseEther("2");
      const transaction = await contract.createTask("testing", "testing description", price, 1697852293000, {value: price});

      await transaction.wait();
    }

  }
  

  async function acceptTask() {

    // If MetaMask exists
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(TASK_MARKETPLACE_ADDRESS, TaskMarketplace.abi, signer);

      const transaction = await contract.acceptTask(0);

      await transaction.wait();
    }

  }
  

  async function completeTask() {

    // If MetaMask exists
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(TASK_MARKETPLACE_ADDRESS, TaskMarketplace.abi, signer);

      const transaction = await contract.completeTask(0);

      await transaction.wait();
    }

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
          <button onClick={taskCounter} style={{ backgroundColor: "blue" }}>
            Task Counter
          </button>
          <button onClick={createTask} style={{ backgroundColor: "purple" }}>
            Create Task
          </button>
          <button onClick={tasks} style={{ backgroundColor: "orange" }}>
            Task
          </button>
          <button onClick={acceptTask} style={{ backgroundColor: "green" }}>
            Accept Task
          </button>
          <button onClick={completeTask} style={{ backgroundColor: "red" }}>
            Complete Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
