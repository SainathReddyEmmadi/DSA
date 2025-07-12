/**
 * 155. Min Stack
 * https://leetcode.com/problems/min-stack/
 *
 * Difficulty: Medium
 * Topics: Stack, Design
 *
 * Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.
 *
 * Implement the MinStack class:
 * - MinStack() initializes the stack object.
 * - void push(int val) pushes the element val onto the stack.
 * - void pop() removes the element on the top of the stack.
 * - int top() gets the top element of the stack.
 * - int getMin() retrieves the minimum element in the stack.
 *
 * You must implement a solution with O(1) time complexity for each function.
 *
 * Example 1:
 * Input:
 * ["MinStack","push","push","push","getMin","pop","top","getMin"]
 * [[],[-2],[0],[-3],[],[],[],[]]
 *
 * Output:
 * [null,null,null,null,-3,null,0,-2]
 */

/**
 * APPROACH 1: Two Stacks (Auxiliary Min Stack)
 * Time Complexity: O(1) for all operations
 * Space Complexity: O(n) - worst case stores all elements in min stack
 *
 * Algorithm:
 * 1. Use main stack for all elements
 * 2. Use auxiliary min stack to track minimums
 * 3. Push to min stack only when new minimum is found
 * 4. Pop from min stack when current minimum is removed
 */
class MinStackTwoStacks {
  constructor() {
    this.stack = [];
    this.minStack = [];
  }

  /**
   * Push element onto stack
   * @param {number} val
   */
  push(val) {
    this.stack.push(val);

    // Push to min stack if it's empty or val is new minimum
    if (
      this.minStack.length === 0 ||
      val <= this.minStack[this.minStack.length - 1]
    ) {
      this.minStack.push(val);
    }
  }

  /**
   * Remove top element
   */
  pop() {
    if (this.stack.length === 0) return;

    const popped = this.stack.pop();

    // Remove from min stack if it was the minimum
    if (popped === this.minStack[this.minStack.length - 1]) {
      this.minStack.pop();
    }
  }

  /**
   * Get top element
   * @return {number}
   */
  top() {
    if (this.stack.length === 0) throw new Error("Stack is empty");
    return this.stack[this.stack.length - 1];
  }

  /**
   * Get minimum element
   * @return {number}
   */
  getMin() {
    if (this.minStack.length === 0) throw new Error("Stack is empty");
    return this.minStack[this.minStack.length - 1];
  }

  /**
   * Check if stack is empty
   * @return {boolean}
   */
  isEmpty() {
    return this.stack.length === 0;
  }

  /**
   * Get current size
   * @return {number}
   */
  size() {
    return this.stack.length;
  }
}

/**
 * APPROACH 2: Single Stack with Pairs
 * Time Complexity: O(1) for all operations
 * Space Complexity: O(n) - stores pairs [value, currentMin]
 *
 * Algorithm:
 * 1. Store each element as [value, currentMinimum] pair
 * 2. Current minimum is calculated during push
 * 3. Always available from top element's pair
 */
class MinStackPairs {
  constructor() {
    this.stack = []; // Store [value, currentMin] pairs
  }

  push(val) {
    const currentMin =
      this.stack.length === 0
        ? val
        : Math.min(val, this.stack[this.stack.length - 1][1]);

    this.stack.push([val, currentMin]);
  }

  pop() {
    if (this.stack.length === 0) return;
    this.stack.pop();
  }

  top() {
    if (this.stack.length === 0) throw new Error("Stack is empty");
    return this.stack[this.stack.length - 1][0];
  }

  getMin() {
    if (this.stack.length === 0) throw new Error("Stack is empty");
    return this.stack[this.stack.length - 1][1];
  }

  isEmpty() {
    return this.stack.length === 0;
  }

  size() {
    return this.stack.length;
  }
}

/**
 * APPROACH 3: Single Stack with Difference Encoding
 * Time Complexity: O(1) for all operations
 * Space Complexity: O(n) - more space efficient
 *
 * Algorithm:
 * 1. Store differences from current minimum
 * 2. When difference is negative, it indicates new minimum
 * 3. Decode actual values during pop/top operations
 */
class MinStackDifference {
  constructor() {
    this.stack = [];
    this.min = null;
  }

  push(val) {
    if (this.stack.length === 0) {
      this.stack.push(0);
      this.min = val;
    } else {
      const diff = val - this.min;
      this.stack.push(diff);

      if (diff < 0) {
        // New minimum found
        this.min = val;
      }
    }
  }

  pop() {
    if (this.stack.length === 0) return;

    const diff = this.stack.pop();

    if (diff < 0) {
      // Restore previous minimum
      this.min = this.min - diff;
    }
  }

  top() {
    if (this.stack.length === 0) throw new Error("Stack is empty");

    const diff = this.stack[this.stack.length - 1];
    return diff < 0 ? this.min : this.min + diff;
  }

  getMin() {
    if (this.stack.length === 0) throw new Error("Stack is empty");
    return this.min;
  }

  isEmpty() {
    return this.stack.length === 0;
  }

  size() {
    return this.stack.length;
  }
}

/**
 * APPROACH 4: Linked List Implementation
 * Time Complexity: O(1) for all operations
 * Space Complexity: O(n)
 *
 * Each node stores value and minimum up to that point
 */
class MinStackNode {
  constructor(val, min, next = null) {
    this.val = val;
    this.min = min;
    this.next = next;
  }
}

class MinStackLinkedList {
  constructor() {
    this.head = null;
  }

  push(val) {
    const currentMin = this.head === null ? val : Math.min(val, this.head.min);
    this.head = new MinStackNode(val, currentMin, this.head);
  }

  pop() {
    if (this.head === null) return;
    this.head = this.head.next;
  }

  top() {
    if (this.head === null) throw new Error("Stack is empty");
    return this.head.val;
  }

  getMin() {
    if (this.head === null) throw new Error("Stack is empty");
    return this.head.min;
  }

  isEmpty() {
    return this.head === null;
  }

  size() {
    let count = 0;
    let current = this.head;
    while (current) {
      count++;
      current = current.next;
    }
    return count;
  }
}

// Default implementation
const MinStack = MinStackTwoStacks;

// ============================================================================
// TESTING
// ============================================================================

function testMinStack() {
  console.log("Testing Min Stack...\n");

  const implementations = [
    { name: "Two Stacks", class: MinStackTwoStacks },
    { name: "Pairs", class: MinStackPairs },
    { name: "Difference", class: MinStackDifference },
    { name: "Linked List", class: MinStackLinkedList }
  ];

  implementations.forEach((impl) => {
    console.log(`=== Testing ${impl.name} Implementation ===`);

    const minStack = new impl.class();

    try {
      // Test case from problem description
      console.log(
        "Operations: push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()"
      );

      minStack.push(-2);
      console.log(
        "push(-2) - Stack state: top=" +
          minStack.top() +
          ", min=" +
          minStack.getMin()
      );

      minStack.push(0);
      console.log(
        "push(0) - Stack state: top=" +
          minStack.top() +
          ", min=" +
          minStack.getMin()
      );

      minStack.push(-3);
      console.log(
        "push(-3) - Stack state: top=" +
          minStack.top() +
          ", min=" +
          minStack.getMin()
      );

      console.log("getMin() returns:", minStack.getMin()); // Should return -3

      minStack.pop();
      console.log(
        "pop() - Stack state: top=" +
          minStack.top() +
          ", min=" +
          minStack.getMin()
      );

      console.log("top() returns:", minStack.top()); // Should return 0
      console.log("getMin() returns:", minStack.getMin()); // Should return -2

      console.log("Test PASSED\n");
    } catch (error) {
      console.log("Test FAILED:", error.message);
    }
  });
}

function testEdgeCases() {
  console.log("Testing Edge Cases...\n");

  const minStack = new MinStack();

  // Test duplicate minimums
  console.log("=== Testing Duplicate Minimums ===");
  minStack.push(1);
  minStack.push(1);
  minStack.push(1);
  console.log("After pushing 1, 1, 1 - min:", minStack.getMin());

  minStack.pop();
  console.log("After one pop - min:", minStack.getMin());

  minStack.pop();
  console.log("After second pop - min:", minStack.getMin());

  // Test ascending order
  console.log("\n=== Testing Ascending Order ===");
  const ascStack = new MinStack();
  ascStack.push(1);
  ascStack.push(2);
  ascStack.push(3);
  console.log("Ascending 1,2,3 - min:", ascStack.getMin());

  // Test descending order
  console.log("\n=== Testing Descending Order ===");
  const descStack = new MinStack();
  descStack.push(3);
  descStack.push(2);
  descStack.push(1);
  console.log("Descending 3,2,1 - min:", descStack.getMin());

  descStack.pop();
  console.log("After popping 1 - min:", descStack.getMin());
}

function testPerformance() {
  console.log("Performance Test...\n");

  const implementations = [
    { name: "Two Stacks", class: MinStackTwoStacks },
    { name: "Pairs", class: MinStackPairs },
    { name: "Difference", class: MinStackDifference }
  ];

  const numOperations = 100000;

  implementations.forEach((impl) => {
    const stack = new impl.class();

    // Test push performance
    const pushStart = performance.now();
    for (let i = 0; i < numOperations; i++) {
      stack.push(Math.floor(Math.random() * 1000));
    }
    const pushEnd = performance.now();

    // Test getMin performance
    const minStart = performance.now();
    for (let i = 0; i < numOperations; i++) {
      stack.getMin();
    }
    const minEnd = performance.now();

    // Test pop performance
    const popStart = performance.now();
    for (let i = 0; i < numOperations; i++) {
      stack.pop();
    }
    const popEnd = performance.now();

    console.log(`${impl.name}:`);
    console.log(
      `  Push ${numOperations} elements: ${(pushEnd - pushStart).toFixed(2)}ms`
    );
    console.log(
      `  GetMin ${numOperations} times: ${(minEnd - minStart).toFixed(2)}ms`
    );
    console.log(
      `  Pop ${numOperations} elements: ${(popEnd - popStart).toFixed(2)}ms`
    );
    console.log();
  });
}

function testComplexScenario() {
  console.log("Complex Scenario Test...\n");

  const minStack = new MinStack();

  const operations = [
    { op: "push", val: 5 },
    { op: "push", val: 2 },
    { op: "push", val: 8 },
    { op: "push", val: 1 },
    { op: "getMin", expected: 1 },
    { op: "pop" },
    { op: "getMin", expected: 2 },
    { op: "push", val: 0 },
    { op: "getMin", expected: 0 },
    { op: "pop" },
    { op: "pop" },
    { op: "getMin", expected: 2 }
  ];

  console.log("Complex operation sequence:");
  operations.forEach((operation, index) => {
    switch (operation.op) {
      case "push":
        minStack.push(operation.val);
        console.log(
          `${index + 1}. push(${operation.val}) - min: ${minStack.getMin()}`
        );
        break;
      case "pop":
        minStack.pop();
        console.log(
          `${index + 1}. pop() - min: ${
            minStack.isEmpty() ? "empty" : minStack.getMin()
          }`
        );
        break;
      case "getMin":
        const min = minStack.getMin();
        const passed = min === operation.expected;
        console.log(
          `${index + 1}. getMin() = ${min} (expected: ${
            operation.expected
          }) - ${passed ? "PASS" : "FAIL"}`
        );
        break;
    }
  });
}

// Uncomment to run tests
// testMinStack();
// testEdgeCases();
// testPerformance();
// testComplexScenario();

module.exports = {
  MinStack,
  MinStackTwoStacks,
  MinStackPairs,
  MinStackDifference,
  MinStackLinkedList
};
