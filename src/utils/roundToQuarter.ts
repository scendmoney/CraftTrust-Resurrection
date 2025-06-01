function roundToQuarter(value: number, min: number, max: number): number {
  if (value < min) {
    return min;
  }

  let rounded = Math.round(value * 4) / 4;
  if (rounded > max) {
    rounded = Math.floor(max * 4) / 4;
  }

  return rounded;
}

export default roundToQuarter;
