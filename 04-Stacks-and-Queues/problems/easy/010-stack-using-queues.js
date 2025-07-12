/**
 * 225. Implement Stack using Queues
 * https://leetcode.com/problems/implement-stack-using-queues/
 *
 * Difficulty: Easy
 * Topics: Stack, Design, Queue
 *
 * Implement a last-in-first-out (LIFO) stack using only two queues.
 * The implemented stack should support all the functions of a normal stack
 * (push, top, pop, and empty).
 *
 * Example:
 * Input: ["MyStack", "push", "push", "top", "pop", "empty"]
 *        [[], [1], [2], [], [], []]
 * Output: [null, null, null, 2, 2, false]
 */

/**
 * APPROACH 1: Two Queues - Push Heavy
 *
 * Push: O(n) - move all elements to make new element at front
 * Pop: O(1) - just dequeue from main queue
 *
 * Time: Push O(n), Pop O(1), Top O(1), Empty O(1)
 * Space: O(n)
 */
class MyStack {
  constructor() {
    this.queue1 = [];
    this.queue2 = [];
  }

  push(x) {
    // Add new element to queue2
    this.queue2.push(x);

    // Move all elements from queue1 to queue2
    while (this.queue1.length > 0) {
      this.queue2.push(this.queue1.shift());
    }

    // Swap queues
    [this.queue1, this.queue2] = [this.queue2, this.queue1];
  }

  pop() {
    return this.queue1.shift();
  }

  top() {
    return this.queue1[0];
  }

  empty() {
    return this.queue1.length === 0;
  }
}

/**
 * APPROACH 2: Two Queues - Pop Heavy
 *
 * Push: O(1) - just enqueue to main queue
 * Pop: O(n) - move all but last element to temp queue
 *
 * Time: Push O(1), Pop O(n), Top O(n), Empty O(1)
 * Space: O(n)
 */
class MyStackPopHeavy {
  constructor() {
    this.queue1 = [];
    this.queue2 = [];
  }

  push(x) {
    this.queue1.push(x);
  }

  pop() {
    // Move all but last element to queue2
    while (this.queue1.length > 1) {
      this.queue2.push(this.queue1.shift());
    }

    const result = this.queue1.shift();

    // Swap queues
    [this.queue1, this.queue2] = [this.queue2, this.queue1];

    return result;
  }

  top() {
    // Move all but last element to queue2
    while (this.queue1.length > 1) {
      this.queue2.push(this.queue1.shift());
    }

    const result = this.queue1[0];
    this.queue2.push(this.queue1.shift());

    // Swap queues
    [this.queue1, this.queue2] = [this.queue2, this.queue1];

    return result;
  }

  empty() {
    return this.queue1.length === 0;
  }
}

/**
 * APPROACH 3: Single Queue
 *
 * Use only one queue, rotate elements during push to maintain LIFO order
 *
 * Time: Push O(n), Pop O(1), Top O(1), Empty O(1)
 * Space: O(n)
 */
class MyStackSingleQueue {
  constructor() {
    this.queue = [];
  }

  push(x) {
    const size = this.queue.length;
    this.queue.push(x);

    // Rotate queue to bring new element to front
    for (let i = 0; i < size; i++) {
      this.queue.push(this.queue.shift());
    }
  }

  pop() {
    return this.queue.shift();
  }

  top() {
    return this.queue[0];
  }

  empty() {
    return this.queue.length === 0;
  }
}

// Test cases
function testStackUsingQueues() {
  console.log("=== Testing Stack using Queues ===");

  // Test with push-heavy approach
  console.log("\nTesting Push-Heavy Approach:");
  const stack1 = new MyStack();

  console.log("Push 1, 2, 3");
  stack1.push(1);
  stack1.push(2);
  stack1.push(3);

  console.log("Top:", stack1.top()); // Should be 3
  console.log("Pop:", stack1.pop()); // Should be 3
  console.log("Top:", stack1.top()); // Should be 2
  console.log("Pop:", stack1.pop()); // Should be 2
  console.log("Empty:", stack1.empty()); // Should be false
  console.log("Pop:", stack1.pop()); // Should be 1
  console.log("Empty:", stack1.empty()); // Should be true

  // Test with single queue approach
  console.log("\nTesting Single Queue Approach:");
  const stack2 = new MyStackSingleQueue();

  console.log("Push 10, 20, 30");
  stack2.push(10);
  stack2.push(20);
  stack2.push(30);

  console.log("Top:", stack2.top()); // Should be 30
  console.log("Pop:", stack2.pop()); // Should be 30
  console.log("Top:", stack2.top()); // Should be 20
  console.log("Empty:", stack2.empty()); // Should be false
}

// Uncomment to run tests
// testStackUsingQueues();

/**
 * KEY INSIGHTS:
 *
 * 1. Queue vs Stack Conversion:
 *    - Queue: FIFO (First In, First Out)
 *    - Stack: LIFO (Last In, First Out)
 *    - Need to reverse the order somehow
 *
 * 2. Trade-offs:
 *    - Push Heavy: Fast pop/top, slow push
 *    - Pop Heavy: Fast push, slow pop/top
 *    - Choose based on usage pattern
 *
 * 3. Implementation Strategies:
 *    - Two queues: Use one as temporary storage
 *    - Single queue: Rotate elements after push
 *
 * 4. Queue Operations in JavaScript:
 *    - push(): Add to end (enqueue)
 *    - shift(): Remove from front (dequeue)
 *    - unshift(): Add to front
 *    - pop(): Remove from end
 *
 * 5. Similar Problems:
 *    - Implement Queue using Stacks (232)
 *    - Design Circular Queue (622)
 *    - Design Circular Deque (641)
 */

module.exports = {
  MyStack,
  MyStackPopHeavy,
  MyStackSingleQueue
};
