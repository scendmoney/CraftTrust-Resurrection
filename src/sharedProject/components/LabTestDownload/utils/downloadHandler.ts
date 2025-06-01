export async function downloadHandler(license: string, productId: number, docId: string) {
  const pdfUrl = `https://backend.dev.crafttrust.com/labtest/${license}/${productId}/${docId}`;

  if (typeof window !== 'undefined') {
    window.open(pdfUrl, '_blank');
  }
}
