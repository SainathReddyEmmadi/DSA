# LinkedList Implementations

This directory contains comprehensive implementations of various types of linked lists in JavaScript.

## 📁 Files Overview

### Core Implementations

1. **[singly-linked-list.js](./singly-linked-list.js)**

   - Basic singly linked list with standard operations
   - Efficient insertion/deletion at head
   - Sequential access only

2. **[doubly-linked-list.js](./doubly-linked-list.js)**

   - Bidirectional linked list implementation
   - Efficient operations at both ends
   - Backward traversal support

3. **[circular-linked-list.js](./circular-linked-list.js)**
   - Circular structure with no null pointers
   - Perfect for round-robin algorithms
   - Includes Josephus problem solver

## 🚀 Quick Start

```javascript
// Singly Linked List
const { SinglyLinkedList } = require("./singly-linked-list");
const list = new SinglyLinkedList();
list.append(1);
list.append(2);
list.prepend(0);
console.log(list.toString()); // null <- 0 -> 1 -> 2 -> null

// Doubly Linked List
const { DoublyLinkedList } = require("./doubly-linked-list");
const dList = new DoublyLinkedList();
dList.append(1);
dList.append(2);
dList.prepend(0);
console.log(dList.toString()); // null <- 0 <-> 1 <-> 2 -> null

// Circular Linked List
const { CircularLinkedList } = require("./circular-linked-list");
const cList = new CircularLinkedList();
cList.append(1);
cList.append(2);
cList.append(3);
console.log(cList.toString()); // 1 -> 2 -> 3 -> (back to 1)
```

## 📊 Performance Comparison

| Operation     | Singly | Doubly | Circular |
| ------------- | ------ | ------ | -------- |
| **Insertion** |
| At head       | O(1)   | O(1)   | O(n)\*   |
| At tail       | O(n)   | O(1)   | O(n)     |
| At position   | O(n)   | O(n)   | O(n)     |
| **Deletion**  |
| At head       | O(1)   | O(1)   | O(n)\*   |
| At tail       | O(n)   | O(1)   | O(n)     |
| At position   | O(n)   | O(n)   | O(n)     |
| **Access**    | O(n)   | O(n)   | O(n)     |
| **Search**    | O(n)   | O(n)   | O(n)     |

\*Circular lists need to update the last node's pointer when modifying head

## 🔧 Common Operations

### Basic Operations

```javascript
// All implementations support these core operations:
list.append(value); // Add to end
list.prepend(value); // Add to beginning
list.insertAt(index, value); // Insert at position
list.removeFirst(); // Remove first element
list.removeLast(); // Remove last element
list.removeAt(index); // Remove at position
list.remove(value); // Remove by value
list.get(index); // Get element at index
list.set(index, value); // Set element at index
list.indexOf(value); // Find index of value
list.contains(value); // Check if contains value
list.getSize(); // Get size
list.isEmpty(); // Check if empty
list.clear(); // Clear all elements
list.toArray(); // Convert to array
list.toString(); // String representation
```

### Advanced Operations

```javascript
// Specialized operations available in different implementations:

// Singly & Doubly
list.reverse(); // Reverse the list
list.findMiddle(); // Find middle element
list.hasCycle(); // Detect cycles
list.mergeSorted(otherList); // Merge sorted lists

// Doubly only
list.toArrayReverse(); // Array in reverse order
list.lastIndexOf(value); // Last occurrence index
list.rotateRight(k); // Rotate right by k positions
list.clone(); // Deep copy

// Circular only
list.rotate(k); // Move head k positions
list.split(); // Split into two halves
list.josephus(k); // Solve Josephus problem
list.isCircular(); // Verify circular structure
```

## 🎯 Use Cases

### Singly Linked List

- **Best for**: Sequential access, memory-constrained environments
- **Use cases**:
  - Implementing stacks
  - Undo functionality
  - Music playlist (forward only)
  - Browser history

### Doubly Linked List

- **Best for**: Bidirectional traversal, frequent insertions/deletions
- **Use cases**:
  - Browser history (forward/backward)
  - LRU cache implementation
  - Text editors (cursor movement)
  - Music playlist (forward/backward)

### Circular Linked List

- **Best for**: Cyclic operations, round-robin scheduling
- **Use cases**:
  - Round-robin CPU scheduling
  - Multiplayer games (turn rotation)
  - Circular buffer implementation
  - Josephus problem variations

## 🧪 Testing

Each implementation includes comprehensive test suites:

```javascript
// Run tests for specific implementation
const { testSinglyLinkedList } = require("./singly-linked-list");
testSinglyLinkedList();

const { testDoublyLinkedList } = require("./doubly-linked-list");
testDoublyLinkedList();

const { testCircularLinkedList } = require("./circular-linked-list");
testCircularLinkedList();
```

## 🔍 Implementation Details

### Memory Usage

- **Singly**: 1 pointer per node (next)
- **Doubly**: 2 pointers per node (next, prev)
- **Circular**: 1 pointer per node (next) but no null termination

### Iterator Support

All implementations support JavaScript iteration protocols:

```javascript
// for...of loops work with all implementations
for (const value of list) {
  console.log(value);
}

// Doubly linked list also supports reverse iteration
for (const value of list.reverseIterator()) {
  console.log(value);
}
```

### Error Handling

- Index bounds checking for all position-based operations
- Graceful handling of empty list operations
- Clear error messages for invalid operations

## 📚 Related Problems

These implementations support solving common LeetCode problems:

- Reverse Linked List (206)
- Merge Two Sorted Lists (21)
- Linked List Cycle (141)
- Add Two Numbers (2)
- Remove Nth Node From End (19)
- Middle of Linked List (876)

## 🚀 Performance Tips

1. **Choose the right type**: Singly for memory efficiency, doubly for bidirectional access
2. **Cache tail pointer**: For frequent append operations in singly linked lists
3. **Use dummy nodes**: Simplify edge cases in algorithms
4. **Consider circular**: For cyclic operations and eliminating null checks

## 🔗 Integration

These implementations can be easily integrated with the problem solutions in the `../problems/` directory and work seamlessly with the utility functions provided.
