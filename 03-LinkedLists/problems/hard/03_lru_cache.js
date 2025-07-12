/**
 * LRU Cache (LeetCode 146)
 * Difficulty: Hard
 *
 * Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.
 *
 * Implement the LRUCache class:
 * - LRUCache(capacity) Initialize the LRU cache with positive size capacity.
 * - get(key) Return the value of the key if it exists, otherwise return -1.
 * - put(key, value) Update the value of the key if it exists. Otherwise, add the key-value pair.
 *   If inserting causes cache to exceed capacity, remove the least recently used key.
 *
 * Both get and put must run in O(1) average time complexity.
 *
 * Pattern: HashMap + Doubly Linked List
 */

/**
 * Node for doubly linked list
 */
class DLLNode {
  constructor(key = 0, value = 0) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

/**
 * Approach 1: HashMap + Doubly Linked List (Optimal)
 * Time: O(1) for both get and put
 * Space: O(capacity)
 */
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // key -> node

    // Create dummy head and tail nodes
    this.head = new DLLNode();
    this.tail = new DLLNode();
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  /**
   * Get value by key
   * If key exists, move to front and return value
   * Otherwise return -1
   */
  get(key) {
    if (this.cache.has(key)) {
      const node = this.cache.get(key);
      this.moveToFront(node);
      return node.value;
    }
    return -1;
  }

  /**
   * Put key-value pair
   * If key exists, update value and move to front
   * If key doesn't exist, add new node
   * If capacity exceeded, remove LRU node
   */
  put(key, value) {
    if (this.cache.has(key)) {
      // Update existing key
      const node = this.cache.get(key);
      node.value = value;
      this.moveToFront(node);
    } else {
      // Add new key
      const newNode = new DLLNode(key, value);

      if (this.cache.size >= this.capacity) {
        // Remove LRU node
        this.removeLRU();
      }

      this.cache.set(key, newNode);
      this.addToFront(newNode);
    }
  }

  /**
   * Move existing node to front (most recently used)
   */
  moveToFront(node) {
    this.removeNode(node);
    this.addToFront(node);
  }

  /**
   * Add node right after head
   */
  addToFront(node) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  }

  /**
   * Remove node from its current position
   */
  removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  /**
   * Remove least recently used node (before tail)
   */
  removeLRU() {
    const lruNode = this.tail.prev;
    this.removeNode(lruNode);
    this.cache.delete(lruNode.key);
  }

  /**
   * Get current cache state for debugging
   */
  getState() {
    const state = [];
    let current = this.head.next;
    while (current !== this.tail) {
      state.push({ key: current.key, value: current.value });
      current = current.next;
    }
    return state;
  }
}

/**
 * Approach 2: Using JavaScript Map (simpler but less educational)
 * Time: O(1) for both operations
 * Space: O(capacity)
 */
class LRUCacheMap {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (this.cache.has(key)) {
      const value = this.cache.get(key);
      // Move to end (most recent)
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
    return -1;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      // Update existing
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // Remove LRU (first item)
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(key, value);
  }

  getState() {
    return Array.from(this.cache.entries()).map(([key, value]) => ({
      key,
      value
    }));
  }
}

// Test cases
function runTests() {
  console.log("Testing LRU Cache:");

  // Test Case 1: Basic operations
  console.log("\\nTest 1: Basic operations");
  const lru1 = new LRUCache(2);

  lru1.put(1, 1);
  lru1.put(2, 2);
  console.log(`get(1): ${lru1.get(1)}`); // returns 1
  lru1.put(3, 3); // evicts key 2
  console.log(`get(2): ${lru1.get(2)}`); // returns -1
  lru1.put(4, 4); // evicts key 1
  console.log(`get(1): ${lru1.get(1)}`); // returns -1
  console.log(`get(3): ${lru1.get(3)}`); // returns 3
  console.log(`get(4): ${lru1.get(4)}`); // returns 4

  // Test Case 2: Update existing key
  console.log("\\nTest 2: Update existing key");
  const lru2 = new LRUCache(2);

  lru2.put(1, 1);
  lru2.put(2, 2);
  lru2.put(1, 10); // update key 1
  console.log(`get(1): ${lru2.get(1)}`); // returns 10
  console.log(`get(2): ${lru2.get(2)}`); // returns 2

  // Test Case 3: Access pattern
  console.log("\\nTest 3: Access pattern");
  const lru3 = new LRUCache(3);

  lru3.put(1, 1);
  lru3.put(2, 2);
  lru3.put(3, 3);
  console.log(`State: ${JSON.stringify(lru3.getState())}`);

  lru3.get(2); // access 2
  console.log(`After get(2): ${JSON.stringify(lru3.getState())}`);

  lru3.put(4, 4); // should evict 1
  console.log(`After put(4,4): ${JSON.stringify(lru3.getState())}`);
  console.log(`get(1): ${lru3.get(1)}`); // returns -1

  // Test Case 4: Compare implementations
  console.log("\\nTest 4: Compare implementations");
  const lruDLL = new LRUCache(2);
  const lruMap = new LRUCacheMap(2);

  const operations = [
    ["put", 1, 1],
    ["put", 2, 2],
    ["get", 1],
    ["put", 3, 3],
    ["get", 2],
    ["put", 4, 4],
    ["get", 1],
    ["get", 3],
    ["get", 4]
  ];

  console.log("DLL Implementation vs Map Implementation:");
  operations.forEach((op) => {
    if (op[0] === "put") {
      lruDLL.put(op[1], op[2]);
      lruMap.put(op[1], op[2]);
      console.log(`put(${op[1]}, ${op[2]})`);
    } else {
      const result1 = lruDLL.get(op[1]);
      const result2 = lruMap.get(op[1]);
      console.log(
        `get(${op[1]}): DLL=${result1}, Map=${result2} ${
          result1 === result2 ? "✓" : "✗"
        }`
      );
    }
  });
}

// Performance test
function performanceTest() {
  console.log("\\n\\nPerformance Test:");

  const capacity = 1000;
  const operations = 10000;

  console.log(`Capacity: ${capacity}, Operations: ${operations}`);

  // Test DLL implementation
  const lruDLL = new LRUCache(capacity);
  let start = performance.now();

  for (let i = 0; i < operations; i++) {
    if (i % 2 === 0) {
      lruDLL.put(i, i * 2);
    } else {
      lruDLL.get(i / 2);
    }
  }

  let end = performance.now();
  console.log(`DLL Implementation: ${(end - start).toFixed(2)}ms`);

  // Test Map implementation
  const lruMap = new LRUCacheMap(capacity);
  start = performance.now();

  for (let i = 0; i < operations; i++) {
    if (i % 2 === 0) {
      lruMap.put(i, i * 2);
    } else {
      lruMap.get(i / 2);
    }
  }

  end = performance.now();
  console.log(`Map Implementation: ${(end - start).toFixed(2)}ms`);
}

// Algorithm explanation
function explainAlgorithm() {
  console.log(`
LRU Cache - Algorithm Explanation:

LRU (Least Recently Used) Cache is a cache eviction policy that removes
the least recently used items when the cache reaches capacity.

Requirements:
- get(key): O(1) time
- put(key, value): O(1) time
- Track access order
- Remove LRU item when capacity exceeded

HashMap + Doubly Linked List Solution:

Components:
1. HashMap: key → node mapping for O(1) access
2. Doubly Linked List: maintains access order
   - Head: most recently used
   - Tail: least recently used

Operations:
1. get(key):
   - Check if key exists in HashMap
   - If yes, move node to front and return value
   - If no, return -1

2. put(key, value):
   - If key exists: update value, move to front
   - If key doesn't exist:
     - If at capacity: remove LRU node
     - Add new node to front

Doubly Linked List Operations:
- Add to front: O(1) with head pointer
- Remove node: O(1) with prev/next pointers
- Remove from tail: O(1) with tail pointer

Why Doubly Linked List?
- Need to remove arbitrary nodes (when moving to front)
- Need prev pointer for O(1) removal
- Singly linked list would require O(n) traversal

Alternative with JavaScript Map:
- Map maintains insertion order
- delete + set to move to end
- First entry is LRU
- Simpler but less educational

Time Complexity: O(1) for both get and put
Space Complexity: O(capacity)

Applications:
- CPU cache management
- Web browser cache
- Database buffer pools
- Memory management systems
- CDN cache policies
    `);
}

// Run tests if this file is executed directly
if (typeof require !== "undefined" && require.main === module) {
  runTests();
  performanceTest();
  explainAlgorithm();
}

module.exports = {
  LRUCache,
  LRUCacheMap,
  DLLNode
};
