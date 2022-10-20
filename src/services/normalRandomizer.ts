export default class NormalRandomizer {
  static getRandomValue(mean: number, standardDeviation: number): number {
    const u = this.getRandom();
    const v = this.getRandom();
    const transformed = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return (transformed * standardDeviation) + mean;
  }

  private static getRandom(): number {
    // OpenRCT2's RNG is integer-only; this
    // method converts it to a number in (0,1).
    return context.getRandom(0, 1000) / 1000;
  }
}
