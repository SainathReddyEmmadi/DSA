# 🎯 Your First 6 Essential Array Problems - Mastery Guide

## 📋 Problems Completed

### ✅ 1. Two Sum (LC 1) - **FOUNDATION**

**File**: `001-two-sum.js`
**Difficulty**: Easy ⭐
**Key Patterns**: Hash Map, Complement Pattern
**Time**: O(n) | **Space**: O(n)

**What You Learned**:

- **Complement Pattern**: `target - current = complement`
- **Hash Map for O(1) lookup**: Trade space for time
- **4 Different approaches**: Brute force, Hash Map, Two Pointers, Object

**Interview Tip**: This is the most common warm-up question. Master the hash map approach!

---

### ✅ 2. Maximum Subarray (LC 53) - **KADANE'S ALGORITHM**

**File**: `002-maximum-subarray.js`
**Difficulty**: Easy ⭐
**Key Patterns**: Kadane's Algorithm, Dynamic Programming
**Time**: O(n) | **Space**: O(1)

**What You Learned**:

- **Kadane's Algorithm**: At each position, decide to extend or start fresh
- **Local vs Global optimum**: `maxEndingHere` vs `maxSoFar`
- **Handles all negative numbers correctly**

**Interview Tip**: Explain the intuition - "Should I continue with current subarray or start new?"

---

### ✅ 3. Best Time to Buy and Sell Stock (LC 121) - **GREEDY**

**File**: `003-best-time-buy-sell-stock.js`
**Difficulty**: Easy ⭐
**Key Patterns**: Greedy, Single Pass
**Time**: O(n) | **Space**: O(1)

**What You Learned**:

- **Greedy approach**: Track minimum price and maximum profit
- **Connection to Kadane's**: Can be solved as maximum subarray of price differences
- **Single transaction constraint**

**Interview Tip**: This problem has many variations (multiple transactions, cooldown, etc.)

---

### ✅ 4. Contains Duplicate (LC 217) - **HASH SET**

**File**: `004-contains-duplicate.js`
**Difficulty**: Easy ⭐
**Key Patterns**: Hash Set, Early Termination
**Time**: O(n) | **Space**: O(n)

**What You Learned**:

- **Set for deduplication**: `new Set(array).size !== array.length`
- **Early termination**: Return immediately when duplicate found
- **Multiple approaches**: Brute force, sorting, hash set

**Interview Tip**: Simple problem but shows you understand hash tables and optimization

---

### ✅ 5. Product of Array Except Self (LC 238) - **PREFIX/SUFFIX**

**File**: `005-product-array-except-self.js`
**Difficulty**: Medium ⭐⭐
**Key Patterns**: Prefix/Suffix Products, Space Optimization
**Time**: O(n) | **Space**: O(1)

**What You Learned**:

- **Prefix/Suffix pattern**: Essential for many array problems
- **Space optimization**: Use output array to store intermediate results
- **No division constraint**: Teaches proper algorithmic thinking

**Interview Tip**: Explain why division approach has issues with zeros

---

### ✅ 6. Container With Most Water (LC 11) - **TWO POINTERS**

**File**: `006-container-most-water.js`
**Difficulty**: Medium ⭐⭐
**Key Patterns**: Two Pointers, Greedy
**Time**: O(n) | **Space**: O(1)

**What You Learned**:

- **Two pointers on unsorted array**: Start wide, move bottleneck
- **Greedy choice**: Move pointer with smaller height
- **Area calculation**: `width × min(height[left], height[right])`

**Interview Tip**: Explain why moving the smaller height is correct

---

## 🧠 Core Patterns Mastered

### 1. **Hash Map/Set Pattern**

- Used in: Two Sum, Contains Duplicate
- **When to use**: Need O(1) lookup, checking existence, complement problems
- **Template**:

```javascript
const seen = new Set(); // or Map()
for (const item of array) {
  if (seen.has(complement)) return result;
  seen.add(item);
}
```

### 2. **Two Pointers Pattern**

- Used in: Container With Most Water
- **When to use**: Sorted arrays, finding pairs, optimizing brute force O(n²) to O(n)
- **Template**:

```javascript
let left = 0,
  right = array.length - 1;
while (left < right) {
  // Process current pair
  if (condition) left++;
  else right--;
}
```

### 3. **Prefix/Suffix Pattern**

- Used in: Product of Array Except Self
- **When to use**: Need to know cumulative information before/after each position
- **Template**:

```javascript
// Build prefix array
for (let i = 1; i < n; i++) {
  prefix[i] = prefix[i - 1] + array[i - 1];
}
```

### 4. **Kadane's Algorithm**

- Used in: Maximum Subarray, Best Time to Buy and Sell Stock
- **When to use**: Maximum/minimum subarray problems
- **Template**:

```javascript
let maxSoFar = array[0],
  maxEndingHere = array[0];
for (let i = 1; i < array.length; i++) {
  maxEndingHere = Math.max(array[i], maxEndingHere + array[i]);
  maxSoFar = Math.max(maxSoFar, maxEndingHere);
}
```

## 🎯 Next Steps - Week 1 Continuation

### Immediate Practice (Complete this week):

1. **Merge Sorted Array (LC 88)** - Two pointers from end
2. **Remove Duplicates from Sorted Array (LC 26)** - Two pointers same direction
3. **Move Zeroes (LC 283)** - Two pointers for partitioning

### Week 2 Preview:

1. **3Sum (LC 15)** - Combines sorting + two pointers
2. **Rotate Array (LC 189)** - Array manipulation
3. **Find All Numbers Disappeared in Array (LC 448)** - Cyclic sort pattern

## 🚀 How to Approach New Problems

### The UMPIRE Method:

1. **U**nderstand - Read problem 2-3 times, clarify constraints
2. **M**atch - Which pattern does this resemble?
3. **P**lan - Think brute force first, then optimize
4. **I**mplement - Write clean, readable code
5. **R**eview - Test with examples, check edge cases
6. **E**valuate - Analyze time/space complexity

### Pattern Recognition Questions:

- **Need to find pairs/combinations?** → Two Pointers or Hash Map
- **Need cumulative information?** → Prefix/Suffix arrays
- **Need maximum/minimum subarray?** → Kadane's Algorithm
- **Need to check existence/duplicates?** → Hash Set
- **Array is sorted?** → Binary Search or Two Pointers

## 📈 Interview Performance Tips

### 1. **Communication**:

- Explain your approach before coding
- Think out loud during implementation
- Discuss trade-offs between approaches

### 2. **Testing**:

- Always test with given examples
- Consider edge cases: empty array, single element, all same elements
- Walk through your code line by line

### 3. **Optimization**:

- Start with brute force if needed, then optimize
- Discuss time/space complexity
- Mention alternative approaches

### 4. **Common Mistakes to Avoid**:

- Off-by-one errors in loops
- Not handling edge cases
- Not considering integer overflow (in other languages)
- Modifying input when not allowed

## 🏆 Confidence Check

Rate your understanding (1-5) of each pattern:

- [ ] Hash Map/Set for lookups: \_\_\_/5
- [ ] Two Pointers technique: \_\_\_/5
- [ ] Prefix/Suffix arrays: \_\_\_/5
- [ ] Kadane's Algorithm: \_\_\_/5
- [ ] Array manipulation: \_\_\_/5

**Goal**: All should be 4+ before moving to Week 2

## 🎯 Your Action Plan

### Today:

1. Run through all 6 problems manually (trace through examples)
2. Implement one problem from scratch without looking at solution
3. Write down the key insight from each problem

### This Week:

1. Solve 3 more array problems using these patterns
2. Practice explaining solutions out loud
3. Time yourself: aim for 15-20 minutes per easy problem

### Next Week:

1. Move to Strings and advanced Array problems
2. Start combining multiple patterns in single problems
3. Begin mock interview practice

Remember: **Pattern recognition** is more valuable than memorizing solutions! 🧠✨
