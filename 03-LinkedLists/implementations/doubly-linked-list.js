/**
 * Doubly Linked List Implementation
 *
 * A doubly linked list is a linear data structure where each element (node)
 * contains data and two references: one to the next node and one to the previous node.
 * This allows for bidirectional traversal.
 *
 * Features:
 * - Dynamic size
 * - Bidirectional traversal
 * - Efficient insertion/deletion at both ends
 * - More memory overhead than singly linked list
 *
 * Time Complexities:
 * - Access: O(n)
 * - Search: O(n)
 * - Insertion: O(1) at head/tail, O(n) at arbitrary position
 * - Deletion: O(1) at head/tail, O(n) at arbitrary position (O(1) if node reference given)
 *
 * Space Complexity: O(n)
 */

class DoublyListNode {
  constructor(val = 0, next = null, prev = null) {
    this.val = val;
    this.next = next;
    this.prev = prev;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  /**
   * Add element to the beginning of the list
   * Time Complexity: O(1)
   * @param {*} val - Value to add
   */
  prepend(val) {
    const newNode = new DoublyListNode(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.size++;
  }

  /**
   * Add element to the end of the list
   * Time Complexity: O(1)
   * @param {*} val - Value to add
   */
  append(val) {
    const newNode = new DoublyListNode(val);

    if (!this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
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

    const newNode = new DoublyListNode(val);
    let current;

    // Optimize by choosing shorter path
    if (index <= this.size / 2) {
      // Traverse from head
      current = this.head;
      for (let i = 0; i < index; i++) {
        current = current.next;
      }
    } else {
      // Traverse from tail
      current = this.tail;
      for (let i = this.size - 1; i > index; i--) {
        current = current.prev;
      }
    }

    // Insert before current
    newNode.next = current;
    newNode.prev = current.prev;
    current.prev.next = newNode;
    current.prev = newNode;
    this.size++;
  }

  /**
   * Remove and return first element
   * Time Complexity: O(1)
   * @returns {*} - Removed value or null if empty
   */
  removeFirst() {
    if (!this.head) {
      return null;
    }

    const removedVal = this.head.val;

    if (this.head === this.tail) {
      // Only one element
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }

    this.size--;
    return removedVal;
  }

  /**
   * Remove and return last element
   * Time Complexity: O(1)
   * @returns {*} - Removed value or null if empty
   */
  removeLast() {
    if (!this.tail) {
      return null;
    }

    const removedVal = this.tail.val;

    if (this.head === this.tail) {
      // Only one element
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }

    this.size--;
    return removedVal;
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

    if (index === this.size - 1) {
      return this.removeLast();
    }

    let current;

    // Optimize by choosing shorter path
    if (index <= this.size / 2) {
      // Traverse from head
      current = this.head;
      for (let i = 0; i < index; i++) {
        current = current.next;
      }
    } else {
      // Traverse from tail
      current = this.tail;
      for (let i = this.size - 1; i > index; i--) {
        current = current.prev;
      }
    }

    const removedVal = current.val;
    current.prev.next = current.next;
    current.next.prev = current.prev;
    this.size--;
    return removedVal;
  }

  /**
   * Remove specific node (if you have reference to it)
   * Time Complexity: O(1)
   * @param {DoublyListNode} node - Node to remove
   * @returns {*} - Removed value
   */
  removeNode(node) {
    if (!node) return null;

    const removedVal = node.val;

    if (node === this.head && node === this.tail) {
      // Only node
      this.head = null;
      this.tail = null;
    } else if (node === this.head) {
      // Head node
      this.head = node.next;
      this.head.prev = null;
    } else if (node === this.tail) {
      // Tail node
      this.tail = node.prev;
      this.tail.next = null;
    } else {
      // Middle node
      node.prev.next = node.next;
      node.next.prev = node.prev;
    }

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
    let current = this.head;

    while (current) {
      if (current.val === val) {
        this.removeNode(current);
        return true;
      }
      current = current.next;
    }

    return false;
  }

  /**
   * Find index of first occurrence of value
   * Time Complexity: O(n)
   * @param {*} val - Value to find
   * @returns {number} - Index or -1 if not found
   */
  indexOf(val) {
    let current = this.head;
    let index = 0;

    while (current) {
      if (current.val === val) {
        return index;
      }
      current = current.next;
      index++;
    }

    return -1;
  }

  /**
   * Find index of last occurrence of value
   * Time Complexity: O(n)
   * @param {*} val - Value to find
   * @returns {number} - Index or -1 if not found
   */
  lastIndexOf(val) {
    let current = this.tail;
    let index = this.size - 1;

    while (current) {
      if (current.val === val) {
        return index;
      }
      current = current.prev;
      index--;
    }

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

    let current;

    // Optimize by choosing shorter path
    if (index <= this.size / 2) {
      // Traverse from head
      current = this.head;
      for (let i = 0; i < index; i++) {
        current = current.next;
      }
    } else {
      // Traverse from tail
      current = this.tail;
      for (let i = this.size - 1; i > index; i--) {
        current = current.prev;
      }
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

    let current;

    // Optimize by choosing shorter path
    if (index <= this.size / 2) {
      // Traverse from head
      current = this.head;
      for (let i = 0; i < index; i++) {
        current = current.next;
      }
    } else {
      // Traverse from tail
      current = this.tail;
      for (let i = this.size - 1; i > index; i--) {
        current = current.prev;
      }
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
    this.tail = null;
    this.size = 0;
  }

  /**
   * Reverse the list in place
   * Time Complexity: O(n)
   */
  reverse() {
    let current = this.head;

    while (current) {
      // Swap next and prev pointers
      [current.next, current.prev] = [current.prev, current.next];
      current = current.prev; // Note: current.prev is the old next
    }

    // Swap head and tail
    [this.head, this.tail] = [this.tail, this.head];
  }

  /**
   * Convert list to array (forward direction)
   * Time Complexity: O(n)
   * @returns {Array} - Array representation
   */
  toArray() {
    const result = [];
    let current = this.head;

    while (current) {
      result.push(current.val);
      current = current.next;
    }

    return result;
  }

  /**
   * Convert list to array (backward direction)
   * Time Complexity: O(n)
   * @returns {Array} - Array representation in reverse
   */
  toArrayReverse() {
    const result = [];
    let current = this.tail;

    while (current) {
      result.push(current.val);
      current = current.prev;
    }

    return result;
  }

  /**
   * Create list from array
   * Time Complexity: O(n)
   * @param {Array} arr - Array to convert
   * @returns {DoublyLinkedList} - New linked list
   */
  static fromArray(arr) {
    const list = new DoublyLinkedList();
    for (const val of arr) {
      list.append(val);
    }
    return list;
  }

  /**
   * String representation of the list (forward)
   * Time Complexity: O(n)
   * @returns {string} - String representation
   */
  toString() {
    if (!this.head) {
      return "null";
    }

    const values = [];
    let current = this.head;

    while (current) {
      values.push(current.val);
      current = current.next;
    }

    return "null <- " + values.join(" <-> ") + " -> null";
  }

  /**
   * String representation of the list (backward)
   * Time Complexity: O(n)
   * @returns {string} - String representation in reverse
   */
  toStringReverse() {
    if (!this.tail) {
      return "null";
    }

    const values = [];
    let current = this.tail;

    while (current) {
      values.push(current.val);
      current = current.prev;
    }

    return "null <- " + values.join(" <-> ") + " -> null";
  }

  /**
   * Forward iterator for the list (enables for...of loops)
   */
  *[Symbol.iterator]() {
    let current = this.head;
    while (current) {
      yield current.val;
      current = current.next;
    }
  }

  /**
   * Backward iterator for the list
   */
  *reverseIterator() {
    let current = this.tail;
    while (current) {
      yield current.val;
      current = current.prev;
    }
  }

  // ============================================================================
  // ADVANCED OPERATIONS
  // ============================================================================

  /**
   * Find the middle node of the list
   * Time Complexity: O(n)
   * @returns {*} - Value of middle node or null if empty
   */
  findMiddle() {
    if (!this.head) return null;

    let slow = this.head;
    let fast = this.head;

    while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;
    }

    return slow.val;
  }

  /**
   * Rotate the list to the right by k positions
   * Time Complexity: O(n)
   * @param {number} k - Number of positions to rotate
   */
  rotateRight(k) {
    if (!this.head || this.size <= 1 || k === 0) return;

    k = k % this.size; // Handle cases where k > size
    if (k === 0) return;

    // Find the new tail (size - k - 1 from head)
    let newTail = this.head;
    for (let i = 0; i < this.size - k - 1; i++) {
      newTail = newTail.next;
    }

    // New head is next to new tail
    const newHead = newTail.next;

    // Break the connection
    newTail.next = null;
    newHead.prev = null;

    // Connect old tail to old head
    this.tail.next = this.head;
    this.head.prev = this.tail;

    // Update head and tail
    this.head = newHead;
    this.tail = newTail;
  }

  /**
   * Clone the list (deep copy)
   * Time Complexity: O(n)
   * @returns {DoublyLinkedList} - Cloned list
   */
  clone() {
    const cloned = new DoublyLinkedList();
    let current = this.head;

    while (current) {
      cloned.append(current.val);
      current = current.next;
    }

    return cloned;
  }

  /**
   * Merge with another sorted doubly linked list
   * Time Complexity: O(m + n)
   * @param {DoublyLinkedList} other - Other sorted list to merge
   * @returns {DoublyLinkedList} - New merged list
   */
  mergeSorted(other) {
    const result = new DoublyLinkedList();
    let current1 = this.head;
    let current2 = other.head;

    while (current1 && current2) {
      if (current1.val <= current2.val) {
        result.append(current1.val);
        current1 = current1.next;
      } else {
        result.append(current2.val);
        current2 = current2.next;
      }
    }

    // Append remaining nodes
    while (current1) {
      result.append(current1.val);
      current1 = current1.next;
    }

    while (current2) {
      result.append(current2.val);
      current2 = current2.next;
    }

    return result;
  }
}

// ============================================================================
// TESTING
// ============================================================================

function testDoublyLinkedList() {
  console.log("Testing Doubly Linked List...\n");

  const list = new DoublyLinkedList();

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
  console.log("Last index of value 2:", list.lastIndexOf(2));

  // Test bidirectional traversal
  console.log("\n=== Bidirectional Traversal ===");
  console.log("Forward:", list.toArray());
  console.log("Backward:", list.toArrayReverse());
  console.log("Forward string:", list.toString());
  console.log("Backward string:", list.toStringReverse());

  // Test removal operations
  console.log("\n=== Removal Operations ===");
  console.log("Removed first:", list.removeFirst());
  console.log("After removing first:", list.toString());

  console.log("Removed last:", list.removeLast());
  console.log("After removing last:", list.toString());

  console.log("Removed at index 1:", list.removeAt(1));
  console.log("After removing at index 1:", list.toString());

  // Test advanced operations
  console.log("\n=== Advanced Operations ===");
  const list2 = DoublyLinkedList.fromArray([1, 2, 3, 4, 5]);
  console.log("Original list:", list2.toString());

  list2.reverse();
  console.log("After reversing:", list2.toString());

  console.log("Middle element:", list2.findMiddle());

  list2.rotateRight(2);
  console.log("After rotating right by 2:", list2.toString());

  // Test iteration
  console.log("\n=== Iteration ===");
  console.log("Forward iteration:");
  for (const val of list2) {
    console.log(`Value: ${val}`);
  }

  console.log("Backward iteration:");
  for (const val of list2.reverseIterator()) {
    console.log(`Value: ${val}`);
  }

  // Test merge
  console.log("\n=== Merge Sorted Lists ===");
  const list3 = DoublyLinkedList.fromArray([1, 3, 5]);
  const list4 = DoublyLinkedList.fromArray([2, 4, 6]);
  const merged = list3.mergeSorted(list4);
  console.log("List 1:", list3.toString());
  console.log("List 2:", list4.toString());
  console.log("Merged:", merged.toString());

  // Test cloning
  console.log("\n=== Cloning ===");
  const original = DoublyLinkedList.fromArray([1, 2, 3]);
  const cloned = original.clone();
  console.log("Original:", original.toString());
  console.log("Cloned:", cloned.toString());

  cloned.append(4);
  console.log("After modifying clone:");
  console.log("Original:", original.toString());
  console.log("Cloned:", cloned.toString());
}

// Uncomment to run tests
// testDoublyLinkedList();

module.exports = {
  DoublyListNode,
  DoublyLinkedList
};
