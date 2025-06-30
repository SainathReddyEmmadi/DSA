/**
 * Queue Implementation in JavaScript
 *
 * A queue is a linear data structure that follows the First In First Out (FIFO) principle.
 * Elements are added at the rear (enqueue) and removed from the front (dequeue).
 *
 * Operations:
 * - enqueue(element): Add element to rear
 * - dequeue(): Remove and return front element
 * - front()/peek(): Return front element without removing
 * - rear(): Return rear element without removing
 * - isEmpty(): Check if queue is empty
 * - size(): Get number of elements
 *
 * Time Complexity: O(1) for all operations (with optimized implementation)
 * Space Complexity: O(n) where n is number of elements
 */

class Queue {
  constructor() {
    this.items = [];
    this.frontIndex = 0;
  }

  /**
   * Add element to rear of queue
   * @param {*} element - Element to add
   * @returns {number} New size of queue
   */
  enqueue(element) {
    this.items.push(element);
    return this.size();
  }

  /**
   * Remove and return front element
   * @returns {*} Front element or undefined if empty
   */
  dequeue() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty");
    }

    const element = this.items[this.frontIndex];
    this.frontIndex++;

    // Optimize memory by resetting when queue becomes empty
    if (this.frontIndex === this.items.length) {
      this.items = [];
      this.frontIndex = 0;
    }

    return element;
  }

  /**
   * Return front element without removing
   * @returns {*} Front element or undefined if empty
   */
  front() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.frontIndex];
  }

  /**
   * Alternative name for front()
   * @returns {*} Front element or undefined if empty
   */
  peek() {
    return this.front();
  }

  /**
   * Return rear element without removing
   * @returns {*} Rear element or undefined if empty
   */
  rear() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.items.length - 1];
  }

  /**
   * Check if queue is empty
   * @returns {boolean} True if empty, false otherwise
   */
  isEmpty() {
    return this.frontIndex >= this.items.length;
  }

  /**
   * Get number of elements in queue
   * @returns {number} Size of queue
   */
  size() {
    return this.items.length - this.frontIndex;
  }

  /**
   * Clear all elements from queue
   */
  clear() {
    this.items = [];
    this.frontIndex = 0;
  }

  /**
   * Convert queue to array (front to rear)
   * @returns {Array} Array representation
   */
  toArray() {
    return this.items.slice(this.frontIndex);
  }

  /**
   * String representation of queue
   * @returns {string} String representation
   */
  toString() {
    const elements = this.toArray();
    return `Queue[${elements.join(
      ", "
    )}] (front: ${this.front()}, rear: ${this.rear()})`;
  }

  /**
   * Create queue from array
   * @param {Array} array - Array to convert to queue
   * @returns {Queue} New queue instance
   */
  static fromArray(array) {
    const queue = new Queue();
    array.forEach((item) => queue.enqueue(item));
    return queue;
  }
}

// Alternative implementation using linked list
class QueueLinkedList {
  constructor() {
    this.front = null;
    this.rear = null;
    this.length = 0;
  }

  enqueue(element) {
    const newNode = {
      data: element,
      next: null
    };

    if (this.isEmpty()) {
      this.front = this.rear = newNode;
    } else {
      this.rear.next = newNode;
      this.rear = newNode;
    }

    this.length++;
    return this.length;
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty");
    }

    const data = this.front.data;
    this.front = this.front.next;

    if (this.front === null) {
      this.rear = null;
    }

    this.length--;
    return data;
  }

  front() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.front.data;
  }

  peek() {
    return this.front();
  }

  rear() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.rear.data;
  }

  isEmpty() {
    return this.front === null;
  }

  size() {
    return this.length;
  }

  clear() {
    this.front = null;
    this.rear = null;
    this.length = 0;
  }

  toArray() {
    const result = [];
    let current = this.front;
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }

  toString() {
    const elements = this.toArray();
    return `QueueLinkedList[${elements.join(
      ", "
    )}] (front: ${this.front()}, rear: ${this.rear()})`;
  }
}

// Circular Queue implementation
class CircularQueue {
  constructor(capacity) {
    this.items = new Array(capacity);
    this.capacity = capacity;
    this.frontIndex = 0;
    this.rearIndex = 0;
    this.length = 0;
  }

  enqueue(element) {
    if (this.isFull()) {
      throw new Error("Queue is full");
    }

    this.items[this.rearIndex] = element;
    this.rearIndex = (this.rearIndex + 1) % this.capacity;
    this.length++;
    return this.length;
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty");
    }

    const element = this.items[this.frontIndex];
    this.items[this.frontIndex] = undefined; // Clear reference
    this.frontIndex = (this.frontIndex + 1) % this.capacity;
    this.length--;
    return element;
  }

  front() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.frontIndex];
  }

  rear() {
    if (this.isEmpty()) {
      return undefined;
    }
    const rearIndex = (this.rearIndex - 1 + this.capacity) % this.capacity;
    return this.items[rearIndex];
  }

  isEmpty() {
    return this.length === 0;
  }

  isFull() {
    return this.length === this.capacity;
  }

  size() {
    return this.length;
  }

  clear() {
    this.items = new Array(this.capacity);
    this.frontIndex = 0;
    this.rearIndex = 0;
    this.length = 0;
  }

  toArray() {
    const result = [];
    for (let i = 0; i < this.length; i++) {
      const index = (this.frontIndex + i) % this.capacity;
      result.push(this.items[index]);
    }
    return result;
  }

  toString() {
    const elements = this.toArray();
    return `CircularQueue[${elements.join(", ")}] (capacity: ${
      this.capacity
    }, front: ${this.front()}, rear: ${this.rear()})`;
  }
}

// Priority Queue implementation (Simple version using array)
class PriorityQueue {
  constructor(compareFn = (a, b) => a.priority - b.priority) {
    this.items = [];
    this.compare = compareFn;
  }

  /**
   * Add element with priority
   * @param {*} element - Element to add
   * @param {number} priority - Priority (lower number = higher priority)
   */
  enqueue(element, priority = 0) {
    const queueElement = { element, priority };

    // Find correct position based on priority
    let added = false;
    for (let i = 0; i < this.items.length; i++) {
      if (this.compare(queueElement, this.items[i]) < 0) {
        this.items.splice(i, 0, queueElement);
        added = true;
        break;
      }
    }

    if (!added) {
      this.items.push(queueElement);
    }

    return this.size();
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error("Priority queue is empty");
    }
    return this.items.shift().element;
  }

  front() {
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
    return this.items.map((item) => ({
      element: item.element,
      priority: item.priority
    }));
  }

  toString() {
    const elements = this.items.map(
      (item) => `${item.element}(${item.priority})`
    );
    return `PriorityQueue[${elements.join(", ")}]`;
  }
}

// Test cases and demonstrations
function testQueue() {
  console.log("=== Testing Basic Queue ===");

  const queue = new Queue();

  console.log("1. Basic Operations:");
  console.log(`Empty: ${queue.isEmpty()}`); // true
  console.log(`Size: ${queue.size()}`); // 0

  // Enqueue elements
  queue.enqueue(10);
  queue.enqueue(20);
  queue.enqueue(30);
  console.log(`After enqueuing 10, 20, 30: ${queue.toString()}`);
  console.log(`Front: ${queue.front()}`); // 10
  console.log(`Rear: ${queue.rear()}`); // 30
  console.log(`Size: ${queue.size()}`); // 3

  // Dequeue elements
  console.log(`Dequeued: ${queue.dequeue()}`); // 10
  console.log(`After dequeue: ${queue.toString()}`);
  console.log(`Front: ${queue.front()}`); // 20

  console.log("\n2. Array conversion:");
  console.log(`To Array: [${queue.toArray()}]`);

  console.log("\n3. Static method:");
  const queue2 = Queue.fromArray([1, 2, 3, 4, 5]);
  console.log(`From Array: ${queue2.toString()}`);

  console.log("\n=== Testing Linked List Queue ===");
  const linkedQueue = new QueueLinkedList();
  linkedQueue.enqueue("a");
  linkedQueue.enqueue("b");
  linkedQueue.enqueue("c");
  console.log(`Linked Queue: ${linkedQueue.toString()}`);
  console.log(`Dequeued: ${linkedQueue.dequeue()}`);
  console.log(`After dequeue: ${linkedQueue.toString()}`);

  console.log("\n=== Testing Circular Queue ===");
  const circularQueue = new CircularQueue(3);

  console.log("Adding elements to circular queue:");
  circularQueue.enqueue(1);
  circularQueue.enqueue(2);
  circularQueue.enqueue(3);
  console.log(`Full queue: ${circularQueue.toString()}`);
  console.log(`Is full: ${circularQueue.isFull()}`);

  console.log(`Dequeued: ${circularQueue.dequeue()}`);
  circularQueue.enqueue(4);
  console.log(`After dequeue and enqueue 4: ${circularQueue.toString()}`);

  console.log("\n=== Testing Priority Queue ===");
  const pq = new PriorityQueue();

  // Add elements with different priorities
  pq.enqueue("Low priority task", 3);
  pq.enqueue("High priority task", 1);
  pq.enqueue("Medium priority task", 2);
  pq.enqueue("Urgent task", 0);

  console.log(`Priority Queue: ${pq.toString()}`);

  console.log("Dequeuing by priority:");
  while (!pq.isEmpty()) {
    console.log(`Dequeued: ${pq.dequeue()}`);
  }
}

// Practical applications demonstration
function demonstrateApplications() {
  console.log("\n=== Practical Applications ===");

  // 1. BFS implementation
  function bfsTraversal(graph, start) {
    const visited = new Set();
    const queue = new Queue();
    const result = [];

    queue.enqueue(start);
    visited.add(start);

    while (!queue.isEmpty()) {
      const vertex = queue.dequeue();
      result.push(vertex);

      // Add all unvisited neighbors
      if (graph[vertex]) {
        for (let neighbor of graph[vertex]) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            queue.enqueue(neighbor);
          }
        }
      }
    }

    return result;
  }

  console.log("1. BFS Traversal:");
  const graph = {
    A: ["B", "C"],
    B: ["A", "D", "E"],
    C: ["A", "F"],
    D: ["B"],
    E: ["B", "F"],
    F: ["C", "E"]
  };
  console.log(`BFS from 'A': ${bfsTraversal(graph, "A")}`);

  // 2. Round Robin scheduling simulation
  class RoundRobinScheduler {
    constructor(timeQuantum) {
      this.queue = new Queue();
      this.timeQuantum = timeQuantum;
    }

    addProcess(process) {
      this.queue.enqueue(process);
    }

    execute() {
      console.log("\nRound Robin Execution:");
      let time = 0;

      while (!this.queue.isEmpty()) {
        const process = this.queue.dequeue();
        const executeTime = Math.min(process.remainingTime, this.timeQuantum);

        console.log(
          `Time ${time}: Executing ${process.name} for ${executeTime} units`
        );

        process.remainingTime -= executeTime;
        time += executeTime;

        if (process.remainingTime > 0) {
          this.queue.enqueue(process);
        } else {
          console.log(`Time ${time}: ${process.name} completed`);
        }
      }
    }
  }

  console.log("\n2. Round Robin Scheduling:");
  const scheduler = new RoundRobinScheduler(2);
  scheduler.addProcess({ name: "P1", remainingTime: 5 });
  scheduler.addProcess({ name: "P2", remainingTime: 3 });
  scheduler.addProcess({ name: "P3", remainingTime: 8 });
  scheduler.execute();

  // 3. Print queue simulation
  class PrintQueue {
    constructor() {
      this.queue = new PriorityQueue((a, b) => a.priority - b.priority);
    }

    addJob(document, priority) {
      this.queue.enqueue(document, priority);
      console.log(`Added: ${document} (priority: ${priority})`);
    }

    processJob() {
      if (!this.queue.isEmpty()) {
        const job = this.queue.dequeue();
        console.log(`Printing: ${job}`);
        return job;
      }
      console.log("No jobs in queue");
      return null;
    }

    showQueue() {
      console.log(`Current queue: ${this.queue.toString()}`);
    }
  }

  console.log("\n3. Print Queue:");
  const printer = new PrintQueue();
  printer.addJob("Regular Document", 3);
  printer.addJob("Urgent Report", 1);
  printer.addJob("Draft", 5);
  printer.addJob("Important Contract", 2);
  printer.showQueue();

  console.log("\nProcessing jobs:");
  while (!printer.queue.isEmpty()) {
    printer.processJob();
  }
}

// Performance comparison
function performanceTest() {
  console.log("\n=== Performance Test ===");

  const iterations = 50000;

  // Test array-based queue
  console.time("Array Queue");
  const arrayQueue = new Queue();
  for (let i = 0; i < iterations; i++) {
    arrayQueue.enqueue(i);
  }
  for (let i = 0; i < iterations; i++) {
    arrayQueue.dequeue();
  }
  console.timeEnd("Array Queue");

  // Test linked list queue
  console.time("Linked List Queue");
  const linkedQueue = new QueueLinkedList();
  for (let i = 0; i < iterations; i++) {
    linkedQueue.enqueue(i);
  }
  for (let i = 0; i < iterations; i++) {
    linkedQueue.dequeue();
  }
  console.timeEnd("Linked List Queue");

  // Test circular queue (smaller iteration due to capacity limit)
  console.time("Circular Queue");
  const circularQueue = new CircularQueue(1000);
  for (let i = 0; i < 1000; i++) {
    circularQueue.enqueue(i);
  }
  for (let i = 0; i < 1000; i++) {
    circularQueue.dequeue();
  }
  console.timeEnd("Circular Queue");
}

// Run all tests
console.log("Queue Implementation and Testing");
console.log("================================");

testQueue();
demonstrateApplications();
performanceTest();

module.exports = {
  Queue,
  QueueLinkedList,
  CircularQueue,
  PriorityQueue
};
