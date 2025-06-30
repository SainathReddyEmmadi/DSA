/**
 * Array Utilities - Common array operations and algorithms
 *
 * Collection of useful array manipulation functions commonly used
 * in coding interviews and real-world applications.
 */

class ArrayUtils {
  // ============ SORTING ALGORITHMS ============

  /**
   * Bubble Sort
   * Time Complexity: O(n²)
   * Space Complexity: O(1)
   */
  static bubbleSort(arr) {
    const result = [...arr];
    const n = result.length;

    for (let i = 0; i < n - 1; i++) {
      let swapped = false;
      for (let j = 0; j < n - i - 1; j++) {
        if (result[j] > result[j + 1]) {
          [result[j], result[j + 1]] = [result[j + 1], result[j]];
          swapped = true;
        }
      }
      if (!swapped) break; // Already sorted
    }

    return result;
  }

  /**
   * Selection Sort
   * Time Complexity: O(n²)
   * Space Complexity: O(1)
   */
  static selectionSort(arr) {
    const result = [...arr];
    const n = result.length;

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        if (result[j] < result[minIdx]) {
          minIdx = j;
        }
      }
      if (minIdx !== i) {
        [result[i], result[minIdx]] = [result[minIdx], result[i]];
      }
    }

    return result;
  }

  /**
   * Insertion Sort
   * Time Complexity: O(n²)
   * Space Complexity: O(1)
   */
  static insertionSort(arr) {
    const result = [...arr];

    for (let i = 1; i < result.length; i++) {
      const key = result[i];
      let j = i - 1;

      while (j >= 0 && result[j] > key) {
        result[j + 1] = result[j];
        j--;
      }

      result[j + 1] = key;
    }

    return result;
  }

  /**
   * Quick Sort
   * Time Complexity: O(n log n) average, O(n²) worst
   * Space Complexity: O(log n)
   */
  static quickSort(arr) {
    if (arr.length <= 1) return [...arr];

    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter((x) => x < pivot);
    const middle = arr.filter((x) => x === pivot);
    const right = arr.filter((x) => x > pivot);

    return [
      ...ArrayUtils.quickSort(left),
      ...middle,
      ...ArrayUtils.quickSort(right)
    ];
  }

  /**
   * Merge Sort
   * Time Complexity: O(n log n)
   * Space Complexity: O(n)
   */
  static mergeSort(arr) {
    if (arr.length <= 1) return [...arr];

    const mid = Math.floor(arr.length / 2);
    const left = ArrayUtils.mergeSort(arr.slice(0, mid));
    const right = ArrayUtils.mergeSort(arr.slice(mid));

    return ArrayUtils._merge(left, right);
  }

  static _merge(left, right) {
    const result = [];
    let i = 0,
      j = 0;

    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }

    return result.concat(left.slice(i)).concat(right.slice(j));
  }

  // ============ SEARCHING ALGORITHMS ============

  /**
   * Linear Search
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  static linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === target) return i;
    }
    return -1;
  }

  /**
   * Binary Search (requires sorted array)
   * Time Complexity: O(log n)
   * Space Complexity: O(1)
   */
  static binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (arr[mid] === target) return mid;
      if (arr[mid] < target) left = mid + 1;
      else right = mid - 1;
    }

    return -1;
  }

  // ============ ARRAY MANIPULATION ============

  /**
   * Reverse array in place
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  static reverse(arr) {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }

    return arr;
  }

  /**
   * Rotate array to the right by k positions
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  static rotateRight(arr, k) {
    const n = arr.length;
    k = k % n; // Handle k > n

    // Reverse entire array
    ArrayUtils.reverse(arr);

    // Reverse first k elements
    ArrayUtils._reverseRange(arr, 0, k - 1);

    // Reverse remaining elements
    ArrayUtils._reverseRange(arr, k, n - 1);

    return arr;
  }

  static _reverseRange(arr, start, end) {
    while (start < end) {
      [arr[start], arr[end]] = [arr[end], arr[start]];
      start++;
      end--;
    }
  }

  /**
   * Remove duplicates from sorted array
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  static removeDuplicates(arr) {
    if (arr.length === 0) return 0;

    let writeIndex = 1;

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] !== arr[i - 1]) {
        arr[writeIndex] = arr[i];
        writeIndex++;
      }
    }

    return writeIndex; // New length
  }

  /**
   * Move all zeros to the end
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  static moveZeros(arr) {
    let writeIndex = 0;

    // Move all non-zero elements to the front
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== 0) {
        arr[writeIndex] = arr[i];
        writeIndex++;
      }
    }

    // Fill remaining positions with zeros
    while (writeIndex < arr.length) {
      arr[writeIndex] = 0;
      writeIndex++;
    }

    return arr;
  }

  // ============ ARRAY ANALYSIS ============

  /**
   * Find maximum element
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  static findMax(arr) {
    if (arr.length === 0) return undefined;

    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > max) max = arr[i];
    }
    return max;
  }

  /**
   * Find minimum element
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  static findMin(arr) {
    if (arr.length === 0) return undefined;

    let min = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < min) min = arr[i];
    }
    return min;
  }

  /**
   * Calculate sum of all elements
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  static sum(arr) {
    return arr.reduce((sum, num) => sum + num, 0);
  }

  /**
   * Calculate average of all elements
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  static average(arr) {
    if (arr.length === 0) return 0;
    return ArrayUtils.sum(arr) / arr.length;
  }

  /**
   * Check if array is sorted in ascending order
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  static isSorted(arr) {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < arr[i - 1]) return false;
    }
    return true;
  }

  // ============ ADVANCED OPERATIONS ============

  /**
   * Generate all permutations of array
   * Time Complexity: O(n!)
   * Space Complexity: O(n!)
   */
  static permutations(arr) {
    if (arr.length <= 1) return [arr];

    const result = [];

    for (let i = 0; i < arr.length; i++) {
      const current = arr[i];
      const remaining = arr.slice(0, i).concat(arr.slice(i + 1));
      const perms = ArrayUtils.permutations(remaining);

      for (const perm of perms) {
        result.push([current, ...perm]);
      }
    }

    return result;
  }

  /**
   * Generate all subsets (power set)
   * Time Complexity: O(2^n)
   * Space Complexity: O(2^n)
   */
  static subsets(arr) {
    const result = [[]];

    for (const num of arr) {
      const newSubsets = result.map((subset) => [...subset, num]);
      result.push(...newSubsets);
    }

    return result;
  }

  /**
   * Find intersection of two arrays
   * Time Complexity: O(n + m)
   * Space Complexity: O(min(n, m))
   */
  static intersection(arr1, arr2) {
    const set1 = new Set(arr1);
    const result = [];

    for (const num of arr2) {
      if (set1.has(num)) {
        result.push(num);
        set1.delete(num); // Avoid duplicates
      }
    }

    return result;
  }

  /**
   * Find union of two arrays
   * Time Complexity: O(n + m)
   * Space Complexity: O(n + m)
   */
  static union(arr1, arr2) {
    return [...new Set([...arr1, ...arr2])];
  }

  /**
   * Flatten nested array
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  static flatten(arr) {
    const result = [];

    for (const item of arr) {
      if (Array.isArray(item)) {
        result.push(...ArrayUtils.flatten(item));
      } else {
        result.push(item);
      }
    }

    return result;
  }
}

// ============ TESTS ============

console.log("=== Array Utils Tests ===");

// Test sorting algorithms
const unsorted = [64, 34, 25, 12, 22, 11, 90];
console.log("Original:", unsorted);
console.log("Bubble Sort:", ArrayUtils.bubbleSort(unsorted));
console.log("Selection Sort:", ArrayUtils.selectionSort(unsorted));
console.log("Insertion Sort:", ArrayUtils.insertionSort(unsorted));
console.log("Quick Sort:", ArrayUtils.quickSort(unsorted));
console.log("Merge Sort:", ArrayUtils.mergeSort(unsorted));

// Test searching
const sorted = [1, 3, 5, 7, 9, 11, 13];
console.log("\nSearching in:", sorted);
console.log("Linear search for 7:", ArrayUtils.linearSearch(sorted, 7));
console.log("Binary search for 7:", ArrayUtils.binarySearch(sorted, 7));

// Test array manipulation
const testArr = [1, 2, 3, 4, 5];
console.log("\nManipulation tests:");
console.log("Original:", testArr);
console.log("Reversed:", ArrayUtils.reverse([...testArr]));
console.log("Rotated right by 2:", ArrayUtils.rotateRight([...testArr], 2));

const withDuplicates = [1, 1, 2, 2, 2, 3, 4, 4];
console.log("Remove duplicates from:", withDuplicates);
const newLength = ArrayUtils.removeDuplicates([...withDuplicates]);
console.log("New length:", newLength);

const withZeros = [1, 0, 2, 0, 3, 0, 4];
console.log("Move zeros:", ArrayUtils.moveZeros([...withZeros]));

// Test analysis functions
console.log("\nAnalysis tests:");
console.log("Max of [1,5,3,9,2]:", ArrayUtils.findMax([1, 5, 3, 9, 2]));
console.log("Min of [1,5,3,9,2]:", ArrayUtils.findMin([1, 5, 3, 9, 2]));
console.log("Sum of [1,2,3,4,5]:", ArrayUtils.sum([1, 2, 3, 4, 5]));
console.log("Average of [1,2,3,4,5]:", ArrayUtils.average([1, 2, 3, 4, 5]));
console.log("Is [1,2,3,4,5] sorted?", ArrayUtils.isSorted([1, 2, 3, 4, 5]));

// Test advanced operations
console.log("\nAdvanced operations:");
console.log("Permutations of [1,2,3]:", ArrayUtils.permutations([1, 2, 3]));
console.log("Subsets of [1,2]:", ArrayUtils.subsets([1, 2]));
console.log(
  "Intersection of [1,2,3] and [2,3,4]:",
  ArrayUtils.intersection([1, 2, 3], [2, 3, 4])
);
console.log(
  "Union of [1,2,3] and [2,3,4]:",
  ArrayUtils.union([1, 2, 3], [2, 3, 4])
);
console.log(
  "Flatten [[1,2],[3,[4,5]]]:",
  ArrayUtils.flatten([
    [1, 2],
    [3, [4, 5]]
  ])
);

module.exports = ArrayUtils;
