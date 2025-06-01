import createMnemonicImage from './createMnemonicImage';

const handleDownloadImage = (mnemonicWords: string[]): void => {
  const imageDataUrl = createMnemonicImage(mnemonicWords);
  const link = document.createElement('a');
  link.href = imageDataUrl;
  link.download = 'mnemonic.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default handleDownloadImage;
