type TQuery = string | string[] | undefined;

function nextRouterQueryCheckId(id: TQuery) {
  if (typeof id === 'string') {
    const idNumber = Number(id);
    if (isFinite(idNumber)) {
      return idNumber;
    }
  }
  return undefined;
}

export default nextRouterQueryCheckId;
