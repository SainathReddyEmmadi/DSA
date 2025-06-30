# Array Implementations

This folder contains comprehensive implementations of various array data structures and utilities commonly used in algorithms and data structures.

## 📚 Implementations Included

### 1. **Dynamic Array** (`dynamic-array.js`)

A resizable array that automatically grows and shrinks as needed.

**Features:**

- Automatic resizing when capacity is exceeded
- Amortized O(1) push/pop operations
- Index-based access with bounds checking
- Memory-efficient shrinking when array becomes sparse
- Iterator support for for...of loops

**Use Cases:**

- When you need a growable array without knowing size in advance
- Building other data structures (stacks, queues)
- Situations where memory efficiency matters

**Key Methods:**

```javascript
const arr = new DynamicArray();
arr.push(1); // Add to end
arr.pop(); // Remove from end
arr.insert(0, 5); // Insert at index
arr.removeAt(0); // Remove at index
arr.get(0); // Get element
arr.set(0, 10); // Set element
```

---

### 2. **Array Utils** (`array-utils.js`)

Collection of essential array algorithms and utilities.

**Features:**

- **Sorting Algorithms**: Bubble, Selection, Insertion, Quick, Merge Sort
- **Search Algorithms**: Linear Search, Binary Search
- **Array Manipulation**: Reverse, Rotate, Remove Duplicates, Move Zeros
- **Analysis Functions**: Find Min/Max, Sum, Average, Check if Sorted
- **Advanced Operations**: Permutations, Subsets, Intersection, Union, Flatten

**Use Cases:**

- Interview preparation (common algorithm implementations)
- Understanding algorithm complexity and trade-offs
- Utility functions for array processing

**Key Methods:**

```javascript
ArrayUtils.quickSort([3, 1, 4, 1, 5]); // [1,1,3,4,5]
ArrayUtils.binarySearch([1, 3, 5, 7], 5); // 2
ArrayUtils.rotateRight([1, 2, 3, 4], 2); // [3,4,1,2]
ArrayUtils.permutations([1, 2, 3]); // All permutations
```

---

### 3. **Sparse Array** (`sparse-array.js`)

Memory-efficient array for storing arrays with many empty/undefined elements.

**Features:**

- Only stores non-empty elements with their indices
- Huge memory savings for sparse data
- All standard array operations (get, set, map, filter, etc.)
- Statistics about sparsity and memory usage
- Conversion to/from dense arrays

**Use Cases:**

- Large arrays with few non-empty elements
- Matrix representations with many zeros
- Memory-constrained environments
- Scientific computing with sparse data

**Key Methods:**

```javascript
const sparse = new SparseArray();
sparse.set(0, "first");
sparse.set(1000000, "millionth"); // Only stores 2 elements!
sparse.getStats(); // Memory efficiency info
```

---

### 4. **Circular Array** (`circular-array.js`)

Fixed-size array where the end connects back to the beginning.

**Features:**

- Fixed capacity with circular wrapping
- Efficient queue operations (push/shift)
- Automatic overwriting of old elements when full
- Rotation operations
- Buffer-like behavior

**Use Cases:**

- Ring buffers for streaming data
- Recent items cache (LRU-like behavior)
- Fixed-size queues
- Audio/video buffering
- Game development (circular movement)

**Key Methods:**

```javascript
const circular = new CircularArray(5);
circular.push(1); // Add to end
circular.shift(); // Remove from start
circular.rotate(2); // Rotate elements
circular.front(); // Peek at first
circular.back(); // Peek at last
```

## 🎯 Learning Objectives

### **Understanding Trade-offs**

Each implementation teaches different aspects:

- **Dynamic Array**: Amortized analysis, memory management
- **Array Utils**: Algorithm complexity, optimization techniques
- **Sparse Array**: Space-time trade-offs, memory efficiency
- **Circular Array**: Fixed-size constraints, circular logic

### **Real-world Applications**

- **Dynamic Array**: JavaScript's Array, Python's list, C++ vector
- **Sparse Array**: Scientific computing, databases, graphics
- **Circular Array**: Operating system buffers, embedded systems

### **Interview Preparation**

- Common data structure implementations
- Algorithm analysis and optimization
- Memory management concepts
- Problem-solving with different array types

## 🚀 Getting Started

### 1. **Test the Implementations**

Each file includes comprehensive tests. Run them to see the implementations in action:

```bash
# If you have Node.js installed
node dynamic-array.js
node array-utils.js
node sparse-array.js
node circular-array.js
```

### 2. **Study the Code**

- Read through each implementation
- Understand the time/space complexity annotations
- Pay attention to edge case handling
- Notice the different design patterns used

### 3. **Experiment**

- Modify the test cases
- Try different inputs and edge cases
- Implement additional methods
- Compare performance characteristics

### 4. **Apply to Problems**

Use these implementations when solving LeetCode problems:

- Use `ArrayUtils` methods for common operations
- Consider `SparseArray` for problems with large, sparse data
- Use `CircularArray` for rotating or cycling problems
- Understand when to use each data structure

## 💡 Key Concepts Demonstrated

### **Amortized Analysis**

Dynamic Array shows how occasional expensive operations (resizing) can be amortized over many cheap operations.

### **Space-Time Trade-offs**

Sparse Array demonstrates trading some time complexity for significant space savings.

### **Circular Logic**

Circular Array teaches modular arithmetic and circular buffer management.

### **Algorithm Implementation**

Array Utils shows how to implement fundamental algorithms with proper complexity analysis.

## 🔗 Integration with Problem Solving

These implementations complement the problem solutions in the `problems/` folder:

- **Two Sum**: Uses hash map concept (similar to sparse array indexing)
- **Maximum Subarray**: Could use dynamic array for building subarrays
- **Product Except Self**: Benefits from understanding array indexing patterns
- **Container With Most Water**: Uses two-pointer technique (implemented in utils)

## 📈 Next Steps

1. **Implement Missing Methods**: Add more functionality to each class
2. **Performance Testing**: Benchmark different implementations
3. **Memory Analysis**: Study actual memory usage patterns
4. **Advanced Variants**: Implement deque, priority queue using these as base
5. **Integration**: Use these in solving more complex problems

## 🎓 Interview Tips

When discussing these implementations in interviews:

1. **Explain Trade-offs**: Always mention time/space complexity
2. **Real-world Context**: Give examples of when you'd use each
3. **Edge Cases**: Discuss how you handle boundary conditions
4. **Optimization**: Mention possible improvements or variants
5. **Practical Knowledge**: Show understanding of when built-in arrays are sufficient vs. when custom implementations are needed

These implementations provide a solid foundation for understanding array-based data structures and their applications in algorithm design!
