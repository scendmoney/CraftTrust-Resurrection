const removeFileFromArray = (
  files: File[],
  fileName: string,
  fileSize: number,
  fileLastModified: number
): File[] => {
  return files.filter(
    (file) =>
      file.name !== fileName || file.size !== fileSize || file.lastModified !== fileLastModified
  );
};

export default removeFileFromArray;
