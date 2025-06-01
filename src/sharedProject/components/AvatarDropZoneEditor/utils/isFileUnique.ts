const isFileUnique = (newFile: File, existingFiles: File[]): boolean => {
  return !existingFiles.some(
    (existingFile) =>
      newFile.name === existingFile.name &&
      newFile.size === existingFile.size &&
      newFile.lastModified === existingFile.lastModified
  );
};

export default isFileUnique;
