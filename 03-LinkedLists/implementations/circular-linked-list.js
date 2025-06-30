/**
 * Circular Linked List Implementation
 *
 * A circular linked list is a variation of linked list where the last node
 * points back to the first node instead of null, forming a circular structure.
 * This can be implemented as either singly or doubly circular.
 *
 * Features:
 * - No null pointers (except in empty list)
 * - Continuous traversal possible
 * - Efficient for round-robin algorithms
 * - Can start traversal from any node
 *
 * Time Complexities:
 * - Access: O(n)
 * - Search: O(n)
 * - Insertion: O(1) at current position, O(n) at arbitrary position
 * - Deletion: O(1) at current position, O(n) at arbitrary position
 *
 * Space Complexity: O(n)
 */

class CircularListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

class CircularLinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  /**
   * Add element to the beginning of the list
   * Time Complexity: O(n) - need to find last node to update its next
   * @param {*} val - Value to add
   */
  prepend(val) {
    const newNode = new CircularListNode(val);

    if (!this.head) {
      // First node points to itself
      this.head = newNode;
      newNode.next = newNode;
    } else {
      // Find the last node
      let last = this.head;
      while (last.next !== this.head) {
        last = last.next;
      }

      // Insert at beginning
      newNode.next = this.head;
      last.next = newNode;
      this.head = newNode;
    }
    this.size++;
  }

  /**
   * Add element to the end of the list
   * Time Complexity: O(n) - need to find last node
   * @param {*} val - Value to add
   */
  append(val) {
    const newNode = new CircularListNode(val);

    if (!this.head) {
      // First node points to itself
      this.head = newNode;
      newNode.next = newNode;
    } else {
      // Find the last node
      let last = this.head;
      while (last.next !== this.head) {
        last = last.next;
      }

      // Insert at end
      newNode.next = this.head;
      last.next = newNode;
    }
    this.size++;
  }

  /**
   * Insert element at specific index
   * Time Complexity: O(n)
   * @param {number} index - Index to insert at
   * @param {*} val - Value to insert
   */
  insertAt(index, val) {
    if (index < 0 || index > this.size) {
      throw new Error("Index out of bounds");
    }

    if (index === 0) {
      this.prepend(val);
      return;
    }

    if (index === this.size) {
      this.append(val);
      return;
    }

    const newNode = new CircularListNode(val);
    let current = this.head;

    // Traverse to the position before insertion point
    for (let i = 0; i < index - 1; i++) {
      current = current.next;
    }

    newNode.next = current.next;
    current.next = newNode;
    this.size++;
  }

  /**
   * Remove and return first element
   * Time Complexity: O(n) - need to find last node to update its next
   * @returns {*} - Removed value or null if empty
   */
  removeFirst() {
    if (!this.head) {
      return null;
    }

    const removedVal = this.head.val;

    if (this.head.next === this.head) {
      // Only one element
      this.head = null;
    } else {
      // Find the last node
      let last = this.head;
      while (last.next !== this.head) {
        last = last.next;
      }

      // Update connections
      last.next = this.head.next;
      this.head = this.head.next;
    }

    this.size--;
    return removedVal;
  }

  /**
   * Remove and return last element
   * Time Complexity: O(n) - need to find second-to-last node
   * @returns {*} - Removed value or null if empty
   */
  removeLast() {
    if (!this.head) {
      return null;
    }

    const removedVal = this.head.val;

    if (this.head.next === this.head) {
      // Only one element
      this.head = null;
      this.size--;
      return removedVal;
    }

    // Find the second-to-last node
    let current = this.head;
    while (current.next.next !== this.head) {
      current = current.next;
    }

    const lastNode = current.next;
    const lastVal = lastNode.val;
    current.next = this.head;

    this.size--;
    return lastVal;
  }

  /**
   * Remove element at specific index
   * Time Complexity: O(n)
   * @param {number} index - Index to remove
   * @returns {*} - Removed value
   */
  removeAt(index) {
    if (index < 0 || index >= this.size) {
      throw new Error("Index out of bounds");
    }

    if (index === 0) {
      return this.removeFirst();
    }

    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      current = current.next;
    }

    const removedVal = current.next.val;
    current.next = current.next.next;
    this.size--;
    return removedVal;
  }

  /**
   * Remove first occurrence of value
   * Time Complexity: O(n)
   * @param {*} val - Value to remove
   * @returns {boolean} - True if removed, false if not found
   */
  remove(val) {
    if (!this.head) {
      return false;
    }

    // Check if head needs to be removed
    if (this.head.val === val) {
      this.removeFirst();
      return true;
    }

    let current = this.head;
    do {
      if (current.next.val === val) {
        current.next = current.next.next;
        this.size--;
        return true;
      }
      current = current.next;
    } while (current !== this.head);

    return false;
  }

  /**
   * Find index of first occurrence of value
   * Time Complexity: O(n)
   * @param {*} val - Value to find
   * @returns {number} - Index or -1 if not found
   */
  indexOf(val) {
    if (!this.head) {
      return -1;
    }

    let current = this.head;
    let index = 0;

    do {
      if (current.val === val) {
        return index;
      }
      current = current.next;
      index++;
    } while (current !== this.head);

    return -1;
  }

  /**
   * Check if list contains value
   * Time Complexity: O(n)
   * @param {*} val - Value to check
   * @returns {boolean} - True if found
   */
  contains(val) {
    return this.indexOf(val) !== -1;
  }

  /**
   * Get element at specific index
   * Time Complexity: O(n)
   * @param {number} index - Index to get
   * @returns {*} - Value at index
   */
  get(index) {
    if (index < 0 || index >= this.size) {
      throw new Error("Index out of bounds");
    }

    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }

    return current.val;
  }

  /**
   * Set element at specific index
   * Time Complexity: O(n)
   * @param {number} index - Index to set
   * @param {*} val - New value
   */
  set(index, val) {
    if (index < 0 || index >= this.size) {
      throw new Error("Index out of bounds");
    }

    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }

    current.val = val;
  }

  /**
   * Get the size of the list
   * Time Complexity: O(1)
   * @returns {number} - Size of list
   */
  getSize() {
    return this.size;
  }

  /**
   * Check if list is empty
   * Time Complexity: O(1)
   * @returns {boolean} - True if empty
   */
  isEmpty() {
    return this.size === 0;
  }

  /**
   * Clear the list
   * Time Complexity: O(1)
   */
  clear() {
    this.head = null;
    this.size = 0;
  }

  /**
   * Convert list to array
   * Time Complexity: O(n)
   * @returns {Array} - Array representation
   */
  toArray() {
    if (!this.head) {
      return [];
    }

    const result = [];
    let current = this.head;

    do {
      result.push(current.val);
      current = current.next;
    } while (current !== this.head);

    return result;
  }

  /**
   * Create list from array
   * Time Complexity: O(n²) - due to append operation
   * @param {Array} arr - Array to convert
   * @returns {CircularLinkedList} - New circular linked list
   */
  static fromArray(arr) {
    const list = new CircularLinkedList();
    for (const val of arr) {
      list.append(val);
    }
    return list;
  }

  /**
   * String representation of the list
   * Time Complexity: O(n)
   * @returns {string} - String representation
   */
  toString() {
    if (!this.head) {
      return "(empty circular list)";
    }

    const values = this.toArray();
    return values.join(" -> ") + " -> (back to " + values[0] + ")";
  }

  /**
   * Iterator for the list (one complete cycle)
   */
  *[Symbol.iterator]() {
    if (!this.head) return;

    let current = this.head;
    do {
      yield current.val;
      current = current.next;
    } while (current !== this.head);
  }

  // ============================================================================
  // CIRCULAR LIST SPECIFIC OPERATIONS
  // ============================================================================

  /**
   * Rotate the list by moving head pointer k positions
   * Time Complexity: O(k % size)
   * @param {number} k - Number of positions to rotate
   */
  rotate(k) {
    if (!this.head || this.size <= 1) return;

    k = k % this.size; // Handle cases where k > size
    if (k === 0) return;

    for (let i = 0; i < k; i++) {
      this.head = this.head.next;
    }
  }

  /**
   * Split the circular list into two halves
   * Time Complexity: O(n)
   * @returns {Array} - Array of two circular lists
   */
  split() {
    if (!this.head || this.size <= 1) {
      return [this, new CircularLinkedList()];
    }

    // Find middle point
    let slow = this.head;
    let fast = this.head;
    let slowPrev = null;

    do {
      slowPrev = slow;
      slow = slow.next;
      fast = fast.next.next;
    } while (fast !== this.head && fast.next !== this.head);

    // Create first half
    const firstHalf = new CircularLinkedList();
    firstHalf.head = this.head;
    slowPrev.next = this.head;
    firstHalf.size = Math.floor(this.size / 2);

    // Create second half
    const secondHalf = new CircularLinkedList();
    if (slow !== this.head) {
      secondHalf.head = slow;
      // Find the last node of second half
      let current = slow;
      while (current.next !== this.head) {
        current = current.next;
      }
      current.next = slow;
      secondHalf.size = this.size - firstHalf.size;
    }

    return [firstHalf, secondHalf];
  }

  /**
   * Check if the list is properly circular
   * Time Complexity: O(n)
   * @returns {boolean} - True if properly circular
   */
  isCircular() {
    if (!this.head) return true; // Empty list is considered circular

    let current = this.head;
    let count = 0;

    do {
      current = current.next;
      count++;
      if (count > this.size) {
        return false; // Infinite loop detected
      }
    } while (current && current !== this.head);

    return current === this.head && count === this.size;
  }

  /**
   * Josephus problem solver
   * Time Complexity: O(n * k) where k is the skip count
   * @param {number} k - Skip count
   * @returns {*} - Last remaining element
   */
  josephus(k) {
    if (!this.head) return null;

    let current = this.head;

    while (this.size > 1) {
      // Skip k-1 nodes
      for (let i = 1; i < k; i++) {
        current = current.next;
      }

      // Remove the kth node
      const nodeToRemove = current.next;
      current.next = nodeToRemove.next;

      // If we removed the head, update head
      if (nodeToRemove === this.head) {
        this.head = current.next;
      }

      this.size--;
      current = current.next;
    }

    return this.head.val;
  }

  /**
   * Detect if there's a cycle starting from a given node
   * (This is more of a utility for general linked lists)
   * Time Complexity: O(n)
   * @param {CircularListNode} startNode - Node to start detection from
   * @returns {boolean} - True if cycle detected
   */
  static hasCycle(startNode) {
    if (!startNode) return false;

    let slow = startNode;
    let fast = startNode;

    do {
      if (!fast || !fast.next) return false;
      slow = slow.next;
      fast = fast.next.next;
    } while (slow !== fast);

    return true;
  }
}

// ============================================================================
// TESTING
// ============================================================================

function testCircularLinkedList() {
  console.log("Testing Circular Linked List...\n");

  const list = new CircularLinkedList();

  // Test basic operations
  console.log("=== Basic Operations ===");
  list.append(1);
  list.append(2);
  list.append(3);
  console.log("After appending 1, 2, 3:", list.toString());

  list.prepend(0);
  console.log("After prepending 0:", list.toString());

  list.insertAt(2, 1.5);
  console.log("After inserting 1.5 at index 2:", list.toString());

  console.log("Size:", list.getSize());
  console.log("Element at index 2:", list.get(2));
  console.log("Index of value 2:", list.indexOf(2));
  console.log("Contains 3:", list.contains(3));
  console.log("Is circular:", list.isCircular());

  // Test circular-specific operations
  console.log("\n=== Circular Operations ===");
  const list2 = CircularLinkedList.fromArray([1, 2, 3, 4, 5]);
  console.log("Original list:", list2.toString());

  list2.rotate(2);
  console.log("After rotating by 2:", list2.toString());

  // Test splitting
  console.log("\n=== Split Operation ===");
  const list3 = CircularLinkedList.fromArray([1, 2, 3, 4, 5, 6]);
  console.log("Original list:", list3.toString());

  const [first, second] = list3.split();
  console.log("First half:", first.toString());
  console.log("Second half:", second.toString());

  // Test Josephus problem
  console.log("\n=== Josephus Problem ===");
  const josephusList = CircularLinkedList.fromArray([1, 2, 3, 4, 5]);
  console.log("Josephus list:", josephusList.toString());
  console.log("Josephus survivor (k=3):", josephusList.josephus(3));

  // Test removal operations
  console.log("\n=== Removal Operations ===");
  const list4 = CircularLinkedList.fromArray([1, 2, 3, 4]);
  console.log("Before removal:", list4.toString());

  console.log("Removed first:", list4.removeFirst());
  console.log("After removing first:", list4.toString());

  console.log("Removed last:", list4.removeLast());
  console.log("After removing last:", list4.toString());

  // Test iteration
  console.log("\n=== Iteration ===");
  console.log("Using for...of loop:");
  for (const val of list4) {
    console.log(`Value: ${val}`);
  }

  // Test edge cases
  console.log("\n=== Edge Cases ===");
  const singleNode = new CircularLinkedList();
  singleNode.append(42);
  console.log("Single node list:", singleNode.toString());
  console.log("Is circular:", singleNode.isCircular());

  const emptyList = new CircularLinkedList();
  console.log("Empty list is circular:", emptyList.isCircular());
}

// Performance test for Josephus problem
function testJosephusProblem() {
  console.log("\nJosephus Problem Examples...\n");

  const testCases = [
    { n: 5, k: 2, expected: 3 },
    { n: 7, k: 3, expected: 4 },
    { n: 8, k: 3, expected: 7 }
  ];

  testCases.forEach((testCase, index) => {
    const list = CircularLinkedList.fromArray(
      Array.from({ length: testCase.n }, (_, i) => i + 1)
    );
    const survivor = list.josephus(testCase.k);

    console.log(`Test ${index + 1}: n=${testCase.n}, k=${testCase.k}`);
    console.log(`Survivor: ${survivor} (expected: ${testCase.expected})`);
    console.log(
      `Result: ${survivor === testCase.expected ? "PASS" : "FAIL"}\n`
    );
  });
}

// Uncomment to run tests
// testCircularLinkedList();
// testJosephusProblem();

module.exports = {
  CircularListNode,
  CircularLinkedList
};
