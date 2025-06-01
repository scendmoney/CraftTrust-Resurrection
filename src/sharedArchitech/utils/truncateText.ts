/**
 * Truncate a given text to the specified maximum length, and add an ellipsis (three dots) at the end if truncation occurs.
 *
 * @param text - The input text string to be truncated, or undefined.
 * @param maxLength - The maximum number of characters allowed in the output string.
 * @returns The truncated text string with an ellipsis added if truncation occurs, or an empty string if the input is undefined.
 *
 * @example truncateText('text', 70);
 *
 * @author Pavel Devyatov
 */
function truncateText(text: string | undefined, maxLength: number): string {
  if (!text || text.length <= maxLength) {
    return text || '';
  }
  return maxLength > 3 ? `${text.slice(0, maxLength - 3)}...` : text.slice(0, maxLength);
}

export default truncateText;
