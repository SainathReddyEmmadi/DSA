/**
 * Contains Duplicate - LeetCode Problem 217
 *
 * Problem: Given an integer array nums, return true if any value appears
 * at least twice in the array, and return false if every element is distinct.
 *
 * Constraints:
 * - 1 <= nums.length <= 10^5
 * - -10^9 <= nums[i] <= 10^9
 *
 * Link: https://leetcode.com/problems/contains-duplicate/
 * Difficulty: Easy
 * Topics: Array, Hash Table, Sorting
 * Companies: Apple, Adobe, Yahoo
 */

/**
 * Approach 1: Brute Force
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 */
function containsDuplicateBruteForce(nums) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] === nums[j]) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Approach 2: Sorting
 * Time Complexity: O(n log n)
 * Space Complexity: O(1) - if we can modify input, O(n) otherwise
 */
function containsDuplicateSorting(nums) {
  // Create a copy to avoid modifying original array
  const sorted = [...nums].sort((a, b) => a - b);

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === sorted[i - 1]) {
      return true;
    }
  }

  return false;
}

/**
 * Approach 3: Hash Set (Optimal)
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function containsDuplicate(nums) {
  const seen = new Set();

  for (const num of nums) {
    if (seen.has(num)) {
      return true;
    }
    seen.add(num);
  }

  return false;
}

/**
 * Approach 4: One-liner using Set
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function containsDuplicateOneLiner(nums) {
  return new Set(nums).size !== nums.length;
}

/**
 * Approach 5: Using Map to count frequencies
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function containsDuplicateMap(nums) {
  const frequency = new Map();

  for (const num of nums) {
    frequency.set(num, (frequency.get(num) || 0) + 1);
    if (frequency.get(num) > 1) {
      return true;
    }
  }

  return false;
}

/**
 * Approach 6: Using Object
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function containsDuplicateObject(nums) {
  const seen = {};

  for (const num of nums) {
    if (num in seen) {
      return true;
    }
    seen[num] = true;
  }

  return false;
}

// Test cases
console.log("=== Contains Duplicate Tests ===");
const testCases = [
  [1, 2, 3, 1], // Expected: true
  [1, 2, 3, 4], // Expected: false
  [1, 1, 1, 3, 3, 4, 3, 2, 4, 2], // Expected: true
  [], // Expected: false
  [1] // Expected: false
];

testCases.forEach((test, index) => {
  console.log(`\nTest ${index + 1}: [${test}]`);
  console.log(`Brute Force: ${containsDuplicateBruteForce(test)}`);
  console.log(`Sorting: ${containsDuplicateSorting(test)}`);
  console.log(`Hash Set: ${containsDuplicate(test)}`);
  console.log(`One Liner: ${containsDuplicateOneLiner(test)}`);
  console.log(`Map: ${containsDuplicateMap(test)}`);
  console.log(`Object: ${containsDuplicateObject(test)}`);
});

/**
 * Key Insights:
 *
 * 1. HASH TABLE PATTERN:
 *    - Use Set or Map for O(1) lookup
 *    - Check if element exists before adding
 *    - Early termination when duplicate found
 *
 * 2. SPACE-TIME TRADEOFFS:
 *    - Brute Force: O(1) space, O(n²) time
 *    - Sorting: O(1) space*, O(n log n) time
 *    - Hash Set: O(n) space, O(n) time
 *    (*O(1) if we can modify input)
 *
 * 3. EARLY TERMINATION:
 *    - Return immediately when duplicate found
 *    - Don't need to process entire array
 *
 * 4. SET SIZE TRICK:
 *    - Set automatically removes duplicates
 *    - If set size < array length, duplicates exist
 *    - Elegant one-liner solution
 *
 * 5. VARIATIONS TO CONSIDER:
 *    - What if we need to find the duplicate?
 *    - What if we need all duplicates?
 *    - What if we need count of duplicates?
 */

/**
 * Related Problems:
 * - Contains Duplicate II (LC 219) - Within k distance
 * - Contains Duplicate III (LC 220) - Within value range
 * - Find the Duplicate Number (LC 287)
 * - Remove Duplicates from Sorted Array (LC 26)
 */

module.exports = {
  containsDuplicate,
  containsDuplicateBruteForce,
  containsDuplicateSorting,
  containsDuplicateOneLiner,
  containsDuplicateMap,
  containsDuplicateObject
};
