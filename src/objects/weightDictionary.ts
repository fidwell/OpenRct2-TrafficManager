export default class WeightDictionary {
  readonly key: any;

  readonly weight: number;

  constructor(key: any, weight: number) {
    this.key = key;
    this.weight = weight;
  }
}
