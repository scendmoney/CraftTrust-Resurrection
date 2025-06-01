async function dataURLtoFile(dataURL: string, filename: string) {
  const response = await fetch(dataURL);
  const blob = await response.blob();
  return new File([blob], filename, {
    type: 'image/jpeg'
  });
}

export default dataURLtoFile;
