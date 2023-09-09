import { ethers } from 'ethers';

// Import ABI Code to interact with smart contract
import TaskMarketplace from '../artifacts/contracts/TaskMarketplace.sol/TaskMarketplace.json';

// The contract address
const TASK_MARKETPLACE_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

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

async function tasks(taskId) {

  // If MetaMask exists
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      TASK_MARKETPLACE_ADDRESS,
      TaskMarketplace.abi,
      provider
    );
    try {
      const data = await contract.tasks(taskId);
      console.log(data);
    } catch (error) {
      console.log("Error: ", error);
    }
  }
}


async function createTask(taskTitle, taskDescription, price, deadline) {

  // If MetaMask exists
  if (typeof window.ethereum !== "undefined") {
    await requestAccount();

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(TASK_MARKETPLACE_ADDRESS, TaskMarketplace.abi, signer);

    const formattedPrice = ethers.utils.parseEther(price);
    const transaction = await contract.createTask(taskTitle, taskDescription, formattedPrice, deadline, {value: formattedPrice});

    await transaction.wait();
  }

}


async function acceptTask(taskId) {

  // If MetaMask exists
  if (typeof window.ethereum !== "undefined") {
    await requestAccount();

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(TASK_MARKETPLACE_ADDRESS, TaskMarketplace.abi, signer);

    const transaction = await contract.acceptTask(taskId);

    await transaction.wait();
  }

}


async function completeTask(taskId) {

  // If MetaMask exists
  if (typeof window.ethereum !== "undefined") {
    await requestAccount();

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(TASK_MARKETPLACE_ADDRESS, TaskMarketplace.abi, signer);

    const transaction = await contract.completeTask(taskId);

    await transaction.wait();
  }

}

export { taskCounter, tasks, acceptTask, completeTask, createTask };
