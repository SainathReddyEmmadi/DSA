/**
 * 155. Min Stack (Alternative implementation showing stack using array)
 * 622. Design Circular Queue
 * https://leetcode.com/problems/design-circular-queue/
 *
 * Design your implementation of the circular queue. The circular queue is a linear data structure
 * where the operations are performed based on FIFO principle and the last position is connected
 * back to the first position to make a circle.
 *
 * Patterns: Queue, Circular Buffer, Array
 * Time: O(1) for all operations, Space: O(k)
 */

// Approach 1: Using Array with Front and Rear pointers
class MyCircularQueue {
  constructor(k) {
    this.queue = new Array(k);
    this.capacity = k;
    this.front = 0;
    this.size = 0;
  }

  // Insert an element into the circular queue
  // Time: O(1), Space: O(1)
  enQueue(value) {
    if (this.isFull()) {
      return false;
    }

    const rear = (this.front + this.size) % this.capacity;
    this.queue[rear] = value;
    this.size++;
    return true;
  }

  // Delete an element from the circular queue
  // Time: O(1), Space: O(1)
  deQueue() {
    if (this.isEmpty()) {
      return false;
    }

    this.front = (this.front + 1) % this.capacity;
    this.size--;
    return true;
  }

  // Get the front item from the queue
  // Time: O(1), Space: O(1)
  Front() {
    if (this.isEmpty()) {
      return -1;
    }
    return this.queue[this.front];
  }

  // Get the last item from the queue
  // Time: O(1), Space: O(1)
  Rear() {
    if (this.isEmpty()) {
      return -1;
    }
    const rear = (this.front + this.size - 1) % this.capacity;
    return this.queue[rear];
  }

  // Check whether the circular queue is empty
  // Time: O(1), Space: O(1)
  isEmpty() {
    return this.size === 0;
  }

  // Check whether the circular queue is full
  // Time: O(1), Space: O(1)
  isFull() {
    return this.size === this.capacity;
  }
}

// Approach 2: Using Array with Front and Rear indices (Alternative)
class MyCircularQueueAlt {
  constructor(k) {
    this.queue = new Array(k + 1); // Extra space to distinguish full/empty
    this.capacity = k + 1;
    this.front = 0;
    this.rear = 0;
  }

  enQueue(value) {
    if (this.isFull()) {
      return false;
    }

    this.queue[this.rear] = value;
    this.rear = (this.rear + 1) % this.capacity;
    return true;
  }

  deQueue() {
    if (this.isEmpty()) {
      return false;
    }

    this.front = (this.front + 1) % this.capacity;
    return true;
  }

  Front() {
    if (this.isEmpty()) {
      return -1;
    }
    return this.queue[this.front];
  }

  Rear() {
    if (this.isEmpty()) {
      return -1;
    }
    const rearIndex = (this.rear - 1 + this.capacity) % this.capacity;
    return this.queue[rearIndex];
  }

  isEmpty() {
    return this.front === this.rear;
  }

  isFull() {
    return (this.rear + 1) % this.capacity === this.front;
  }
}

// Approach 3: Using Linked List (Space efficient for sparse usage)
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class MyCircularQueueLinkedList {
  constructor(k) {
    this.capacity = k;
    this.size = 0;
    this.head = null;
    this.tail = null;
  }

  enQueue(value) {
    if (this.isFull()) {
      return false;
    }

    const newNode = new Node(value);

    if (this.isEmpty()) {
      this.head = this.tail = newNode;
      newNode.next = newNode; // Point to itself
    } else {
      newNode.next = this.head;
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.size++;
    return true;
  }

  deQueue() {
    if (this.isEmpty()) {
      return false;
    }

    if (this.size === 1) {
      this.head = this.tail = null;
    } else {
      this.tail.next = this.head.next;
      this.head = this.head.next;
    }

    this.size--;
    return true;
  }

  Front() {
    if (this.isEmpty()) {
      return -1;
    }
    return this.head.val;
  }

  Rear() {
    if (this.isEmpty()) {
      return -1;
    }
    return this.tail.val;
  }

  isEmpty() {
    return this.size === 0;
  }

  isFull() {
    return this.size === this.capacity;
  }
}

// Test cases
function testCircularQueue() {
  console.log("Testing Circular Queue:");

  // Test basic operations
  const queue = new MyCircularQueue(3);

  console.log("Test 1: Basic Operations");
  console.log(`enQueue(1): ${queue.enQueue(1)}`); // true
  console.log(`enQueue(2): ${queue.enQueue(2)}`); // true
  console.log(`enQueue(3): ${queue.enQueue(3)}`); // true
  console.log(`enQueue(4): ${queue.enQueue(4)}`); // false (full)
  console.log(`Rear(): ${queue.Rear()}`); // 3
  console.log(`isFull(): ${queue.isFull()}`); // true
  console.log(`deQueue(): ${queue.deQueue()}`); // true
  console.log(`enQueue(4): ${queue.enQueue(4)}`); // true
  console.log(`Rear(): ${queue.Rear()}`); // 4
  console.log();

  // Test edge cases
  const queue2 = new MyCircularQueue(2);
  console.log("Test 2: Edge Cases");
  console.log(`isEmpty(): ${queue2.isEmpty()}`); // true
  console.log(`Front(): ${queue2.Front()}`); // -1
  console.log(`Rear(): ${queue2.Rear()}`); // -1
  console.log(`deQueue(): ${queue2.deQueue()}`); // false
  console.log(`enQueue(1): ${queue2.enQueue(1)}`); // true
  console.log(`Front(): ${queue2.Front()}`); // 1
  console.log(`Rear(): ${queue2.Rear()}`); // 1
  console.log();

  // Test alternative implementation
  const queue3 = new MyCircularQueueAlt(3);
  console.log("Test 3: Alternative Implementation");
  console.log(`enQueue(1): ${queue3.enQueue(1)}`); // true
  console.log(`enQueue(2): ${queue3.enQueue(2)}`); // true
  console.log(`Front(): ${queue3.Front()}`); // 1
  console.log(`Rear(): ${queue3.Rear()}`); // 2
  console.log(`deQueue(): ${queue3.deQueue()}`); // true
  console.log(`Front(): ${queue3.Front()}`); // 2
  console.log();

  // Test linked list implementation
  const queue4 = new MyCircularQueueLinkedList(2);
  console.log("Test 4: Linked List Implementation");
  console.log(`enQueue(1): ${queue4.enQueue(1)}`); // true
  console.log(`enQueue(2): ${queue4.enQueue(2)}`); // true
  console.log(`enQueue(3): ${queue4.enQueue(3)}`); // false
  console.log(`Front(): ${queue4.Front()}`); // 1
  console.log(`Rear(): ${queue4.Rear()}`); // 2
  console.log(`deQueue(): ${queue4.deQueue()}`); // true
  console.log(`Front(): ${queue4.Front()}`); // 2
  console.log(`enQueue(3): ${queue4.enQueue(3)}`); // true
  console.log(`Rear(): ${queue4.Rear()}`); // 3
}

// Complexity Analysis
console.log(`
Complexity Analysis:
1. Array Implementation (Size Counter):
   - Time: O(1) for all operations
   - Space: O(k) where k is capacity
   - Uses size counter to distinguish full/empty

2. Array Implementation (Extra Space):
   - Time: O(1) for all operations
   - Space: O(k+1) where k is capacity
   - Uses extra space to distinguish full/empty

3. Linked List Implementation:
   - Time: O(1) for all operations
   - Space: O(k) for actual elements only
   - More memory efficient for sparse usage

Key Insights:
- Circular queue reuses space efficiently
- Modular arithmetic handles wraparound
- Need strategy to distinguish full vs empty state
- Array approach: use size counter or waste one slot
- Linked list approach: more flexible but extra overhead
`);

// Run tests
testCircularQueue();

module.exports = {
  MyCircularQueue,
  MyCircularQueueAlt,
  MyCircularQueueLinkedList
};
