/**
 * Sparse Array Implementation
 *
 * A sparse array is an array where most elements are empty (undefined).
 * Instead of storing all elements, we only store non-empty elements
 * with their indices, making it memory efficient for large arrays
 * with few non-empty elements.
 */

class SparseArray {
  constructor() {
    this.elements = new Map(); // stores index -> value mappings
    this.maxIndex = -1; // tracks the highest index used
  }

  /**
   * Set value at index
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  set(index, value) {
    if (index < 0) {
      throw new Error("Index must be non-negative");
    }

    if (value === undefined) {
      // Remove the element if setting to undefined
      this.elements.delete(index);

      // Update maxIndex if necessary
      if (index === this.maxIndex) {
        this.maxIndex = this._findMaxIndex();
      }
    } else {
      this.elements.set(index, value);
      this.maxIndex = Math.max(this.maxIndex, index);
    }
  }

  /**
   * Get value at index
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  get(index) {
    if (index < 0) {
      throw new Error("Index must be non-negative");
    }
    return this.elements.get(index);
  }

  /**
   * Check if index has a value
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  has(index) {
    return this.elements.has(index);
  }

  /**
   * Delete value at index
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  delete(index) {
    const hadValue = this.elements.has(index);
    this.elements.delete(index);

    if (index === this.maxIndex) {
      this.maxIndex = this._findMaxIndex();
    }

    return hadValue;
  }

  /**
   * Get the length (highest index + 1)
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  get length() {
    return this.maxIndex + 1;
  }

  /**
   * Get number of non-empty elements
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  get size() {
    return this.elements.size;
  }

  /**
   * Get all non-empty indices
   * Time Complexity: O(k) where k is number of non-empty elements
   * Space Complexity: O(k)
   */
  indices() {
    return Array.from(this.elements.keys()).sort((a, b) => a - b);
  }

  /**
   * Get all non-empty values
   * Time Complexity: O(k) where k is number of non-empty elements
   * Space Complexity: O(k)
   */
  values() {
    const sortedIndices = this.indices();
    return sortedIndices.map((index) => this.elements.get(index));
  }

  /**
   * Convert to dense array
   * Time Complexity: O(n) where n is length
   * Space Complexity: O(n)
   */
  toDenseArray() {
    const result = new Array(this.length);
    for (const [index, value] of this.elements) {
      result[index] = value;
    }
    return result;
  }

  /**
   * Apply function to all non-empty elements
   * Time Complexity: O(k) where k is number of non-empty elements
   * Space Complexity: O(1)
   */
  forEach(callback) {
    const sortedIndices = this.indices();
    for (const index of sortedIndices) {
      callback(this.elements.get(index), index, this);
    }
  }

  /**
   * Map function over non-empty elements
   * Time Complexity: O(k) where k is number of non-empty elements
   * Space Complexity: O(k)
   */
  map(callback) {
    const result = new SparseArray();
    for (const [index, value] of this.elements) {
      const newValue = callback(value, index, this);
      if (newValue !== undefined) {
        result.set(index, newValue);
      }
    }
    return result;
  }

  /**
   * Filter non-empty elements
   * Time Complexity: O(k) where k is number of non-empty elements
   * Space Complexity: O(k)
   */
  filter(callback) {
    const result = new SparseArray();
    for (const [index, value] of this.elements) {
      if (callback(value, index, this)) {
        result.set(index, value);
      }
    }
    return result;
  }

  /**
   * Reduce non-empty elements
   * Time Complexity: O(k) where k is number of non-empty elements
   * Space Complexity: O(1)
   */
  reduce(callback, initialValue) {
    const sortedIndices = this.indices();
    let accumulator = initialValue;
    let startIndex = 0;

    if (accumulator === undefined && sortedIndices.length > 0) {
      accumulator = this.elements.get(sortedIndices[0]);
      startIndex = 1;
    }

    for (let i = startIndex; i < sortedIndices.length; i++) {
      const index = sortedIndices[i];
      accumulator = callback(
        accumulator,
        this.elements.get(index),
        index,
        this
      );
    }

    return accumulator;
  }

  /**
   * Clear all elements
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  clear() {
    this.elements.clear();
    this.maxIndex = -1;
  }

  /**
   * Clone the sparse array
   * Time Complexity: O(k) where k is number of non-empty elements
   * Space Complexity: O(k)
   */
  clone() {
    const result = new SparseArray();
    for (const [index, value] of this.elements) {
      result.set(index, value);
    }
    return result;
  }

  /**
   * Get statistics about the array
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  getStats() {
    const totalSlots = this.length;
    const usedSlots = this.size;
    const emptySlots = Math.max(0, totalSlots - usedSlots);
    const sparsity = totalSlots > 0 ? (emptySlots / totalSlots) * 100 : 0;

    return {
      length: totalSlots,
      usedSlots,
      emptySlots,
      sparsity: Math.round(sparsity * 100) / 100 // Round to 2 decimal places
    };
  }

  /**
   * Find maximum index with a value
   * Time Complexity: O(k) where k is number of non-empty elements
   * Space Complexity: O(1)
   */
  _findMaxIndex() {
    let max = -1;
    for (const index of this.elements.keys()) {
      max = Math.max(max, index);
    }
    return max;
  }

  /**
   * String representation
   */
  toString() {
    if (this.size === 0) return "SparseArray[]";

    const pairs = [];
    const sortedIndices = this.indices();

    for (const index of sortedIndices) {
      pairs.push(`${index}:${this.elements.get(index)}`);
    }

    return `SparseArray[${pairs.join(", ")}]`;
  }

  /**
   * Iterator support (for...of loops)
   * Iterates over [index, value] pairs
   */
  *[Symbol.iterator]() {
    const sortedIndices = this.indices();
    for (const index of sortedIndices) {
      yield [index, this.elements.get(index)];
    }
  }

  /**
   * Create sparse array from dense array
   * Time Complexity: O(n)
   * Space Complexity: O(k) where k is number of non-undefined elements
   */
  static fromDenseArray(arr) {
    const sparse = new SparseArray();
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== undefined) {
        sparse.set(i, arr[i]);
      }
    }
    return sparse;
  }

  /**
   * Create sparse array from object
   * Time Complexity: O(k) where k is number of properties
   * Space Complexity: O(k)
   */
  static fromObject(obj) {
    const sparse = new SparseArray();
    for (const [key, value] of Object.entries(obj)) {
      const index = parseInt(key);
      if (!isNaN(index) && index >= 0) {
        sparse.set(index, value);
      }
    }
    return sparse;
  }
}

// Test the SparseArray
console.log("=== Sparse Array Tests ===");

const sparse = new SparseArray();

// Test basic operations
sparse.set(0, "first");
sparse.set(100, "middle");
sparse.set(1000, "last");
sparse.set(5, "fifth");

console.log("Sparse array:", sparse.toString());
console.log("Length:", sparse.length);
console.log("Size (non-empty):", sparse.size);
console.log("Value at index 100:", sparse.get(100));
console.log("Value at index 50 (empty):", sparse.get(50));

// Test statistics
console.log("Statistics:", sparse.getStats());

// Test iteration
console.log("Iterating over non-empty elements:");
for (const [index, value] of sparse) {
  console.log(`  Index ${index}: ${value}`);
}

// Test array methods
console.log("All indices:", sparse.indices());
console.log("All values:", sparse.values());

// Test functional methods
console.log("Mapped (add index to value):");
const mapped = sparse.map((value, index) => `${value}-${index}`);
console.log(mapped.toString());

console.log("Filtered (indices > 50):");
const filtered = sparse.filter((value, index) => index > 50);
console.log(filtered.toString());

// Test conversion to dense array
console.log("Dense array representation:");
console.log(sparse.toDenseArray().slice(0, 10)); // Show first 10 elements

// Test creating from dense array
const denseArray = [1, undefined, 3, undefined, undefined, 6];
const fromDense = SparseArray.fromDenseArray(denseArray);
console.log("From dense array:", fromDense.toString());

// Test creating from object
const obj = { 0: "zero", 5: "five", 10: "ten" };
const fromObj = SparseArray.fromObject(obj);
console.log("From object:", fromObj.toString());

// Test memory efficiency demonstration
console.log("\n=== Memory Efficiency Demo ===");
const hugeSparse = new SparseArray();
hugeSparse.set(0, "start");
hugeSparse.set(1000000, "middle");
hugeSparse.set(2000000, "end");

console.log("Huge sparse array:", hugeSparse.toString());
console.log("Statistics:", hugeSparse.getStats());
console.log("Memory efficient: Only storing 3 elements instead of 2,000,001!");

module.exports = SparseArray;
