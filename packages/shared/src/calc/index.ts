/** Rounds a quantity of produced garments to the nearest unit of a given lot size. */
export function roundToLotSize(quantity: number, lotSize: number): number {
  if (lotSize <= 0) {
    throw new Error("lotSize must be greater than zero");
  }
  return Math.round(quantity / lotSize) * lotSize;
}
