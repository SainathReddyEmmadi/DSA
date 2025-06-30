/**
 * Product of Array Except Self - LeetCode Problem 238
 *
 * Problem: Given an integer array nums, return an array answer such that
 * answer[i] is equal to the product of all the elements of nums except nums[i].
 *
 * The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
 * You must write an algorithm that runs in O(n) time and without using the division operator.
 *
 * Constraints:
 * - 2 <= nums.length <= 10^5
 * - -30 <= nums[i] <= 30
 * - The product of any prefix or suffix fits in 32-bit integer
 *
 * Link: https://leetcode.com/problems/product-of-array-except-self/
 * Difficulty: Medium
 * Topics: Array, Prefix Sum
 * Companies: Amazon, Microsoft, Facebook, Apple, Lyft
 */

/**
 * Approach 1: Brute Force
 * Time Complexity: O(n²)
 * Space Complexity: O(1) - excluding output array
 */
function productExceptSelfBruteForce(nums) {
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    let product = 1;
    for (let j = 0; j < nums.length; j++) {
      if (i !== j) {
        product *= nums[j];
      }
    }
    result.push(product);
  }

  return result;
}

/**
 * Approach 2: Using Division (Not allowed, but good to understand)
 * Time Complexity: O(n)
 * Space Complexity: O(1) - excluding output array
 *
 * Note: This approach has issues with zeros and is explicitly forbidden
 */
function productExceptSelfDivision(nums) {
  // Count zeros and calculate total product of non-zeros
  let zeroCount = 0;
  let totalProduct = 1;

  for (const num of nums) {
    if (num === 0) {
      zeroCount++;
    } else {
      totalProduct *= num;
    }
  }

  const result = [];

  for (const num of nums) {
    if (zeroCount > 1) {
      // More than one zero means all products are 0
      result.push(0);
    } else if (zeroCount === 1) {
      // Exactly one zero
      result.push(num === 0 ? totalProduct : 0);
    } else {
      // No zeros
      result.push(totalProduct / num);
    }
  }

  return result;
}

/**
 * Approach 3: Left and Right Products (Two Pass)
 * Time Complexity: O(n)
 * Space Complexity: O(n) - for left and right arrays
 */
function productExceptSelfTwoArrays(nums) {
  const n = nums.length;
  const left = new Array(n);
  const right = new Array(n);
  const result = new Array(n);

  // Calculate left products
  left[0] = 1;
  for (let i = 1; i < n; i++) {
    left[i] = left[i - 1] * nums[i - 1];
  }

  // Calculate right products
  right[n - 1] = 1;
  for (let i = n - 2; i >= 0; i--) {
    right[i] = right[i + 1] * nums[i + 1];
  }

  // Combine left and right products
  for (let i = 0; i < n; i++) {
    result[i] = left[i] * right[i];
  }

  return result;
}

/**
 * Approach 4: Optimized Single Array (Optimal)
 * Time Complexity: O(n)
 * Space Complexity: O(1) - excluding output array
 *
 * Strategy: Use the result array to store left products first,
 * then multiply by right products in second pass
 */
function productExceptSelf(nums) {
  const n = nums.length;
  const result = new Array(n);

  // First pass: calculate left products and store in result
  result[0] = 1;
  for (let i = 1; i < n; i++) {
    result[i] = result[i - 1] * nums[i - 1];
  }

  // Second pass: multiply by right products
  let rightProduct = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= rightProduct;
    rightProduct *= nums[i];
  }

  return result;
}

/**
 * Approach 5: With detailed step tracking (for understanding)
 * Time Complexity: O(n)
 * Space Complexity: O(1) - excluding output array
 */
function productExceptSelfDetailed(nums) {
  const n = nums.length;
  const result = new Array(n);

  console.log("Original array:", nums);

  // Step 1: Fill with left products
  result[0] = 1; // No elements to the left of index 0
  console.log("After setting result[0] = 1:", [...result]);

  for (let i = 1; i < n; i++) {
    result[i] = result[i - 1] * nums[i - 1];
    console.log(
      `result[${i}] = result[${i - 1}] * nums[${i - 1}] = ${result[i - 1]} * ${
        nums[i - 1]
      } = ${result[i]}`
    );
  }

  console.log("After left products:", [...result]);

  // Step 2: Multiply by right products
  let rightProduct = 1;
  for (let i = n - 1; i >= 0; i--) {
    console.log(
      `result[${i}] = ${result[i]} * ${rightProduct} = ${
        result[i] * rightProduct
      }`
    );
    result[i] *= rightProduct;
    rightProduct *= nums[i];
    console.log(`rightProduct updated to: ${rightProduct}`);
  }

  console.log("Final result:", result);
  return result;
}

// Test cases
console.log("=== Product of Array Except Self Tests ===");
const testCases = [
  [1, 2, 3, 4], // Expected: [24, 12, 8, 6]
  [-1, 1, 0, -3, 3], // Expected: [0, 0, 9, 0, 0]
  [2, 3, 4, 5], // Expected: [60, 40, 30, 24]
  [1, 0], // Expected: [0, 1]
  [0, 0] // Expected: [0, 0]
];

testCases.forEach((test, index) => {
  console.log(`\nTest ${index + 1}: [${test}]`);
  console.log(`Brute Force: [${productExceptSelfBruteForce(test)}]`);
  console.log(`Two Arrays: [${productExceptSelfTwoArrays(test)}]`);
  console.log(`Optimal: [${productExceptSelf(test)}]`);
  console.log(`Division (not allowed): [${productExceptSelfDivision(test)}]`);
});

console.log("\n=== Detailed Step-by-Step Example ===");
productExceptSelfDetailed([1, 2, 3, 4]);

/**
 * Key Insights:
 *
 * 1. PREFIX AND SUFFIX PRODUCTS:
 *    - For each position i, we need product of all elements before i
 *      and product of all elements after i
 *    - result[i] = leftProduct[i] * rightProduct[i]
 *
 * 2. SPACE OPTIMIZATION:
 *    - Instead of storing left and right products separately,
 *      use result array to store left products first
 *    - Then multiply by right products in second pass
 *
 * 3. HANDLING ZEROS:
 *    - If array has one zero, only that position has non-zero result
 *    - If array has multiple zeros, all results are zero
 *    - Division approach needs special handling for zeros
 *
 * 4. NO DIVISION CONSTRAINT:
 *    - Division approach seems simpler but has edge cases with zeros
 *    - Problem explicitly forbids division to teach prefix/suffix pattern
 *
 * 5. INTERVIEW VARIATIONS:
 *    - "What if division was allowed?" (discuss zero handling)
 *    - "Can you do it in O(1) extra space?" (yes, current solution)
 *    - "What if there are overflow concerns?" (use modular arithmetic)
 */

/**
 * Related Problems:
 * - Maximum Product Subarray (LC 152)
 * - Minimum Product Subarray
 * - Product of the Last k Numbers (LC 1352)
 * - Running Sum of 1d Array (LC 1480) - similar prefix pattern
 */

module.exports = {
  productExceptSelf,
  productExceptSelfBruteForce,
  productExceptSelfTwoArrays,
  productExceptSelfDivision,
  productExceptSelfDetailed
};
