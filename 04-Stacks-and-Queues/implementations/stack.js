/**
 * Stack Implementation in JavaScript
 *
 * A stack is a linear data structure that follows the Last In First Out (LIFO) principle.
 * Elements are added and removed from the same end, called the "top" of the stack.
 *
 * Operations:
 * - push(element): Add element to top
 * - pop(): Remove and return top element
 * - peek()/top(): Return top element without removing
 * - isEmpty(): Check if stack is empty
 * - size(): Get number of elements
 *
 * Time Complexity: O(1) for all operations
 * Space Complexity: O(n) where n is number of elements
 */

class Stack {
  constructor() {
    this.items = [];
  }

  /**
   * Add element to top of stack
   * @param {*} element - Element to add
   * @returns {number} New size of stack
   */
  push(element) {
    this.items.push(element);
    return this.items.length;
  }

  /**
   * Remove and return top element
   * @returns {*} Top element or undefined if empty
   */
  pop() {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }
    return this.items.pop();
  }

  /**
   * Return top element without removing
   * @returns {*} Top element or undefined if empty
   */
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.items.length - 1];
  }

  /**
   * Alternative name for peek()
   * @returns {*} Top element or undefined if empty
   */
  top() {
    return this.peek();
  }

  /**
   * Check if stack is empty
   * @returns {boolean} True if empty, false otherwise
   */
  isEmpty() {
    return this.items.length === 0;
  }

  /**
   * Get number of elements in stack
   * @returns {number} Size of stack
   */
  size() {
    return this.items.length;
  }

  /**
   * Clear all elements from stack
   */
  clear() {
    this.items = [];
  }

  /**
   * Convert stack to array (bottom to top)
   * @returns {Array} Array representation
   */
  toArray() {
    return [...this.items];
  }

  /**
   * String representation of stack
   * @returns {string} String representation
   */
  toString() {
    return `Stack[${this.items.join(", ")}] (top: ${this.peek()})`;
  }

  /**
   * Create stack from array
   * @param {Array} array - Array to convert to stack
   * @returns {Stack} New stack instance
   */
  static fromArray(array) {
    const stack = new Stack();
    array.forEach((item) => stack.push(item));
    return stack;
  }
}

// Alternative implementation using linked list (for comparison)
class StackLinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  push(element) {
    const newNode = {
      data: element,
      next: this.head
    };
    this.head = newNode;
    this.length++;
    return this.length;
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }

    const data = this.head.data;
    this.head = this.head.next;
    this.length--;
    return data;
  }

  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.head.data;
  }

  isEmpty() {
    return this.head === null;
  }

  size() {
    return this.length;
  }

  clear() {
    this.head = null;
    this.length = 0;
  }

  toArray() {
    const result = [];
    let current = this.head;
    while (current) {
      result.unshift(current.data); // Add to front to maintain order
      current = current.next;
    }
    return result;
  }

  toString() {
    return `StackLinkedList[${this.toArray().join(
      ", "
    )}] (top: ${this.peek()})`;
  }
}

// Advanced Stack with additional features
class AdvancedStack extends Stack {
  constructor() {
    super();
    this.minStack = []; // Track minimum elements
    this.maxStack = []; // Track maximum elements
  }

  push(element) {
    super.push(element);

    // Update min stack
    if (this.minStack.length === 0 || element <= this.getMin()) {
      this.minStack.push(element);
    }

    // Update max stack
    if (this.maxStack.length === 0 || element >= this.getMax()) {
      this.maxStack.push(element);
    }

    return this.items.length;
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }

    const element = super.pop();

    // Update min stack
    if (element === this.getMin()) {
      this.minStack.pop();
    }

    // Update max stack
    if (element === this.getMax()) {
      this.maxStack.pop();
    }

    return element;
  }

  /**
   * Get minimum element in O(1) time
   * @returns {*} Minimum element
   */
  getMin() {
    if (this.minStack.length === 0) {
      return undefined;
    }
    return this.minStack[this.minStack.length - 1];
  }

  /**
   * Get maximum element in O(1) time
   * @returns {*} Maximum element
   */
  getMax() {
    if (this.maxStack.length === 0) {
      return undefined;
    }
    return this.maxStack[this.maxStack.length - 1];
  }

  clear() {
    super.clear();
    this.minStack = [];
    this.maxStack = [];
  }
}

// Test cases and demonstrations
function testStack() {
  console.log("=== Testing Basic Stack ===");

  const stack = new Stack();

  console.log("1. Basic Operations:");
  console.log(`Empty: ${stack.isEmpty()}`); // true
  console.log(`Size: ${stack.size()}`); // 0

  // Push elements
  stack.push(10);
  stack.push(20);
  stack.push(30);
  console.log(`After pushing 10, 20, 30: ${stack.toString()}`);
  console.log(`Top: ${stack.peek()}`); // 30
  console.log(`Size: ${stack.size()}`); // 3

  // Pop elements
  console.log(`Popped: ${stack.pop()}`); // 30
  console.log(`After pop: ${stack.toString()}`);
  console.log(`Top: ${stack.peek()}`); // 20

  console.log("\n2. Array conversion:");
  console.log(`To Array: [${stack.toArray()}]`);

  console.log("\n3. Static method:");
  const stack2 = Stack.fromArray([1, 2, 3, 4, 5]);
  console.log(`From Array: ${stack2.toString()}`);

  console.log("\n=== Testing Linked List Stack ===");
  const linkedStack = new StackLinkedList();
  linkedStack.push("a");
  linkedStack.push("b");
  linkedStack.push("c");
  console.log(`Linked Stack: ${linkedStack.toString()}`);
  console.log(`Popped: ${linkedStack.pop()}`);
  console.log(`After pop: ${linkedStack.toString()}`);

  console.log("\n=== Testing Advanced Stack ===");
  const advStack = new AdvancedStack();

  // Test min/max tracking
  [3, 1, 4, 1, 5, 9, 2, 6].forEach((num) => {
    advStack.push(num);
    console.log(
      `Pushed ${num}: min=${advStack.getMin()}, max=${advStack.getMax()}`
    );
  });

  console.log(`\nStack: ${advStack.toString()}`);
  console.log(`Min: ${advStack.getMin()}, Max: ${advStack.getMax()}`);

  // Test popping with min/max updates
  while (!advStack.isEmpty()) {
    const popped = advStack.pop();
    console.log(
      `Popped ${popped}: min=${advStack.getMin()}, max=${advStack.getMax()}`
    );
  }
}

// Practical applications demonstration
function demonstrateApplications() {
  console.log("\n=== Practical Applications ===");

  // 1. Expression evaluation
  function evaluatePostfix(expression) {
    const stack = new Stack();
    const tokens = expression.split(" ");

    for (let token of tokens) {
      if (["+", "-", "*", "/"].includes(token)) {
        const b = stack.pop();
        const a = stack.pop();
        let result;
        switch (token) {
          case "+":
            result = a + b;
            break;
          case "-":
            result = a - b;
            break;
          case "*":
            result = a * b;
            break;
          case "/":
            result = a / b;
            break;
        }
        stack.push(result);
      } else {
        stack.push(parseFloat(token));
      }
    }

    return stack.pop();
  }

  console.log("1. Postfix Expression Evaluation:");
  console.log(`"3 4 + 2 *" = ${evaluatePostfix("3 4 + 2 *")}`); // (3+4)*2 = 14

  // 2. Balanced parentheses
  function isBalanced(str) {
    const stack = new Stack();
    const pairs = { "(": ")", "[": "]", "{": "}" };

    for (let char of str) {
      if (char in pairs) {
        stack.push(char);
      } else if (Object.values(pairs).includes(char)) {
        if (stack.isEmpty() || pairs[stack.pop()] !== char) {
          return false;
        }
      }
    }

    return stack.isEmpty();
  }

  console.log("\n2. Balanced Parentheses:");
  console.log(`"({[]})" is balanced: ${isBalanced("({[]})")}`); // true
  console.log(`"({[})" is balanced: ${isBalanced("({[})")}`); // false

  // 3. Browser history simulation
  class BrowserHistory {
    constructor() {
      this.history = new Stack();
      this.forward = new Stack();
    }

    visit(url) {
      this.history.push(url);
      this.forward.clear(); // Clear forward history on new visit
      console.log(`Visited: ${url}`);
    }

    back() {
      if (this.history.size() <= 1) {
        console.log("Cannot go back");
        return;
      }

      const current = this.history.pop();
      this.forward.push(current);
      console.log(`Back to: ${this.history.peek()}`);
    }

    forward() {
      if (this.forward.isEmpty()) {
        console.log("Cannot go forward");
        return;
      }

      const url = this.forward.pop();
      this.history.push(url);
      console.log(`Forward to: ${url}`);
    }

    current() {
      return this.history.peek();
    }
  }

  console.log("\n3. Browser History:");
  const browser = new BrowserHistory();
  browser.visit("google.com");
  browser.visit("github.com");
  browser.visit("stackoverflow.com");
  browser.back();
  browser.back();
  browser.forward();
}

// Performance comparison
function performanceTest() {
  console.log("\n=== Performance Test ===");

  const iterations = 100000;

  // Test array-based stack
  console.time("Array Stack");
  const arrayStack = new Stack();
  for (let i = 0; i < iterations; i++) {
    arrayStack.push(i);
  }
  for (let i = 0; i < iterations; i++) {
    arrayStack.pop();
  }
  console.timeEnd("Array Stack");

  // Test linked list stack
  console.time("Linked List Stack");
  const linkedStack = new StackLinkedList();
  for (let i = 0; i < iterations; i++) {
    linkedStack.push(i);
  }
  for (let i = 0; i < iterations; i++) {
    linkedStack.pop();
  }
  console.timeEnd("Linked List Stack");
}

// Run all tests
console.log("Stack Implementation and Testing");
console.log("================================");

testStack();
demonstrateApplications();
performanceTest();

module.exports = {
  Stack,
  StackLinkedList,
  AdvancedStack
};
