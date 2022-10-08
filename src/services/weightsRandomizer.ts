import * as Log from "../utilities/logger";
import WeightDictionary from "../objects/weightDictionary";

export default class WeightsRandomizer {
  private readonly weightSum: number;

  public readonly canRandomize: boolean;

  constructor(readonly items: WeightDictionary[]) {
    this.weightSum = items.map((a) => a.weight).reduce((a, b) => a + b);
    this.canRandomize = this.weightSum > 0;

    if (!this.canRandomize) {
      ui.showError("Can't randomize", "Weights must add up to at least 1.");
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
