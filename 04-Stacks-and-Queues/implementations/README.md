# Stacks and Queues - Implementations

This directory contains comprehensive implementations of stack and queue data structures in JavaScript, along with their variants and practical applications.

## 📁 Files Overview

### Core Data Structures

1. **[stack.js](./stack.js)** - Complete stack implementation

   - Array-based stack with all standard operations
   - Linked list-based stack for comparison
   - Advanced stack with min/max tracking
   - Practical applications and performance tests

2. **[queue.js](./queue.js)** - Complete queue implementation

   - Array-based queue with optimized dequeue
   - Linked list-based queue
   - Circular queue with fixed capacity
   - Priority queue (simple array-based)
   - Practical applications including BFS

3. **[deque.js](./deque.js)** - Double-ended queue implementation

   - Array-based deque with dynamic resizing
   - Linked list-based deque
   - Sliding window deque for efficient algorithms
   - Applications in palindrome checking and sliding window problems

4. **[priority-queue.js](./priority-queue.js)** - Advanced priority queue
   - Heap-based implementation for optimal performance
   - Min and Max priority queues
   - Simple array-based version for comparison
   - Applications in task scheduling and graph algorithms

## 🔧 Implementation Features

### Stack Operations

```javascript
const stack = new Stack();
stack.push(element); // O(1) - Add to top
stack.pop(); // O(1) - Remove from top
stack.peek(); // O(1) - View top element
stack.isEmpty(); // O(1) - Check if empty
stack.size(); // O(1) - Get size
```

### Queue Operations

```javascript
const queue = new Queue();
queue.enqueue(element); // O(1) - Add to rear
queue.dequeue(); // O(1) - Remove from front
queue.front(); // O(1) - View front element
queue.rear(); // O(1) - View rear element
queue.isEmpty(); // O(1) - Check if empty
queue.size(); // O(1) - Get size
```

### Deque Operations

```javascript
const deque = new Deque();
deque.addFront(element); // O(1) - Add to front
deque.addRear(element); // O(1) - Add to rear
deque.removeFront(); // O(1) - Remove from front
deque.removeRear(); // O(1) - Remove from rear
```

### Priority Queue Operations

```javascript
const pq = new PriorityQueue();
pq.enqueue(element, priority); // O(log n) - Add with priority
pq.dequeue(); // O(log n) - Remove highest priority
pq.peek(); // O(1) - View highest priority
```

## 🎯 Key Patterns and Algorithms

### 1. Monotonic Stack/Queue

Used for problems involving next greater/smaller element:

```javascript
// Next greater element pattern
function nextGreaterElement(nums) {
  const stack = new Stack();
  const result = new Array(nums.length).fill(-1);

  for (let i = 0; i < nums.length; i++) {
    while (!stack.isEmpty() && nums[stack.peek()] < nums[i]) {
      const index = stack.pop();
      result[index] = nums[i];
    }
    stack.push(i);
  }

  return result;
}
```

### 2. Sliding Window with Deque

Efficient for sliding window maximum/minimum:

```javascript
function slidingWindowMaximum(nums, k) {
  const deque = new Deque();
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    // Remove elements outside window
    while (!deque.isEmpty() && deque.front() <= i - k) {
      deque.removeFront();
    }

    // Remove smaller elements
    while (!deque.isEmpty() && nums[deque.rear()] < nums[i]) {
      deque.removeRear();
    }

    deque.addRear(i);

    if (i >= k - 1) {
      result.push(nums[deque.front()]);
    }
  }

  return result;
}
```

### 3. Priority-based Processing

Using priority queues for task scheduling:

```javascript
class TaskScheduler {
  constructor() {
    this.tasks = new MinPriorityQueue();
  }

  addTask(name, priority) {
    this.tasks.enqueue(name, priority);
  }

  executeNext() {
    return this.tasks.dequeue(); // Highest priority first
  }
}
```

## 🏗️ Implementation Variations

### Stack Implementations

1. **Array-based**: Uses JavaScript array with push/pop
2. **Linked List**: Uses nodes with next pointers
3. **Advanced**: Includes min/max tracking in O(1)

### Queue Implementations

1. **Array-based**: Optimized with front index to avoid shifting
2. **Linked List**: Uses head/tail pointers
3. **Circular**: Fixed capacity with wraparound
4. **Priority**: Heap-based for optimal performance

### Design Trade-offs

| Implementation | Time Complexity  | Space Complexity | Use Case        |
| -------------- | ---------------- | ---------------- | --------------- |
| Array Stack    | O(1) all ops     | O(n)             | General purpose |
| Linked Stack   | O(1) all ops     | O(n) + overhead  | Dynamic size    |
| Array Queue    | O(1) all ops     | O(n)             | General purpose |
| Linked Queue   | O(1) all ops     | O(n) + overhead  | Dynamic size    |
| Circular Queue | O(1) all ops     | O(k) fixed       | Fixed capacity  |
| Priority Queue | O(log n) enq/deq | O(n)             | Priority-based  |

## 🧪 Testing and Validation

Each implementation includes:

- **Unit tests** for all operations
- **Edge case handling** (empty, single element, etc.)
- **Performance benchmarks** comparing implementations
- **Practical examples** demonstrating real-world usage
- **Error handling** with meaningful messages

### Running Tests

```javascript
// To test individual implementations
node stack.js
node queue.js
node deque.js
node priority-queue.js
```

## 🔄 Common Patterns

### 1. Parentheses Matching

```javascript
function isValid(s) {
  const stack = new Stack();
  const pairs = { "(": ")", "[": "]", "{": "}" };

  for (let char of s) {
    if (char in pairs) {
      stack.push(char);
    } else if (Object.values(pairs).includes(char)) {
      if (stack.isEmpty() || pairs[stack.pop()] !== char) {
        return false;
      }
    }
  }

  return stack.isEmpty();
}
```

### 2. Expression Evaluation

```javascript
function evaluatePostfix(expression) {
  const stack = new Stack();
  const tokens = expression.split(" ");

  for (let token of tokens) {
    if (["+", "-", "*", "/"].includes(token)) {
      const b = stack.pop();
      const a = stack.pop();
      const result = operate(a, b, token);
      stack.push(result);
    } else {
      stack.push(parseFloat(token));
    }
  }

  return stack.pop();
}
```

### 3. BFS Traversal

```javascript
function bfs(graph, start) {
  const visited = new Set();
  const queue = new Queue();
  const result = [];

  queue.enqueue(start);
  visited.add(start);

  while (!queue.isEmpty()) {
    const vertex = queue.dequeue();
    result.push(vertex);

    for (let neighbor of graph[vertex] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.enqueue(neighbor);
      }
    }
  }

  return result;
}
```

## 📈 Performance Characteristics

### Memory Usage

- **Array-based**: Lower memory overhead, better cache locality
- **Linked List**: Higher memory overhead, better for dynamic sizing
- **Circular**: Fixed memory usage, no dynamic allocation

### Time Complexity Summary

- **Stack**: All operations O(1)
- **Queue**: All operations O(1) with proper implementation
- **Deque**: All operations O(1)
- **Priority Queue**: Insert/Delete O(log n), Peek O(1)

## 🎯 Best Practices

1. **Choose the right implementation** based on your needs
2. **Consider memory vs. performance** trade-offs
3. **Handle edge cases** properly (empty structures, etc.)
4. **Use appropriate data structure** for the problem domain
5. **Test thoroughly** with various input sizes
6. **Document assumptions** about priority ordering
7. **Consider thread safety** if needed in concurrent environments

## 🔗 Related Topics

- **Heap**: Used in priority queue implementation
- **Graph Algorithms**: BFS uses queues, DFS uses stacks
- **Dynamic Programming**: Often uses stacks for state management
- **Parsing**: Expression evaluation, syntax checking
- **System Design**: Load balancing, task scheduling

These implementations provide a solid foundation for understanding stack and queue operations and their applications in algorithm design and system development.
