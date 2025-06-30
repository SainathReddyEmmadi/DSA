/**
 * Priority Queue Implementation in JavaScript
 *
 * A priority queue is an abstract data type where each element has a priority.
 * Elements with higher priority are served before elements with lower priority.
 * Can be implemented using heaps, arrays, or linked lists.
 *
 * Operations:
 * - enqueue(element, priority): Add element with priority
 * - dequeue(): Remove and return highest priority element
 * - peek(): Return highest priority element without removing
 * - isEmpty(): Check if queue is empty
 * - size(): Get number of elements
 *
 * This implementation uses a binary heap for optimal performance
 * Time Complexity: O(log n) for enqueue/dequeue, O(1) for peek
 * Space Complexity: O(n) where n is number of elements
 */

class PriorityQueue {
  constructor(compareFn = (a, b) => a.priority - b.priority) {
    this.heap = [];
    this.compare = compareFn; // Function to compare priorities
  }

  /**
   * Add element with priority to queue
   * @param {*} element - Element to add
   * @param {number} priority - Priority value (lower number = higher priority by default)
   * @returns {number} New size of queue
   */
  enqueue(element, priority) {
    const node = { element, priority };
    this.heap.push(node);
    this._heapifyUp(this.heap.length - 1);
    return this.size();
  }

  /**
   * Remove and return highest priority element
   * @returns {*} Highest priority element
   */
  dequeue() {
    if (this.isEmpty()) {
      throw new Error("Priority queue is empty");
    }

    const root = this.heap[0];
    const lastElement = this.heap.pop();

    if (this.heap.length > 0) {
      this.heap[0] = lastElement;
      this._heapifyDown(0);
    }

    return root.element;
  }

  /**
   * Return highest priority element without removing
   * @returns {*} Highest priority element or undefined if empty
   */
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.heap[0].element;
  }

  /**
   * Get priority of highest priority element
   * @returns {number} Priority or undefined if empty
   */
  peekPriority() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.heap[0].priority;
  }

  /**
   * Check if queue is empty
   * @returns {boolean} True if empty, false otherwise
   */
  isEmpty() {
    return this.heap.length === 0;
  }

  /**
   * Get number of elements in queue
   * @returns {number} Size of queue
   */
  size() {
    return this.heap.length;
  }

  /**
   * Clear all elements from queue
   */
  clear() {
    this.heap = [];
  }

  /**
   * Convert queue to array (not in priority order)
   * @returns {Array} Array representation
   */
  toArray() {
    return this.heap.map((node) => ({
      element: node.element,
      priority: node.priority
    }));
  }

  /**
   * Get elements in priority order
   * @returns {Array} Array in priority order
   */
  toSortedArray() {
    const sorted = [...this.heap].sort(this.compare);
    return sorted.map((node) => ({
      element: node.element,
      priority: node.priority
    }));
  }

  /**
   * String representation of queue
   * @returns {string} String representation
   */
  toString() {
    const elements = this.toSortedArray()
      .map((item) => `${item.element}(${item.priority})`)
      .join(", ");
    return `PriorityQueue[${elements}]`;
  }

  /**
   * Bubble element up to maintain heap property
   * @param {number} index - Index to heapify up from
   * @private
   */
  _heapifyUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);

      if (this.compare(this.heap[index], this.heap[parentIndex]) >= 0) {
        break;
      }

      [this.heap[index], this.heap[parentIndex]] = [
        this.heap[parentIndex],
        this.heap[index]
      ];

      index = parentIndex;
    }
  }

  /**
   * Bubble element down to maintain heap property
   * @param {number} index - Index to heapify down from
   * @private
   */
  _heapifyDown(index) {
    while (true) {
      let minIndex = index;
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;

      if (
        leftChild < this.heap.length &&
        this.compare(this.heap[leftChild], this.heap[minIndex]) < 0
      ) {
        minIndex = leftChild;
      }

      if (
        rightChild < this.heap.length &&
        this.compare(this.heap[rightChild], this.heap[minIndex]) < 0
      ) {
        minIndex = rightChild;
      }

      if (minIndex === index) {
        break;
      }

      [this.heap[index], this.heap[minIndex]] = [
        this.heap[minIndex],
        this.heap[index]
      ];

      index = minIndex;
    }
  }

  /**
   * Create priority queue from array of {element, priority} objects
   * @param {Array} array - Array to convert to priority queue
   * @param {Function} compareFn - Comparison function
   * @returns {PriorityQueue} New priority queue instance
   */
  static fromArray(array, compareFn) {
    const pq = new PriorityQueue(compareFn);
    array.forEach((item) => pq.enqueue(item.element, item.priority));
    return pq;
  }
}

// Max Priority Queue (higher numbers = higher priority)
class MaxPriorityQueue extends PriorityQueue {
  constructor() {
    super((a, b) => b.priority - a.priority); // Reverse comparison for max heap
  }
}

// Min Priority Queue (lower numbers = higher priority)
class MinPriorityQueue extends PriorityQueue {
  constructor() {
    super((a, b) => a.priority - b.priority); // Standard comparison for min heap
  }
}

// Simple array-based priority queue (for comparison)
class SimplePriorityQueue {
  constructor(compareFn = (a, b) => a.priority - b.priority) {
    this.items = [];
    this.compare = compareFn;
  }

  enqueue(element, priority) {
    const node = { element, priority };
    let added = false;

    // Find correct position to insert
    for (let i = 0; i < this.items.length; i++) {
      if (this.compare(node, this.items[i]) < 0) {
        this.items.splice(i, 0, node);
        added = true;
        break;
      }
    }

    if (!added) {
      this.items.push(node);
    }

    return this.size();
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error("Priority queue is empty");
    }
    return this.items.shift().element;
  }

  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[0].element;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  clear() {
    this.items = [];
  }

  toArray() {
    return this.items.map((node) => ({
      element: node.element,
      priority: node.priority
    }));
  }

  toString() {
    const elements = this.items
      .map((item) => `${item.element}(${item.priority})`)
      .join(", ");
    return `SimplePriorityQueue[${elements}]`;
  }
}

// Test cases and demonstrations
function testPriorityQueue() {
  console.log("=== Testing Heap-based Priority Queue ===");

  const pq = new PriorityQueue();

  console.log("1. Basic Operations:");
  console.log(`Empty: ${pq.isEmpty()}`); // true
  console.log(`Size: ${pq.size()}`); // 0

  // Enqueue elements with different priorities
  pq.enqueue("Low priority task", 5);
  pq.enqueue("High priority task", 1);
  pq.enqueue("Medium priority task", 3);
  pq.enqueue("Urgent task", 0);
  pq.enqueue("Normal task", 4);

  console.log(`After enqueueing: ${pq.toString()}`);
  console.log(`Peek: ${pq.peek()} (priority: ${pq.peekPriority()})`);
  console.log(`Size: ${pq.size()}`);

  // Dequeue elements in priority order
  console.log("\nDequeuing by priority:");
  while (!pq.isEmpty()) {
    const element = pq.dequeue();
    console.log(`Dequeued: ${element} (remaining size: ${pq.size()})`);
  }

  console.log("\n=== Testing Max Priority Queue ===");
  const maxPQ = new MaxPriorityQueue();

  // Higher numbers = higher priority
  maxPQ.enqueue("Task A", 1);
  maxPQ.enqueue("Task B", 5);
  maxPQ.enqueue("Task C", 3);
  maxPQ.enqueue("Task D", 8);

  console.log(`Max PQ: ${maxPQ.toString()}`);
  console.log("Dequeuing (highest priority first):");
  while (!maxPQ.isEmpty()) {
    console.log(`Dequeued: ${maxPQ.dequeue()}`);
  }

  console.log("\n=== Testing Min Priority Queue ===");
  const minPQ = new MinPriorityQueue();

  // Lower numbers = higher priority
  minPQ.enqueue("Emergency", 1);
  minPQ.enqueue("Important", 3);
  minPQ.enqueue("Normal", 5);
  minPQ.enqueue("Low", 7);

  console.log(`Min PQ: ${minPQ.toString()}`);
  console.log("Dequeuing (lowest priority number first):");
  while (!minPQ.isEmpty()) {
    console.log(`Dequeued: ${minPQ.dequeue()}`);
  }

  console.log("\n=== Testing Simple Priority Queue ===");
  const simplePQ = new SimplePriorityQueue();

  simplePQ.enqueue("Task 1", 3);
  simplePQ.enqueue("Task 2", 1);
  simplePQ.enqueue("Task 3", 4);
  simplePQ.enqueue("Task 4", 2);

  console.log(`Simple PQ: ${simplePQ.toString()}`);
  console.log("Dequeuing:");
  while (!simplePQ.isEmpty()) {
    console.log(`Dequeued: ${simplePQ.dequeue()}`);
  }
}

// Practical applications demonstration
function demonstrateApplications() {
  console.log("\n=== Practical Applications ===");

  // 1. Task Scheduler
  class TaskScheduler {
    constructor() {
      this.tasks = new MinPriorityQueue(); // Lower priority number = higher priority
      this.completedTasks = [];
    }

    addTask(name, priority, estimatedTime) {
      this.tasks.enqueue({ name, estimatedTime }, priority);
      console.log(
        `Added task: ${name} (priority: ${priority}, time: ${estimatedTime}min)`
      );
    }

    executeNextTask() {
      if (this.tasks.isEmpty()) {
        console.log("No tasks to execute");
        return null;
      }

      const task = this.tasks.dequeue();
      console.log(`Executing: ${task.name} (${task.estimatedTime} minutes)`);
      this.completedTasks.push(task);
      return task;
    }

    showPendingTasks() {
      console.log(`Pending tasks: ${this.tasks.toString()}`);
    }

    executeAllTasks() {
      console.log("\nExecuting all tasks in priority order:");
      while (!this.tasks.isEmpty()) {
        this.executeNextTask();
      }
    }
  }

  console.log("1. Task Scheduler:");
  const scheduler = new TaskScheduler();
  scheduler.addTask("Write report", 2, 30);
  scheduler.addTask("Urgent bug fix", 1, 15);
  scheduler.addTask("Code review", 3, 20);
  scheduler.addTask("Emergency meeting", 0, 45);
  scheduler.addTask("Documentation", 4, 25);

  scheduler.showPendingTasks();
  scheduler.executeAllTasks();

  // 2. Dijkstra's Algorithm simulation
  function dijkstraSimulation() {
    console.log("\n2. Dijkstra's Algorithm Simulation:");

    const graph = {
      A: [
        { node: "B", weight: 4 },
        { node: "C", weight: 2 }
      ],
      B: [
        { node: "C", weight: 1 },
        { node: "D", weight: 5 }
      ],
      C: [
        { node: "D", weight: 8 },
        { node: "E", weight: 10 }
      ],
      D: [{ node: "E", weight: 2 }],
      E: []
    };

    function dijkstra(start, end) {
      const distances = {};
      const previous = {};
      const pq = new MinPriorityQueue();

      // Initialize distances
      for (let node in graph) {
        distances[node] = node === start ? 0 : Infinity;
        pq.enqueue(node, distances[node]);
      }

      while (!pq.isEmpty()) {
        const current = pq.dequeue();

        if (current === end) break;

        for (let neighbor of graph[current] || []) {
          const newDistance = distances[current] + neighbor.weight;

          if (newDistance < distances[neighbor.node]) {
            distances[neighbor.node] = newDistance;
            previous[neighbor.node] = current;
            pq.enqueue(neighbor.node, newDistance);
          }
        }
      }

      // Reconstruct path
      const path = [];
      let current = end;
      while (current !== undefined) {
        path.unshift(current);
        current = previous[current];
      }

      return { distance: distances[end], path };
    }

    const result = dijkstra("A", "E");
    console.log(`Shortest path from A to E: ${result.path.join(" -> ")}`);
    console.log(`Distance: ${result.distance}`);
  }

  dijkstraSimulation();

  // 3. Event Scheduler
  class EventScheduler {
    constructor() {
      this.events = new MinPriorityQueue(); // Earlier times have higher priority
      this.currentTime = 0;
    }

    scheduleEvent(name, time, duration) {
      this.events.enqueue({ name, duration }, time);
      console.log(`Scheduled: ${name} at time ${time} for ${duration} units`);
    }

    processEvents() {
      console.log("\nProcessing events in chronological order:");

      while (!this.events.isEmpty()) {
        const eventTime = this.events.peekPriority();
        const event = this.events.dequeue();

        this.currentTime = eventTime;
        console.log(
          `Time ${this.currentTime}: Processing ${event.name} (duration: ${event.duration})`
        );
        this.currentTime += event.duration;
        console.log(`  Completed at time ${this.currentTime}`);
      }
    }
  }

  console.log("\n3. Event Scheduler:");
  const eventScheduler = new EventScheduler();
  eventScheduler.scheduleEvent("Meeting", 10, 2);
  eventScheduler.scheduleEvent("Lunch", 5, 1);
  eventScheduler.scheduleEvent("Presentation", 15, 3);
  eventScheduler.scheduleEvent("Coffee break", 8, 1);

  eventScheduler.processEvents();
}

// Performance comparison
function performanceTest() {
  console.log("\n=== Performance Test ===");

  const iterations = 10000;
  const testData = Array.from({ length: iterations }, (_, i) => ({
    element: `Task ${i}`,
    priority: Math.floor(Math.random() * 100)
  }));

  // Test heap-based priority queue
  console.time("Heap Priority Queue");
  const heapPQ = new PriorityQueue();
  testData.forEach((item) => heapPQ.enqueue(item.element, item.priority));
  while (!heapPQ.isEmpty()) {
    heapPQ.dequeue();
  }
  console.timeEnd("Heap Priority Queue");

  // Test simple array-based priority queue
  console.time("Simple Priority Queue");
  const simplePQ = new SimplePriorityQueue();
  testData
    .slice(0, 1000)
    .forEach((item) => simplePQ.enqueue(item.element, item.priority)); // Smaller dataset
  while (!simplePQ.isEmpty()) {
    simplePQ.dequeue();
  }
  console.timeEnd("Simple Priority Queue");

  console.log(
    "\nNote: Heap-based implementation is much faster for large datasets"
  );
  console.log(
    "Heap: O(log n) per operation, Simple: O(n) per enqueue operation"
  );
}

// Run all tests
console.log("Priority Queue Implementation and Testing");
console.log("========================================");

testPriorityQueue();
demonstrateApplications();
performanceTest();

module.exports = {
  PriorityQueue,
  MaxPriorityQueue,
  MinPriorityQueue,
  SimplePriorityQueue
};
