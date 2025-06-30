/**
 * 232. Implement Queue using Stacks
 * https://leetcode.com/problems/implement-queue-using-stacks/
 *
 * Difficulty: Easy
 * Topics: Stack, Design, Queue
 *
 * Implement a first in first out (FIFO) queue using only two stacks.
 * The implemented queue should support all the functions of a normal queue
 * (push, peek, pop, and empty).
 *
 * Implement the MyQueue class:
 * - MyQueue() Initializes the queue object.
 * - void push(int x) Pushes element x to the back of the queue.
 * - int pop() Removes the element from the front of the queue and returns it.
 * - int peek() Returns the element at the front of the queue.
 * - boolean empty() Returns true if the queue is empty, false otherwise.
 *
 * Notes:
 * - You must use only standard operations of a stack, which means only push to top,
 *   peek/pop from top, size, and is empty operations are valid.
 * - Depending on your language, the stack may not be supported natively.
 *   You may simulate a stack using a list or deque (double-ended queue) as long as
 *   you use only a stack's standard operations.
 *
 * Example 1:
 * Input:
 * ["MyQueue", "push", "push", "peek", "pop", "empty"]
 * [[], [1], [2], [], [], []]
 * Output:
 * [null, null, null, 1, 1, false]
 */

/**
 * APPROACH 1: Two Stacks with Lazy Transfer
 * Time Complexity:
 *   - push: O(1)
 *   - pop: O(1) amortized, O(n) worst case
 *   - peek: O(1) amortized, O(n) worst case
 *   - empty: O(1)
 * Space Complexity: O(n) - for the two stacks
 *
 * Algorithm:
 * 1. Use input stack for push operations
 * 2. Use output stack for pop/peek operations
 * 3. Transfer elements from input to output only when output is empty
 * 4. This ensures amortized O(1) performance for all operations
 */
class MyQueueLazyTransfer {
  constructor() {
    this.inputStack = []; // For push operations
    this.outputStack = []; // For pop/peek operations
  }

  /**
   * Push element to the back of queue
   * @param {number} x
   */
  push(x) {
    this.inputStack.push(x);
  }

  /**
   * Remove element from front of queue and return it
   * @return {number}
   */
  pop() {
    this._transferIfNeeded();
    return this.outputStack.pop();
  }

  /**
   * Get the front element without removing it
   * @return {number}
   */
  peek() {
    this._transferIfNeeded();
    return this.outputStack[this.outputStack.length - 1];
  }

  /**
   * Check if queue is empty
   * @return {boolean}
   */
  empty() {
    return this.inputStack.length === 0 && this.outputStack.length === 0;
  }

  /**
   * Transfer all elements from input to output stack if output is empty
   * @private
   */
  _transferIfNeeded() {
    if (this.outputStack.length === 0) {
      while (this.inputStack.length > 0) {
        this.outputStack.push(this.inputStack.pop());
      }
    }
  }

  /**
   * Get current size of queue
   * @return {number}
   */
  size() {
    return this.inputStack.length + this.outputStack.length;
  }

  /**
   * Get array representation of queue from front to back
   * @return {number[]}
   */
  toArray() {
    const result = [];

    // Output stack elements (in reverse order)
    for (let i = this.outputStack.length - 1; i >= 0; i--) {
      result.push(this.outputStack[i]);
    }

    // Input stack elements (in order)
    for (let i = 0; i < this.inputStack.length; i++) {
      result.push(this.inputStack[i]);
    }

    return result;
  }
}

/**
 * APPROACH 2: Two Stacks with Eager Transfer
 * Time Complexity:
 *   - push: O(n) - transfer all elements for each push
 *   - pop: O(1)
 *   - peek: O(1)
 *   - empty: O(1)
 * Space Complexity: O(n)
 *
 * Algorithm:
 * 1. Always keep elements in correct order in main stack
 * 2. Use auxiliary stack for temporary storage during push
 * 3. Transfer all elements to aux, push new element, transfer back
 */
class MyQueueEagerTransfer {
  constructor() {
    this.mainStack = []; // Keeps elements in queue order
    this.auxStack = []; // Temporary storage
  }

  push(x) {
    // Transfer all elements to aux stack
    while (this.mainStack.length > 0) {
      this.auxStack.push(this.mainStack.pop());
    }

    // Push new element to main stack
    this.mainStack.push(x);

    // Transfer all elements back to main stack
    while (this.auxStack.length > 0) {
      this.mainStack.push(this.auxStack.pop());
    }
  }

  pop() {
    if (this.empty()) return undefined;
    return this.mainStack.pop();
  }

  peek() {
    if (this.empty()) return undefined;
    return this.mainStack[this.mainStack.length - 1];
  }

  empty() {
    return this.mainStack.length === 0;
  }

  size() {
    return this.mainStack.length;
  }

  toArray() {
    return [...this.mainStack].reverse();
  }
}

/**
 * APPROACH 3: Single Stack with Recursion
 * Time Complexity:
 *   - push: O(n) - recursive calls for each element
 *   - pop: O(n) - recursive calls to maintain order
 *   - peek: O(n)
 *   - empty: O(1)
 * Space Complexity: O(n) - recursion call stack
 *
 * Algorithm:
 * 1. Use recursion to maintain FIFO order with single stack
 * 2. For push: recursively pop elements, push new element, push back
 * 3. For pop: recursively maintain order
 */
class MyQueueRecursive {
  constructor() {
    this.stack = [];
  }

  push(x) {
    this._pushRecursive(x);
  }

  _pushRecursive(x) {
    if (this.stack.length === 0) {
      this.stack.push(x);
      return;
    }

    const temp = this.stack.pop();
    this._pushRecursive(x);
    this.stack.push(temp);
  }

  pop() {
    if (this.empty()) return undefined;
    return this.stack.pop();
  }

  peek() {
    if (this.empty()) return undefined;
    return this.stack[this.stack.length - 1];
  }

  empty() {
    return this.stack.length === 0;
  }

  size() {
    return this.stack.length;
  }

  toArray() {
    return [...this.stack].reverse();
  }
}

/**
 * APPROACH 4: Array Simulation (Not using real stacks)
 * Time Complexity: O(1) for all operations
 * Space Complexity: O(n)
 *
 * This is more of a queue implementation rather than using stacks
 */
class MyQueueArray {
  constructor() {
    this.items = [];
    this.front = 0; // Index of front element
  }

  push(x) {
    this.items.push(x);
  }

  pop() {
    if (this.empty()) return undefined;
    const item = this.items[this.front];
    this.front++;

    // Reset array if it becomes too sparse
    if (this.front > this.items.length / 2) {
      this.items = this.items.slice(this.front);
      this.front = 0;
    }

    return item;
  }

  peek() {
    if (this.empty()) return undefined;
    return this.items[this.front];
  }

  empty() {
    return this.front >= this.items.length;
  }

  size() {
    return this.items.length - this.front;
  }

  toArray() {
    return this.items.slice(this.front);
  }
}

// Default implementation (most commonly used)
const MyQueue = MyQueueLazyTransfer;

// ============================================================================
// TESTING
// ============================================================================

function testMyQueue() {
  console.log("Testing Queue Implementation using Stacks...\n");

  const implementations = [
    { name: "Lazy Transfer", class: MyQueueLazyTransfer },
    { name: "Eager Transfer", class: MyQueueEagerTransfer },
    { name: "Recursive", class: MyQueueRecursive },
    { name: "Array Simulation", class: MyQueueArray }
  ];

  implementations.forEach((impl) => {
    console.log(`=== Testing ${impl.name} Implementation ===`);

    const queue = new impl.class();

    try {
      // Test example from problem
      console.log("Operations: push(1), push(2), peek(), pop(), empty()");

      queue.push(1);
      console.log(`push(1) - Queue: [${queue.toArray().join(", ")}]`);

      queue.push(2);
      console.log(`push(2) - Queue: [${queue.toArray().join(", ")}]`);

      const peekResult = queue.peek();
      console.log(
        `peek() returns: ${peekResult} - Queue: [${queue.toArray().join(", ")}]`
      );

      const popResult = queue.pop();
      console.log(
        `pop() returns: ${popResult} - Queue: [${queue.toArray().join(", ")}]`
      );

      const emptyResult = queue.empty();
      console.log(`empty() returns: ${emptyResult}`);

      console.log("Test PASSED\n");
    } catch (error) {
      console.log("Test FAILED:", error.message);
    }
  });
}

function testComplexOperations() {
  console.log("Testing Complex Operation Sequences...\n");

  const queue = new MyQueue();

  const operations = [
    { op: "push", val: 1 },
    { op: "push", val: 2 },
    { op: "push", val: 3 },
    { op: "peek", expected: 1 },
    { op: "pop", expected: 1 },
    { op: "push", val: 4 },
    { op: "peek", expected: 2 },
    { op: "pop", expected: 2 },
    { op: "pop", expected: 3 },
    { op: "push", val: 5 },
    { op: "pop", expected: 4 },
    { op: "empty", expected: false },
    { op: "pop", expected: 5 },
    { op: "empty", expected: true }
  ];

  console.log("Complex operation sequence:");
  operations.forEach((operation, index) => {
    let result;

    switch (operation.op) {
      case "push":
        queue.push(operation.val);
        console.log(
          `${index + 1}. push(${operation.val}) - Queue: [${queue
            .toArray()
            .join(", ")}]`
        );
        break;
      case "pop":
        result = queue.pop();
        const popPassed = result === operation.expected;
        console.log(
          `${index + 1}. pop() = ${result} (expected: ${
            operation.expected
          }) - ${popPassed ? "PASS" : "FAIL"}`
        );
        console.log(`   Queue after pop: [${queue.toArray().join(", ")}]`);
        break;
      case "peek":
        result = queue.peek();
        const peekPassed = result === operation.expected;
        console.log(
          `${index + 1}. peek() = ${result} (expected: ${
            operation.expected
          }) - ${peekPassed ? "PASS" : "FAIL"}`
        );
        break;
      case "empty":
        result = queue.empty();
        const emptyPassed = result === operation.expected;
        console.log(
          `${index + 1}. empty() = ${result} (expected: ${
            operation.expected
          }) - ${emptyPassed ? "PASS" : "FAIL"}`
        );
        break;
    }
  });
}

function testPerformance() {
  console.log("Performance Comparison...\n");

  const implementations = [
    { name: "Lazy Transfer", class: MyQueueLazyTransfer },
    { name: "Eager Transfer", class: MyQueueEagerTransfer },
    { name: "Array Simulation", class: MyQueueArray }
  ];

  const numOperations = 10000;

  implementations.forEach((impl) => {
    const queue = new impl.class();

    // Mixed operations performance test
    const start = performance.now();

    // Push half the elements
    for (let i = 0; i < numOperations / 2; i++) {
      queue.push(i);
    }

    // Interleave push and pop operations
    for (let i = 0; i < numOperations / 2; i++) {
      if (i % 2 === 0) {
        queue.push(i + numOperations / 2);
      } else {
        queue.pop();
      }
    }

    // Pop remaining elements
    while (!queue.empty()) {
      queue.pop();
    }

    const end = performance.now();

    console.log(
      `${impl.name}: ${(end - start).toFixed(
        2
      )}ms for ${numOperations} mixed operations`
    );
  });
}

function testEdgeCases() {
  console.log("Testing Edge Cases...\n");

  const queue = new MyQueue();

  console.log("=== Testing Empty Queue Operations ===");
  console.log("empty() on new queue:", queue.empty());
  console.log("peek() on empty queue:", queue.peek());
  console.log("pop() on empty queue:", queue.pop());

  console.log("\n=== Testing Single Element ===");
  queue.push(42);
  console.log("push(42), then peek():", queue.peek());
  console.log("pop():", queue.pop());
  console.log("empty() after pop:", queue.empty());

  console.log("\n=== Testing Alternating Push/Pop ===");
  for (let i = 1; i <= 5; i++) {
    queue.push(i);
    console.log(`push(${i}), queue: [${queue.toArray().join(", ")}]`);
    const popped = queue.pop();
    console.log(
      `pop() returns ${popped}, queue: [${queue.toArray().join(", ")}]`
    );
  }

  console.log("\n=== Testing Large Sequence ===");
  // Push many elements
  for (let i = 1; i <= 100; i++) {
    queue.push(i);
  }
  console.log(`Pushed 1-100, queue size: ${queue.size()}`);

  // Pop all elements
  const poppedElements = [];
  while (!queue.empty()) {
    poppedElements.push(queue.pop());
  }
  console.log(
    `Popped elements: [${poppedElements
      .slice(0, 10)
      .join(", ")}...${poppedElements.slice(-5).join(", ")}]`
  );
  console.log(
    `First few elements in order: ${
      poppedElements.slice(0, 10).every((val, idx) => val === idx + 1)
        ? "CORRECT"
        : "INCORRECT"
    }`
  );
}

function demonstrateStackTransfer() {
  console.log("Demonstrating Stack Transfer Mechanism...\n");

  class DebugQueue extends MyQueueLazyTransfer {
    push(x) {
      console.log(`\nPUSH(${x}):`);
      super.push(x);
      console.log(`  Input Stack: [${this.inputStack.join(", ")}]`);
      console.log(`  Output Stack: [${this.outputStack.join(", ")}]`);
    }

    pop() {
      console.log(`\nPOP():`);
      console.log(
        `  Before - Input: [${this.inputStack.join(
          ", "
        )}], Output: [${this.outputStack.join(", ")}]`
      );
      const result = super.pop();
      console.log(
        `  After - Input: [${this.inputStack.join(
          ", "
        )}], Output: [${this.outputStack.join(", ")}]`
      );
      console.log(`  Returned: ${result}`);
      return result;
    }

    peek() {
      console.log(`\nPEEK():`);
      console.log(
        `  Before - Input: [${this.inputStack.join(
          ", "
        )}], Output: [${this.outputStack.join(", ")}]`
      );
      const result = super.peek();
      console.log(
        `  After - Input: [${this.inputStack.join(
          ", "
        )}], Output: [${this.outputStack.join(", ")}]`
      );
      console.log(`  Returned: ${result}`);
      return result;
    }
  }

  const debugQueue = new DebugQueue();

  console.log("Demonstrating lazy transfer with debug output:");
  debugQueue.push(1);
  debugQueue.push(2);
  debugQueue.push(3);
  debugQueue.peek(); // This will trigger transfer
  debugQueue.pop();
  debugQueue.push(4);
  debugQueue.pop();
  debugQueue.pop();
}

// Uncomment to run tests
// testMyQueue();
// testComplexOperations();
// testPerformance();
// testEdgeCases();
// demonstrateStackTransfer();

module.exports = {
  MyQueue,
  MyQueueLazyTransfer,
  MyQueueEagerTransfer,
  MyQueueRecursive,
  MyQueueArray
};
