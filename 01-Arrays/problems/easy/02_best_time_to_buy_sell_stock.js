/**
 * LeetCode 121: Best Time to Buy and Sell Stock
 * Difficulty: Easy
 *
 * Problem:
 * You are given an array prices where prices[i] is the price of a given stock on the ith day.
 *
 * You want to maximize your profit by choosing a single day to buy one stock and choosing
 * a different day in the future to sell that stock.
 *
 * Return the maximum profit you can achieve from this transaction. If you cannot achieve
 * any profit, return 0.
 *
 * Example 1:
 * Input: prices = [7,1,5,3,6,4]
 * Output: 5
 * Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
 *
 * Example 2:
 * Input: prices = [7,6,4,3,1]
 * Output: 0
 * Explanation: In this case, no transactions are done and the max profit = 0.
 *
 * Constraints:
 * - 1 <= prices.length <= 10^5
 * - 0 <= prices[i] <= 10^4
 */

/**
 * Approach 1: Brute Force
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 *
 * Strategy:
 * Try every possible buy and sell combination
 */
function maxProfit1(prices) {
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
 * Approach 2: Single Pass - Track Minimum
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * Strategy:
 * Keep track of the minimum price seen so far and calculate profit at each day
 */
function maxProfit2(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;

  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i];
    } else if (prices[i] - minPrice > maxProfit) {
      maxProfit = prices[i] - minPrice;
    }
  }

  return maxProfit;
}

/**
 * Approach 3: Single Pass - More Readable
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * Strategy:
 * Same as approach 2 but with clearer logic separation
 */
function maxProfit3(prices) {
  if (prices.length <= 1) return 0;

  let minPrice = prices[0];
  let maxProfit = 0;

  for (let i = 1; i < prices.length; i++) {
    // Update minimum price
    minPrice = Math.min(minPrice, prices[i]);

    // Calculate profit if we sell today
    const currentProfit = prices[i] - minPrice;

    // Update maximum profit
    maxProfit = Math.max(maxProfit, currentProfit);
  }

  return maxProfit;
}

/**
 * Approach 4: Dynamic Programming Style
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * Strategy:
 * Think of it as maintaining state of best buy price
 */
function maxProfit4(prices) {
  let buy = prices[0];
  let profit = 0;

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] < buy) {
      buy = prices[i]; // Better day to buy
    } else {
      profit = Math.max(profit, prices[i] - buy); // Better profit
    }
  }

  return profit;
}

// Helper function to find the actual buy and sell days
function findBuySellDays(prices) {
  let minPrice = prices[0];
  let maxProfit = 0;
  let buyDay = 0;
  let sellDay = 0;
  let currentBuyDay = 0;

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i];
      currentBuyDay = i;
    } else if (prices[i] - minPrice > maxProfit) {
      maxProfit = prices[i] - minPrice;
      buyDay = currentBuyDay;
      sellDay = i;
    }
  }

  return {
    buyDay,
    sellDay,
    buyPrice: prices[buyDay],
    sellPrice: prices[sellDay],
    profit: maxProfit
  };
}

// Test cases
function runTests() {
  console.log("Testing Best Time to Buy and Sell Stock Solutions...\n");

  const testCases = [
    {
      prices: [7, 1, 5, 3, 6, 4],
      expected: 5,
      description: "Example 1 - Buy at 1, sell at 6"
    },
    {
      prices: [7, 6, 4, 3, 1],
      expected: 0,
      description: "Example 2 - Decreasing prices, no profit"
    },
    {
      prices: [1, 2, 3, 4, 5],
      expected: 4,
      description: "Increasing prices - buy first, sell last"
    },
    {
      prices: [2, 4, 1],
      expected: 2,
      description: "Peak early, then drop"
    },
    {
      prices: [3, 2, 6, 5, 0, 3],
      expected: 4,
      description: "Multiple peaks and valleys"
    },
    {
      prices: [1],
      expected: 0,
      description: "Single day - no transaction possible"
    },
    {
      prices: [1, 2],
      expected: 1,
      description: "Two days - simple transaction"
    }
  ];

  const solutions = [
    { name: "Brute Force", func: maxProfit1 },
    { name: "Single Pass - Track Min", func: maxProfit2 },
    { name: "Single Pass - Readable", func: maxProfit3 },
    { name: "DP Style", func: maxProfit4 }
  ];

  testCases.forEach(({ prices, expected, description }) => {
    console.log(`Test Case: ${description}`);
    console.log(`Input: [${prices.join(", ")}]`);
    console.log(`Expected: ${expected}`);

    // Show buy/sell details for expected result
    if (expected > 0) {
      const details = findBuySellDays(prices);
      console.log(
        `Buy Day ${details.buyDay} (price ${details.buyPrice}), Sell Day ${details.sellDay} (price ${details.sellPrice})`
      );
    }

    solutions.forEach(({ name, func }) => {
      const result = func([...prices]);
      const isCorrect = result === expected;
      console.log(`${name}: ${result} ${isCorrect ? "✅" : "❌"}`);
    });

    console.log();
  });
}

// Performance comparison
function performanceTest() {
  console.log("Performance Testing...\n");

  const sizes = [1000, 10000, 50000];

  sizes.forEach((size) => {
    console.log(`Array size: ${size}`);

    // Create test array with random prices
    const prices = Array.from(
      { length: size },
      () => Math.floor(Math.random() * 1000) + 1
    );

    const solutions = [
      { name: "Single Pass - Track Min", func: maxProfit2 },
      { name: "Single Pass - Readable", func: maxProfit3 },
      { name: "DP Style", func: maxProfit4 }
    ];

    // Skip brute force for large arrays as it's too slow
    if (size <= 1000) {
      solutions.unshift({ name: "Brute Force", func: maxProfit1 });
    }

    solutions.forEach(({ name, func }) => {
      const start = performance.now();
      func(prices);
      const end = performance.now();
      console.log(`${name}: ${(end - start).toFixed(3)}ms`);
    });

    console.log();
  });
}

// Pattern explanation
function explainPattern() {
  console.log("Best Time to Buy and Sell Stock Pattern Analysis:\n");
  console.log("1. SINGLE PASS PATTERN:");
  console.log("   - Track minimum value seen so far");
  console.log("   - At each position, calculate potential profit");
  console.log("   - Keep track of maximum profit");
  console.log();
  console.log("2. KEY INSIGHTS:");
  console.log("   - You must buy before you sell");
  console.log("   - Only care about minimum buy price up to current day");
  console.log("   - Profit = current price - minimum price so far");
  console.log();
  console.log("3. VARIATIONS:");
  console.log(
    "   - Buy Sell Stock II: multiple transactions → greedy approach"
  );
  console.log("   - Buy Sell Stock III: at most 2 transactions → DP");
  console.log("   - Buy Sell Stock IV: at most k transactions → DP");
  console.log();
  console.log("4. REAL WORLD APPLICATION:");
  console.log("   - Financial trading algorithms");
  console.log("   - Finding maximum difference in any sequence");
  console.log("   - Resource allocation optimization");
}

// Export for testing
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    maxProfit1,
    maxProfit2,
    maxProfit3,
    maxProfit4,
    findBuySellDays,
    runTests,
    performanceTest,
    explainPattern
  };
}

// Run tests if executed directly
if (typeof require !== "undefined" && require.main === module) {
  runTests();
  performanceTest();
  explainPattern();
}
