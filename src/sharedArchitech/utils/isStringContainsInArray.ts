/**
 * Checks if any string in the given array contains the specified substring.
 *
 * @param {string[]} arr - The array of strings to search through.
 * @param {string} searchString - The substring to search for in the array.
 * @returns {boolean} - True if a match is found, otherwise false.
 */
function isStringContainsInArray(targetString: string, arr: string[]): boolean {
  return arr.some((value) => targetString.includes(value));
}

export default isStringContainsInArray;
