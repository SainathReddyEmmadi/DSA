# Trees - Data Structure and Algorithms

Trees are hierarchical data structures consisting of nodes connected by edges. Each tree has a root node, and every node (except the root) has exactly one parent. Trees are fundamental to many algorithms and applications in computer science.

## 📋 Table of Contents

- [Core Concepts](#core-concepts)
- [Types of Trees](#types-of-trees)
- [Tree Traversals](#tree-traversals)
- [Common Patterns](#common-patterns)
- [Essential LeetCode Problems](#essential-leetcode-problems)
- [Implementation Guide](#implementation-guide)
- [Study Plan](#study-plan)

## 🌳 Core Concepts

### Basic Terminology

- **Node**: Basic unit containing data and references to children
- **Root**: Top node with no parent
- **Leaf**: Node with no children
- **Parent**: Node with one or more children
- **Child**: Node connected to another node when moving away from root
- **Sibling**: Nodes sharing the same parent
- **Height**: Longest path from node to a leaf
- **Depth**: Distance from root to node
- **Level**: All nodes at the same depth

### Tree Properties

- **Height of Tree**: Height of root node
- **Size**: Total number of nodes
- **Degree**: Maximum number of children any node has
- **Path**: Sequence of nodes connected by edges

### Time & Space Complexity

| Operation | Average  | Worst Case | Space  |
| --------- | -------- | ---------- | ------ |
| Search    | O(log n) | O(n)       | O(1)   |
| Insert    | O(log n) | O(n)       | O(1)   |
| Delete    | O(log n) | O(n)       | O(1)   |
| Traversal | O(n)     | O(n)       | O(h)\* |

\*h = height of tree (O(log n) for balanced, O(n) for skewed)

## 🎯 Types of Trees

### 1. Binary Tree

- Each node has at most 2 children (left and right)
- Foundation for many other tree types
- Used in expression trees, decision trees

### 2. Binary Search Tree (BST)

- Binary tree with ordering property
- Left subtree < root < right subtree
- Enables efficient searching, insertion, deletion

### 3. AVL Tree

- Self-balancing binary search tree
- Height difference between left and right subtrees ≤ 1
- Guarantees O(log n) operations

### 4. Red-Black Tree

- Self-balancing BST with color properties
- Used in many standard libraries
- Guarantees O(log n) operations

### 5. Heap (Complete Binary Tree)

- Complete binary tree with heap property
- Min-heap: parent ≤ children
- Max-heap: parent ≥ children
- Used in priority queues

### 6. Trie (Prefix Tree)

- Tree for storing strings efficiently
- Each path represents a string
- Used in autocomplete, spell checkers

### 7. Segment Tree

- Binary tree for range queries
- Each node represents a range
- Supports range sum, min, max queries

## 🔄 Tree Traversals

### Depth-First Search (DFS)

1. **Inorder (Left-Root-Right)**

   - For BST: visits nodes in sorted order
   - Use case: Getting sorted data from BST

2. **Preorder (Root-Left-Right)**

   - Visits root before children
   - Use case: Copying/serializing tree

3. **Postorder (Left-Right-Root)**
   - Visits children before root
   - Use case: Deleting tree, calculating size

### Breadth-First Search (BFS)

- **Level-order**: Visit all nodes level by level
- Uses queue for implementation
- Use case: Finding shortest path, level-wise processing

### Implementation Patterns

```javascript
// DFS - Recursive
function inorder(root) {
  if (!root) return;
  inorder(root.left);
  process(root.val);
  inorder(root.right);
}

// DFS - Iterative with Stack
function inorderIterative(root) {
  const stack = [];
  const result = [];
  let current = root;

  while (current || stack.length) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();
    result.push(current.val);
    current = current.right;
  }

  return result;
}

// BFS - Iterative with Queue
function levelOrder(root) {
  if (!root) return [];

  const queue = [root];
  const result = [];

  while (queue.length) {
    const levelSize = queue.length;
    const level = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      level.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(level);
  }

  return result;
}
```

## 🎯 Common Patterns

### 1. Tree Construction

- **From Arrays**: Build tree from preorder/inorder, postorder/inorder
- **From Descriptions**: Build tree from parent-child relationships
- **Serialization**: Convert tree to string and back

### 2. Path Problems

- **Root to Leaf**: Find all paths, path sum problems
- **Any Path**: Maximum path sum, diameter problems
- **Ancestor Paths**: Lowest common ancestor problems

### 3. Tree Modification

- **Structure Changes**: Flatten, invert, mirror trees
- **Value Changes**: Add values, convert to other structures
- **Pruning**: Remove nodes based on conditions

### 4. Tree Validation

- **BST Validation**: Check if tree maintains BST property
- **Balance Checking**: Verify if tree is balanced
- **Structure Validation**: Check specific tree properties

### 5. Level-wise Processing

- **Level Order**: Process nodes level by level
- **Zigzag Traversal**: Alternate left-to-right and right-to-left
- **Vertical Traversal**: Group nodes by vertical position

## 📚 Essential LeetCode Problems

### Beginner (Easy)

1. **[104] Maximum Depth of Binary Tree** - Basic recursion
2. **[226] Invert Binary Tree** - Tree manipulation
3. **[100] Same Tree** - Tree comparison
4. **[101] Symmetric Tree** - Tree symmetry
5. **[112] Path Sum** - Root-to-leaf path

### Intermediate (Medium)

6. **[102] Binary Tree Level Order Traversal** - BFS pattern
7. **[98] Validate Binary Search Tree** - BST validation
8. **[105] Construct Binary Tree from Preorder and Inorder** - Tree construction
9. **[236] Lowest Common Ancestor of Binary Tree** - LCA pattern
10. **[543] Diameter of Binary Tree** - Tree metrics

### Advanced (Hard)

11. **[124] Binary Tree Maximum Path Sum** - Complex path problems
12. **[297] Serialize and Deserialize Binary Tree** - Tree serialization
13. **[987] Vertical Order Traversal** - Complex traversal
14. **[968] Binary Tree Cameras** - Greedy on trees
15. **[145] Binary Tree Postorder Traversal** - Iterative postorder

## 🏗️ Implementation Guide

### Basic Node Structure

```javascript
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}
```

### Common Helper Functions

```javascript
// Check if tree is empty
function isEmpty(root) {
  return root === null;
}

// Get height of tree
function height(root) {
  if (!root) return 0;
  return 1 + Math.max(height(root.left), height(root.right));
}

// Count nodes in tree
function countNodes(root) {
  if (!root) return 0;
  return 1 + countNodes(root.left) + countNodes(root.right);
}

// Check if tree is balanced
function isBalanced(root) {
  if (!root) return true;

  const leftHeight = height(root.left);
  const rightHeight = height(root.right);

  return (
    Math.abs(leftHeight - rightHeight) <= 1 &&
    isBalanced(root.left) &&
    isBalanced(root.right)
  );
}
```

### BST Operations

```javascript
// Insert into BST
function insertBST(root, val) {
  if (!root) return new TreeNode(val);

  if (val < root.val) {
    root.left = insertBST(root.left, val);
  } else {
    root.right = insertBST(root.right, val);
  }

  return root;
}

// Search in BST
function searchBST(root, val) {
  if (!root || root.val === val) return root;

  return val < root.val
    ? searchBST(root.left, val)
    : searchBST(root.right, val);
}

// Delete from BST
function deleteBST(root, val) {
  if (!root) return null;

  if (val < root.val) {
    root.left = deleteBST(root.left, val);
  } else if (val > root.val) {
    root.right = deleteBST(root.right, val);
  } else {
    // Node to delete found
    if (!root.left) return root.right;
    if (!root.right) return root.left;

    // Node with two children
    const minRight = findMin(root.right);
    root.val = minRight.val;
    root.right = deleteBST(root.right, minRight.val);
  }

  return root;
}
```

## 📅 Study Plan

### Week 5: Trees Fundamentals

**Day 1-2: Basic Concepts**

- Tree terminology and properties
- Binary tree implementation
- Basic traversals (recursive)

**Day 3-4: Tree Traversals**

- All DFS traversals (iterative)
- BFS traversal
- Level-order processing

**Day 5-6: Basic Tree Problems**

- Maximum depth, invert tree
- Same tree, symmetric tree
- Path sum problems

**Day 7: Practice & Review**

- Implement all traversals from memory
- Solve 3-4 easy tree problems

### Advanced Topics (Future Weeks)

- Binary Search Trees (Week 6)
- Balanced Trees (AVL, Red-Black)
- Heap and Priority Queue Trees
- Trie (Prefix Trees)
- Segment Trees and Fenwick Trees

## 🎯 Key Insights

### When to Use Trees

- **Hierarchical Data**: File systems, organizational charts
- **Searching**: When you need efficient search, insert, delete
- **Parsing**: Expression trees, syntax trees
- **Decision Making**: Decision trees, game trees
- **Range Queries**: Segment trees for range sum/min/max

### Common Mistakes to Avoid

1. **Null Pointer Issues**: Always check for null nodes
2. **Base Case Forgetting**: Remember recursive base cases
3. **Stack Overflow**: Be careful with very deep trees
4. **BST Property Violation**: Maintain ordering in BSTs
5. **Memory Leaks**: Properly delete nodes when removing

### Optimization Techniques

1. **Memoization**: Cache results for overlapping subproblems
2. **Early Termination**: Stop traversal when answer is found
3. **Iterative over Recursive**: Avoid stack overflow for deep trees
4. **Path Tracking**: Keep track of paths to avoid recomputation

## 🔗 Related Topics

- **Graphs**: Trees are special cases of graphs
- **Dynamic Programming**: Tree DP problems
- **Heaps**: Complete binary trees with heap property
- **Tries**: Specialized trees for string processing
- **Union-Find**: Tree-like structure for disjoint sets

Trees form the foundation for many advanced data structures and algorithms. Master the basics before moving to specialized tree types!
