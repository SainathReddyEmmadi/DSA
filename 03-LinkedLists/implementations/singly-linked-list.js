/**
 * Singly Linked List Implementation
 *
 * A singly linked list is a linear data structure where each element (node)
 * contains data and a reference (or link) to the next node in the sequence.
 *
 * Features:
 * - Dynamic size
 * - Efficient insertion/deletion at the beginning
 * - Sequential access only
 * - Memory efficient (no wasted space)
 *
 * Time Complexities:
 * - Access: O(n)
 * - Search: O(n)
 * - Insertion: O(1) at head, O(n) at arbitrary position
 * - Deletion: O(1) at head, O(n) at arbitrary position
 *
 * Space Complexity: O(n)
 */

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  /**
   * Add element to the beginning of the list
   * Time Complexity: O(1)
   * @param {*} val - Value to add
   */
  prepend(val) {
    // Your next pointer should point to whatever the current head is pointing to
    const newNode = new ListNode(val, this.head);
    this.head = newNode;
    this.size++;
  }

  /**
   * Add element to the end of the list
   * Time Complexity: O(n)
   * @param {*} val - Value to add
   */
  append(val) {
    const newNode = new ListNode(val);

    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
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

    const newNode = new ListNode(val);
    let current = this.head;

    for (let i = 0; i < index - 1; i++) {
      current = current.next;
    }

    newNode.next = current.next;
    current.next = newNode;
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
    this.head = this.head.next;
    this.size--;
    return removedVal;
  }

  /**
   * Remove and return last element
   * Time Complexity: O(n)
   * @returns {*} - Removed value or null if empty
   */
  removeLast() {
    if (!this.head) {
      return null;
    }
    if (!this.head.next) {
      const removedVal = this.head.val;
      this.head = null;
      this.size--;
      return removedVal;
    }
    let previous = null;
    let current = this.head;
    while (current.next) {
      previous = current;
      current = current.next;
    }
    previous.next = current.next;
    this.size--;
    return current.val;
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
    let previous = null;
    let current = this.head;
    for (let i = 0; i < index; i++) {
      previous = current;
      current = current.next;
    }
    previous.next = current.next;
    this.size--;
    return current.val;
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

    if (this.head.val === val) {
      this.removeFirst();
      return true;
    }
    let previous = null;
    let current = this.head;
    while (current) {
      if (current.val === val) {
        previous.next = current.next;
        this.size--;
        return true;
      }
      previous = current;
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
   * Reverse the list in place
   * Time Complexity: O(n)
   */
  reverse() {
    let prev = null;
    let current = this.head;

    while (current) {
      const next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    this.head = prev;
  }

  /**
   * Convert list to array
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
   * Create list from array
   * Time Complexity: O(n)
   * @param {Array} arr - Array to convert
   * @returns {SinglyLinkedList} - New linked list
   */
  static fromArray(arr) {
    const list = new SinglyLinkedList();
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
      return "null";
    }

    const values = [];
    let current = this.head;

    while (current) {
      values.push(current.val);
      current = current.next;
    }

    return values.join(" -> ") + " -> null";
  }

  /**
   * Iterator for the list (enables for...of loops)
   */
  *[Symbol.iterator]() {
    let current = this.head;
    while (current) {
      yield current.val;
      current = current.next;
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
   * Detect if the list has a cycle
   * Time Complexity: O(n)
   * @returns {boolean} - True if cycle exists
   */
  hasCycle() {
    if (!this.head || !this.head.next) return false;

    let slow = this.head;
    let fast = this.head;

    while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;

      if (slow === fast) {
        return true;
      }
    }

    return false;
  }

  /**
   * Remove duplicates from sorted list
   * Time Complexity: O(n)
   */
  removeDuplicatesFromSorted() {
    let current = this.head;

    while (current && current.next) {
      if (current.val === current.next.val) {
        current.next = current.next.next;
        this.size--;
      } else {
        current = current.next;
      }
    }
  }

  /**
   * Merge with another sorted linked list
   * Time Complexity: O(m + n)
   * @param {SinglyLinkedList} other - Other sorted list to merge
   * @returns {SinglyLinkedList} - New merged list
   */
  mergeSorted(other) {
    const dummy = new ListNode(0);
    let current = dummy;
    let list1 = this.head;
    let list2 = other.head;

    while (list1 && list2) {
      if (list1.val <= list2.val) {
        current.next = new ListNode(list1.val);
        list1 = list1.next;
      } else {
        current.next = new ListNode(list2.val);
        list2 = list2.next;
      }
      current = current.next;
    }

    // Append remaining nodes
    while (list1) {
      current.next = new ListNode(list1.val);
      list1 = list1.next;
      current = current.next;
    }

    while (list2) {
      current.next = new ListNode(list2.val);
      list2 = list2.next;
      current = current.next;
    }

    const result = new SinglyLinkedList();
    result.head = dummy.next;

    // Update size
    let temp = result.head;
    while (temp) {
      result.size++;
      temp = temp.next;
    }

    return result;
  }
}

// ============================================================================
// TESTING
// ============================================================================

function testSinglyLinkedList() {
  console.log("Testing Singly Linked List...\n");

  const list = new SinglyLinkedList();

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
  const list2 = SinglyLinkedList.fromArray([1, 2, 2, 3, 4, 4, 5]);
  console.log("List with duplicates:", list2.toString());
  list2.removeDuplicatesFromSorted();
  console.log("After removing duplicates:", list2.toString());

  list2.reverse();
  console.log("After reversing:", list2.toString());

  console.log("Middle element:", list2.findMiddle());

  // Test iteration
  console.log("\n=== Iteration ===");
  console.log("Using for...of loop:");
  for (const val of list2) {
    console.log(`Value: ${val}`);
  }

  // Test merge
  console.log("\n=== Merge Sorted Lists ===");
  const list3 = SinglyLinkedList.fromArray([1, 3, 5]);
  const list4 = SinglyLinkedList.fromArray([2, 4, 6]);
  const merged = list3.mergeSorted(list4);
  console.log("List 1:", list3.toString());
  console.log("List 2:", list4.toString());
  console.log("Merged:", merged.toString());
}

// Uncomment to run tests
// testSinglyLinkedList();

module.exports = {
  ListNode,
  SinglyLinkedList
};
