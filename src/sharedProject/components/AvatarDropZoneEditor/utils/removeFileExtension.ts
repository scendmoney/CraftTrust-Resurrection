/**
 * @file Remove file extension utility
 * @author Pavel Devyatov
 * @description This file contains a function to remove the file extension from a given file name.
 */

/**
 * Removes the file extension from a given file name.
 *
 * @param fileName - The name of the file (with or without an extension), or undefined.
 * @returns The file name with the extension removed. If the input is undefined, an empty string is returned.
 */
function removeFileExtension(fileName: string | undefined): string {
  // If the fileName is undefined or an empty string, return an empty string
  if (!fileName) {
    return '';
  }

  // Find the position of the last dot in the file name
  const lastDotIndex = fileName.lastIndexOf('.');

  // If there is no dot in the fileName, it means there is no extension,
  // so return the original fileName
  if (lastDotIndex === -1) {
    return fileName;
  }

  // If there is a dot, return the substring from the beginning of the string
  // to just before the last dot (effectively removing the extension)
  return fileName.slice(0, lastDotIndex);
}

export default removeFileExtension;
