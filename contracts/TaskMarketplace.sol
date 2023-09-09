// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TaskMarketplace {
    // Structure to represent a task
    struct Task {
        address payable requester; // Address of the user who created the task
        string title;              // Title of the task
        string description;        // Description of the task
        uint256 price;             // Price in Ether (wei)
        uint256 deadline;          // Deadline for task completion (timestamp)
        bool isCompleted;          // Indicates if the task is completed
        address payable performer; // Address of the user who accepted the task
        bool isAccepted;           // Indicates if the task is accepted by a performer
    }

    // Mapping from task ID to Task
    mapping(uint256 => Task) public tasks;

    // Counter for generating unique task IDs
    uint256 public taskCounter;

    // Events
    event TaskCreated(uint256 taskId, address indexed requester);
    event TaskAccepted(uint256 taskId, address indexed performer);
    event TaskCompleted(uint256 taskId, address indexed requester, address indexed performer);
    event FundsReleased(uint256 taskId, address indexed requester, address indexed performer, uint256 amount);

    // Modifier to ensure that only the requester can perform certain actions
    modifier onlyRequester(uint256 taskId) {
        require(msg.sender == tasks[taskId].requester, "Only the requester can perform this action");
        _;
    }

    // Modifier to ensure that only the performer can perform certain actions
    modifier onlyPerformer(uint256 taskId) {
        require(msg.sender == tasks[taskId].performer, "Only the performer can perform this action");
        _;
    }

    // Create a new task
    function createTask(string memory title, string memory description, uint256 price, uint256 deadline) external payable {
        require(price > 0, "Price must be greater than zero");
        require(deadline > block.timestamp, "Deadline must be in the future");
        require(msg.value == price, "Amount sent must be equal to the task price");

        uint256 taskId = taskCounter++;
        tasks[taskId] = Task({
            requester: payable(msg.sender),
            title: title,
            description: description,
            price: price,
            deadline: deadline,
            isCompleted: false,
            performer: payable(address(0)),
            isAccepted: false
        });

        emit TaskCreated(taskId, msg.sender);
    }

    // Accept a task and escrow funds
    function acceptTask(uint256 taskId) external {
        Task storage task = tasks[taskId];
        require(!task.isAccepted, "Task has already been accepted");
        require(task.requester != address(0), "Task does not exist");
        require(task.deadline > block.timestamp, "Task deadline has passed");
        require(msg.sender != task.requester, "Requester cannot accept their own task");

        // Update task status
        task.performer = payable(msg.sender);
        task.isAccepted = true;

        emit TaskAccepted(taskId, msg.sender);
    }

    // Complete a task and release escrowed funds
    function completeTask(uint256 taskId) external onlyRequester(taskId) {
        Task storage task = tasks[taskId];
        require(task.isAccepted, "Task has not been accepted");
        require(!task.isCompleted, "Task has already been completed");
        require(task.deadline > block.timestamp, "Task deadline has passed");

        // Transfer funds to the performer
        uint256 escrowAmount = task.price;
        task.performer.transfer(escrowAmount);

        // Update task status
        task.isCompleted = true;

        emit TaskCompleted(taskId, msg.sender, task.performer);
        emit FundsReleased(taskId, msg.sender, task.performer, escrowAmount);
    }
}
