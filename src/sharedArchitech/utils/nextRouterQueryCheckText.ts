type TQuery = string | string[] | undefined;

function nextRouterQueryCheckText(text: TQuery) {
  if (typeof text === 'string') {
    return text;
  }
  return undefined;
}

export default nextRouterQueryCheckText;
