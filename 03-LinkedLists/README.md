# LinkedLists - Core Data Structure Mastery

## 📚 Overview

LinkedLists are fundamental linear data structures where elements (nodes) are stored in sequence, with each node containing data and a reference (pointer) to the next node. Unlike arrays, LinkedLists don't store elements in contiguous memory locations, making them dynamic and flexible for insertion/deletion operations.

## 🔗 Types of LinkedLists

### 1. Singly LinkedList

- Each node points to the next node
- Can only traverse in one direction
- Memory efficient (one pointer per node)

### 2. Doubly LinkedList

- Each node has pointers to both next and previous nodes
- Can traverse in both directions
- Uses more memory (two pointers per node)

### 3. Circular LinkedList

- Last node points back to the first node
- Can be singly or doubly linked
- Useful for round-robin algorithms

## ⚡ Key Operations & Complexities

| Operation          | Time Complexity | Space Complexity | Notes                             |
| ------------------ | --------------- | ---------------- | --------------------------------- |
| Search             | O(n)            | O(1)             | Must traverse from head           |
| Insert at Head     | O(1)            | O(1)             | Direct pointer manipulation       |
| Insert at Tail     | O(n) or O(1)\*  | O(1)             | \*O(1) if tail pointer maintained |
| Insert at Position | O(n)            | O(1)             | Need to traverse to position      |
| Delete Head        | O(1)            | O(1)             | Update head pointer               |
| Delete Tail        | O(n) or O(1)\*  | O(1)             | \*O(1) for doubly linked          |
| Delete at Position | O(n)            | O(1)             | Need to find the node             |

## 🎯 Core Patterns & Techniques

### 1. Two Pointers Technique

- **Slow/Fast Pointers**: Detect cycles, find middle node
- **Distance Pointers**: Find nth node from end
- **Meeting Point**: Cycle detection and entry point

### 2. Dummy Node Pattern

- Simplifies edge cases (empty list, single node)
- Useful for insertion/deletion at head
- Maintains consistent logic

### 3. Recursive Approach

- Natural fit for LinkedList operations
- Useful for reversal, merging, and copying
- Can lead to stack overflow for very long lists

### 4. Iterative with Stack

- Simulate recursion when stack space is limited
- Useful for problems requiring backtracking
- Memory vs time trade-off

## 🚀 Essential LeetCode Problems

### Easy (Foundation Building)

1. **Reverse Linked List** (206) - Master iterative and recursive reversal
2. **Merge Two Sorted Lists** (21) - Learn merging technique
3. **Remove Duplicates from Sorted List** (83) - Basic deletion patterns
4. **Linked List Cycle** (141) - Floyd's cycle detection
5. **Intersection of Two Linked Lists** (160) - Two pointers alignment

### Medium (Core Skills)

6. **Add Two Numbers** (2) - Digit manipulation and carry handling
7. **Remove Nth Node From End** (19) - Two pointers with distance
8. **Swap Nodes in Pairs** (24) - Complex pointer manipulation
9. **Rotate List** (61) - Circular manipulation
10. **Copy List with Random Pointer** (138) - Deep copying with extra pointers

### Hard (Advanced Mastery)

11. **Merge k Sorted Lists** (23) - Divide and conquer approach
12. **Reverse Nodes in k-Group** (25) - Complex reversal patterns

## 🔧 Implementation Patterns

### Basic Node Structure

```javascript
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}
```

### Common Helper Functions

```javascript
// Convert array to linked list
function arrayToList(arr) {
  /* implementation */
}

// Convert linked list to array
function listToArray(head) {
  /* implementation */
}

// Get list length
function getLength(head) {
  /* implementation */
}

// Print list values
function printList(head) {
  /* implementation */
}
```

### Problem-Solving Template

```javascript
function solveLinkedListProblem(head) {
  // 1. Handle edge cases
  if (!head) return null;

  // 2. Initialize pointers/variables
  let current = head;
  let prev = null;

  // 3. Traverse and manipulate
  while (current) {
    // Process current node
    // Update pointers
    current = current.next;
  }

  // 4. Return result
  return newHead;
}
```

## 💡 Key Insights & Tips

### 1. Edge Case Handling

- **Empty List**: Always check `if (!head)`
- **Single Node**: Consider when `head.next === null`
- **Two Nodes**: Many algorithms behave differently
- **Circular References**: Be careful with cycle creation

### 2. Pointer Management

- **Draw Diagrams**: Visualize pointer changes before coding
- **Step by Step**: Update pointers in correct order
- **Temporary Variables**: Store references before breaking links
- **Null Checks**: Always verify before dereferencing

### 3. Common Mistakes

- **Lost References**: Breaking links before storing them
- **Infinite Loops**: Not updating pointers correctly
- **Memory Leaks**: Not properly disconnecting nodes
- **Off-by-One**: Incorrect position calculations

### 4. Optimization Strategies

- **Maintain Tail Pointer**: For O(1) tail operations
- **Size Counter**: Track length for O(1) size queries
- **Dummy Head**: Simplify insertion/deletion logic
- **Two-Pass vs One-Pass**: Balance between simplicity and efficiency

## 🎨 Advanced Techniques

### 1. Floyd's Cycle Detection

```javascript
function hasCycle(head) {
  let slow = head,
    fast = head;
  while (fast?.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}
```

### 2. Finding Middle Node

```javascript
function findMiddle(head) {
  let slow = head,
    fast = head;
  while (fast?.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}
```

### 3. Reversing Sublist

```javascript
function reverseBetween(head, left, right) {
  // Complex reversal with position constraints
}
```

## 🏗️ Real-World Applications

### 1. Operating Systems

- **Process Scheduling**: Ready queue implementation
- **Memory Management**: Free block lists
- **File Systems**: Directory structures

### 2. Web Development

- **Undo/Redo Operations**: Command pattern implementation
- **Browser History**: Navigation stack
- **Event Handling**: Event listener chains

### 3. Database Systems

- **Index Structures**: B-tree node linking
- **Transaction Logs**: Sequential record keeping
- **Buffer Management**: LRU cache implementation

### 4. Network Protocols

- **Packet Queues**: Network buffer management
- **Routing Tables**: Next-hop information
- **Connection Pools**: Resource management

## 📈 Performance Considerations

### LinkedList vs Array Comparison

| Aspect             | LinkedList             | Array            |
| ------------------ | ---------------------- | ---------------- |
| Memory Access      | Non-contiguous         | Contiguous       |
| Cache Performance  | Poor                   | Excellent        |
| Random Access      | O(n)                   | O(1)             |
| Insertion/Deletion | O(1) at known position | O(n) with shifts |
| Memory Overhead    | Higher (pointers)      | Lower            |
| Memory Allocation  | Dynamic                | Static/Dynamic   |

### When to Use LinkedLists

- ✅ Frequent insertions/deletions at arbitrary positions
- ✅ Unknown or highly variable data size
- ✅ No need for random access
- ✅ Memory is fragmented
- ❌ Need cache-friendly performance
- ❌ Frequent random access required
- ❌ Memory is severely constrained

## 📚 Study Plan

### Week 3 Schedule (LinkedLists Mastery)

- **Day 1-2**: Basic operations and reversal techniques
- **Day 3-4**: Two pointers and cycle detection
- **Day 5-6**: Merging and complex manipulations
- **Day 7**: Review, practice, and advanced problems

### Practice Strategy

1. **Implement from Scratch**: Build your own LinkedList class
2. **Visualize**: Draw diagrams for complex pointer manipulations
3. **Edge Cases First**: Always start with null/empty list handling
4. **Multiple Solutions**: Try both iterative and recursive approaches
5. **Time Yourself**: Practice for interview timing

## 🎯 Learning Objectives

By the end of this section, you should be able to:

- ✅ Implement all types of LinkedLists from scratch
- ✅ Solve any LinkedList problem using appropriate patterns
- ✅ Choose optimal approaches for different scenarios
- ✅ Handle edge cases confidently
- ✅ Explain time/space complexity trade-offs
- ✅ Apply LinkedList concepts to real-world problems

---

_Continue to the `problems/` directory for hands-on practice with essential LinkedList algorithms, and `implementations/` for complete data structure implementations._
