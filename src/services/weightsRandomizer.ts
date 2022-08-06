import * as Log from "../utilities/logger";
import WeightDictionary from "../objects/weightDictionary";

export default class WeightsRandomizer {
  private readonly weightSum: number;

  constructor(readonly items: WeightDictionary[]) {
    this.weightSum = items.map((a) => a.weight).reduce((a, b) => a + b);
    if (this.weightSum <= 0) {
      Log.error("Weights must add up to at least 1.");
    }
  }

  getRandomValue(): any {
    let randomValue = context.getRandom(0, this.weightSum);

    for (let i = 0; i < this.items.length; i += 1) {
      if (randomValue < this.items[i].weight) {
        return this.items[i].key;
      }

      randomValue -= this.items[i].weight;
    }

    Log.debug("Failed to find an item; defaulting");
    return this.items[this.items.length - 1].key;
  }
}
