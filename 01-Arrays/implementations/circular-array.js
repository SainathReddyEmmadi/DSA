/**
 * Circular Array (Ring Buffer) Implementation
 *
 * A circular array is a linear data structure that connects the end
 * of the array back to the beginning, forming a circle. It's commonly
 * used for buffering data streams, implementing queues with fixed size,
 * and in situations where you need to cycle through elements repeatedly.
 */

class CircularArray {
  constructor(capacity) {
    if (capacity <= 0) {
      throw new Error("Capacity must be positive");
    }

    this.capacity = capacity;
    this.data = new Array(capacity);
    this.head = 0; // Points to the first element
    this.tail = 0; // Points to the next insertion position
    this.size = 0; // Number of elements currently stored
  }

  /**
   * Add element to the end of the circular array
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  push(value) {
    this.data[this.tail] = value;
    this.tail = (this.tail + 1) % this.capacity;

    if (this.size < this.capacity) {
      this.size++;
    } else {
      // Array is full, move head forward (overwrite oldest element)
      this.head = (this.head + 1) % this.capacity;
    }
  }

  /**
   * Remove and return the first element
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  shift() {
    if (this.size === 0) {
      throw new Error("Array is empty");
    }

    const value = this.data[this.head];
    this.data[this.head] = undefined; // Clear for garbage collection
    this.head = (this.head + 1) % this.capacity;
    this.size--;

    return value;
  }

  /**
   * Add element to the beginning of the circular array
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  unshift(value) {
    if (this.size === this.capacity) {
      // Array is full, move tail backward (overwrite newest element)
      this.tail = (this.tail - 1 + this.capacity) % this.capacity;
    } else {
      this.size++;
    }

    this.head = (this.head - 1 + this.capacity) % this.capacity;
    this.data[this.head] = value;
  }

  /**
   * Remove and return the last element
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  pop() {
    if (this.size === 0) {
      throw new Error("Array is empty");
    }

    this.tail = (this.tail - 1 + this.capacity) % this.capacity;
    const value = this.data[this.tail];
    this.data[this.tail] = undefined; // Clear for garbage collection
    this.size--;

    return value;
  }

  /**
   * Get element at logical index (0-based from head)
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  get(index) {
    if (index < 0 || index >= this.size) {
      throw new Error(`Index ${index} out of bounds`);
    }

    const physicalIndex = (this.head + index) % this.capacity;
    return this.data[physicalIndex];
  }

  /**
   * Set element at logical index (0-based from head)
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  set(index, value) {
    if (index < 0 || index >= this.size) {
      throw new Error(`Index ${index} out of bounds`);
    }

    const physicalIndex = (this.head + index) % this.capacity;
    this.data[physicalIndex] = value;
  }

  /**
   * Get the first element without removing it
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  front() {
    if (this.size === 0) {
      throw new Error("Array is empty");
    }
    return this.data[this.head];
  }

  /**
   * Get the last element without removing it
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  back() {
    if (this.size === 0) {
      throw new Error("Array is empty");
    }

    const lastIndex = (this.tail - 1 + this.capacity) % this.capacity;
    return this.data[lastIndex];
  }

  /**
   * Check if the array is empty
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  isEmpty() {
    return this.size === 0;
  }

  /**
   * Check if the array is full
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  isFull() {
    return this.size === this.capacity;
  }

  /**
   * Get current number of elements
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  length() {
    return this.size;
  }

  /**
   * Get maximum capacity
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  getCapacity() {
    return this.capacity;
  }

  /**
   * Clear all elements
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  clear() {
    for (let i = 0; i < this.capacity; i++) {
      this.data[i] = undefined;
    }
    this.head = 0;
    this.tail = 0;
    this.size = 0;
  }

  /**
   * Convert to regular array (maintains logical order)
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  toArray() {
    const result = new Array(this.size);
    for (let i = 0; i < this.size; i++) {
      result[i] = this.get(i);
    }
    return result;
  }

  /**
   * Find index of first occurrence of value
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  indexOf(value) {
    for (let i = 0; i < this.size; i++) {
      if (this.get(i) === value) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Check if array contains value
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  contains(value) {
    return this.indexOf(value) !== -1;
  }

  /**
   * Apply function to each element
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  forEach(callback) {
    for (let i = 0; i < this.size; i++) {
      callback(this.get(i), i, this);
    }
  }

  /**
   * Create new CircularArray with transformed elements
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  map(callback) {
    const result = new CircularArray(this.capacity);
    for (let i = 0; i < this.size; i++) {
      result.push(callback(this.get(i), i, this));
    }
    return result;
  }

  /**
   * Create new CircularArray with filtered elements
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  filter(callback) {
    const result = new CircularArray(this.capacity);
    for (let i = 0; i < this.size; i++) {
      const value = this.get(i);
      if (callback(value, i, this)) {
        result.push(value);
      }
    }
    return result;
  }

  /**
   * Rotate the array by k positions
   * Positive k rotates right, negative k rotates left
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  rotate(k) {
    if (this.size === 0) return;

    k = k % this.size; // Handle k larger than size
    if (k < 0) k += this.size; // Convert negative to positive

    this.head = (this.head + k) % this.capacity;
  }

  /**
   * Get internal state for debugging
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  getDebugInfo() {
    return {
      capacity: this.capacity,
      size: this.size,
      head: this.head,
      tail: this.tail,
      internalData: [...this.data]
    };
  }

  /**
   * String representation
   */
  toString() {
    if (this.size === 0) return "CircularArray[]";
    return `CircularArray[${this.toArray().join(", ")}]`;
  }

  /**
   * Iterator support (for...of loops)
   */
  *[Symbol.iterator]() {
    for (let i = 0; i < this.size; i++) {
      yield this.get(i);
    }
  }

  /**
   * Create CircularArray from regular array
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  static fromArray(arr, capacity = arr.length) {
    const circular = new CircularArray(capacity);
    for (const item of arr) {
      circular.push(item);
    }
    return circular;
  }
}

// Test the CircularArray
console.log("=== Circular Array Tests ===");

const circular = new CircularArray(5);

// Test basic operations
console.log("Empty array:", circular.toString());
console.log("Is empty:", circular.isEmpty());

// Test push operations
circular.push(1);
circular.push(2);
circular.push(3);
console.log("After pushing 1,2,3:", circular.toString());

// Test get/set operations
console.log("Get index 1:", circular.get(1));
circular.set(1, 20);
console.log("After set index 1 to 20:", circular.toString());

// Test front/back operations
console.log("Front:", circular.front());
console.log("Back:", circular.back());

// Test filling to capacity
circular.push(4);
circular.push(5);
console.log("After pushing 4,5 (full):", circular.toString());
console.log("Is full:", circular.isFull());

// Test overwriting (circular behavior)
circular.push(6); // Should overwrite the first element
console.log("After pushing 6 (overwrites):", circular.toString());
console.log("Debug info:", circular.getDebugInfo());

// Test shift/unshift operations
console.log("Shift:", circular.shift());
console.log("After shift:", circular.toString());

circular.unshift(10);
console.log("After unshift 10:", circular.toString());

// Test pop operation
console.log("Pop:", circular.pop());
console.log("After pop:", circular.toString());

// Test rotation
const rotateTest = CircularArray.fromArray([1, 2, 3, 4, 5]);
console.log("Before rotation:", rotateTest.toString());
rotateTest.rotate(2);
console.log("After rotate right by 2:", rotateTest.toString());
rotateTest.rotate(-1);
console.log("After rotate left by 1:", rotateTest.toString());

// Test functional methods
console.log("Map (multiply by 2):", rotateTest.map((x) => x * 2).toString());
console.log(
  "Filter (even numbers):",
  rotateTest.filter((x) => x % 2 === 0).toString()
);

// Test search operations
console.log("Index of 3:", rotateTest.indexOf(3));
console.log("Contains 10:", rotateTest.contains(10));

// Test iteration
console.log("Iterating with for...of:");
for (const value of rotateTest) {
  console.log(`  Value: ${value}`);
}

// Demonstrate use case: Recent items buffer
console.log("\n=== Use Case: Recent Items Buffer ===");
const recentItems = new CircularArray(3);

const items = ["item1", "item2", "item3", "item4", "item5"];
console.log("Adding items to recent buffer (capacity 3):");

for (const item of items) {
  recentItems.push(item);
  console.log(`Added ${item}, recent items: ${recentItems.toString()}`);
}

module.exports = CircularArray;
