/**
 * Dynamic Array Implementation
 *
 * A resizable array that automatically grows when needed.
 * Similar to JavaScript's built-in Array, but with explicit capacity management.
 */

class DynamicArray {
  constructor(initialCapacity = 8) {
    this.capacity = initialCapacity;
    this.size = 0;
    this.data = new Array(this.capacity);
  }

  /**
   * Get element at index
   * Time Complexity: O(1)
   */
  get(index) {
    if (index < 0 || index >= this.size) {
      throw new Error(`Index ${index} out of bounds`);
    }
    return this.data[index];
  }

  /**
   * Set element at index
   * Time Complexity: O(1)
   */
  set(index, value) {
    if (index < 0 || index >= this.size) {
      throw new Error(`Index ${index} out of bounds`);
    }
    this.data[index] = value;
  }

  /**
   * Add element to the end
   * Time Complexity: O(1) amortized, O(n) worst case
   */
  push(value) {
    if (this.size >= this.capacity) {
      this._resize();
    }
    this.data[this.size] = value;
    this.size++;
  }

  /**
   * Remove and return last element
   * Time Complexity: O(1)
   */
  pop() {
    if (this.size === 0) {
      throw new Error("Array is empty");
    }
    const value = this.data[this.size - 1];
    this.size--;

    // Shrink if array is 1/4 full
    if (this.size > 0 && this.size <= this.capacity / 4) {
      this._resize(Math.max(8, Math.floor(this.capacity / 2)));
    }

    return value;
  }

  /**
   * Insert element at specific index
   * Time Complexity: O(n)
   */
  insert(index, value) {
    if (index < 0 || index > this.size) {
      throw new Error(`Index ${index} out of bounds`);
    }

    if (this.size >= this.capacity) {
      this._resize();
    }

    // Shift elements to the right
    for (let i = this.size; i > index; i--) {
      this.data[i] = this.data[i - 1];
    }

    this.data[index] = value;
    this.size++;
  }

  /**
   * Remove element at specific index
   * Time Complexity: O(n)
   */
  removeAt(index) {
    if (index < 0 || index >= this.size) {
      throw new Error(`Index ${index} out of bounds`);
    }

    const value = this.data[index];

    // Shift elements to the left
    for (let i = index; i < this.size - 1; i++) {
      this.data[i] = this.data[i + 1];
    }

    this.size--;

    // Shrink if array is 1/4 full
    if (this.size > 0 && this.size <= this.capacity / 4) {
      this._resize(Math.max(8, Math.floor(this.capacity / 2)));
    }

    return value;
  }

  /**
   * Find first occurrence of value
   * Time Complexity: O(n)
   */
  indexOf(value) {
    for (let i = 0; i < this.size; i++) {
      if (this.data[i] === value) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Check if array contains value
   * Time Complexity: O(n)
   */
  contains(value) {
    return this.indexOf(value) !== -1;
  }

  /**
   * Remove first occurrence of value
   * Time Complexity: O(n)
   */
  remove(value) {
    const index = this.indexOf(value);
    if (index !== -1) {
      return this.removeAt(index);
    }
    return undefined;
  }

  /**
   * Clear all elements
   * Time Complexity: O(1)
   */
  clear() {
    this.size = 0;
    this.capacity = 8;
    this.data = new Array(this.capacity);
  }

  /**
   * Get current size
   * Time Complexity: O(1)
   */
  length() {
    return this.size;
  }

  /**
   * Check if array is empty
   * Time Complexity: O(1)
   */
  isEmpty() {
    return this.size === 0;
  }

  /**
   * Convert to regular JavaScript array
   * Time Complexity: O(n)
   */
  toArray() {
    const result = new Array(this.size);
    for (let i = 0; i < this.size; i++) {
      result[i] = this.data[i];
    }
    return result;
  }

  /**
   * Resize the internal array
   * Time Complexity: O(n)
   */
  _resize(newCapacity = this.capacity * 2) {
    const oldData = this.data;
    this.capacity = newCapacity;
    this.data = new Array(this.capacity);

    for (let i = 0; i < this.size; i++) {
      this.data[i] = oldData[i];
    }
  }

  /**
   * String representation
   */
  toString() {
    if (this.size === 0) return "[]";

    let result = "[";
    for (let i = 0; i < this.size; i++) {
      result += this.data[i];
      if (i < this.size - 1) result += ", ";
    }
    result += "]";
    return result;
  }

  /**
   * Iterator support (for...of loops)
   */
  *[Symbol.iterator]() {
    for (let i = 0; i < this.size; i++) {
      yield this.data[i];
    }
  }
}

// Test the DynamicArray
console.log("=== Dynamic Array Tests ===");

const arr = new DynamicArray(4);
console.log("Initial array:", arr.toString());

// Test push operations
arr.push(1);
arr.push(2);
arr.push(3);
arr.push(4);
arr.push(5); // This should trigger resize
console.log("After pushing 1,2,3,4,5:", arr.toString());
console.log("Capacity:", arr.capacity, "Size:", arr.length());

// Test get/set operations
console.log("arr.get(0):", arr.get(0));
arr.set(0, 10);
console.log("After arr.set(0, 10):", arr.toString());

// Test insert operation
arr.insert(2, 99);
console.log("After arr.insert(2, 99):", arr.toString());

// Test remove operations
console.log("arr.pop():", arr.pop());
console.log("After pop:", arr.toString());

console.log("arr.removeAt(1):", arr.removeAt(1));
console.log("After removeAt(1):", arr.toString());

console.log("arr.remove(99):", arr.remove(99));
console.log("After remove(99):", arr.toString());

// Test search operations
console.log("arr.indexOf(3):", arr.indexOf(3));
console.log("arr.contains(3):", arr.contains(3));
console.log("arr.contains(99):", arr.contains(99));

// Test iteration
console.log("Iterating with for...of:");
for (const value of arr) {
  console.log("  Value:", value);
}

module.exports = DynamicArray;
