# Stacks and Queues

Linear data structures that follow specific ordering principles for insertion and removal operations. Essential for understanding algorithm design patterns and solving many computational problems.

## 📝 Overview

**Stacks** and **Queues** are fundamental abstract data types that provide controlled access to their elements:

- **Stack**: Last In, First Out (LIFO) - like a stack of plates
- **Queue**: First In, First Out (FIFO) - like a line of people waiting

## 📚 Core Concepts

### Stack (LIFO)

```
Push →  [3] ← Top
        [2]
        [1] ← Bottom
```

**Key Operations:**

- `push(item)` - Add element to top
- `pop()` - Remove and return top element
- `peek()/top()` - View top element without removing
- `isEmpty()` - Check if stack is empty

### Queue (FIFO)

```
Enqueue → [1][2][3] → Dequeue
         rear    front
```

**Key Operations:**

- `enqueue(item)` - Add element to rear
- `dequeue()` - Remove and return front element
- `front()/peek()` - View front element without removing
- `isEmpty()` - Check if queue is empty

## 🎯 Essential Patterns

### Stack Patterns

1. **Matching/Balanced Parentheses** - Track opening/closing pairs
2. **Expression Evaluation** - Convert infix to postfix, evaluate expressions
3. **Function Call Management** - Recursive calls, call stack simulation
4. **Undo Operations** - Maintain operation history
5. **Monotonic Stack** - Maintain increasing/decreasing order
6. **Backtracking** - Explore paths and backtrack when needed

### Queue Patterns

1. **Breadth-First Search (BFS)** - Level-by-level tree/graph traversal
2. **Level Order Traversal** - Process tree nodes level by level
3. **Task Scheduling** - Process tasks in arrival order
4. **Buffer Management** - Handle streaming data
5. **Sliding Window Maximum** - Track maximum in moving window
6. **Round Robin Algorithms** - Fair resource allocation

## 📊 Time & Space Complexity

### Stack Operations

| Operation | Array-based      | Linked List-based |
| --------- | ---------------- | ----------------- |
| Push      | O(1) amortized\* | O(1)              |
| Pop       | O(1)             | O(1)              |
| Peek      | O(1)             | O(1)              |
| Search    | O(n)             | O(n)              |
| Space     | O(n)             | O(n)              |

\*Array resizing may cause O(n) occasionally

### Queue Operations

| Operation | Array-based    | Linked List-based | Circular Array |
| --------- | -------------- | ----------------- | -------------- |
| Enqueue   | O(1) amortized | O(1)              | O(1)           |
| Dequeue   | O(n)           | O(1)              | O(1)           |
| Peek      | O(1)           | O(1)              | O(1)           |
| Search    | O(n)           | O(n)              | O(n)           |
| Space     | O(n)           | O(n)              | O(n)           |

## 🏆 Essential LeetCode Problems

### Stack Problems

1. **[Valid Parentheses (20)](problems/001-valid-parentheses.js)** - Easy

   - Pattern: Matching pairs with stack
   - Concepts: Character mapping, stack validation

2. **[Min Stack (155)](problems/002-min-stack.js)** - Medium

   - Pattern: Auxiliary data structures
   - Concepts: Stack with additional operations

3. **[Evaluate Reverse Polish Notation (150)](problems/003-evaluate-rpn.js)** - Medium

   - Pattern: Expression evaluation
   - Concepts: Postfix notation, operator processing

4. **[Daily Temperatures (739)](problems/004-daily-temperatures.js)** - Medium

   - Pattern: Monotonic stack
   - Concepts: Next greater element problems

5. **[Largest Rectangle in Histogram (84)](problems/005-largest-rectangle-histogram.js)** - Hard
   - Pattern: Monotonic stack with area calculation
   - Concepts: Stack-based optimization

### Queue Problems

6. **[Implement Queue using Stacks (232)](problems/006-queue-using-stacks.js)** - Easy

   - Pattern: Data structure conversion
   - Concepts: Stack-to-queue transformation

7. **[Sliding Window Maximum (239)](problems/007-sliding-window-maximum.js)** - Hard

   - Pattern: Deque for window operations
   - Concepts: Monotonic deque, sliding window

8. **[Design Circular Queue (622)](problems/008-design-circular-queue.js)** - Medium
   - Pattern: Circular buffer implementation
   - Concepts: Index management, wrap-around logic

## 🔧 Implementation Highlights

### Core Implementations

- **[Stack Implementation](implementations/stack.js)** - Array and LinkedList based
- **[Queue Implementation](implementations/queue.js)** - Array, LinkedList, and Circular
- **[Deque Implementation](implementations/deque.js)** - Double-ended queue
- **[Priority Queue](implementations/priority-queue.js)** - Heap-based priority queue

### Specialized Variants

- **Min/Max Stack** - Track minimum/maximum elements
- **Circular Queue** - Efficient space utilization
- **Monotonic Stack/Queue** - Maintain ordering properties
- **Double-ended Queue (Deque)** - Operations at both ends

## 🎨 Common Use Cases

### Real-World Applications

**Stacks:**

- **Browser History** - Back button functionality
- **Undo/Redo Operations** - Text editors, image editors
- **Function Calls** - Call stack in programming languages
- **Expression Parsing** - Compilers and calculators
- **Backtracking Algorithms** - Maze solving, N-Queens

**Queues:**

- **Task Scheduling** - Operating system process management
- **Breadth-First Search** - Shortest path algorithms
- **Buffer Management** - Print queues, keyboard buffers
- **Level Order Processing** - Tree traversals
- **Rate Limiting** - API request queues

## 🧠 Problem-Solving Strategies

### When to Use Stack

1. **Need to reverse order** or process in LIFO manner
2. **Matching problems** - parentheses, tags, brackets
3. **Expression evaluation** - infix to postfix conversion
4. **Backtracking scenarios** - need to undo recent operations
5. **Nested structures** - recursive problem simulation

### When to Use Queue

1. **Process in order** received (FIFO)
2. **Level-by-level processing** - BFS traversals
3. **Scheduling tasks** - fair processing order
4. **Buffer scenarios** - temporary storage before processing
5. **Shortest path problems** - BFS for unweighted graphs

### Advanced Techniques

1. **Monotonic Stack/Queue** - Maintain ordering for optimization
2. **Auxiliary Stacks** - Additional stacks for special operations
3. **Stack/Queue Conversion** - Use one to implement the other
4. **Sliding Window with Deque** - Efficient window maximum/minimum

## 📈 Performance Optimization Tips

1. **Choose Right Implementation**

   - Array-based: Better cache locality, potential resizing cost
   - LinkedList-based: Consistent O(1) operations, pointer overhead

2. **Pre-allocate Space** - Avoid frequent resizing in array-based implementations

3. **Use Circular Buffers** - For queues with known maximum size

4. **Consider Deque** - When you need operations at both ends

5. **Monotonic Structures** - For next greater/smaller element problems

## 🔄 Integration with Other Topics

- **Trees**: Stack for DFS, Queue for BFS
- **Graphs**: Essential for traversal algorithms
- **Dynamic Programming**: Memoization with call stack
- **Recursion**: Stack simulation of recursive calls
- **Sorting**: Quick sort partitioning, merge sort merging

## 📚 Study Progression

### Week 4 Focus Areas

1. **Day 1-2**: Basic implementations and operations
2. **Day 3-4**: Parentheses matching and expression evaluation
3. **Day 5-6**: Monotonic stack problems and optimizations
4. **Day 7**: Queue implementations and BFS applications

### Skill Building

- Start with basic operations and validations
- Progress to monotonic stack/queue problems
- Master expression evaluation and parsing
- Apply to graph traversal algorithms

---

**Learning Path**: Arrays → Strings → LinkedLists → **Stacks & Queues** → Trees → Graphs

**Prerequisites**: Understanding of arrays and linked lists for implementation
**Next Topics**: Binary Trees (using stack/queue for traversals)
