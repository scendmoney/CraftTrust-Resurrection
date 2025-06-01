const createMnemonicImage = (words: string[]): string => {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 220;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Error creating image. Please take a Screenshot');
  }

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = '16px Arial';
  ctx.fillStyle = 'black';

  words.forEach((word, index) => {
    const column = index % 2 === 0 ? 50 : 320;
    const row = Math.floor(index / 2) * 30 + 40;
    ctx.fillText(`${index + 1}. ${word}`, column, row);
  });

  return canvas.toDataURL('image/png');
};

export default createMnemonicImage;
