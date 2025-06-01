import { FileExtended } from 'sharedProject/components/AvatarDropZoneEditor/types';

function getNullFileWithPreview(url: string): FileExtended {
  const file = new File([], 'avatar.jpeg', { type: 'image/jpeg' });

  return { ...file, preview: url || '' };
}

export default getNullFileWithPreview;
