const base64ToBlob = async (base64: string): Promise<Blob> => {
  return await fetch(base64)
    .then((res) => res.blob())
    .then((blob) => {
      return new File([blob], 'avatar.jpeg', { type: 'image/jpeg' });
    });
};

export default base64ToBlob;
