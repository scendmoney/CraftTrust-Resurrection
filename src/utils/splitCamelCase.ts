function splitCamelCase(input?: string): string {
  if (!input) {
    return '-';
  }
  return input.replace(/([a-z])([A-Z])/g, '$1 $2');
}

export default splitCamelCase;
