import { toast } from 'react-toastify';

/* eslint-disable no-console */
const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
    console.log('Copied to clipboard');
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
};

export default copyToClipboard;
