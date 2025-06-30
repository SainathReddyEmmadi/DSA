/**
 * Deque (Double-ended Queue) Implementation in JavaScript
 *
 * A deque is a linear data structure that allows insertion and deletion
 * at both ends (front and rear). It combines the features of both stack and queue.
 *
 * Operations:
 * - addFront(element): Add element to front
 * - addRear(element): Add element to rear
 * - removeFront(): Remove and return front element
 * - removeRear(): Remove and return rear element
 * - front(): Return front element without removing
 * - rear(): Return rear element without removing
 * - isEmpty(): Check if deque is empty
 * - size(): Get number of elements
 *
 * Time Complexity: O(1) for all operations
 * Space Complexity: O(n) where n is number of elements
 */

class Deque {
  constructor() {
    this.items = [];
    this.frontIndex = 0;
    this.rearIndex = -1;
    this.count = 0;
  }

  /**
   * Add element to front of deque
   * @param {*} element - Element to add
   * @returns {number} New size of deque
   */
  addFront(element) {
    this.frontIndex =
      (this.frontIndex - 1 + this.items.length) % this.items.length;
    if (this.count === 0) {
      this.items[0] = element;
      this.frontIndex = 0;
      this.rearIndex = 0;
    } else {
      // Expand array if needed
      if (this.count === this.items.length) {
        this._resize();
        this.frontIndex = this.items.length - 1;
      }
      this.items[this.frontIndex] = element;
    }
    this.count++;
    return this.count;
  }

  /**
   * Add element to rear of deque
   * @param {*} element - Element to add
   * @returns {number} New size of deque
   */
  addRear(element) {
    if (this.count === 0) {
      this.items[0] = element;
      this.frontIndex = 0;
      this.rearIndex = 0;
    } else {
      // Expand array if needed
      if (this.count === this.items.length) {
        this._resize();
      }
      this.rearIndex = (this.rearIndex + 1) % this.items.length;
      this.items[this.rearIndex] = element;
    }
    this.count++;
    return this.count;
  }

  /**
   * Remove and return front element
   * @returns {*} Front element
   */
  removeFront() {
    if (this.isEmpty()) {
      throw new Error("Deque is empty");
    }

    const element = this.items[this.frontIndex];
    this.items[this.frontIndex] = undefined;

    if (this.count === 1) {
      this.frontIndex = 0;
      this.rearIndex = -1;
    } else {
      this.frontIndex = (this.frontIndex + 1) % this.items.length;
    }

    this.count--;
    return element;
  }

  /**
   * Remove and return rear element
   * @returns {*} Rear element
   */
  removeRear() {
    if (this.isEmpty()) {
      throw new Error("Deque is empty");
    }

    const element = this.items[this.rearIndex];
    this.items[this.rearIndex] = undefined;

    if (this.count === 1) {
      this.frontIndex = 0;
      this.rearIndex = -1;
    } else {
      this.rearIndex =
        (this.rearIndex - 1 + this.items.length) % this.items.length;
    }

    this.count--;
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
   * Return rear element without removing
   * @returns {*} Rear element or undefined if empty
   */
  rear() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.rearIndex];
  }

  /**
   * Check if deque is empty
   * @returns {boolean} True if empty, false otherwise
   */
  isEmpty() {
    return this.count === 0;
  }

  /**
   * Get number of elements in deque
   * @returns {number} Size of deque
   */
  size() {
    return this.count;
  }

  /**
   * Clear all elements from deque
   */
  clear() {
    this.items = [];
    this.frontIndex = 0;
    this.rearIndex = -1;
    this.count = 0;
  }

  /**
   * Convert deque to array (front to rear)
   * @returns {Array} Array representation
   */
  toArray() {
    const result = [];
    for (let i = 0; i < this.count; i++) {
      const index = (this.frontIndex + i) % this.items.length;
      result.push(this.items[index]);
    }
    return result;
  }

  /**
   * String representation of deque
   * @returns {string} String representation
   */
  toString() {
    const elements = this.toArray();
    return `Deque[${elements.join(
      ", "
    )}] (front: ${this.front()}, rear: ${this.rear()})`;
  }

  /**
   * Resize internal array when capacity is reached
   * @private
   */
  _resize() {
    const oldArray = this.toArray();
    this.items = new Array(Math.max(this.items.length * 2, 4));
    for (let i = 0; i < oldArray.length; i++) {
      this.items[i] = oldArray[i];
    }
    this.frontIndex = 0;
    this.rearIndex = oldArray.length - 1;
  }

  /**
   * Create deque from array
   * @param {Array} array - Array to convert to deque
   * @returns {Deque} New deque instance
   */
  static fromArray(array) {
    const deque = new Deque();
    array.forEach((item) => deque.addRear(item));
    return deque;
  }
}

// Alternative implementation using doubly linked list
class DequeLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  addFront(element) {
    const newNode = {
      data: element,
      prev: null,
      next: this.head
    };

    if (this.isEmpty()) {
      this.head = this.tail = newNode;
    } else {
      this.head.prev = newNode;
      this.head = newNode;
    }

    this.length++;
    return this.length;
  }

  addRear(element) {
    const newNode = {
      data: element,
      prev: this.tail,
      next: null
    };

    if (this.isEmpty()) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;
    return this.length;
  }

  removeFront() {
    if (this.isEmpty()) {
      throw new Error("Deque is empty");
    }

    const data = this.head.data;

    if (this.length === 1) {
      this.head = this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }

    this.length--;
    return data;
  }

  removeRear() {
    if (this.isEmpty()) {
      throw new Error("Deque is empty");
    }

    const data = this.tail.data;

    if (this.length === 1) {
      this.head = this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }

    this.length--;
    return data;
  }

  front() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.head.data;
  }

  rear() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.tail.data;
  }

  isEmpty() {
    return this.length === 0;
  }

  size() {
    return this.length;
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  toArray() {
    const result = [];
    let current = this.head;
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }

  toString() {
    const elements = this.toArray();
    return `DequeLinkedList[${elements.join(
      ", "
    )}] (front: ${this.front()}, rear: ${this.rear()})`;
  }
}

// Sliding window deque for efficient maximum/minimum in sliding window
class SlidingWindowDeque {
  constructor(compareFn = (a, b) => a - b) {
    this.deque = new Deque();
    this.compare = compareFn; // For min/max comparison
  }

  /**
   * Add element while maintaining monotonic property
   * @param {*} element - Element to add
   * @param {number} index - Index of element (for window tracking)
   */
  addElement(element, index) {
    // Remove elements from rear that are smaller/larger than current
    while (
      !this.deque.isEmpty() &&
      this.compare(this.deque.rear().value, element) >= 0
    ) {
      this.deque.removeRear();
    }

    this.deque.addRear({ value: element, index: index });
  }

  /**
   * Remove elements outside current window
   * @param {number} windowStart - Start index of current window
   */
  removeOutsideWindow(windowStart) {
    while (!this.deque.isEmpty() && this.deque.front().index < windowStart) {
      this.deque.removeFront();
    }
  }

  /**
   * Get current window maximum/minimum
   * @returns {*} Maximum/minimum element in current window
   */
  getWindowExtreme() {
    if (this.deque.isEmpty()) {
      return undefined;
    }
    return this.deque.front().value;
  }

  clear() {
    this.deque.clear();
  }
}

// Test cases and demonstrations
function testDeque() {
  console.log("=== Testing Basic Deque ===");

  const deque = new Deque();

  console.log("1. Basic Operations:");
  console.log(`Empty: ${deque.isEmpty()}`); // true
  console.log(`Size: ${deque.size()}`); // 0

  // Add elements to both ends
  deque.addRear(10);
  deque.addRear(20);
  deque.addFront(5);
  deque.addFront(1);
  console.log(`After adding: ${deque.toString()}`); // [1, 5, 10, 20]

  // Remove elements from both ends
  console.log(`Remove front: ${deque.removeFront()}`); // 1
  console.log(`Remove rear: ${deque.removeRear()}`); // 20
  console.log(`After removes: ${deque.toString()}`); // [5, 10]

  console.log("\n2. Array conversion:");
  console.log(`To Array: [${deque.toArray()}]`);

  console.log("\n3. Static method:");
  const deque2 = Deque.fromArray([1, 2, 3, 4, 5]);
  console.log(`From Array: ${deque2.toString()}`);

  console.log("\n=== Testing Linked List Deque ===");
  const linkedDeque = new DequeLinkedList();
  linkedDeque.addFront("b");
  linkedDeque.addFront("a");
  linkedDeque.addRear("c");
  linkedDeque.addRear("d");
  console.log(`Linked Deque: ${linkedDeque.toString()}`); // [a, b, c, d]

  console.log(`Remove front: ${linkedDeque.removeFront()}`); // a
  console.log(`Remove rear: ${linkedDeque.removeRear()}`); // d
  console.log(`After removes: ${linkedDeque.toString()}`); // [b, c]

  console.log("\n=== Testing Sliding Window Deque ===");
  // Find maximum in sliding window of size 3
  const arr = [1, 3, -1, -3, 5, 3, 6, 7];
  const windowSize = 3;
  const slidingDeque = new SlidingWindowDeque((a, b) => b - a); // For maximum
  const result = [];

  console.log(`Array: [${arr}], Window size: ${windowSize}`);

  for (let i = 0; i < arr.length; i++) {
    // Add current element
    slidingDeque.addElement(arr[i], i);

    // Remove elements outside window
    slidingDeque.removeOutsideWindow(i - windowSize + 1);

    // Add to result if window is complete
    if (i >= windowSize - 1) {
      result.push(slidingDeque.getWindowExtreme());
    }
  }

  console.log(`Sliding window maximums: [${result}]`);
}

// Practical applications demonstration
function demonstrateApplications() {
  console.log("\n=== Practical Applications ===");

  // 1. Palindrome checker using deque
  function isPalindrome(str) {
    const deque = new Deque();
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, "");

    // Add all characters to deque
    for (let char of cleanStr) {
      deque.addRear(char);
    }

    // Check from both ends
    while (deque.size() > 1) {
      if (deque.removeFront() !== deque.removeRear()) {
        return false;
      }
    }

    return true;
  }

  console.log("1. Palindrome Checker:");
  console.log(`"racecar" is palindrome: ${isPalindrome("racecar")}`);
  console.log(
    `"A man, a plan, a canal: Panama" is palindrome: ${isPalindrome(
      "A man, a plan, a canal: Panama"
    )}`
  );
  console.log(`"hello" is palindrome: ${isPalindrome("hello")}`);

  // 2. Sliding window maximum
  function slidingWindowMaximum(nums, k) {
    if (!nums || nums.length === 0 || k <= 0) return [];

    const deque = new Deque();
    const result = [];

    for (let i = 0; i < nums.length; i++) {
      // Remove indices outside current window
      while (!deque.isEmpty() && deque.front() <= i - k) {
        deque.removeFront();
      }

      // Remove smaller elements from rear
      while (!deque.isEmpty() && nums[deque.rear()] < nums[i]) {
        deque.removeRear();
      }

      deque.addRear(i);

      // Add to result when window is complete
      if (i >= k - 1) {
        result.push(nums[deque.front()]);
      }
    }

    return result;
  }

  console.log("\n2. Sliding Window Maximum:");
  const nums = [1, 3, -1, -3, 5, 3, 6, 7];
  const k = 3;
  console.log(`Array: [${nums}], k=${k}`);
  console.log(`Result: [${slidingWindowMaximum(nums, k)}]`);

  // 3. Browser navigation (back/forward with deque)
  class BrowserNavigation {
    constructor() {
      this.history = new Deque();
      this.currentIndex = -1;
    }

    visit(url) {
      // Remove forward history when visiting new page
      while (this.history.size() > this.currentIndex + 1) {
        this.history.removeRear();
      }

      this.history.addRear(url);
      this.currentIndex++;
      console.log(`Visited: ${url}`);
    }

    back() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        console.log(`Back to: ${this.getCurrentPage()}`);
      } else {
        console.log("Cannot go back");
      }
    }

    forward() {
      if (this.currentIndex < this.history.size() - 1) {
        this.currentIndex++;
        console.log(`Forward to: ${this.getCurrentPage()}`);
      } else {
        console.log("Cannot go forward");
      }
    }

    getCurrentPage() {
      if (this.currentIndex >= 0 && this.currentIndex < this.history.size()) {
        const pages = this.history.toArray();
        return pages[this.currentIndex];
      }
      return null;
    }

    showHistory() {
      const pages = this.history.toArray();
      const display = pages.map((page, index) =>
        index === this.currentIndex ? `[${page}]` : page
      );
      console.log(`History: ${display.join(" -> ")}`);
    }
  }

  console.log("\n3. Browser Navigation:");
  const browser = new BrowserNavigation();
  browser.visit("google.com");
  browser.visit("github.com");
  browser.visit("stackoverflow.com");
  browser.showHistory();
  browser.back();
  browser.back();
  browser.visit("leetcode.com");
  browser.showHistory();
  browser.forward(); // Should not work
}

// Performance comparison
function performanceTest() {
  console.log("\n=== Performance Test ===");

  const iterations = 10000;

  // Test array-based deque
  console.time("Array Deque");
  const arrayDeque = new Deque();
  for (let i = 0; i < iterations; i++) {
    if (i % 2 === 0) {
      arrayDeque.addFront(i);
    } else {
      arrayDeque.addRear(i);
    }
  }
  for (let i = 0; i < iterations; i++) {
    if (i % 2 === 0) {
      arrayDeque.removeFront();
    } else {
      arrayDeque.removeRear();
    }
  }
  console.timeEnd("Array Deque");

  // Test linked list deque
  console.time("Linked List Deque");
  const linkedDeque = new DequeLinkedList();
  for (let i = 0; i < iterations; i++) {
    if (i % 2 === 0) {
      linkedDeque.addFront(i);
    } else {
      linkedDeque.addRear(i);
    }
  }
  for (let i = 0; i < iterations; i++) {
    if (i % 2 === 0) {
      linkedDeque.removeFront();
    } else {
      linkedDeque.removeRear();
    }
  }
  console.timeEnd("Linked List Deque");
}

// Run all tests
console.log("Deque Implementation and Testing");
console.log("================================");

testDeque();
demonstrateApplications();
performanceTest();

module.exports = {
  Deque,
  DequeLinkedList,
  SlidingWindowDeque
};
