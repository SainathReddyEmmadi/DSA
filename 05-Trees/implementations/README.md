# Tree Implementations

This directory contains comprehensive implementations of various tree data structures in JavaScript. Each implementation is designed to be educational, efficient, and production-ready.

## 📁 Available Implementations

### 1. TreeNode (`tree-node.js`)

**Basic building block for all tree structures**

**Features:**

- Value storage with left/right child pointers
- Node property checks (leaf, one child, both children)
- Subtree operations (height, size, contains)
- Multiple traversal methods
- Tree visualization and validation
- Cloning and string representation

**Use Cases:**

- Foundation for other tree implementations
- Custom tree structure development
- Educational purposes

**Key Methods:**

```javascript
const node = new TreeNode(5);
node.isLeaf(); // Check if leaf node
node.getHeight(); // Calculate subtree height
node.getSize(); // Count nodes in subtree
node.contains(value); // Search for value
node.inorderTraversal(); // Get inorder values
node.clone(); // Deep copy subtree
```

---

### 2. BinaryTree (`binary-tree.js`)

**Complete binary tree implementation**

**Features:**

- Level-order insertion for complete tree property
- Comprehensive deletion with tree restructuring
- Multiple traversal methods with callbacks
- Tree property analysis (balanced, complete, diameter)
- Tree manipulation (mirror, clone)
- Array conversion utilities

**Time Complexities:**

- Search: O(n)
- Insert: O(log n) for balanced tree
- Delete: O(n)
- Traversals: O(n)

**Use Cases:**

- General-purpose binary tree operations
- Educational tree algorithm learning
- Heap implementations (base structure)
- Expression trees

**Key Methods:**

```javascript
const tree = new BinaryTree(1);
tree.insert(2); // Level-order insertion
tree.delete(1); // Smart deletion
tree.getStatistics(); // Tree properties
tree.mirror(); // Flip tree horizontally
tree.levelOrderByLevels(); // Traversal by levels
```

---

### 3. BST - Binary Search Tree (`binary-search-tree.js`)

**Ordered binary tree for efficient searching**

**Features:**

- BST property maintenance (left < root < right)
- Efficient search, insert, delete operations
- Min/max finding
- Successor/predecessor operations
- Range queries and kth element finding
- BST validation
- Balanced BST creation from sorted arrays

**Time Complexities:**

- Search/Insert/Delete: O(log n) average, O(n) worst case
- Traversals: O(n)
- Min/Max: O(log n) average, O(n) worst case

**Use Cases:**

- Database indexing
- Expression parsing
- Sorted data maintenance
- Range queries
- Priority systems

**Key Methods:**

```javascript
const bst = new BST();
bst.insert(50); // Maintains BST property
bst.search(25); // Efficient search
bst.findMin(); // Leftmost value
bst.findSuccessor(30); // Next larger value
bst.findInRange(20, 60); // Range query
bst.findKthSmallest(3); // Order statistics
BST.fromSortedArray([1, 2, 3]); // Balanced BST creation
```

---

## 🚀 Quick Start

### Installation

All implementations are self-contained and require no external dependencies:

```javascript
// Import specific implementations
const { TreeNode } = require("./tree-node");
const { BinaryTree } = require("./binary-tree");
const { BST } = require("./binary-search-tree");

// Create and use
const bst = new BST();
bst.insertMany([50, 30, 70, 20, 40]);
console.log(bst.inorderTraversal()); // [20, 30, 40, 50, 70]
```

### Running Tests

Each implementation includes comprehensive tests:

```bash
# Test individual implementations
node tree-node.js
node binary-tree.js
node binary-search-tree.js
```

---

## 📊 Performance Comparison

| Operation | TreeNode | BinaryTree | BST (Balanced) | BST (Skewed) |
| --------- | -------- | ---------- | -------------- | ------------ |
| Search    | O(n)     | O(n)       | O(log n)       | O(n)         |
| Insert    | O(1)\*   | O(log n)   | O(log n)       | O(n)         |
| Delete    | O(1)\*   | O(n)       | O(log n)       | O(n)         |
| Min/Max   | O(n)     | O(n)       | O(log n)       | O(n)         |
| Traversal | O(n)     | O(n)       | O(n)           | O(n)         |

\*For direct parent-child operations only

---

## 🔄 Traversal Methods

All implementations support multiple traversal methods:

### Depth-First Traversals

```javascript
tree.inorderTraversal(); // Left → Root → Right
tree.preorderTraversal(); // Root → Left → Right
tree.postorderTraversal(); // Left → Right → Root
```

### Breadth-First Traversals

```javascript
tree.levelOrderTraversal(); // Level by level
tree.levelOrderByLevels(); // Grouped by levels
```

### BST-Specific Traversals

```javascript
bst.inorderTraversal(); // Always returns sorted sequence
bst.toSortedArray(); // Convenient sorted array conversion
```

---

## 🛠️ Advanced Operations

### Tree Analysis

```javascript
// Get comprehensive tree statistics
const stats = tree.getStatistics();
console.log(stats);
// {
//   size: 7,
//   height: 2,
//   isBalanced: true,
//   isComplete: true,
//   diameter: 4,
//   leafCount: 4,
//   levels: 3
// }
```

### Tree Manipulation

```javascript
// Clone trees
const copy = tree.clone();

// Mirror trees
tree.mirror();

// Convert between formats
const array = tree.toArray();
const newTree = BinaryTree.fromArray(array);
```

### BST Range Operations

```javascript
// Find values in range
const inRange = bst.findInRange(20, 60);

// Order statistics
const thirdSmallest = bst.findKthSmallest(3);
const secondLargest = bst.findKthLargest(2);

// Successor/Predecessor
const next = bst.findSuccessor(30);
const prev = bst.findPredecessor(30);
```

---

## 🎯 Common Use Cases

### TreeNode

- **Custom tree algorithms**: Building specialized tree structures
- **Educational purposes**: Understanding tree concepts
- **Prototyping**: Quick tree structure experiments

### BinaryTree

- **Complete trees**: Heaps, complete binary trees
- **General algorithms**: Tree traversal implementations
- **Expression trees**: Mathematical expression parsing

### BST

- **Sorted data**: Maintaining ordered collections
- **Database indexing**: B-tree foundations
- **Range queries**: Finding elements in ranges
- **Order statistics**: Finding kth elements

---

## 📝 Implementation Notes

### Memory Management

- All implementations use standard JavaScript garbage collection
- Tree nodes maintain parent references implicitly through call stack
- Clone operations create completely independent copies

### Error Handling

- Graceful handling of null/undefined inputs
- Validation of tree structure integrity
- Comprehensive edge case coverage

### Performance Optimizations

- Iterative implementations available for stack-safe operations
- Memoization where appropriate
- Efficient array conversion algorithms

---

## 🔍 Testing and Validation

Each implementation includes:

- **Unit tests**: Comprehensive test coverage
- **Performance benchmarks**: Speed comparisons
- **Edge case testing**: Null inputs, single nodes, large trees
- **Property validation**: BST property, balance checking
- **Memory usage analysis**: Large tree handling

---

## 📚 Learning Path

1. **Start with TreeNode**: Understand basic tree concepts
2. **Move to BinaryTree**: Learn general tree operations
3. **Master BST**: Understand ordered tree structures
4. **Solve problems**: Apply to LeetCode problems in `/problems/`

---

## 🤝 Integration with Problems

These implementations are designed to work seamlessly with the problem solutions in the `../problems/` directory:

```javascript
// Use in problem solutions
const { TreeNode } = require("../implementations/tree-node");
const { BST } = require("../implementations/binary-search-tree");

function isValidBST(root) {
  const bst = new BST();
  // Use BST validation methods
  return bst.isValidBST();
}
```

---

## 🔧 Customization

All implementations are designed to be easily extensible:

```javascript
// Extend TreeNode for custom behavior
class CustomTreeNode extends TreeNode {
  constructor(val, metadata = {}) {
    super(val);
    this.metadata = metadata;
  }
}

// Extend BST for custom comparisons
class CustomBST extends BST {
  constructor(compareFn = (a, b) => a - b) {
    super();
    this.compare = compareFn;
  }
}
```

This modular design allows you to build upon these foundations for specific requirements while maintaining the core functionality and performance characteristics.
