/**
 * Best Time to Buy and Sell Stock - LeetCode Problem 121
 *
 * Problem: You are given an array prices where prices[i] is the price of
 * a given stock on the ith day. You want to maximize your profit by choosing
 * a single day to buy and a different day in the future to sell.
 * Return the maximum profit you can achieve from this transaction.
 *
 * Constraints:
 * - 1 <= prices.length <= 10^5
 * - 0 <= prices[i] <= 10^4
 *
 * Link: https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
 * Difficulty: Easy
 * Topics: Array, Dynamic Programming
 * Companies: Amazon, Facebook, Microsoft, Apple, Goldman Sachs
 */

/**
 * Approach 1: Brute Force
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 */
function maxProfitBruteForce(prices) {
  let maxProfit = 0;

  for (let i = 0; i < prices.length; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      const profit = prices[j] - prices[i];
      maxProfit = Math.max(maxProfit, profit);
    }
  }

  return maxProfit;
}

/**
 * Approach 2: One Pass (Optimal)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * Strategy: Keep track of minimum price seen so far and maximum profit
 */
function maxProfit(prices) {
  let minPrice = prices[0];
  let maxProfit = 0;

  for (let i = 1; i < prices.length; i++) {
    // Update minimum price if current price is lower
    minPrice = Math.min(minPrice, prices[i]);

    // Calculate profit if we sell today
    const currentProfit = prices[i] - minPrice;

    // Update maximum profit
    maxProfit = Math.max(maxProfit, currentProfit);
  }

  return maxProfit;
}

/**
 * Approach 3: Kadane's Algorithm Variation
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * Strategy: Think of profit as difference between consecutive days
 * Find maximum subarray sum of these differences
 */
function maxProfitKadane(prices) {
  if (prices.length <= 1) return 0;

  let maxProfit = 0;
  let currentProfit = 0;

  for (let i = 1; i < prices.length; i++) {
    const dailyProfit = prices[i] - prices[i - 1];
    currentProfit = Math.max(0, currentProfit + dailyProfit);
    maxProfit = Math.max(maxProfit, currentProfit);
  }

  return maxProfit;
}

/**
 * Approach 4: With tracking buy/sell days
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function maxProfitWithDays(prices) {
  let minPrice = prices[0];
  let maxProfit = 0;
  let buyDay = 0,
    sellDay = 0;

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i];
      buyDay = i;
    }

    const currentProfit = prices[i] - minPrice;
    if (currentProfit > maxProfit) {
      maxProfit = currentProfit;
      sellDay = i;
    }
  }

  return {
    maxProfit,
    buyDay,
    sellDay,
    buyPrice: prices[buyDay],
    sellPrice: prices[sellDay]
  };
}

// Test cases
console.log("=== Best Time to Buy and Sell Stock Tests ===");
const testCases = [
  [7, 1, 5, 3, 6, 4], // Expected: 5 (buy at 1, sell at 6)
  [7, 6, 4, 3, 1], // Expected: 0 (no profit possible)
  [1, 2, 3, 4, 5], // Expected: 4 (buy at 1, sell at 5)
  [2, 4, 1], // Expected: 2 (buy at 2, sell at 4)
  [1] // Expected: 0 (only one day)
];

testCases.forEach((test, index) => {
  console.log(`\nTest ${index + 1}: [${test}]`);
  console.log(`Brute Force: ${maxProfitBruteForce(test)}`);
  console.log(`One Pass: ${maxProfit(test)}`);
  console.log(`Kadane's: ${maxProfitKadane(test)}`);
  console.log(`With Days:`, maxProfitWithDays(test));
});

/**
 * Key Insights:
 *
 * 1. GREEDY APPROACH:
 *    - We want to buy at the lowest price before the highest price
 *    - Keep track of minimum price seen so far
 *    - At each day, calculate profit if we sell today
 *
 * 2. CONNECTION TO KADANE'S ALGORITHM:
 *    - Convert to array of daily price differences
 *    - Find maximum subarray sum
 *    - This gives us the maximum profit
 *
 * 3. SINGLE TRANSACTION CONSTRAINT:
 *    - We can only buy once and sell once
 *    - Must buy before selling
 *    - If no profit possible, return 0
 *
 * 4. EDGE CASES:
 *    - Prices always decreasing (no profit)
 *    - Only one day (no transaction possible)
 *    - All prices the same (no profit)
 */

/**
 * Related Problems:
 * - Best Time to Buy and Sell Stock II (LC 122) - Multiple transactions
 * - Best Time to Buy and Sell Stock III (LC 123) - At most 2 transactions
 * - Best Time to Buy and Sell Stock IV (LC 188) - At most k transactions
 * - Best Time to Buy and Sell Stock with Cooldown (LC 309)
 */

module.exports = {
  maxProfit,
  maxProfitBruteForce,
  maxProfitKadane,
  maxProfitWithDays
};
