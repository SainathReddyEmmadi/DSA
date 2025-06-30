# DSA Templates in JavaScript

This folder contains reusable code templates for common patterns and algorithms.

## Array Templates

### Two Pointers

```javascript
// Opposite direction pointers
function twoPointersOpposite(arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    // Process current pair
    if (condition) {
      left++;
    } else {
      right--;
    }
  }
}

// Same direction pointers
function twoPointersSame(arr) {
  let slow = 0;
  let fast = 0;

  while (fast < arr.length) {
    if (condition) {
      arr[slow] = arr[fast];
      slow++;
    }
    fast++;
  }
}
```

### Sliding Window

```javascript
// Fixed size window
function slidingWindowFixed(arr, k) {
  let windowSum = 0;

  // Calculate first window
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }

  let result = windowSum;

  // Slide the window
  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k];
    result = Math.max(result, windowSum);
  }

  return result;
}

// Variable size window
function slidingWindowVariable(arr, target) {
  let left = 0;
  let sum = 0;
  let result = 0;

  for (let right = 0; right < arr.length; right++) {
    sum += arr[right];

    while (sum > target) {
      sum -= arr[left];
      left++;
    }

    result = Math.max(result, right - left + 1);
  }

  return result;
}
```

### Binary Search

```javascript
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}
```

## Tree Templates

### Tree Node Definition

```javascript
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}
```

### Tree Traversals

```javascript
// DFS - Inorder
function inorderTraversal(root) {
  const result = [];

  function dfs(node) {
    if (!node) return;

    dfs(node.left);
    result.push(node.val);
    dfs(node.right);
  }

  dfs(root);
  return result;
}

// DFS - Preorder
function preorderTraversal(root) {
  const result = [];

  function dfs(node) {
    if (!node) return;

    result.push(node.val);
    dfs(node.left);
    dfs(node.right);
  }

  dfs(root);
  return result;
}

// BFS - Level Order
function levelOrder(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(currentLevel);
  }

  return result;
}
```

## Graph Templates

### Graph Representations

```javascript
// Adjacency List
class Graph {
  constructor() {
    this.adjacencyList = new Map();
  }

  addVertex(vertex) {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }

  addEdge(vertex1, vertex2) {
    this.adjacencyList.get(vertex1).push(vertex2);
    this.adjacencyList.get(vertex2).push(vertex1);
  }
}
```

### DFS Template

```javascript
function dfs(graph, start, visited = new Set()) {
  visited.add(start);

  for (const neighbor of graph.adjacencyList.get(start)) {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, visited);
    }
  }
}
```

### BFS Template

```javascript
function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  visited.add(start);

  while (queue.length > 0) {
    const vertex = queue.shift();

    for (const neighbor of graph.adjacencyList.get(vertex)) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}
```

## Dynamic Programming Templates

### Memoization (Top-down)

```javascript
function dpMemoization(n, memo = {}) {
  if (n in memo) return memo[n];

  // Base cases
  if (n <= 1) return n;

  // Recursive relation
  memo[n] = dpMemoization(n - 1, memo) + dpMemoization(n - 2, memo);
  return memo[n];
}
```

### Tabulation (Bottom-up)

```javascript
function dpTabulation(n) {
  if (n <= 1) return n;

  const dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}
```

## Backtracking Template

```javascript
function backtrack(path, choices) {
  // Base case
  if (isComplete(path)) {
    result.push([...path]);
    return;
  }

  // Try each choice
  for (const choice of choices) {
    if (isValid(choice, path)) {
      // Make choice
      path.push(choice);

      // Recurse
      backtrack(path, getNextChoices(choice));

      // Undo choice
      path.pop();
    }
  }
}
```

## Common Data Structures

### Stack Implementation

```javascript
class Stack {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);
  }

  pop() {
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }
}
```

### Queue Implementation

```javascript
class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(item) {
    this.items.push(item);
  }

  dequeue() {
    return this.items.shift();
  }

  front() {
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }
}
```
