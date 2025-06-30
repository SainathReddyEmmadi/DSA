# Arrays

Arrays are one of the most fundamental data structures in programming. They store elements in contiguous memory locations and provide constant-time access to elements by index.

## Key Concepts

### Time Complexities

- **Access**: O(1)
- **Search**: O(n)
- **Insertion**: O(n) - worst case when inserting at the beginning
- **Deletion**: O(n) - worst case when deleting from the beginning

### Common Patterns

1. **Two Pointers**: Use two pointers moving towards each other or in the same direction
2. **Sliding Window**: Maintain a window of elements and slide it across the array
3. **Prefix Sum**: Pre-compute cumulative sums for range queries
4. **Sorting**: Sort the array to enable binary search or two-pointer techniques

## Essential LeetCode Problems

### Easy (Foundation)

- [ ] Two Sum (LC 1) - Hash Map pattern
- [ ] Best Time to Buy and Sell Stock (LC 121) - Single pass
- [ ] Contains Duplicate (LC 217) - Hash Set
- [ ] Maximum Subarray (LC 53) - Kadane's algorithm
- [ ] Merge Sorted Array (LC 88) - Two pointers
- [ ] Remove Duplicates from Sorted Array (LC 26) - Two pointers
- [ ] Plus One (LC 66) - Array manipulation
- [ ] Move Zeroes (LC 283) - Two pointers

### Medium (Core Skills)

- [ ] 3Sum (LC 15) - Two pointers + sorting
- [ ] Container With Most Water (LC 11) - Two pointers
- [ ] Product of Array Except Self (LC 238) - Prefix/suffix products
- [ ] Find All Numbers Disappeared in Array (LC 448) - Cyclic sort
- [ ] Rotate Array (LC 189) - Multiple approaches
- [ ] Subarray Sum Equals K (LC 560) - Prefix sum + hash map
- [ ] Longest Consecutive Sequence (LC 128) - Hash set
- [ ] Set Matrix Zeroes (LC 73) - In-place marking

### Hard (Advanced)

- [ ] Trapping Rain Water (LC 42) - Two pointers/Stack
- [ ] First Missing Positive (LC 41) - Cyclic sort
- [ ] Median of Two Sorted Arrays (LC 4) - Binary search
- [ ] Largest Rectangle in Histogram (LC 84) - Stack

## Templates and Patterns

### Two Pointers Template

```javascript
function twoPointers(arr) {
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
```

### Sliding Window Template

```javascript
function slidingWindow(arr, k) {
  let windowSum = 0;
  let maxSum = 0;

  // Initial window
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  maxSum = windowSum;

  // Slide the window
  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k];
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}
```

### Prefix Sum Template

```javascript
function prefixSum(arr) {
  const prefix = new Array(arr.length + 1).fill(0);

  for (let i = 0; i < arr.length; i++) {
    prefix[i + 1] = prefix[i] + arr[i];
  }

  return prefix;
}
```

## Tips for Success

1. **Master the basics**: Understand array indexing, iteration patterns
2. **Practice edge cases**: Empty arrays, single elements, duplicates
3. **Space-time tradeoffs**: When to use extra space vs. in-place operations
4. **Pattern recognition**: Identify when to use two pointers vs. sliding window
5. **Boundary conditions**: Always check array bounds
